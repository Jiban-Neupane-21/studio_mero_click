import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const resend = new Resend(process.env.RESEND_API_KEY);

const TO_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "neupanejiban73@gmail.com";
const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL || "Studio Mero Click <onboarding@resend.dev>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const {
      client_name,
      client_email,
      client_phone,
      package_name,
      booking_date,
      notes,
      claim_code
    } = req.body;

    if (!client_name || !client_email || !package_name || !claim_code) {
      return res
        .status(400)
        .json({ error: "Name, email, package name, and claim code are required." });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      reply_to: client_email,
      subject: `New Offer Claim: ${package_name}`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;"><h2>New Offer Claim from Studio Mero Click Website</h2><p>You have received a new offer claim. Please review the details below.</p><hr><h3>Claim Details</h3><ul><li><strong>Package:</strong> ${package_name}</li><li><strong>Claim Code:</strong> ${claim_code}</li><li><strong>Preferred Date:</strong> ${booking_date || "Not specified"}</li></ul><h3>Client Details</h3><ul><li><strong>Name:</strong> ${client_name}</li><li><strong>Email:</strong> <a href="mailto:${client_email}">${client_email}</a></li><li><strong>Phone:</strong> ${client_phone || "Not provided"}</li></ul><h3>Message/Notes</h3><p style="background-color: #f4f4f4; padding: 10px; border-radius: 4px;">${notes || "No special requests."}</p><hr><p><em>This is an automated notification. Please reply directly to the client's email.</em></p></div>`,
    });

    if (error) {
      console.error("Resend API Error:", error);
      return res.status(500).json({ error: "Failed to send email." });
    }

    res.status(200).json({ message: "Offer claim email sent successfully!", data });
  } catch (e) {
    console.error("Server Error:", e);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
}
