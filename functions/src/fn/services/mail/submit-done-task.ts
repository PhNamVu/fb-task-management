// eslint-disable-next-line no-unused-vars
import * as functions from "firebase-functions";
import * as nodemailer from "nodemailer";
import * as smtpTransport from "nodemailer-smtp-transport";

const cors = require("cors")({
  origin: true,
});

export default async (
    req: functions.https.Request,
    res: functions.Response
): Promise<any> => {
  console.log("/submitDonetask");

  const {
    input: {taskName, ownerMail, displayName, url},
  } = req.body.input;



  try {
    return cors(req, res, () => {
      const text = `<div>
      <h4>${displayName} just move task: <a href=${url}'>${taskName}</a>  to Done</h4>
      
    </div>`;
      const sesAccessKey = "team4mco@outlook.com";
      const sesSecretKey = "200421team4";

      const transporter = nodemailer.createTransport(
          smtpTransport({
            host: "smtp-mail.outlook.com", // hostname
            // port for secure SMTP
            port: 587,
            tls: {
              ciphers: "SSLv3",
            },
            auth: {
              user: sesAccessKey,
              pass: sesSecretKey,
            },
          })
      );
      const mailOptions = {
        to: ownerMail,
        from: sesAccessKey,
        subject: `${taskName} is Done`,
        text: text,
        html: text,
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error.message);
        }
        res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "Ok",
        });
      });
    });
  } catch (error) {
    console.log("/submitDoneTask end with error");
    console.error(error);
    return res
        .status(500)
        .json({status: "fail", statusCode: 500, message: error});
  }
};
