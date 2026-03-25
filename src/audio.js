/**
 * Audio Engine - Captures microphone input and calculates sound level
 * Uses Web Audio API with AnalyserNode for real-time RMS volume
 */

let audioContext = null;
let analyser = null;
let microphone = null;
let stream = null;
let dataArray = null;
let isListening = false;

/**
 * Start listening to the microphone
 * @returns {Promise<boolean>} Whether microphone access was granted
 */
export async function startListening() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    analyser.smoothingTimeConstant = 0.8;

    microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    dataArray = new Float32Array(analyser.fftSize);
    isListening = true;

    return true;
  } catch (err) {
    console.error('Microphone access denied:', err);
    return false;
  }
}

/**
 * Stop listening and release microphone
 */
export function stopListening() {
  isListening = false;

  if (microphone) {
    microphone.disconnect();
    microphone = null;
  }

  if (stream) {
    stream.getTracks().forEach((track) => track.stop());
    stream = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }

  analyser = null;
  dataArray = null;
}

/**
 * Get current sound level (0-100 scale)
 * Uses RMS (Root Mean Square) calculation for accurate volume level
 * @returns {number} Sound level from 0 to 100
 */
export function getLevel() {
  if (!isListening || !analyser || !dataArray) return 0;

  analyser.getFloatTimeDomainData(dataArray);

  // Calculate RMS
  let sumSquares = 0;
  for (let i = 0; i < dataArray.length; i++) {
    sumSquares += dataArray[i] * dataArray[i];
  }
  const rms = Math.sqrt(sumSquares / dataArray.length);

  // Convert to dB and then to 0-100 scale
  // RMS of 0.00001 (-100dB) = 0, RMS of 1.0 (0dB) = 100
  const db = 20 * Math.log10(Math.max(rms, 0.00001));
  // Map -100dB..0dB to 0..100 with emphasis on mid-range
  const normalized = Math.max(0, Math.min(100, ((db + 70) / 55) * 100));

  return normalized;
}

/**
 * Get frequency data for visualization
 * @returns {Uint8Array|null}
 */
export function getFrequencyData() {
  if (!isListening || !analyser) return null;
  const freqData = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(freqData);
  return freqData;
}

/**
 * Check if currently listening
 * @returns {boolean}
 */
export function getIsListening() {
  return isListening;
}
