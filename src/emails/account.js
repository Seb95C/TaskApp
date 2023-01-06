const sgMail = require('@sendgrid/mail')

const sendgridAPIKey = process.env.SENDGRIDAPIKEY

sgMail.setApiKey(sendgridAPIKey)

const sendWelcomeEmail = (user) => {
    sgMail.send({
        to: user.email,
        from: 'sebastian.calcan.dev@gmail.com',
        subject: 'Welcome to TaskApp',
        text: `Welcome to the app, ${user.name}! Hope you enjoy.`
    })
}

module.exports = {
    sendWelcomeEmail
}