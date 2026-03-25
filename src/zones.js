/**
 * Sound zone system.
 * Defines 4 zones with thresholds, colors, emojis, and messages in Spanish.
 */

export const ZONES = {
  whisper: {
    id: 'whisper',
    name: 'Susurro',
    emoji: '🤫',
    minLevel: 0,
    maxLevel: 20,
    color: '#00e676',
    colorRgb: '0, 230, 118',
    gradientStart: '#00e676',
    gradientEnd: '#00c853',
    bgGlow: 'rgba(0, 230, 118, 0.15)',
    mascotState: 'sleeping',
    messages: [
      '¡Silencio absoluto! ¿Estáis ahí? 👻',
      '¡Se podría oír caer un alfiler! 📌',
      '¡Modo ninja activado! 🥷',
      '¡Shhhh! ¡Nivel biblioteca alcanzado! 📚',
      '¡El silencio es oro! 🥇',
      '¡Increíble! ¡Más silenciosos que un gato! 🐱',
      '¡WOW! ¡Zona zen desbloqueada! 🧘',
      '¡Hasta los peces hacen más ruido! 🐠',
    ],
  },
  balanced: {
    id: 'balanced',
    name: 'Equilibrio',
    emoji: '🙂',
    minLevel: 20,
    maxLevel: 45,
    color: '#2979ff',
    colorRgb: '41, 121, 255',
    gradientStart: '#2979ff',
    gradientEnd: '#448aff',
    bgGlow: 'rgba(41, 121, 255, 0.15)',
    mascotState: 'happy',
    messages: [
      '¡Perfecto! ¡Nivel ideal para trabajar! 💪',
      '¡Gran trabajo de equipo! 🤝',
      '¡Así sí! ¡Se puede pensar y trabajar! 🧠',
      '¡Buen volumen! ¡Seguid así! 👍',
      '¡La clase está en su punto! 🎯',
      '¡Nivel de concentración: PRO! 🔥',
      '¡Esto es lo que llamo equilibrio! ⚖️',
      '¡Trabajando como campeones! 🏆',
    ],
  },
  loud: {
    id: 'loud',
    name: '¡Sube!',
    emoji: '😬',
    minLevel: 45,
    maxLevel: 70,
    color: '#ff9100',
    colorRgb: '255, 145, 0',
    gradientStart: '#ff9100',
    gradientEnd: '#ff6d00',
    bgGlow: 'rgba(255, 145, 0, 0.15)',
    mascotState: 'worried',
    messages: [
      '¡Ey! ¡Bajemos un poquito! 📢',
      '¡Se están calentando los motores! 🏎️',
      '¡Cuidado! ¡Los vecinos se van a quejar! 🏘️',
      '¡Vamos a usar voz de interior! 🏠',
      '¡Modo recreo activado... en clase! 😅',
      '¡Houston, tenemos un problema de volumen! 🚀',
      '¡Bajad el volumen o me derrito! 🫠',
      '¡Ojo! ¡El decibelímetro se pone naranja! 🟠',
    ],
  },
  tooLoud: {
    id: 'tooLoud',
    name: '¡Demasiado!',
    emoji: '🔥',
    minLevel: 70,
    maxLevel: 100,
    color: '#ff1744',
    colorRgb: '255, 23, 68',
    gradientStart: '#ff1744',
    gradientEnd: '#d50000',
    bgGlow: 'rgba(255, 23, 68, 0.2)',
    mascotState: 'alarmed',
    messages: [
      '🚨 ¡ALERTA ROJA! ¡Demasiado ruido! 🚨',
      '¡Mis oídos! ¡Esto es un concierto de rock! 🎸',
      '¡STOP! ¡Los cristales van a explotar! 💥',
      '¡3... 2... 1... SILEEENCIO! 🤐',
      '¡Nivel karaoke sin micrófono! 🎤😱',
      '¡Los del piso de arriba están llamando! 📞',
      '¡PELIGRO! ¡Zona roja alcanzada! ⛔',
      '¡Respira hondo y baja el volumen! 🌬️',
    ],
  },
};

const ZONE_ORDER = ['whisper', 'balanced', 'loud', 'tooLoud'];

/**
 * Get the current zone based on sound level.
 * @param {number} level
 * @returns {object}
 */
export function getZone(level) {
  if (level < ZONES.whisper.maxLevel) return ZONES.whisper;
  if (level < ZONES.balanced.maxLevel) return ZONES.balanced;
  if (level < ZONES.loud.maxLevel) return ZONES.loud;
  return ZONES.tooLoud;
}

/**
 * Update thresholds dynamically.
 * @param {number} whisperMax
 * @param {number} balancedMax
 * @param {number} loudMax
 */
export function setThresholds(whisperMax, balancedMax, loudMax) {
  ZONES.whisper.maxLevel = whisperMax;
  ZONES.balanced.minLevel = whisperMax;
  ZONES.balanced.maxLevel = balancedMax;
  ZONES.loud.minLevel = balancedMax;
  ZONES.loud.maxLevel = loudMax;
  ZONES.tooLoud.minLevel = loudMax;
}

/**
 * Get a random message from a zone.
 * @param {object} zone
 * @returns {string}
 */
export function getRandomMessage(zone) {
  const { messages } = zone;
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Check if the level is in an ideal zone.
 * @param {number} level
 * @returns {boolean}
 */
export function isIdealZone(level) {
  const zone = getZone(level);
  return zone.id === 'whisper' || zone.id === 'balanced';
}

/**
 * Get all zones in display order.
 * @returns {object[]}
 */
export function getZonesInOrder() {
  return ZONE_ORDER.map((id) => ZONES[id]);
}
