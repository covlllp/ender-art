import constants from 'js/utils/constants';

export function getNoisySpeed() {
  return constants.PARTICLE_SPEED + (Math.random() - 0.5) * constants.PARTICLE_SPEED_NOISE;
}

export function getNoisyLength() {
  return constants.PARTICLE_LENGTH + (Math.random() - 0.5) * constants.PARTICLE_LENGTH_NOISE;
}

export function getNoisyAngles(currentAngle, numAngles) {
  const topBound = currentAngle + 90;
  const bottomBound = currentAngle - 90;
  const angleRange = (topBound - bottomBound) / numAngles;

  const newAngles = [];
  let bottomAngleBound = bottomBound;

  for (let i = 0; i < numAngles; i++) {
    let angle = bottomAngleBound + angleRange / 2;
    angle += (Math.random() - 0.5) * constants.PARTICLE_ANGLE_NOISE;
    newAngles.push(angle % 360);
    bottomAngleBound += angleRange;
  }
  return newAngles;
}
