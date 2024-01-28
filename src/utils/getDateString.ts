export const getDateString = (timestamp: number): string => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Note: months are zero-based
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
