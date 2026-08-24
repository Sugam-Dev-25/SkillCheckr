const nodemailer = require('nodemailer');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 465, // Port 465 (SSL) লাইভ সার্ভারে বেশি স্টেবল
            secure: true, // Port 465 এর জন্য true
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            family: 4, // 🔥 Vercel/Render-এ IPv6 Connection Error (ENETUNREACH) সমাধান করার জন্য
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendAssessmentInvite(candidateEmail, assessmentTitle, testLink) {
        const mailOptions = {
            from: `"Assessment Portal" <${process.env.EMAIL_USER}>`,
            to: candidateEmail,
            subject: `Invitation: Assessment for ${assessmentTitle}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                </head>
                <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; -webkit-font-smoothing: antialiased;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 40px 10px;">
                        <tr>
                            <td align="center">
                                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width: 560px; background-color: #ffffff; border-radius: 20px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">
                                    
                                    <!-- Header Banner -->
                                    <tr>
                                        <td style="background-color: #0f172a; padding: 32px 30px; text-align: left;">
                                            <span style="display: inline-block; background-color: #1e293b; border: 1px solid #334155; color: #22d3ee; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; padding: 4px 12px; border-radius: 20px; margin-bottom: 12px;">
                                                Official Invitation
                                            </span>
                                            <h1 style="color: #ffffff; font-size: 22px; font-weight: 900; margin: 0; tracking-tight: -0.5px;">
                                                You're Invited to Take an Assessment
                                            </h1>
                                        </td>
                                    </tr>

                                    <!-- Body Content -->
                                    <tr>
                                        <td style="padding: 32px 30px; text-align: left;">
                                            <p style="color: #475569; font-size: 14px; line-height: 1.6; margin: 0 0 20px 0;">
                                                Hello,
                                            </p>
                                            <p style="color: #334155; font-size: 14px; line-height: 1.6; margin: 0 0 24px 0;">
                                                You have been invited to complete a skill evaluation test. Please find the details of your assigned assessment below:
                                            </p>

                                            <!-- Assessment Details Card -->
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; border-radius: 14px; border: 1px solid #e2e8f0; margin-bottom: 28px;">
                                                <tr>
                                                    <td style="padding: 18px 20px;">
                                                        <span style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; color: #64748b; display: block; margin-bottom: 4px;">
                                                            Assessment Title
                                                        </span>
                                                        <strong style="color: #0f172a; font-size: 16px; font-weight: 800; display: block;">
                                                            ${assessmentTitle}
                                                        </strong>
                                                    </td>
                                                </tr>
                                            </table>

                                            <p style="color: #475569; font-size: 13px; line-height: 1.6; margin: 0 0 28px 0;">
                                                Click the button below to start your test. Make sure you have a stable internet connection before beginning.
                                            </p>

                                            <!-- CTA Button -->
                                            <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td align="center">
                                                        <a href="${testLink}" target="_blank" style="display: inline-block; width: 85%; padding: 14px 28px; background-color: #1e3a8a; color: #ffffff; text-decoration: none; font-weight: 800; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; border-radius: 12px; text-align: center; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);">
                                                            Start Assessment Now →
                                                        </a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    <!-- Footer -->
                                    <tr>
                                        <td style="background-color: #f8fafc; padding: 20px 30px; border-top: 1px solid #e2e8f0; text-align: center;">
                                            <p style="color: #94a3b8; font-size: 12px; line-height: 1.5; margin: 0;">
                                                If you didn't expect this invitation, you can safely ignore this email.
                                            </p>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            `
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();