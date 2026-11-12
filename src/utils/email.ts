import nodemailer from "nodemailer";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const options = {
  host: process.env.HOST,
  port: parseInt(process.env.PORT!),
  secure: false,
  auth: {
    user: process.env.USER || "user",
    pass: process.env.PASS || "password",
  },
};

export const sendEmail = async (data: EmailPayload) => {
  const transporter = nodemailer.createTransport({
    ...options,
  });

  return await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    ...data,
  });
};
