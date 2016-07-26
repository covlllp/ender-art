import Line from 'js/modules/line';
import constants from 'js/utils/constants';
import { getGrowthRate } from 'js/utils/mathUtils';

class StageContainer {
  constructor(renderer) {
    this.stage = new PIXI.Container();
    this.renderer = renderer;
    this.lines = [];
  }

  addToStage(element) {
    this.stage.addChild(element);
  }

  removeFromStage(element) {
    this.stage.removeChild(element);
  }

  addLine(line) {
    if (!line.isInWindow || this.lines.length > constants.LINE_MAX) return;
    this.lines.push(line);
    this.addToStage(line.lineGraphic);
    this.addToStage(line.circleGraphic);
  }

  tick() {
    const newLines = [];
    this.lines = this.lines.filter((line) => {
      line.nextFrame();

      if (!line.isGrowing) {
        this.removeFromStage(line.circleGraphic);
        line.removeCircle();
        if (!line.hasHadChildren) {
          const childLines = line.getChildLines(getGrowthRate());
          childLines.forEach((childLine) => {
            newLines.push(childLine);
          });
        }
      }
      if (!line.shouldBeDrawn) {
        this.removeFromStage(line.lineGraphic);
        line.cleanUpLine();
        return false;
      }
      return true;
    });

    newLines.forEach((line) => { this.addLine(line); });

    while (this.lines.length < constants.LINE_MIN) {
      this.addLine(Line.generateRandomLine());
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
