/**
 * Sound zone system.
 * Stores threshold boundaries and visual metadata.
 */

export const ZONES = {
  whisper: {
    id: 'whisper',
    minLevel: 0,
    maxLevel: 20,
    color: '#00e676',
    colorRgb: '0, 230, 118',
    gradientStart: '#00e676',
    gradientEnd: '#00c853',
    bgGlow: 'rgba(0, 230, 118, 0.15)',
    mascotState: 'sleeping',
  },
  balanced: {
    id: 'balanced',
    minLevel: 20,
    maxLevel: 45,
    color: '#2979ff',
    colorRgb: '41, 121, 255',
    gradientStart: '#2979ff',
    gradientEnd: '#448aff',
    bgGlow: 'rgba(41, 121, 255, 0.15)',
    mascotState: 'happy',
  },
  loud: {
    id: 'loud',
    minLevel: 45,
    maxLevel: 70,
    color: '#ff9100',
    colorRgb: '255, 145, 0',
    gradientStart: '#ff9100',
    gradientEnd: '#ff6d00',
    bgGlow: 'rgba(255, 145, 0, 0.15)',
    mascotState: 'worried',
  },
  tooLoud: {
    id: 'tooLoud',
    minLevel: 70,
    maxLevel: 100,
    color: '#ff1744',
    colorRgb: '255, 23, 68',
    gradientStart: '#ff1744',
    gradientEnd: '#d50000',
    bgGlow: 'rgba(255, 23, 68, 0.2)',
    mascotState: 'alarmed',
  },
};

const ZONE_ORDER = ['whisper', 'balanced', 'loud', 'tooLoud'];

export function getZone(level) {
  if (level < ZONES.whisper.maxLevel) return ZONES.whisper;
  if (level < ZONES.balanced.maxLevel) return ZONES.balanced;
  if (level < ZONES.loud.maxLevel) return ZONES.loud;
  return ZONES.tooLoud;
}

export function setThresholds(whisperMax, balancedMax, loudMax) {
  ZONES.whisper.maxLevel = whisperMax;
  ZONES.balanced.minLevel = whisperMax;
  ZONES.balanced.maxLevel = balancedMax;
  ZONES.loud.minLevel = balancedMax;
  ZONES.loud.maxLevel = loudMax;
  ZONES.tooLoud.minLevel = loudMax;
}

export function isIdealZone(level) {
  const zone = getZone(level);
  return zone.id === 'whisper' || zone.id === 'balanced';
}

export function getZonesInOrder() {
  return ZONE_ORDER.map((id) => ZONES[id]);
}
