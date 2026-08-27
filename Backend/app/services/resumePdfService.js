const PDFDocument = require('pdfkit');

class CvPdfService {
    generateCvPdf(data) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ size: 'A4', margin: 40 });
            let buffers = [];

            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => resolve(Buffer.concat(buffers)));

            const width = doc.page.width;
            const height = doc.page.height;
            const contentWidth = width - 80;

            // --- Professional Color Palette ---
            const BG_COLOR = '#ededed';        // 👈 আপনার পছন্দমতো Background Color দিন (e.g. #F8FAFC, #F3F4F6)
            const PRIMARY_COLOR = '#02234C';
            const ACCENT_COLOR = '#1E40AF';
            const TEXT_MAIN = '#000000';      // Slate Gray for Paragraphs
            const TEXT_DARK = '#051f5e';      // Dark Navy for Titles
            const TEXT_MUTED = '#000000';     // Medium Slate for metadata

            // --- Background Color Helper ---
            const drawBackground = () => {
                doc.save();
                doc.rect(0, 0, width, height).fill(BG_COLOR);
                doc.restore();
            };

            // ১. প্রথম পেজের ব্যাকগ্রাউন্ড কালার সেট
            drawBackground();

            // ২. নতুন পেজ যুক্ত হলে অটোমেটিক ব্যাকগ্রাউন্ড কালার হওয়া
            doc.on('pageAdded', () => {
                drawBackground();
            });

            // --- Modern Sans-Serif Fonts ---
            const FONT_REGULAR = 'Helvetica';
            const FONT_BOLD = 'Helvetica-Bold';

            // --- Header: Personal Info ---
            let currentY = 40;

            doc.fontSize(24)
               .font(FONT_BOLD)
               .fillColor(PRIMARY_COLOR)
               .text(data.fullName ? data.fullName.toUpperCase() : '', 40, currentY, { 
                   align: 'center', 
                   letterSpacing: 1.5 
               });

            if (data.jobTitle) {
                doc.moveDown(0.3);
                doc.fontSize(11)
                   .font(FONT_BOLD)
                   .fillColor(ACCENT_COLOR)
                   .text(data.jobTitle.toUpperCase(), { align: 'center', letterSpacing: 1 });
            }

            doc.moveDown(0.8);

            // --- Fully Fixed Contact Section Layout ---
            const contactY = doc.y;
            const colGap = 20;
            const colWidth = (contentWidth - colGap) / 2;
            const leftX = 40;
            const rightX = leftX + colWidth + colGap;

            doc.fontSize(12)
               .font(FONT_REGULAR)
               .fillColor(TEXT_MUTED);

            // Left Column Processing (Email, Phone, Location)
            let leftY = contactY;
            if (data.email) {
                const str = `Email: ${data.email}`;
                doc.text(str, leftX, leftY, { width: colWidth, align: 'left' });
                leftY += doc.heightOfString(str, { width: colWidth }) + 4;
            }
            if (data.phone) {
                const str = `Phone: ${data.phone}`;
                doc.text(str, leftX, leftY, { width: colWidth, align: 'left' });
                leftY += doc.heightOfString(str, { width: colWidth }) + 4;
            }
            if (data.address) {
                const str = `Location: ${data.address}`;
                doc.text(str, leftX, leftY, { width: colWidth, align: 'left' });
                leftY += doc.heightOfString(str, { width: colWidth }) + 4;
            }

            // Right Column Processing (Portfolio, LinkedIn, GitHub)
            let rightY = contactY;
            if (data.website) {
                const str = `Portfolio: ${data.website}`;
                doc.text(str, rightX, rightY, { width: colWidth, align: 'left', link: data.website });
                rightY += doc.heightOfString(str, { width: colWidth }) + 4;
            }
            if (data.linkedin) {
                const str = `LinkedIn: ${data.linkedin}`;
                doc.text(str, rightX, rightY, { width: colWidth, align: 'left', link: data.linkedin });
                rightY += doc.heightOfString(str, { width: colWidth }) + 4;
            }
            if (data.github) {
                const str = `GitHub: ${data.github}`;
                doc.text(str, rightX, rightY, { width: colWidth, align: 'left', link: data.github });
                rightY += doc.heightOfString(str, { width: colWidth }) + 4;
            }

            // Dynamically set Y position for next section
            doc.y = Math.max(leftY, rightY) + 10;

            // --- Banner Header Helper ---
            const renderSectionHeader = (title) => {
                if (doc.y > 690) doc.addPage();
                const startY = doc.y;
                doc.rect(40, startY, contentWidth, 22).fill(PRIMARY_COLOR);
                doc.fontSize(12)
                   .font(FONT_BOLD)
                   .fillColor('#FFFFFF')
                   .text(title.toUpperCase(), 48, startY + 6, { letterSpacing: 1.2 });
                doc.y = startY + 30;
            };

            // --- 1. Summary ---
            if (data.summary) {
                renderSectionHeader('Professional Summary');
                doc.fontSize(12)
                   .font(FONT_REGULAR)
                   .fillColor(TEXT_MAIN)
                   .text(data.summary, 40, doc.y, {
                       width: contentWidth,
                       align: 'left',
                       lineGap: 4
                   });
                doc.moveDown(1.5);
            }

            // --- 2. Technical Skills ---
            if (data.skills && data.skills.length > 0) {
                renderSectionHeader('Technical Skills');
                
                const skillsList = Array.isArray(data.skills) 
                    ? data.skills 
                    : data.skills.split(',').map(s => s.trim());

                doc.fontSize(12)
                   .font(FONT_REGULAR)
                   .fillColor(TEXT_MAIN)
                   .text(skillsList.join('   •   '), 40, doc.y, { width: contentWidth, lineGap: 4 });

                doc.moveDown(1.5);
            }

            // --- 3. Work Experience ---
            if (data.experience && data.experience.length > 0) {
                renderSectionHeader('Work Experience');
                data.experience.forEach((exp) => {
                    if (doc.y > 680) doc.addPage();

                    doc.fontSize(12)
                       .font(FONT_BOLD)
                       .fillColor(TEXT_DARK)
                       .text(exp.position || '', 40, doc.y, { continued: true });

                    doc.font(FONT_BOLD)
                       .fillColor(ACCENT_COLOR)
                       .text(` — ${exp.company || ''}`);

                    doc.fontSize(12)
                       .fillColor(TEXT_MUTED)
                       .text(`${exp.startDate || ''} – ${exp.endDate || 'Present'}`);

                    if (exp.description) {
                        doc.moveDown(0.3);
                        doc.fontSize(12)
                           .font(FONT_REGULAR)
                           .fillColor(TEXT_MAIN)
                           .text(exp.description, 40, doc.y, {
                               width: contentWidth,
                               lineGap: 4
                           });
                    }
                    doc.moveDown(1.2);
                });
                doc.moveDown(0.3);
            }

            // --- 4. Education ---
            if (data.education && data.education.length > 0) {
                renderSectionHeader('Education');
                data.education.forEach((edu) => {
                    if (doc.y > 690) doc.addPage();

                    doc.fontSize(12)
                       .font(FONT_BOLD)
                       .fillColor(TEXT_DARK)
                       .text(edu.degree || '', 40, doc.y, { continued: true });

                    doc.font(FONT_REGULAR)
                       .fillColor(TEXT_MUTED)
                       .text(`  (${edu.passingYear || ''})`);

                    let eduDetails = edu.institution || '';
                    if (edu.result) eduDetails += `   |   Result: ${edu.result}`;

                    doc.fontSize(11)
                       .font(FONT_REGULAR)
                       .fillColor(TEXT_MAIN)
                       .text(eduDetails);

                    doc.moveDown(0.8);
                });
                doc.moveDown(0.6);
            }

            // --- 5. Projects ---
            if (data.projects && data.projects.length > 0) {
                renderSectionHeader('Projects');
                data.projects.forEach((proj) => {
                    if (doc.y > 680) doc.addPage();

                    // Title Alignment Fix
                    doc.fontSize(12)
                       .font(FONT_BOLD)
                       .fillColor(TEXT_DARK)
                       .text(proj.title || '', 40, doc.y, { width: contentWidth, align: 'left' });

                    // Link Alignment Fix
                    if (proj.link) {
                        doc.fontSize(11)
                           .font(FONT_REGULAR)
                           .fillColor(ACCENT_COLOR)
                           .text(proj.link, 40, doc.y, { 
                               width: contentWidth, 
                               align: 'left', 
                               link: proj.link 
                           });
                    }

                    // Description Alignment Fix
                    if (proj.description) {
                        doc.moveDown(0.3);
                        doc.fontSize(12)
                           .font(FONT_REGULAR)
                           .fillColor(TEXT_MAIN)
                           .text(proj.description, 40, doc.y, {
                               width: contentWidth,
                               align: 'left',
                               lineGap: 4
                           });
                    }
                    doc.moveDown(1.2);
                });
                doc.moveDown(0.3);
            }

            // --- 6. Certifications ---
            if (data.certifications && data.certifications.length > 0) {
                renderSectionHeader('Certifications');
                data.certifications.forEach(c => {
                    if (doc.y > 700) doc.addPage();
                    doc.fontSize(12)
                       .font(FONT_BOLD)
                       .fillColor(TEXT_DARK)
                       .text(`•  ${c.title || ''}`, 40, doc.y, { continued: true });
                    doc.font(FONT_REGULAR)
                       .fillColor(TEXT_MAIN)
                       .text(` — ${c.issuer || ''} ${c.year ? `(${c.year})` : ''}`);
                    doc.moveDown(0.5);
                });
                doc.moveDown(0.9);
            }

            // --- 7. Languages ---
            if (data.languages && data.languages.length > 0) {
                renderSectionHeader('Languages');
                const langs = Array.isArray(data.languages) ? data.languages.join('   •   ') : data.languages;
                doc.fontSize(12)
                   .font(FONT_REGULAR)
                   .fillColor(TEXT_MAIN)
                   .text(langs, 40, doc.y, { width: contentWidth });
                doc.moveDown(1.4);
            }

           // --- 8. References ---
            if (data.references && data.references.length > 0) {
                renderSectionHeader('References');
                data.references.forEach((ref) => {
                    if (doc.y > 690) doc.addPage();

                    // Name
                    doc.fontSize(12)
                       .font(FONT_BOLD)
                       .fillColor(TEXT_DARK)
                       .text(ref.name || '', 40, doc.y, { width: contentWidth, align: 'left' });

                    // Designation & Company
                    const designationText = `${ref.designation || ''}${ref.company ? `, ${ref.company}` : ''}`;
                    if (designationText) {
                        doc.fontSize(11)
                           .font(FONT_REGULAR)
                           .fillColor(TEXT_MAIN)
                           .text(designationText, 40, doc.y, { width: contentWidth, align: 'left' });
                    }

                    // Contact Info (Email & Phone)
                    const refContact = [ref.email, ref.phone].filter(Boolean).join('   |   ');
                    if (refContact) {
                        doc.fontSize(11)
                           .font(FONT_REGULAR)
                           .fillColor(TEXT_MUTED)
                           .text(refContact, 40, doc.y, { width: contentWidth, align: 'left' });
                    }

                    doc.moveDown(0.8);
                });
            }

            doc.end();
        });
    }
}

module.exports = new CvPdfService();