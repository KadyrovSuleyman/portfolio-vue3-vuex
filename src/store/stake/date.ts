export const reg = /^\w+ (\w+) (\d+) \d+ (\d+:\d+):\d+ .*$/;

export const formateDate = (date: Date) => {
  const parsed = date.toString().match(reg);
  if (!parsed) {
    return undefined;
  }

  return `${parsed[2]} ${parsed[1]}, ${parsed[3]}`;
};
