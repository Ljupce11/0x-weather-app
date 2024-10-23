export const formatDate = (dateString: string) => {
  const inputDate = new Date(dateString);
  const today = new Date();
  // Set hours to zero to compare dates only
  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);
  // Check if the input date is today
  if (inputDate.getTime() === today.getTime()) {
    return "Today";
  }
  // Get the day of the week (Mon, Tue, ...)
  const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
  return new Intl.DateTimeFormat('en-US', options).format(inputDate);
}