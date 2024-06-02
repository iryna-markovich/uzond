export async function getDates(branch: number, type: number) {
  const response = await fetch(`https://kolejkagdansk.ajhmedia.pl/admin/API/date/${branch}/${type}/pl`);
  const { DATES } = await response.json();
  
  return DATES
}