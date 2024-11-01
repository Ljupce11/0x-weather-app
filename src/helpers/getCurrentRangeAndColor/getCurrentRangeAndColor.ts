const timeRanges = {
  "05-11": { hours: [5, 11], color: "linear-gradient(180deg, #81C5E6 0%, #DC927F 100%)" },
  "11-17": { hours: [11, 17], color: "linear-gradient(180deg, #4982AD 0%, rgba(144, 187, 216, 0.5) 100%)" },
  "17-21": { hours: [17, 21], color: "linear-gradient(180deg, #6F6D8C 0%, rgba(188, 97, 90, 0.5) 100%)" },
  "21-05": { hours: [21, 24], color: "linear-gradient(180deg, #011E33 0%, rgba(61, 53, 81, 0.8) 100%)" }
};

// Check current time range and return the corresponding color
export const getBackgroundColor = () => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  for (const [range, { hours, color }] of Object.entries(timeRanges)) {
    const [start, end] = hours;
    if ((currentHour >= start && currentHour < end) || (range === "21-05" && currentHour < 5)) {
      return color;
    }
  }

  return null;
}