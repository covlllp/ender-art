import Point from 'js/modules/point';

import { getEndPoint } from 'js/utils/mathUtils';
import { getNoisySpeed, getNoisyLength, getNoisyAngles } from 'js/utils/lineUtils';
import { getNoisyColor } from 'js/utils/colorUtils';
import constants from 'js/utils/constants';

class Line {
  constructor(startPoint, angle, length, color, speed) {
    this.startPoint = startPoint;
    this.targetPoint = getEndPoint(startPoint, angle, length);
    this.angle = angle;
    this.length = length;
    this.color = color;
    this.speed = speed;

    this.percentage = 0;
    this.isGrowing = true;
    this.hasHadChildren = false;

    this.lineGraphic = new PIXI.Graphics();
    this.circleGraphic = new PIXI.Graphics();
    this.drawCircle(startPoint);
  }

  get shouldBeDrawn() {
    return this.isGrowing || this.percentage >= 0;
  }

  get isInWindow() {
    const { targetPoint } = this;
    return (
      targetPoint.x > 0 &&
      targetPoint.y > 0 &&
      targetPoint.x < window.innerWidth &&
      targetPoint.y < window.innerHeight
    );
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

  getLineEndPoints() {
    let startPoint;
    let endPoint;
    if (this.isGrowing) {
      startPoint = this.startPoint;
      endPoint = getEndPoint(
        this.startPoint,
        this.angle,
        this.length * this.percentage
      );
    } else {
      startPoint = getEndPoint(
        this.startPoint,
        this.angle,
        this.length * (1 - this.percentage)
      );
      endPoint = this.targetPoint;
    }

    return { startPoint, endPoint };
  }

  nextFrame() {
    this.percentage += this.isGrowing ? this.speed : -this.speed;

    if (this.percentage >= 1 && this.isGrowing) {
      this.isGrowing = false;
    }

    const { startPoint, endPoint } = this.getLineEndPoints();

    this.drawLine(startPoint, endPoint);
    if (this.isGrowing) this.drawCircle(endPoint);
  }

  getChildLines(numChildren) {
    this.hasHadChildren = true;
    const newAngles = getNoisyAngles(this.angle, numChildren);
    return newAngles.map((angle) => (
      new Line(this.targetPoint, angle, getNoisyLength(), getNoisyColor(), getNoisySpeed())
    ));
  }

  static generateRandomLine() {
    const randomPoint = new Point(
      Math.random() * window.innerWidth,
      Math.random() * window.innerHeight
    );
    const randomAngle = Math.random() * 360;
    return new Line(randomPoint, randomAngle, getNoisyLength(), getNoisyColor(), getNoisySpeed());
  }

}

export default Line;
