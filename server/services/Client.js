import { httpStatus } from '../config/packages';

import { iLogger, eLogger } from '../config/logger';
import messages from '../utils/messages';
import ClientDAO from '../data/ClientDAO';
import ImageService from './Image';
import { isValidDate } from '../middlewares/validate';

/**
 * @class
 * @description
 * @exports ClientService
 */
export default class ClientService {
    /**
     * @method updateUsername
     * @description
     * @static
     * @param {number} id
     * @param {string} username
     * @returns {object} JSON response
     * @memberof ClientService
     */
    static async updateUsername(id, username) {
        try {
            let user = await ClientDAO.findUsernameById(id);
            if (!user) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.userNotFound,
                    isPublic: true
                };
            }
            user = user.toJSON();
            iLogger.info('USER == ', user);
            if (user.username === username) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.usernameSet,
                    isPublic: true
                };
            }
            const userExist = await ClientDAO.usernameExists(username);
            if (userExist) {
                return {
                    isSuccessful: false,
                    status: httpStatus.CONFLICT,
                    message: messages.usernameInUse,
                    isPublic: true
                };
            }
            await ClientDAO.update(id, { username });
            return { isSuccessful: true, data: { username } };
        } catch (error) {
            eLogger.error('An error occurred while updating username', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method updateAvatar
     * @description
     * @static
     * @param {number} id
     * @param {object} files
     * @returns {object} JSON response
     * @memberof ClientService
     */
    static async updateAvatar(id, files) {
        try {
            if (!files || !files.avatar || files.avatar.mimetype === 'text/plain') {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: 'avatar is required',
                    isPublic: true
                };
            }
            const { avatar } = files;
            if (!(avatar.mimetype === 'image/png' || avatar.mimetype === 'image/jpeg')) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: 'file format not supported',
                    isPublic: true
                };
            }
            let user = await ClientDAO.findPublicIdById(id);
            if (!user) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.userNotFound,
                    isPublic: true
                };
            }
            user = user.toJSON();
            const rsp = await ImageService.uploadImage(avatar, user.publicId, 'avatar');
            await ClientDAO.update(id, { id, avatar: rsp.secure_url });
            return { isSuccessful: true, data: { avatar: rsp.secure_url } };
        } catch (error) {
            eLogger.error('An error occurred while updating avatar', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }

    /**
     * @method updateProfile
     * @description
     * @static
     * @param {number} id
     * @param {object} profile
     * @returns {object} JSON response
     * @memberof ClientService
     */
    static async updateProfile(id, profile) {
        const dbProfile = {};
        if (profile.dateOfBirth) {
            if (!isValidDate(profile.dateOfBirth)) {
                return {
                    isSuccessful: false,
                    status: httpStatus.BAD_REQUEST,
                    message: messages.invalidDOB,
                    isPublic: true
                };
            }
            dbProfile.dateOfBirth = profile.dateOfBirth;
        }
        try {
            const clientExists = await ClientDAO.clientExists(id);
            if (!clientExists) {
                return {
                    isSuccessful: false,
                    status: httpStatus.NOT_FOUND,
                    message: messages.userNotFound,
                    isPublic: true
                };
            }
            if (profile.firstName) dbProfile.firstName = profile.firstName;
            if (profile.lastName) dbProfile.lastName = profile.lastName;
            if (profile.country) dbProfile.country = profile.country;
            if (profile.province) dbProfile.province = profile.province;
            if (profile.postalCode) dbProfile.postalCode = profile.postalCode;
            if (profile.city) dbProfile.city = profile.city;
            if (profile.address) dbProfile.address = profile.address;
            if (profile.height) dbProfile.height = profile.height;
            if (profile.weight) dbProfile.weight = profile.weight;
            if (profile.gender) dbProfile.gender = profile.gender;
            await ClientDAO.update(id, profile);
            return { isSuccessful: true, data: dbProfile };
        } catch (error) {
            eLogger.error('An error occurred while updating profile', error);
            return {
                isSuccessful: false,
                status: httpStatus.INTERNAL_SERVER_ERROR,
                message: error,
                isPublic: true
            };
        }
    }
}
