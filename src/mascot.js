/**
 * Mascot Controller
 * Manages the mascot character's expressions and animations
 */

const MASCOT_STATES = {
  sleeping: {
    eyeClass: 'sleeping',
    mouthClass: 'sleeping',
    bodyClass: 'float',
    earClass: '',
  },
  happy: {
    eyeClass: 'happy',
    mouthClass: 'smile',
    bodyClass: 'bounce',
    earClass: 'wiggle',
  },
  worried: {
    eyeClass: 'worried',
    mouthClass: 'worried',
    bodyClass: 'shake-soft',
    earClass: 'flat',
  },
  alarmed: {
    eyeClass: 'alarmed',
    mouthClass: 'alarmed',
    bodyClass: 'shake-hard',
    earClass: 'flat',
  },
  idle: {
    eyeClass: '',
    mouthClass: '',
    bodyClass: 'float',
    earClass: '',
  },
};

export class MascotController {
  constructor() {
    this.mascot = document.getElementById('mascot');
    this.eyeLeft = document.getElementById('eye-left');
    this.eyeRight = document.getElementById('eye-right');
    this.mouth = document.getElementById('mascot-mouth');
    this.speech = document.getElementById('mascot-speech');
    this.messageEl = document.getElementById('mascot-message');
    this.container = document.getElementById('mascot-container');
    this.currentState = 'idle';
    this.blinkInterval = null;

    this.startBlinking();
  }

  /**
   * Set mascot state
   * @param {string} state - One of: sleeping, happy, worried, alarmed, idle
   */
  setState(state) {
    if (this.currentState === state) return;
    this.currentState = state;

    const config = MASCOT_STATES[state] || MASCOT_STATES.idle;
    const body = this.mascot.querySelector('.mascot-body');
    const ears = this.mascot.querySelectorAll('.mascot-ear');

    // Reset all classes
    body.className = 'mascot-body';
    this.eyeLeft.className = 'mascot-eye left';
    this.eyeRight.className = 'mascot-eye right';
    this.mouth.className = 'mascot-mouth';
    ears.forEach((ear) => {
      const side = ear.classList.contains('left') ? 'left' : 'right';
      ear.className = `mascot-ear ${side}`;
    });

    // Apply new state classes
    if (config.bodyClass) body.classList.add(config.bodyClass);
    if (config.eyeClass) {
      this.eyeLeft.classList.add(config.eyeClass);
      this.eyeRight.classList.add(config.eyeClass);
    }
    if (config.mouthClass) this.mouth.classList.add(config.mouthClass);
    if (config.earClass) {
      ears.forEach((ear) => ear.classList.add(config.earClass));
    }

    // Add zone-based color to container
    this.container.dataset.state = state;
  }

  /**
   * Set the speech bubble message
   * @param {string} message
   */
  setMessage(message) {
    if (this.messageEl.textContent === message) return;
    
    // Animate out
    this.speech.classList.add('updating');
    
    setTimeout(() => {
      this.messageEl.textContent = message;
      this.speech.classList.remove('updating');
      this.speech.classList.add('pop-in');
      setTimeout(() => this.speech.classList.remove('pop-in'), 300);
    }, 150);
  }

  /**
   * Start random blinking
   */
  startBlinking() {
    const blink = () => {
      if (this.currentState !== 'sleeping' && this.currentState !== 'alarmed') {
        this.eyeLeft.classList.add('blink');
        this.eyeRight.classList.add('blink');
        setTimeout(() => {
          this.eyeLeft.classList.remove('blink');
          this.eyeRight.classList.remove('blink');
        }, 150);
      }
      this.blinkInterval = setTimeout(blink, Math.random() * 3000 + 2000);
    };
    this.blinkInterval = setTimeout(blink, 2000);
  }

  destroy() {
    if (this.blinkInterval) clearTimeout(this.blinkInterval);
  }
}
