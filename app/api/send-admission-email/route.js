import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
    try {
        const body = await req.json();
        const {
            firstName,
            lastName,
            classApplyingFor,
            fatherName,
            mobile,
            email,
            address,
            previousSchool,
            lastGradePercentage
        } = body;

        const studentName = `${firstName} ${lastName}`;

        // Create Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const emailContent = `Dear Sir/Madam,

We hope this message finds you well.

You have received a new admission enquiry through the school website. The details are as follows:

Student Name: ${studentName}
Parent/Guardian Name: ${fatherName}
Class Applied For: ${classApplyingFor}
Contact Number: ${mobile}
Email Address: ${email || 'Not Provided'}
Address: ${address || 'Not Provided'}

Previous School: ${previousSchool || 'N/A'}
Last Grade/Percentage: ${lastGradePercentage || 'N/A'}

Message from Parent/Guardian:
(Admission Form Submission)

We kindly request you to review the enquiry and take the necessary action at your convenience.

Thank you for your time and attention.

Warm regards,
Admissions Team
Ishwar International School
9996390013
admin@iisgohana.com
`;

        // Send Email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: 'admin@iisgohana.com',
            subject: `New Admission Enquiry: ${studentName}`,
            text: emailContent,
        });

        return NextResponse.json({ success: true, message: 'Email sent successfully' });

    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
