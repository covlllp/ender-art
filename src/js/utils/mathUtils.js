import Point from 'js/modules/point';
import constants from 'js/utils/constants';
import globals from 'js/globals';

export const degToRad = (degree) => (degree * Math.PI / 180);

export const getEndPoint = (startPoint, angle, length) => {
  const angleRads = degToRad(angle);
  const y = startPoint.y - Math.sin(angleRads) * length;
  const x = Math.cos(angleRads) * length + startPoint.x;
  return new Point(x, y);
};

export function getGrowthRate() {
  return Math.round(globals.promiscuityLevel + (Math.random() - 0.5) * constants.GROWTH_NOISE);
}
