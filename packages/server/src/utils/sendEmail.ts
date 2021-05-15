import nodemailer,{SendMailOptions} from 'nodemailer';

export const sendVerificationEmail = async (mailOptions: SendMailOptions, code: string): Promise<void> => {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${testAccount.user}>`,
        to: mailOptions.to,
        subject: "Verification Code - Tidify", 
        text: "Hello world?", 
        html: `This is your Code: ${code}`, 
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export const sendChangePWEmail = async (mailOptions: SendMailOptions, url: string): Promise<void> => {
    const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass,
        },
    });

    const info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${testAccount.user}>`,
        to: mailOptions.to,
        subject: "Verification Code - Tidify", 
        text: "Hello world?", 
        html: `A request to reset your Tidify password has been made. If you did not make this request, simply ignore this email. If you did make this request, please reset your password: <a href="${url}">Reset Password</a>`, 
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
