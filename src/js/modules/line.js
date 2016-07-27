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

    const texture = PIXI.Texture.fromImage('src/assets/circle.png');
    const circle = new PIXI.Sprite(texture);
    circle.width = circle.height = constants.CIRCLE_RADIUS * 2;
    circle.tint = color;
    circle.alpha = 0.8;
    circle.anchor.x = circle.anchor.y = 0.5;
    this.circle = circle;

    this.moveCircle(startPoint);
  }

  get shouldBeDrawn() {
    return this.percentage < 1;
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

  moveCircle(point) {
    this.circle.position.x = point.x;
    this.circle.position.y = point.y;
  }

  getCurrentPosition() {
    return getEndPoint(
      this.startPoint,
      this.angle,
      this.length * this.percentage
    );
  }

  nextFrame() {
    this.percentage += this.speed;
    this.moveCircle(this.getCurrentPosition());
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
