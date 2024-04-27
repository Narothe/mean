const nodemailer = require('nodemailer');
import { IMailOptions } from "../types";

const data = nodemailer.createTransport({
    host: 'smtp.poczta.onet.pl',
    port: 465,
    secure: true,
    auth: {
        user: '***',
        pass: '***'
    }
});

export const sendEmail = (mailOptions: IMailOptions) => {
    data.sendMail(mailOptions, function(error: any, info: { response: string; }){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
