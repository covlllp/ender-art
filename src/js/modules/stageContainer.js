import Particle from 'js/modules/particle';
import constants from 'js/utils/constants';
import { getGrowthRate } from 'js/utils/mathUtils';

class StageContainer {
  constructor(renderer) {
    this.stage = new PIXI.Container();
    this.renderer = renderer;
    this.particles = [];
  }

  addToStage(element) {
    this.stage.addChild(element);
  }

  removeFromStage(element) {
    this.stage.removeChild(element);
  }

  addParticle(particle) {
    if (!particle.isInWindow || this.particles.length > constants.PARTICLE_MAX) return;
    this.particles.push(particle);
    this.addToStage(particle.circle);
  }

  tick() {
    const newParticles = [];
    this.particles = this.particles.filter((particle) => {
      particle.nextFrame();

      if (!particle.shouldBeDrawn) {
        this.removeFromStage(particle.circle);
        const childParticles = particle.getChildParticles(getGrowthRate());
        childParticles.forEach((childParticle) => {
          newParticles.push(childParticle);
        });
        return false;
      }
      return true;
    });

    newParticles.forEach((particle) => { this.addParticle(particle); });

    while (this.particles.length < constants.PARTICLE_MIN) {
      this.addParticle(Particle.generateRandomParticle());
    }

    this.renderStage();
  }

  renderStage() {
    this.renderer.render(this.stage);
  }
}

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

export default new StageContainer(renderer);
