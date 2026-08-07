import { Resend } from "resend";

const TO_EMAIL =
  process.env.BOOKING_NOTIFICATION_EMAIL || "studiomeroclick@gmail.com";

const FROM_EMAIL =
  process.env.RESEND_FROM_EMAIL ||
  "Studio Mero Click <onboarding@resend.dev>";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({
        error: "RESEND_API_KEY is missing.",
      });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const {
      client_name,
      client_email,
      client_phone,
      service_title,
      service_category,
      service_subcategory,
      service_price,
      booking_date,
      notes,
    } = req.body;

    if (!client_name || !client_email || !service_title) {
      return res.status(400).json({
        error: "Name, email, and service title are required.",
      });
    }

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: [TO_EMAIL],
      replyTo: client_email,
      subject: `New Booking Request: ${service_title}`,
      html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>New Booking Request from Studio Mero Click Website</h2>

        <p>You have received a new booking request.</p>

        <hr>

        <h3>Booking Details</h3>

        <ul>
          <li><strong>Service:</strong> ${service_title}</li>
          <li><strong>Category:</strong> ${service_category || "N/A"}</li>
          <li><strong>Sub Category:</strong> ${service_subcategory || "N/A"}</li>
          <li><strong>Price:</strong> ${service_price || "Not specified"}</li>
          <li><strong>Date:</strong> ${booking_date || "Not specified"}</li>
        </ul>

        <h3>Client Details</h3>

        <ul>
          <li><strong>Name:</strong> ${client_name}</li>
          <li><strong>Email:</strong> ${client_email}</li>
          <li><strong>Phone:</strong> ${client_phone || "Not provided"}</li>
        </ul>

        <h3>Notes</h3>

        <p>${notes || "No special requests."}</p>
      </div>
      `,
    });

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Failed to send booking email.",
      });
    }

    return res.status(200).json({
      message: "Booking email sent successfully.",
      data,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: "Internal Server Error",
    });
  }
}