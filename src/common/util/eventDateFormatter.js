import dateFormat from 'dateformat';

const getFormattedEventDate = (dateObj) => (
  {
    date: dateFormat(dateObj, 'dd'),
    month: dateFormat(dateObj, 'mmm'),
    day: dateFormat(dateObj, 'ddd'),
    year: dateFormat(dateObj, 'yyyy'),
    time: dateFormat(dateObj, 'h:MM TT'),
    timezone: dateFormat(dateObj, 'Z'),
    full:  dateFormat(dateObj, 'ddd, mmm dd, yyyy, h:MM TT Z')
  }
);

export default getFormattedEventDate;
