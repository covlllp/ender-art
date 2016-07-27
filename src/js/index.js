import globals from 'js/globals';
import constants from 'js/utils/constants';
import StageContainer from 'js/modules/stageContainer';
import $ from 'jquery';

const renderer = PIXI.autoDetectRenderer($(window).width(), $(window).height());
const stageContainer = new StageContainer(renderer);
document.body.appendChild(renderer.view);

function animate() {
  requestAnimationFrame(animate);
  globals.colorStep++ % constants.COLOR_STEPS;
  globals.promiscuityLevel += globals.isGrowing ? constants.GROWTH_RATE : - constants.GROWTH_RATE;
  if (globals.isGrowing && globals.promiscuityLevel >= constants.PROMISCUITY_MAX) {
    globals.isGrowing = false;
  } else if (!globals.isGrowing && globals.promiscuityLevel < 0) {
    globals.isGrowing = true;
  }
  stageContainer.tick();
}

function resize() {
  const width = $(window).width() - 5;
  const height = $(window).height() - 5;
  renderer.resize(width, height);
}


resize();
$(window).resize(resize);
animate();
