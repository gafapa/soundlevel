/**
 * Main application controller.
 * Orchestrates audio, zones, mascot, particles, history, i18n, and PWA setup.
 */

import { startListening, stopListening, getLevel } from './audio.js';
import { getZone, isIdealZone, setThresholds, getZonesInOrder } from './zones.js';
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
  detectLanguage,
  formatDuration,
  getRandomZoneMessage,
  getStreakMessage,
  getTranslation,
  normalizeLanguage,
} from './i18n.js';
import { MascotController } from './mascot.js';
import { ParticleSystem } from './particles.js';
import './style.css';

const STORAGE_KEYS = {
  thresholds: 'soundlevel_thresholds',
  bestStreak: 'soundlevel_best_streak',
};

const REDUCED_MOTION_QUERY = window.matchMedia('(prefers-reduced-motion: reduce)');
const HISTORY_LENGTH = 120;
const ROLLING_BUFFER_SIZE = 30;
const STREAK_MILESTONES = [10, 30, 60, 120, 180];

const html = document.documentElement;
const metaDescription = document.querySelector('meta[name="description"]');
const startBtn = document.getElementById('start-btn');
const btnIcon = document.getElementById('btn-icon');
const btnText = document.getElementById('btn-text');
const meterCanvas = document.getElementById('meter-canvas');
const meterCtx = meterCanvas.getContext('2d');
const meterValue = document.getElementById('meter-value');
const meterGlow = document.getElementById('meter-glow');
const meterContainer = document.getElementById('meter-container');
const meterUnit = document.getElementById('meter-unit');
const messageCard = document.getElementById('message-card');
const messageText = document.getElementById('message-text');
const streakLabel = document.getElementById('streak-label');
const streakValue = document.getElementById('streak-value');
const bestStreakLabel = document.getElementById('best-streak-label');
const bestStreakValue = document.getElementById('best-streak-value');
const historyContainer = document.getElementById('history-container');
const historyLabel = document.getElementById('history-label');
const historyCanvas = document.getElementById('history-canvas');
const historyCtx = historyCanvas.getContext('2d');
const zoneStrip = document.getElementById('zone-strip');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const app = document.getElementById('app');
const appSubtitle = document.getElementById('app-subtitle');
const languageLabel = document.getElementById('language-label');
const languageSelect = document.getElementById('language-select');
const mascotContainer = document.getElementById('mascot-container');

const sliderWhisper = document.getElementById('threshold-whisper');
const sliderBalanced = document.getElementById('threshold-balanced');
const sliderLoud = document.getElementById('threshold-loud');
const valWhisper = document.getElementById('val-whisper');
const valBalanced = document.getElementById('val-balanced');
const valLoud = document.getElementById('val-loud');
const thresholdWhisperLabel = document.getElementById('threshold-whisper-label');
const thresholdBalancedLabel = document.getElementById('threshold-balanced-label');
const thresholdLoudLabel = document.getElementById('threshold-loud-label');
const settingsTitle = document.getElementById('settings-title');

const settingsTrigger = document.getElementById('settings-trigger');
const settingsCard = document.getElementById('settings-card');

const zoneLabelElements = {
  whisper: document.getElementById('zone-label-whisper'),
  balanced: document.getElementById('zone-label-balanced'),
  loud: document.getElementById('zone-label-loud'),
  tooLoud: document.getElementById('zone-label-tooLoud'),
};

let currentLanguage = DEFAULT_LANGUAGE;
let isActive = false;
let currentLevel = 0;
let smoothedLevel = 0;
let currentZone = null;
let previousZone = null;
let streakSeconds = 0;
let bestStreak = 0;
let lastStreakTick = 0;
let messageTimer = 0;
let history = [];
let rollingBuffer = [];
let lastCelebratedMilestone = 0;
let particleSystem = null;
let mascot = null;
let animationId = null;
let isSettingsOpen = false;

function init() {
  particleSystem = new ParticleSystem('particles-canvas');
  mascot = new MascotController();

  setupCanvas(meterCanvas, meterCtx, 300, 300);
  setupCanvas(historyCanvas, historyCtx, 600, 60);
  populateLanguageSelect();

  startBtn.addEventListener('click', toggleListening);
  settingsTrigger.addEventListener('click', handleSettingsTriggerClick);
  document.addEventListener('click', handleDocumentClick);
  document.addEventListener('keydown', handleDocumentKeydown);
  languageSelect.addEventListener('change', handleLanguageChange);
  window.addEventListener('beforeunload', destroyApp);

  loadThresholds();
  loadBestStreak();

  sliderWhisper.addEventListener('input', updateThresholds);
  sliderBalanced.addEventListener('input', updateThresholds);
  sliderLoud.addEventListener('input', updateThresholds);

  currentLanguage = getInitialLanguage();
  languageSelect.value = currentLanguage;
  applyTranslations();
  updateThresholds();

  resetIdleUI({
    mascotMessage: getTranslation(currentLanguage).mascotIdle,
    statusMessage: getTranslation(currentLanguage).statusIdle,
  });

  registerServiceWorker();
}

function setupCanvas(canvas, ctx, width, height) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.scale(dpr, dpr);
}

function populateLanguageSelect() {
  const options = SUPPORTED_LANGUAGES.map(({ code, label }) => {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = label;
    return option;
  });

  languageSelect.replaceChildren(...options);
}

function getInitialLanguage() {
  const storedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  return storedLanguage ? normalizeLanguage(storedLanguage) : detectLanguage();
}

function loadThresholds() {
  const storedThresholds = localStorage.getItem(STORAGE_KEYS.thresholds);
  if (!storedThresholds) return;

  try {
    const parsed = JSON.parse(storedThresholds);
    const whisper = Number(parsed.whisper);
    const balanced = Number(parsed.balanced);
    const loud = Number(parsed.loud);

    if (Number.isFinite(whisper) && Number.isFinite(balanced) && Number.isFinite(loud)) {
      sliderWhisper.value = String(whisper);
      sliderBalanced.value = String(balanced);
      sliderLoud.value = String(loud);
    }
  } catch (error) {
    console.error('Error parsing stored thresholds', error);
  }
}

function loadBestStreak() {
  const storedBest = localStorage.getItem(STORAGE_KEYS.bestStreak);
  if (!storedBest) return;

  bestStreak = parseInt(storedBest, 10) || 0;
  bestStreakValue.textContent = formatTime(bestStreak);
}

function handleLanguageChange(event) {
  currentLanguage = normalizeLanguage(event.target.value);
  localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
  applyTranslations();

  if (isActive && currentZone) {
    const currentMessage = getRandomZoneMessage(currentLanguage, currentZone.id);
    mascot.setMessage(currentMessage);
    messageText.textContent = currentMessage;
    return;
  }

  resetIdleUI({
    mascotMessage: getTranslation(currentLanguage).mascotIdle,
    statusMessage: getTranslation(currentLanguage).statusIdle,
  });
}

function applyTranslations() {
  const translation = getTranslation(currentLanguage);

  html.lang = translation.htmlLang;
  document.title = translation.title;
  metaDescription?.setAttribute('content', translation.description);

  languageLabel.textContent = translation.languageLabel;
  appSubtitle.textContent = translation.appSubtitle;
  settingsTrigger.setAttribute('aria-label', translation.settingsButtonLabel);
  settingsCard.setAttribute('aria-label', translation.settingsPanelLabel);
  settingsTitle.textContent = translation.settingsTitle;
  thresholdWhisperLabel.textContent = translation.thresholdWhisper;
  thresholdBalancedLabel.textContent = translation.thresholdBalanced;
  thresholdLoudLabel.textContent = translation.thresholdLoud;
  meterUnit.textContent = translation.meterUnit;
  historyLabel.textContent = translation.historyLabel;
  streakLabel.textContent = translation.streakLabel;
  bestStreakLabel.textContent = translation.bestStreakLabel;
  errorText.textContent = translation.microphoneError;

  zoneStrip.setAttribute('aria-label', translation.zonesAriaLabel);
  mascotContainer.setAttribute('aria-label', translation.mascotAriaLabel);
  meterContainer.setAttribute('aria-label', translation.meterAriaLabel);
  historyContainer.setAttribute('aria-label', translation.historyAriaLabel);

  Object.entries(zoneLabelElements).forEach(([zoneId, element]) => {
    element.textContent = translation.zoneLabels[zoneId];
  });

  syncStartButton();
  streakValue.textContent = formatTime(streakSeconds);
  bestStreakValue.textContent = formatTime(bestStreak);

  if (!isActive) {
    messageText.textContent = translation.statusIdle;
    mascot.setMessage(translation.mascotIdle);
    drawHistory();
  }
}

function handleSettingsTriggerClick(event) {
  event.stopPropagation();
  setSettingsOpen(!isSettingsOpen);
}

function handleDocumentClick(event) {
  if (!isSettingsOpen) return;
  if (settingsCard.contains(event.target) || settingsTrigger.contains(event.target)) return;
  setSettingsOpen(false);
}

function handleDocumentKeydown(event) {
  if (event.key === 'Escape' && isSettingsOpen) {
    setSettingsOpen(false);
    settingsTrigger.focus();
  }
}

function setSettingsOpen(isOpen) {
  isSettingsOpen = isOpen;
  settingsCard.classList.toggle('show', isOpen);
  settingsTrigger.setAttribute('aria-expanded', String(isOpen));
}

function updateThresholds() {
  const whisperMax = parseInt(sliderWhisper.value, 10);
  let balancedMax = parseInt(sliderBalanced.value, 10);
  let loudMax = parseInt(sliderLoud.value, 10);

  if (balancedMax <= whisperMax) {
    balancedMax = whisperMax + 1;
    sliderBalanced.value = String(balancedMax);
  }

  if (loudMax <= balancedMax) {
    loudMax = balancedMax + 1;
    sliderLoud.value = String(loudMax);
  }

  valWhisper.textContent = String(whisperMax);
  valBalanced.textContent = String(balancedMax);
  valLoud.textContent = String(loudMax);

  setThresholds(whisperMax, balancedMax, loudMax);

  localStorage.setItem(
    STORAGE_KEYS.thresholds,
    JSON.stringify({
      whisper: whisperMax,
      balanced: balancedMax,
      loud: loudMax,
    }),
  );

  if (!isActive) {
    drawMeter(0, '#2979ff');
    drawHistory();
  }
}

async function toggleListening() {
  if (isActive) {
    stopApp();
    return;
  }

  const granted = await startListening();
  if (!granted) {
    errorMessage.style.display = 'block';
    return;
  }

  isActive = true;
  syncStartButton();
  errorMessage.style.display = 'none';
  setSettingsOpen(false);

  streakSeconds = 0;
  currentLevel = 0;
  smoothedLevel = 0;
  lastStreakTick = Date.now();
  lastCelebratedMilestone = 0;
  messageTimer = 0;
  currentZone = null;
  previousZone = null;
  rollingBuffer = [];
  history = [];

  streakValue.textContent = formatTime(0);
  bestStreakValue.textContent = formatTime(bestStreak);
  mascot.setMessage(getTranslation(currentLanguage).mascotListening);
  messageText.textContent = getTranslation(currentLanguage).statusListening;
  messageCard.style.borderLeftColor = '#2979ff';

  loop();
}

function stopApp() {
  stopListening();
  isActive = false;

  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  history = [];
  currentLevel = 0;
  smoothedLevel = 0;
  currentZone = null;
  previousZone = null;
  rollingBuffer = [];
  lastCelebratedMilestone = 0;
  streakSeconds = 0;
  lastStreakTick = 0;
  messageTimer = 0;

  resetIdleUI({
    mascotMessage: getTranslation(currentLanguage).mascotStopped,
    statusMessage: getTranslation(currentLanguage).statusIdle,
  });
}

function resetIdleUI({ mascotMessage, statusMessage }) {
  syncStartButton();
  errorMessage.style.display = 'none';
  meterValue.textContent = '0';
  streakValue.textContent = formatTime(0);
  bestStreakValue.textContent = formatTime(bestStreak);
  messageText.textContent = statusMessage;
  messageCard.style.borderLeftColor = '#2979ff';
  app.dataset.zone = '';
  meterGlow.style.boxShadow = 'none';
  meterContainer.style.setProperty('--zone-color', '#2979ff');
  mascot.setState('idle');
  mascot.setMessage(mascotMessage);
  drawMeter(0, '#2979ff');
  drawHistory();
}

function syncStartButton() {
  const translation = getTranslation(currentLanguage);
  startBtn.setAttribute('aria-pressed', String(isActive));
  btnIcon.textContent = isActive ? '⏹️' : '🎤';
  btnText.textContent = isActive ? translation.stopButton : translation.startButton;
  startBtn.classList.toggle('active', isActive);
}

function loop() {
  if (!isActive) return;

  currentLevel = getLevel();
  rollingBuffer.push(currentLevel);
  if (rollingBuffer.length > ROLLING_BUFFER_SIZE) {
    rollingBuffer.shift();
  }

  const averageLevel =
    rollingBuffer.reduce((sum, value) => sum + value, 0) / Math.max(rollingBuffer.length, 1);

  smoothedLevel += (averageLevel - smoothedLevel) * 0.04;

  const zone = getZone(smoothedLevel);
  previousZone = currentZone;
  currentZone = zone;

  updateZoneUI(zone);

  drawMeter(smoothedLevel, zone.color);
  meterValue.textContent = String(Math.round(smoothedLevel));
  meterGlow.style.boxShadow = `0 0 60px 20px ${zone.bgGlow}`;
  meterContainer.style.setProperty('--zone-color', zone.color);

  mascot.setState(zone.mascotState);

  messageTimer += 1;
  if (messageTimer > 240 || (previousZone && previousZone.id !== zone.id)) {
    messageTimer = 0;
    const message = getRandomZoneMessage(currentLanguage, zone.id);
    mascot.setMessage(message);
    messageText.textContent = message;
    messageCard.style.borderLeftColor = zone.color;
  }

  updateStreak(zone);

  particleSystem.setAmbientColor(`${zone.color}40`);
  drawHistory();
  app.dataset.zone = zone.id;

  animationId = requestAnimationFrame(loop);
}

function updateStreak(zone) {
  const now = Date.now();
  if (now - lastStreakTick < 1000) return;

  lastStreakTick = now;

  if (isIdealZone(smoothedLevel)) {
    streakSeconds += 1;

    if (streakSeconds > bestStreak) {
      bestStreak = streakSeconds;
      bestStreakValue.textContent = formatTime(bestStreak);
      localStorage.setItem(STORAGE_KEYS.bestStreak, String(bestStreak));
    }

    for (const milestone of STREAK_MILESTONES) {
      if (streakSeconds < milestone || lastCelebratedMilestone >= milestone) {
        continue;
      }

      lastCelebratedMilestone = milestone;

      if (!REDUCED_MOTION_QUERY.matches) {
        particleSystem.burst(40, [zone.gradientStart, zone.gradientEnd, '#ffea00', '#ffffff']);
      }

      const streakMessage = getStreakMessage(currentLanguage, milestone);
      mascot.setMessage(streakMessage);
      messageText.textContent = streakMessage;
      break;
    }
  } else if (streakSeconds > 0) {
    streakSeconds = 0;
    lastCelebratedMilestone = 0;
  }

  streakValue.textContent = formatTime(streakSeconds);

  history.push({ level: smoothedLevel, zone });
  if (history.length > HISTORY_LENGTH) {
    history.shift();
  }
}

function drawMeter(level, color) {
  const width = 300;
  const height = 300;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = 124;
  const lineWidth = 12;
  const startAngle = -Math.PI / 2;

  meterCtx.clearRect(0, 0, width, height);

  meterCtx.beginPath();
  meterCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  meterCtx.strokeStyle = 'rgba(255,255,255,0.08)';
  meterCtx.lineWidth = lineWidth;
  meterCtx.lineCap = 'round';
  meterCtx.stroke();

  const endAngle = startAngle + (level / 100) * Math.PI * 2;

  if (level > 0) {
    const gradient = meterCtx.createConicGradient(startAngle, centerX, centerY);
    const zone = getZone(level);
    gradient.addColorStop(0, zone.gradientStart);
    gradient.addColorStop(Math.min(level / 100, 1), zone.gradientEnd);
    gradient.addColorStop(1, `${zone.gradientStart}40`);

    meterCtx.beginPath();
    meterCtx.arc(centerX, centerY, radius, startAngle, endAngle);
    meterCtx.strokeStyle = gradient;
    meterCtx.lineWidth = lineWidth;
    meterCtx.lineCap = 'round';
    meterCtx.stroke();

    meterCtx.beginPath();
    meterCtx.arc(centerX, centerY, radius, startAngle, endAngle);
    meterCtx.strokeStyle = `${color}40`;
    meterCtx.lineWidth = lineWidth + 12;
    meterCtx.lineCap = 'round';
    meterCtx.stroke();

    const dotX = centerX + radius * Math.cos(endAngle);
    const dotY = centerY + radius * Math.sin(endAngle);

    meterCtx.beginPath();
    meterCtx.arc(dotX, dotY, 8, 0, Math.PI * 2);
    meterCtx.fillStyle = color;
    meterCtx.fill();

    meterCtx.beginPath();
    meterCtx.arc(dotX, dotY, 12, 0, Math.PI * 2);
    meterCtx.fillStyle = `${color}30`;
    meterCtx.fill();
  }

  const zones = getZonesInOrder();
  const boundaryZones = [zones[0], zones[1], zones[2]];

  boundaryZones.forEach((zone) => {
    const angle = startAngle + (zone.maxLevel / 100) * Math.PI * 2;
    const innerRadius = radius - lineWidth / 2 - 4;
    const outerRadius = radius + lineWidth / 2 + 4;

    meterCtx.beginPath();
    meterCtx.moveTo(
      centerX + innerRadius * Math.cos(angle),
      centerY + innerRadius * Math.sin(angle),
    );
    meterCtx.lineTo(
      centerX + outerRadius * Math.cos(angle),
      centerY + outerRadius * Math.sin(angle),
    );
    meterCtx.strokeStyle = `${zone.color}60`;
    meterCtx.lineWidth = 2;
    meterCtx.stroke();
  });
}

function drawHistory() {
  const width = 600;
  const height = 60;
  const translation = getTranslation(currentLanguage);

  historyCtx.clearRect(0, 0, width, height);

  if (history.length < 2) {
    historyCtx.fillStyle = 'rgba(255,255,255,0.2)';
    historyCtx.font = '12px Outfit, sans-serif';
    historyCtx.textAlign = 'center';
    historyCtx.fillText(translation.historyPlaceholder, width / 2, height / 2 + 4);
    return;
  }

  const step = width / (HISTORY_LENGTH - 1);
  const zones = getZonesInOrder();

  let previousMaxLevel = 0;
  zones.forEach((zone) => {
    const startY = height - (previousMaxLevel / 100) * height;
    const endY = height - (zone.maxLevel / 100) * height;
    historyCtx.fillStyle = `${zone.color}14`;
    historyCtx.fillRect(0, endY, width, startY - endY);
    previousMaxLevel = zone.maxLevel;
  });

  historyCtx.beginPath();
  const startIndex = Math.max(0, HISTORY_LENGTH - history.length);

  history.forEach((point, index) => {
    const x = (startIndex + index) * step;
    const y = height - (point.level / 100) * height;

    if (index === 0) {
      historyCtx.moveTo(x, y);
      return;
    }

    historyCtx.lineTo(x, y);
  });

  const lineGradient = historyCtx.createLinearGradient(0, height, 0, 0);
  let previousStop = 0;

  zones.forEach((zone) => {
    const stop = Math.min(1, zone.maxLevel / 100);
    lineGradient.addColorStop(previousStop, zone.color);
    lineGradient.addColorStop(stop, zone.color);
    previousStop = stop;
  });

  historyCtx.strokeStyle = lineGradient;
  historyCtx.lineWidth = 2;
  historyCtx.lineJoin = 'round';
  historyCtx.stroke();

  const firstX = startIndex * step;
  const lastX = (startIndex + history.length - 1) * step;

  historyCtx.lineTo(lastX, height);
  historyCtx.lineTo(firstX, height);
  historyCtx.closePath();

  const fillGradient = historyCtx.createLinearGradient(0, height, 0, 0);
  previousStop = 0;

  zones.forEach((zone) => {
    const stop = Math.min(1, zone.maxLevel / 100);
    fillGradient.addColorStop(previousStop, `${zone.color}26`);
    fillGradient.addColorStop(stop, `${zone.color}26`);
    previousStop = stop;
  });

  historyCtx.fillStyle = fillGradient;
  historyCtx.fill();
}

function updateZoneUI(zone) {
  const items = zoneStrip.querySelectorAll('.zone-item');
  items.forEach((item) => {
    const isItemActive = item.dataset.zone === zone.id;
    item.classList.toggle('active', isItemActive);
  });

  document.documentElement.style.setProperty('--zone-color', zone.color);
  document.documentElement.style.setProperty('--zone-color-rgb', zone.colorRgb);
  document.documentElement.style.setProperty('--zone-glow', zone.bgGlow);
}

function formatTime(seconds) {
  return formatDuration(currentLanguage, seconds);
}

function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  window.addEventListener('load', async () => {
    try {
      await navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`);
    } catch (error) {
      console.error('Service worker registration failed', error);
    }
  });
}

function destroyApp() {
  stopListening();
  particleSystem?.destroy();
  mascot?.destroy();
}

init();
