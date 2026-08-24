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

// .env ফাইল থেকে API Key রিড করা হচ্ছে
const resend = new Resend(process.env.RESEND_API_KEY);

class EmailService {
    async sendAssessmentInvite(candidateEmail, assessmentTitle, testLink) {
        try {
            const data = await resend.emails.send({
                from: 'Assessment Portal <onboarding@resend.dev>',
                to: [candidateEmail],
                subject: `Invitation: Assessment for ${assessmentTitle}`,
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 20px;">
                        <h2>You're Invited to Take an Assessment!</h2>
                        <p>Screening test: <strong>${assessmentTitle}</strong></p>
                        <a href="${testLink}" style="padding: 10px 20px; background-color: #1e3a8a; color: white; text-decoration: none; border-radius: 5px;">Start Assessment</a>
                    </div>
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