import nodemailer,{SendMailOptions} from 'nodemailer';

export const sendVerificationEmail = async (mailOptions: SendMailOptions, url: string) => {
    let testAccount = await nodemailer.createTestAccount();
    console.log(testAccount);

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: testAccount.user, 
            pass: testAccount.pass,
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Fred Foo 👻" <${testAccount.user}>`,
        to: mailOptions.to,
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: `To verify your account please press on <a href="${url}">this</a> link.`, 
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
