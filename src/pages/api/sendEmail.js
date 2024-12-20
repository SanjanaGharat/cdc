import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { firstName, lastName, email, phone, addressLine1, addressLine2, city, state, zip, projectType, goals, date, time, howDidYouHear, optOut } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email app password or password
    },
  });

  const mailOptions = {
    from: `"${firstName} ${lastName}" <${email}>`,
    to: process.env.RECEIVER_EMAIL, // The email address to receive the form data
    subject: `Message from ${firstName} ${lastName}`,
    html: `
      <p><strong>First Name:</strong> ${firstName}</p>
      <p><strong>Last Name:</strong> ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address Line 1:</strong> ${addressLine1}</p>
      <p><strong>Address Line 2:</strong> ${addressLine2}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>State:</strong> ${state}</p>
      <p><strong>Zip:</strong> ${zip}</p>
      <p><strong>Project Type:</strong> ${projectType.join(', ')}</p>
      <p><strong>Renovation Goals:</strong> ${goals}</p>
      <p><strong>Preferred Date:</strong> ${date}</p>
      <p><strong>Preferred Time:</strong> ${time}</p>
      <p><strong>How did you hear about us:</strong> ${howDidYouHear}</p>
      <p><strong>Opt Out of eNewsletter:</strong> ${optOut ? 'Yes' : 'No'}</p>
    `,
    replyTo: email,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email.' });
  }
}
