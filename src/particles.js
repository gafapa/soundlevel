/**
 * Particle System
 * Canvas-based confetti/particles for celebration effects
 */

class Particle {
  constructor(canvas, color) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 10;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 4;
    this.speedY = -(Math.random() * 6 + 3);
    this.gravity = 0.05;
    this.color = color;
    this.opacity = 1;
    this.decay = Math.random() * 0.015 + 0.005;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = (Math.random() - 0.5) * 10;
    this.shape = Math.random() > 0.5 ? 'circle' : 'rect';
  }

  update() {
    this.x += this.speedX;
    this.speedY += this.gravity;
    this.y += this.speedY;
    this.opacity -= this.decay;
    this.rotation += this.rotationSpeed;
    return this.opacity > 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);

    if (this.shape === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillRect(-this.size, -this.size, this.size * 2, this.size * 1);
    }

    ctx.restore();
  }
}

// Ambient floating particle for background
class AmbientParticle {
  constructor(canvas, color) {
    this.canvas = canvas;
    this.reset(color);
    this.y = Math.random() * canvas.height;
  }

  reset(color) {
    this.x = Math.random() * this.canvas.width;
    this.y = this.canvas.height + 5;
    this.size = Math.random() * 3 + 1;
    this.speedY = -(Math.random() * 0.5 + 0.2);
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.opacity = Math.random() * 0.3 + 0.1;
    this.color = color || 'rgba(255,255,255,0.2)';
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = Math.random() * 0.02 + 0.01;
  }

  update(color) {
    this.wobble += this.wobbleSpeed;
    this.x += this.speedX + Math.sin(this.wobble) * 0.3;
    this.y += this.speedY;

    if (this.y < -10) {
      this.reset(color);
    }

    return true;
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

export class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.ambientParticles = [];
    this.animationId = null;
    this.currentColor = 'rgba(41, 121, 255, 0.4)';

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Create ambient particles
    for (let i = 0; i < 30; i++) {
      this.ambientParticles.push(new AmbientParticle(this.canvas, this.currentColor));
    }

    this.animate();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  /**
   * Burst of confetti particles
   * @param {number} count - Number of particles
   * @param {string[]} colors - Array of colors to use
   */
  burst(count = 30, colors = ['#00e676', '#2979ff', '#ff9100', '#ff1744', '#ffea00']) {
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const p = new Particle(this.canvas, color);
      p.x = this.canvas.width / 2 + (Math.random() - 0.5) * 200;
      p.y = this.canvas.height * 0.4;
      p.speedY = -(Math.random() * 8 + 4);
      p.speedX = (Math.random() - 0.5) * 8;
      this.particles.push(p);
    }
  }

  /**
   * Set ambient particle color based on current zone
   * @param {string} color
   */
  setAmbientColor(color) {
    this.currentColor = color;
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Update & draw ambient particles
    this.ambientParticles.forEach((p) => {
      p.update(this.currentColor);
      p.draw(this.ctx);
    });

    // Update & draw burst particles
    this.particles = this.particles.filter((p) => {
      const alive = p.update();
      if (alive) p.draw(this.ctx);
      return alive;
    });

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}
