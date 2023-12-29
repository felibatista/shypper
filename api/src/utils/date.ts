export function getFormattedDate(date: Date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return month + "/" + day + "/" + year;
}

export function getDaysInBetween(fromDate: Date, toDate: Date) {
  let daysInBetween: string[] = [];

  while (fromDate <= toDate) {
    daysInBetween.push(getFormattedDate(fromDate));
    fromDate.setDate(fromDate.getDate() + 1);
  }

  if (daysInBetween.length > 1){
      daysInBetween.pop();
  }

  return daysInBetween;
}

export function getDifferenceInMiliseconds(date1: Date, date2: Date) {
  return Math.abs(date1.getTime() - date2.getTime()) / 1000;
}
