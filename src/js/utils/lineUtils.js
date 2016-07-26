import constants from 'js/utils/constants';

export function getNoisySpeed() {
  return constants.LINE_SPEED + (Math.random() - 0.5) * constants.LINE_SPEED_NOISE;
}

export function getNoisyLength() {
  return constants.LINE_LENGTH + (Math.random() - 0.5) * constants.LINE_LENGTH_NOISE;
}

export function getNoisyAngles(currentAngle, numAngles) {
  const topBound = currentAngle + 90;
  const bottomBound = currentAngle - 90;
  const angleRange = (topBound - bottomBound) / numAngles;

  const newAngles = [];
  let bottomAngleBound = bottomBound;

  for (let i = 0; i < numAngles; i++) {
    let angle = bottomAngleBound + angleRange / 2;
    angle += (Math.random() - 0.5) * constants.LINE_ANGLE_NOISE;
    newAngles.push(angle % 360);
    bottomAngleBound += angleRange;
  }
  return newAngles;
}
