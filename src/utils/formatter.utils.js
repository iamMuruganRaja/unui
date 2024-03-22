import { DateTime } from "luxon";

// Utility function to add ordinal suffix to a number
function ordinalSuffixOf(i) {
  var j = i % 10,
    k = i % 100;
  if (j === 1 && k !== 11) {
    return i + "st";
  }
  if (j === 2 && k !== 12) {
    return i + "nd";
  }
  if (j === 3 && k !== 13) {
    return i + "rd";
  }
  return i + "th";
}

export const dateFormatter = (input) => {
  const dateTime = DateTime.fromFormat(input, "yyyy-MM-dd HH:mm:ss 'UTC'", {
    zone: "utc",
  });

  // Convert to the desired timezone (e.g., 'Asia/Kolkata')
  const dateTimeInTargetZone = dateTime.setZone("Asia/Kolkata");

  // Use the utility function to get the day with ordinal suffix
  const dayWithOrdinal = ordinalSuffixOf(dateTimeInTargetZone.day);

  // Format the month as abbreviated month name
  const monthAbbr = dateTimeInTargetZone.toFormat("LLL");

  // Combine the day with ordinal suffix and the abbreviated month name
  const formattedDateTime = `${dayWithOrdinal} ${monthAbbr}`;

  return formattedDateTime;
};

export const timeFormatter = (input) => {
  const dateTime = DateTime.fromFormat(input, "yyyy-MM-dd HH:mm:ss 'UTC'", {
    zone: "utc",
  }).setZone("Asia/Kolkata");

  // Formatting the date with ordinal suffix and abbreviated month name
  const dayWithOrdinal = ordinalSuffixOf(dateTime.day);
  const monthAbbr = dateTime.toFormat("LLL");
  const dateFormatted = `${dayWithOrdinal} ${monthAbbr}`;

  // Formatting the time in hh:mm a format
  const timeFormatted = dateTime.toFormat("hh:mm a");

  // Combining the formatted date and time
  const formattedDateTime = `${timeFormatted}`;

  return formattedDateTime;
};

export const timeInIST = (input) => {
  // Parse the input UTC datetime string as UTC
  const dateTimeUTC = DateTime.fromFormat(input, "yyyy-MM-dd HH:mm:ss 'UTC'", {
    zone: "utc",
  });

  // Convert the datetime to 'Asia/Kolkata' timezone
  const dateTimeInKolkata = dateTimeUTC.setZone("Asia/Kolkata");

  // Subtract 5 hours and 30 minutes from the 'Asia/Kolkata' datetime
  // This is an unusual step since 'Asia/Kolkata' is already IST (+5:30 UTC)
  // Only do this if you have a specific reason to adjust the time manually
  const adjustedDateTime = dateTimeInKolkata.minus({ hours: 5, minutes: 30 });

  // Format the adjusted datetime object to the desired output format
  const formattedDateTime =
    adjustedDateTime.toFormat("yyyy-MM-dd HH:mm:ss") + " 'IST'";

  return formattedDateTime;
};
