export const EVE_IMAGE_SERVER = 'https://image.eveonline.com/';

export const AvatarType = {
  Character: 'Character',
  Corporation: 'Corporation',
  Alliance: 'Alliance',
  Inventory: 'Type',
  Ship: 'Render'
};

const AvatarExtension = {
  Character: 'jpg',
  Corporation: 'png',
  Alliance: 'png',
  Type: 'png',
  Render: 'png'
}

export function getAvatarUrl(id, size, type) {
  return `${EVE_IMAGE_SERVER}${type}/${id}_${size}.${AvatarExtension[type]}`;
}