import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD // Use an App Password here
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: subject,
        text: text
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // or return false
    }
};

export { sendMail };