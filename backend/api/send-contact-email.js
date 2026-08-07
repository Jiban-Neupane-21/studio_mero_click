import { Resend } from "resend";

const TO_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "studiomeroclick@gmail.com";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Studio Mero Click <onboarding@resend.dev>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method Not Allowed",
    });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "RESEND_API_KEY is missing.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: "Name, email, subject and message are required.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: email,
      subject: `Contact Form Submission: ${subject}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height:1.6;">
        <h2>New Contact Form Submission</h2>

        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>Subject:</strong> ${subject}</li>
        </ul>

        <h3>Message</h3>

        <p>${message}</p>
      </div>
      `,
    });

    if (error) {
      console.error(error);

      return res.status(500).json({
        error: "Failed to send email.",
      });
    }

    return res.status(200).json({
      message: "Message sent successfully.",
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
