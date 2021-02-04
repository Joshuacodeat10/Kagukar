const Master = require("../models/master");

module.exports = function resetPass(username) {
    Master.findOne({}, (err, found) => {
        console.log("Found")
        console.log(username)

        mail.substring(mail.lastIndexOf("@") + 1, mail.lastIndexOf("."))
        const mail = found.email;
        const mailPass = found.emailPass;

        const service = mail.substring(mail.lastIndexOf("@") + 1, mail.lastIndexOf("."))

        var transporter = nodemailer.createTransport({
            service,
            auth: {
                user: mail,
                pass: mailPass,
            },
        });

        var mailOptions = {
            from: mail,
            to: username,
            subject: "Password Reset",
            text: "Link is only valid for 5 minutes",
            html: "<div style='margin: 0 -5px;'><div class='float: left; width: 50%; padding: 0 10px;'><div style='box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); padding: 16px; text-align: center; background-color: #f1f1f1;'><h3>Brainballer | Forgot Password</h3><p>Link is only valid for 20 minutes</p><p> <a style='color: blue; font-weight: bold; text-decoration: underline' href='https://brainballer.com/reset/" +
                req.body._csrf +
                "'> Reset</a> </p></div></div></div> <a href='https://brainballer.com/reset/" +
                req.body._csrf +
                "'></a>",
        };


        console.log(found)
    })
}