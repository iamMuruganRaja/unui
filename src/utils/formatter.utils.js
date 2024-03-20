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
