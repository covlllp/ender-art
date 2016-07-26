import Point from 'js/modules/point';

import * as MathUtils from 'js/utils/mathUtils';
import constants from 'js/utils/constants';

class Line {
  constructor(startPoint, angle, length, color) {
    this.startPoint = startPoint;
    this.angle = angle;
    this.length = length;
    this.color = color;

    this.percentage = 0;
    this.isGrowing = true;

    this.lineGraphic = new PIXI.Graphics();
    this.circleGraphic = new PIXI.Graphics();
    this.drawCircle(startPoint);
  }

  get shouldBeDrawn() {
    return this.isGrowing || this.percentage;
  }

  drawLine(startPoint, endPoint) {
    this.lineGraphic.clear();
    this.lineGraphic.lineStyle(constants.LINE_WIDTH, constants.LINE_COLOR);
    this.lineGraphic.moveTo(startPoint.x, startPoint.y);
    this.lineGraphic.lineTo(endPoint.x, endPoint.y);
  }

  drawCircle(point) {
    this.circleGraphic.clear();
    this.circleGraphic.beginFill(this.color);
    this.circleGraphic.drawCircle(point.x, point.y, constants.CIRCLE_RADIUS);
  }

  removeLine() {
    if (this.lineGraphic) {
      this.lineGraphic.destroy();
      delete this.lineGraphic;
    }
  }

  removeCircle() {
    if (this.circleGraphic) {
      this.circleGraphic.destroy();
      delete this.circleGraphic;
    }
  }

  cleanUpLine() {
    this.removeLine();
    this.removeCircle();
  }

  nextFrame() {
    if (this.isGrowing) {
      this.percentage += 0.1;
    } else {
      this.percentage -= 0.1;
    }

    if (this.percentage >= 1 && this.isGrowing) {
      this.isGrowing = false;
    }
    let startPoint, endPoint;
    if (this.isGrowing) {
      startPoint = this.startPoint;
      endPoint = MathUtils.getEndPoint(
        this.startPoint,
        this.angle,
        this.length * this.percentage
      )
    } else {
      startPoint = MathUtils.getEndPoint(
        this.startPoint,
        this.angle,
        this.length * (1 - this.percentage)
      )
      endPoint = MathUtils.getEndPoint(
        this.startPoint,
        this.angle,
        this.length
      )
    }

    this.drawLine(startPoint, endPoint);
    if (this.isGrowing) this.drawCircle(endPoint);
  }
}

export default Line;
