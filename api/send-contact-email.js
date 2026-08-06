import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "studiomeroclick@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Studio Mero Click <onboarding@resend.dev>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, subject, and message are required." });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: email,
      subject: `Contact Form Submission: ${subject}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;"><h2>New Contact Form Submission</h2><p>You have received a new message from your website's contact form.</p><hr><h3>Message Details</h3><ul><li><strong>Name:</strong> ${name}</li><li><strong>Email:</strong> <a href="mailto:${email}">${email}</a></li><li><strong>Subject:</strong> ${subject}</li></ul><h3>Message</h3><p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${message}</p><hr><p><em>This is an automated notification. Please reply directly to the sender's email.</em></p></div>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({ error: "Failed to send message." });
    }

    res.status(200).json({ message: "Message sent successfully!", data });
  } catch (e) {
    console.error("Server Error:", e);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}
