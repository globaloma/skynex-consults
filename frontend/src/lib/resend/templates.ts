type BookingEmailProps = {
  fullName: string;
  consultationType: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
};

type ContactEmailProps = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export function bookingConfirmationTemplate(data: BookingEmailProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0D0D0D;">
      <h2>Booking Confirmation</h2>
      <p>Hello ${data.fullName},</p>
      <p>Thank you for booking a consultation with Skynex Consults.</p>
      <p>We have received your request with the following details:</p>
      <ul>
        <li><strong>Consultation Type:</strong> ${data.consultationType}</li>
        <li><strong>Service of Interest:</strong> ${data.serviceInterest}</li>
        <li><strong>Preferred Date:</strong> ${data.preferredDate}</li>
        <li><strong>Preferred Time:</strong> ${data.preferredTime}</li>
        ${data.additionalNotes ? `<li><strong>Additional Notes:</strong> ${data.additionalNotes}</li>` : ""}
      </ul>
      <p>A member of our team will follow up shortly to confirm the session details.</p>
      <p>Best regards,<br/>Skynex Consults</p>
    </div>
  `;
}

export function adminBookingNotificationTemplate(
  data: BookingEmailProps & { email: string; phone: string }
) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0D0D0D;">
      <h2>New Consultation Booking</h2>
      <ul>
        <li><strong>Name:</strong> ${data.fullName}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Phone:</strong> ${data.phone}</li>
        <li><strong>Consultation Type:</strong> ${data.consultationType}</li>
        <li><strong>Service of Interest:</strong> ${data.serviceInterest}</li>
        <li><strong>Preferred Date:</strong> ${data.preferredDate}</li>
        <li><strong>Preferred Time:</strong> ${data.preferredTime}</li>
        ${data.additionalNotes ? `<li><strong>Additional Notes:</strong> ${data.additionalNotes}</li>` : ""}
      </ul>
    </div>
  `;
}

export function contactConfirmationTemplate(data: ContactEmailProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0D0D0D;">
      <h2>Message Received</h2>
      <p>Hello ${data.name},</p>
      <p>Thank you for contacting Skynex Consults. We have received your message and will respond as soon as possible.</p>
      <p>Best regards,<br/>Skynex Consults</p>
    </div>
  `;
}

export function adminContactNotificationTemplate(data: ContactEmailProps) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0D0D0D;">
      <h2>New Contact Message</h2>
      <ul>
        <li><strong>Name:</strong> ${data.name}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        ${data.phone ? `<li><strong>Phone:</strong> ${data.phone}</li>` : ""}
        <li><strong>Message:</strong> ${data.message}</li>
      </ul>
    </div>
  `;
}