import sgMail from '@sendgrid/mail';
import { mail, mailGenerator } from '../utils/emailFormat';
import messages from '../utils/messages';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * @class
 * @description
 * @exports EmailService
 */
export default class EmailService {
    /**
     * @method sendMail
     * @description Send email to a recipient
     * @static
     * @param {String} emailObj
     * @param {Object} secondAction
     * @returns {object} JSON response
     */
    static async sendMail(emailObj, secondAction = undefined) {
        const {
            name, email, subject, intro, action
        } = emailObj;
        const emailBody = mail(name, intro, action, secondAction);
        const emailTemplate = await mailGenerator.generate(emailBody);
        const msg = {
            to: email,
            from: 'no-reply@altrufit.com',
            subject,
            html: emailTemplate
        };
        await sgMail.send(msg);
    }

    /**
     * @method sendEmailVerificationLink
     * @description Check if key is valid
     * @static
     * @param {object} name
     * @param {object} email
     * @param {object} token
     * @param {object} host
     * @param {object} linkType
     * @returns {boolean} Boolean response
     * @memberof Helper
     */
    static sendEmailVerificationLink(name, email, token, host) {
        const link = `http://${host}/auth/email_verification/${token}`;
        const action = {
            instructions: 'Please click the button below to verify your email address',
            text: 'Verify',
            link
        };
        const emailObj = {
            name,
            email,
            subject: 'Email Verification',
            intro: messages.emailIntro,
            action
        };
        return EmailService.sendMail(emailObj);
    }

    /**
    * @method sendAMail
    * @description Send email to a recipient
    * @static
    * @param {String} recipient - Recipient name
    * @param {String} subject - Email subject
    * @param {String} html - Email template
    * @returns {object} JSON response
    */
    static sendAMail(recipient, subject, html) {
        const msg = {
            to: recipient,
            from: 'Altrufit <no-reply@altrufit.com>',
            subject,
            html
        };
        return sgMail.send(msg);
    }
}
