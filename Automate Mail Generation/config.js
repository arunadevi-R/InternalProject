const nodemailer = require('nodemailer');

async function sendBirthdayEmail(to, subject, text) {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hawfinchtechnologies2015@gmail.com',
            pass: 'lchtxoqnxdqoloqi',
        },
    });

    await transporter.sendMail({
        from: '"Hawfinch" <hawfinchtechnologies2015@gmail.com>', 
        to: to,
        subject: subject,
        html: text,
        attachments: [{
            filename: 'birthdayCard.png',
            path: __dirname +'/assets/birthdayCard.png', 
            cid: 'birthdayCard'
           }]
    });

    console.log(`Email sent to ${to}`);
}

module.exports = sendBirthdayEmail;
