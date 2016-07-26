import stageContainer from 'js/modules/stageContainer';
import Line from 'js/modules/line';
import Point from 'js/modules/point';

import { degToRad } from 'js/utils/mathUtils';

const graphics = new PIXI.Graphics();

stageContainer.addLine(new Line(new Point(100, 10), degToRad(-45), 300, 3093151));

animate();

function animate() {
  requestAnimationFrame(animate);
  stageContainer.tick();
}
