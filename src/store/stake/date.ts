/* eslint-disable no-param-reassign */
export const MSEC_IN_MINUTE = 60 * 1000;
export const MSEC_IN_HOUR = 60 * MSEC_IN_MINUTE;

export const hoursLeft = (msec: number) => Math.floor(msec / MSEC_IN_HOUR);
export const minutesLeft = (msec: number) => {
  const msecLeft = msec % MSEC_IN_HOUR;
  return Math.floor(msecLeft / MSEC_IN_MINUTE);
};
export const secondsLeft = (msec: number) => {
  const msecLeft = msec % MSEC_IN_MINUTE;
  return Math.floor(msecLeft / 1000);
};

export const formateTimer = (msec: number) => {
  const hl = hoursLeft(msec);
  const hoursStr = `${hl < 10 ? '0' : ''}${hl}`;

  const ml = minutesLeft(msec);
  const minutesStr = `${ml < 10 ? '0' : ''}${ml}`;

  const sl = secondsLeft(msec);
  const secondsStr = `${sl < 10 ? '0' : ''}${sl}`;

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};

export const reg = /^\w+ (\w+) (\d+) \d+ (\d+:\d+):\d+ .*$/;

export const formateDate = (date: Date) => {
  const parsed = date.toString().match(reg);
  if (!parsed) {
    return undefined;
  }

  return `${parsed[2]} ${parsed[1]}, ${parsed[3]}`;
};
