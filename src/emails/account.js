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

const sendGoodbyEmail = (user) => {
    sgMail.send({
        to: user.email,
        from: 'sebastian.calcan.dev@gmail.com',
        subject: 'We are sorry you are leaving us',
        text: `We are terribly sorry to hear you are leaving the app, ${user.name}. \nPlease feel free to send us a reply with the reasons you have chosen to delete your account.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyEmail
}