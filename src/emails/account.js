const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'owenwilliamhardy@gmail.com',
        subject: 'Thanks for joining Task Manager App!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendGoodbyeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'owenwilliamhardy@gmail.com',
        subject: 'We\'re sorry to see you go!',
        text: `We're sorry to see you go', ${name}. Please contact us if you have any feedback`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendGoodbyeEmail
}