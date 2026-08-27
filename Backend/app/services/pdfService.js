const PDFDocument = require('pdfkit');
const path = require('path');

class PDFService {
    generateCertificate(candidateName, assessmentTitle, score, totalMarks, date) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ 
                layout: 'landscape', 
                size: 'A4',
                margin: 0 
            });
            let buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                let pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            const width = doc.page.width;
            const height = doc.page.height;

            // --------------------------------------------------
            // ১. Pass / Fail Status Calculation
            // --------------------------------------------------
            const percentage = (score / totalMarks) * 100;
            const isPassed = percentage >= 50; 
            const statusText = isPassed ? 'PASSED' : 'FAILED';
            const statusBgColor = isPassed ? '#DCFCE7' : '#FEE2E2'; 
            const statusTextColor = isPassed ? '#15803D' : '#B91C1C'; 

            // --------------------------------------------------
            // ২. Background Frame & Outer Border
            // --------------------------------------------------
            doc.rect(0, 0, width, height).fill('#FAFDFB'); // Premium Off-White Background

            // Outer Borders
            doc.rect(20, 20, width - 40, height - 40).lineWidth(2.5).stroke("#1E3A8A");
            doc.rect(26, 26, width - 52, height - 52).lineWidth(1).stroke("#D97706");

            // Corner Triangles
            doc.save();
            doc.polygon([20, 20], [80, 20], [20, 80]).fill("#1E3A8A");
            doc.polygon([width - 20, 20], [width - 80, 20], [width - 20, 80]).fill("#1E3A8A");
            doc.polygon([20, height - 20], [80, height - 20], [20, height - 80]).fill("#1E3A8A");
            doc.polygon([width - 20, height - 20], [width - 80, height - 20], [width - 20, height - 80]).fill("#1E3A8A");
            doc.restore();

            // --------------------------------------------------
            // ৩. Background Watermark Logo
            // --------------------------------------------------
            const logoPath = path.join(__dirname, '../../public/Skill-Checker.png');

            try {
                doc.save();
                const wmWidth = 480;
                const wmX = (width - wmWidth) / 2;
                const wmY = 160;

                doc.opacity(0.12);
                doc.image(logoPath, wmX, wmY, { width: wmWidth });
                doc.restore();
            } catch (err) {
                // Ignore if missing
            }

            // --------------------------------------------------
            // ৪. Header Logo & Certificate Titles (Font Updated)
            // --------------------------------------------------
            doc.y = 45;
            
            // Top Small Header Logo
            try {
                doc.image(logoPath, width / 2 - 22, doc.y, { width: 44 });
                doc.y += 52;
            } catch (err) {
                doc.y += 10;
            }

            // Sub Header: Clean Sans-Serif Tracking
            doc.fontSize(10)
               .font('Helvetica-Bold')
               .fillColor('#B45309')
               .text('SKILL CHECKER OFFICIAL CERTIFICATION', { align: 'center', characterSpacing: 4 });

            doc.moveDown(0.3);

            // Main Title: Bold Classic Serif
            doc.fontSize(26)
               .font('Times-Bold')
               .fillColor('#0F172A')
               .text('CERTIFICATE OF ACHIEVEMENT', { align: 'center', characterSpacing: 2 });

            // Accent Divider Line
            const lineY = doc.y + 6;
            doc.moveTo(width / 2 - 120, lineY)
               .lineTo(width / 2 + 120, lineY)
               .lineWidth(1.5)
               .stroke('#D97706');

            doc.y = lineY + 18;

            // --------------------------------------------------
            // ৫. Candidate Body Content (Font Updated)
            // --------------------------------------------------
            doc.fontSize(12)
               .font('Helvetica-Oblique')
               .fillColor('#64748B')
               .text('This standard credential is proudly presented to', { align: 'center' });

            doc.moveDown(0.5);

            // Candidate Name: Elegant Calligraphic Serif Style
            doc.fontSize(34)
               .font('Times-BoldItalic')
               .fillColor('#1E3A8A')
               .text(candidateName, { align: 'center' });

            doc.moveDown(0.4);

            doc.fontSize(11)
               .font('Helvetica')
               .fillColor('#475569')
               .text('for successfully clearing the professional skill evaluation test for', { align: 'center' });

            doc.moveDown(0.4);
            
            // Assessment Title: Strong Bold Serif
            doc.fontSize(20)
               .font('Times-Bold')
               .fillColor('#0F172A')
               .text(assessmentTitle, { align: 'center' });

            doc.moveDown(0.8);

            // --------------------------------------------------
            // ৬. Status Badge (Font Updated)
            // --------------------------------------------------
            const badgeWidth = 150;
            const badgeHeight = 32;
            const badgeX = (width - badgeWidth) / 2;
            const badgeY = doc.y;

            doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 16)
               .fill(statusBgColor);

            doc.fontSize(11)
               .font('Helvetica-Bold')
               .fillColor(statusTextColor)
               .text(`STATUS: ${statusText}`, badgeX, badgeY + 9, {
                   width: badgeWidth,
                   align: 'center',
                   characterSpacing: 1.5
               });

            // --------------------------------------------------
            // ৭. Footer Block (Font Updated)
            // --------------------------------------------------
            const footerY = height - 105;

            // Left Side: Issue Date
            doc.fontSize(9)
               .font('Helvetica-Bold')
               .fillColor('#64748B')
               .text('ISSUE DATE', 85, footerY, { characterSpacing: 1 });

            doc.fontSize(11)
               .font('Times-Roman')
               .fillColor('#0F172A')
               .text(`${new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 85, footerY + 14);

            doc.moveTo(85, footerY + 32)
               .lineTo(225, footerY + 32)
               .lineWidth(1)
               .stroke('#CBD5E1');

            // Right Side: Signature Block
            doc.fontSize(9)
               .font('Helvetica-Bold')
               .fillColor('#64748B')
               .text('AUTHORIZED SIGNATURE', width - 225, footerY, { characterSpacing: 1 });

            doc.fontSize(12)
               .font('Times-BoldItalic')
               .fillColor('#1E3A8A')
               .text('Skill Checker Authority', width - 225, footerY + 14);

            doc.moveTo(width - 225, footerY + 32)
               .lineTo(width - 85, footerY + 32)
               .lineWidth(1)
               .stroke('#CBD5E1');

            doc.end();
        });
    }
}

module.exports = new PDFService();