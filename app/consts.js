export const EVE_IMAGE_SERVER = 'https://image.eveonline.com/Character/';

export function getAvatarUrl(id, size) {
  return `${EVE_IMAGE_SERVER}${id}_${size}.jpg`;
};