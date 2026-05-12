export function bookingStatusUpdatedTemplate({
  fullName,
  status,
}: {
  fullName: string;
  status: string;
}) {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6; color:#0D0D0D;">
      <h2>Consultation Status Update</h2>
      <p>Hello ${fullName},</p>
      <p>Your consultation request with Skynex Consults has been updated.</p>
      <p><strong>Current Status:</strong> ${status}</p>
      <p>If needed, our team will contact you with the next steps.</p>
      <p>Best regards,<br/>Skynex Consults</p>
    </div>
  `;
}