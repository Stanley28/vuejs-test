export default (dateString) => {
  const date = new Date(dateString);

  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${date.getFullYear()}`;
};
