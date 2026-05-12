export function formatBookingDateTime(
  date: string,
  time: string,
  timeZone = "Africa/Lagos"
) {
  const [hours, minutes] = time.split(":").map(Number);
  const dt = new Date(date);
  dt.setHours(hours, minutes, 0, 0);

  return new Intl.DateTimeFormat("en-NG", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone,
  }).format(dt);
}