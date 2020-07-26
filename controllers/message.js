const nodemailer = require('nodemailer');
const EMAIL_NODEMAILER = process.env.EMAIL_NODEMAILER;
const PASSWORD_NODEMAILER = process.env.PASSWORD_NODEMAILER;


module.exports = {
    post: {
        send: async (req, res, next) => {
            try {
                const {
                    name,
                    email,
                    message,
                } = req.body;
                
                const content = `name: ${name} \n email: ${email} \n message: ${message} `

                const transport = {
                    host: 'smtp.mail.yahoo.com',
                    port: 465,
                    secure: true,
                    auth: {
                        user: EMAIL_NODEMAILER,
                        pass: PASSWORD_NODEMAILER
                    }
                }
                const transporter = nodemailer.createTransport(transport)

                const mail = {
                    from: process.env.EMAIL_NODEMAILER,
                    to: process.env.EMAIL_NODEMAILER,
                    subject: 'New Message from Contact Form',
                    text: content
                }

                const mailResponse={
                    from: process.env.EMAIL_NODEMAILER,
                    to: email,
                    subject: "Submission was successful",
                    text: "Thank you for contacting us!"
                }

                transporter.sendMail(mail, (err, data) => {
                    if (err) {
                        res.status(500).end()
                        return
                    }
                    transporter.sendMail(mailResponse)
                    res.status(200).end()
                })

            } catch (error) {
               res.status(500).end()
            }
        },

    }
}