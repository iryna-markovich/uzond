export const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split('/');
  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}
