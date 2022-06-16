const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {

    console.log(req.body);

    try {
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, 
            auth: {
                user: "andri.feb.26@gmail.com",
                pass: "iutfqxobsqhzbslu"
            },
        });

        let mailOptions = {
            from: 'andri.feb.26@gmail.com',
            to: 'andri.feb.26@gmail.com', 
            subject: "bob portfolio",
            text: `pengirim: "${req.body.name}" <${req.body.email}>\n\n${req.body.message}`, 
        };

         transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                res.json({
                    error: err.message
                })
            }
            res.json({
                status: true,
                message: info
            })
        });
    } catch (err) {
        res.json({
            error: err.message
        })
    }

}

module.exports = { sendEmail }