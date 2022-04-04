const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

exports.sendEmail = (toEmail, fromEmail, emailSubject, emailText, emailTextHTML='') => {
    try {
        const msg = {
            to: toEmail,//'test@example.com', // Change to your recipient
            from: "zabunike@gmail.com",//fromEmail,//'test@example.com', // Change to your verified sender
            subject: emailSubject,//'Sending with SendGrid is Fun',
            text: emailText,//'and easy to do anywhere, even with Node.js',
            html: emailTextHTML == '' ? `<strong>${emailText}</strong>` : emailTextHTML,//`<strong>and easy to do anywhere, even with Node.js</strong>`,
          }
          
          return sgMail
          .send(msg)
            .then((response) => {
              console.log(response[0].statusCode)
              console.log(response[0].headers)
            })
            .catch((error) => {
              console.error(error)
            })        
    }
    catch(ex) {}
}
