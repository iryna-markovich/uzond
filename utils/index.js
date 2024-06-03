export const formatDate = (dateString) => {
  const [day, month, year] = dateString.split('/');
  const formattedDateString = `${year}-${month}-${day}`;

  return formattedDateString;
}

export async function getDates(branch, type) {
  const response = await fetch(`https://kolejkagdansk.ajhmedia.pl/admin/API/date/${branch}/${type}/pl`);
  const { DATES } = await response.json();

  return DATES
}
