/**
 * @function successResponse
 * @description Response
 * @param {object} res - Response object
 * @param {number} code - HTTP status code
 * @param {string} message - Status message e.g 'success'
 * @param {object} data - Response object
 * @returns {object} Response object
 */
const successResponse = (res, code, message, data = undefined) => res.status(code).send({
    status: 'success',
    message,
    data
});

export default successResponse;
