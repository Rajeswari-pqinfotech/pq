var nodemailer = require('nodemailer');

const mailer = {
    forgetpass: async (toMail,name,vCode)=>{
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.email,
              pass: process.env.epass
            }
          });
          
          var mailOptions = {
            from: process.env.email,
            to: toMail,
            subject: 'Verification Code',
            html: `<h4>Hi ${name} !</h4><br/> <p>Your verification code is <b>${vCode}</b>. Enter this code in our [website or app] to reset your password.</p>`
            // text: `<h2>Hi ${name} ! </h2>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              return(error);
            } else {
              return('Email sent: ' + info.response);
            }
          });
    }
}

module.exports = mailer;

