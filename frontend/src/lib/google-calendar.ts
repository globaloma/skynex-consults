import { google } from "googleapis";

type BookingEventInput = {
  fullName: string;
  email: string;
  consultationType: string;
  serviceInterest: string;
  preferredDate: string;
  preferredTime: string;
  additionalNotes?: string;
};

function getAuth() {
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const projectId = process.env.GOOGLE_PROJECT_ID;

  if (!clientEmail || !privateKey || !projectId) return null;

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/calendar"],
  });
}

export async function createCalendarEvent(data: BookingEventInput) {
  const auth = getAuth();
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!auth || !calendarId) return null;

  const calendar = google.calendar({ version: "v3", auth });

  const [hours, minutes] = data.preferredTime.split(":").map(Number);
  const start = new Date(data.preferredDate);
  start.setHours(hours, minutes, 0, 0);

  const end = new Date(start);
  end.setMinutes(end.getMinutes() + 60);

  const response = await calendar.events.insert({
    calendarId,
    requestBody: {
      summary: `Consultation - ${data.fullName}`,
      description: `
Service: ${data.serviceInterest}
Consultation Type: ${data.consultationType}
Client Email: ${data.email}
Notes: ${data.additionalNotes || "N/A"}
      `,
      start: {
        dateTime: start.toISOString(),
      },
      end: {
        dateTime: end.toISOString(),
      },
      attendees: [{ email: data.email }],
    },
    sendUpdates: "all",
  });

  return response.data;
}