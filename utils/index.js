export const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}
