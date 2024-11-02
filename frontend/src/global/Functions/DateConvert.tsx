export const convertToIST = (utcDate: string): string => {
  if (!utcDate) {
    return "Invalid date";
  }

  const date = new Date(utcDate);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", utcDate);
    return "Invalid date";
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  if (date.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  }

  const dayBeforeYesterday = new Date(now);
  dayBeforeYesterday.setDate(now.getDate() - 1);
  if (date < dayBeforeYesterday) {
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return date.toLocaleString("en-IN", options);
};
