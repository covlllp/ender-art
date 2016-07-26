import Point from 'js/modules/point';

export const getEndPoint = (startPoint, angle, length) => {
  const y = startPoint.y - Math.sin(angle) * length;
  const x = Math.cos(angle) * length + startPoint.x;
  return new Point(x, y);
};

export const degToRad = (degree) => {
  return degree * Math.PI / 180;
};
