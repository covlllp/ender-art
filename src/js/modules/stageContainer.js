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
    this.lines.push(line);
    this.addToStage(line.lineGraphic);
    this.addToStage(line.circleGraphic);
  }

  tick() {
    this.lines.forEach((line) => {
      if (!line.isGrowing) {
        this.removeFromStage(line.circleGraphic);
        line.removeCircle();
      }
      line.nextFrame();
    });
    this.renderStage();
  }

  renderStage() {
    this.renderer.render(this.stage);
  }
}

const renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

export default new StageContainer(renderer);
