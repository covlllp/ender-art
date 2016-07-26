import globals from 'js/globals';
import constants from 'js/utils/constants';
import stageContainer from 'js/modules/stageContainer';

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

animate();
