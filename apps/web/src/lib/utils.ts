export { cn } from 'cn';

export const formatDate = (date: Date) => {
  const yyyy = date.getFullYear();
  let mm: number | string = date.getMonth() + 1; // Months start at 0!
  let dd: number | string = date.getDate();

  if (dd < 10) dd = `0${dd}`;
  if (mm < 10) mm = `0${mm}`;

  // const formattedDate = dd + '/' + mm + '/' + yyyy;
  const formattedDate = yyyy + '-' + mm + '-' + dd;
  return formattedDate;
};
