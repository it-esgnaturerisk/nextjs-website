import * as turf from '@turf/turf';
import { CircleOptions } from '@turf/turf';

// eslint-disable-next-line import/prefer-default-export
export function createCircle(lng: number, lat: number, radiusInKm: number) {
  const center = [lng, lat];
  const options: CircleOptions = { steps: 64, units: 'kilometers' };

  const circle = turf.circle(center, radiusInKm, options);

  return circle;
}
