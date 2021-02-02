import cloudinary from '../config/cloudinary';

/**
 * @class
 * @description
 * @exports ImageService
 */
export default class ImageService {
    /**
     * @method uploadImage
     * @description Upload avatar to cloudinary
     * @static
     * @param {object} image - Image being uploaded
     * @param {string} publicId
     * @param {object} type - Image category being uploaded
     * @param {boolean} pog - could be part of a group or not
     * @returns {object} JSON response
     */
    static uploadImage(image, publicId, type, pog = false) {
        return cloudinary.v2.uploader.upload(
            image.tempFilePath, {
                width: type === 'avatar' ? '200' : undefined,
                crop: 'limit',
                folder: `${type}/${pog ? publicId : ''}`,
                public_id: pog ? `${image.name}${publicId}` : publicId,
                invalidate: true
            }
        );
    }
}
