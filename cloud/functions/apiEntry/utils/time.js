function getDate(timeString) {
  const date = new Date(timeString);
  return {
    year: date ? date.getFullYear() : undefined,
    month: date ? date.getMonth() + 1 : undefined,
    day: date ? date.getDate() : undefined,
  };
}

module.exports = {
  getDate,
};
