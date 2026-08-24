// const nodemailer = require('nodemailer');

// class EmailService {
//     constructor() {
//         this.transporter = nodemailer.createTransport({
//             host: process.env.EMAIL_HOST || 'smtp.gmail.com',
//             port: process.env.EMAIL_PORT || 587,
//             secure: false,
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS
//             }
//         });
//     }

//     async sendAssessmentInvite(candidateEmail, assessmentTitle, testLink) {
//         const mailOptions = {
//             from: `"Assessment Portal" <${process.env.EMAIL_USER}>`,
//             to: candidateEmail,
//             subject: `Invitation: Assessment for ${assessmentTitle}`,
//             html: `
//                 <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
//                     <h2 style="color: #4F46E5;">You're Invited to Take an Assessment!</h2>
//                     <p>You have been invited to complete the following screening test: <strong>${assessmentTitle}</strong>.</p>
//                     <p>Click the button below to start your exam when you are ready:</p>
//                     <a href="${testLink}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 5px; margin: 15px 0;">Start Assessment</a>
//                     <p style="color: #888; font-size: 12px;">If you didn't request this, please ignore this email.</p>
//                 </div>
//             `
//         };

//         return await this.transporter.sendMail(mailOptions);
//     }
// }

// module.exports = new EmailService();

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
    async sendAssessmentInvite(candidateEmail, assessmentTitle, testLink) {
        try {
            const data = await resend.emails.send({
                from: 'Assessment Portal <onboarding@resend.dev>',
                to: [candidateEmail],
                subject: `Invitation: Assessment for ${assessmentTitle}`,
                html: `
                    <!DOCTYPE html>
                    <html>
                    <head><meta charset="utf-8"></head>
                    <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff;">
                        <div style="max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; padding: 24px; border-radius: 8px;">
                            <h2 style="color: #0f172a; margin-top: 0;">You're Invited to Take an Assessment!</h2>
                            <p style="color: #334155; font-size: 15px;">Screening test: <strong>${assessmentTitle}</strong></p>
                            
                            <!-- Clickable Link Table Structure -->
                            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin-top: 20px; margin-bottom: 20px;">
                                <tr>
                                    <td align="center" style="border-radius: 6px; background-color: #1e3a8a;">
                                        <a href="${testLink}" target="_blank" rel="noopener noreferrer" style="font-size: 14px; font-weight: bold; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 6px; border: 1px solid #1e3a8a; display: inline-block;">
                                            Start Assessment
                                        </a>
                                    </td>
                                </tr>
                            </table>

                            <p style="color: #64748b; font-size: 13px;">If the button doesn't work, copy and paste this link into your browser:</p>
                            <p style="font-size: 12px; word-break: break-all; color: #2563eb;">${testLink}</p>
                        </div>
                    </body>
                    </html>
                `
            });
            return data;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();