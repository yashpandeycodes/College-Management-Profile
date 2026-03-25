import transporter from "../config/email.js";

const sendEmail = async (to, subject, text) => {

  try {

    await transporter.sendMail({

      from: "College Portal",
      to,
      subject,
      text

    });

    console.log("Email sent");

  } catch (error) {

    console.log("Email error:", error);

  }

};

export default sendEmail;