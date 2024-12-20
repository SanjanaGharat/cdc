import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        const { firstName, lastName, email, phone, addressLine1, addressLine2, city, state, zip, projectType, goals, date, time, howDidYouHear, optOut } = req.body;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECEIVER_EMAIL,
            subject: `Contact Form Submission from ${firstName} ${lastName}`,
            text: `
                First Name: ${firstName}
                Last Name: ${lastName}
                Email: ${email}
                Phone: ${phone}
                Address: ${addressLine1} ${addressLine2}
                City: ${city}
                State: ${state}
                Zip: ${zip}
                Project Type: ${projectType.join(', ')}
                Renovation Goals: ${goals}
                Preferred Date: ${date}
                Preferred Time: ${time}
                How did you hear about us?: ${howDidYouHear}
                Opt-Out: ${optOut ? 'Yes' : 'No'}
            `,
        };

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to send email' });
        }
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }
};
