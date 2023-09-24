 
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bootstrap from './src/index.router.js';
import nodemailer from "nodemailer";
import sendEmail from './utils/email.js';


const app = express();
const port = 3000;



sendEmail({to:"raafmartina7@gmail.com",subject:"mdmdwewdm"})
console.log({ DB: process.env.DB_URL });
bootstrap(app, express);

app.listen(port, () => console.log(`The port is running...${port}`));
