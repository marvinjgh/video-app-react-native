export const getTimeFromSec = sec => {
  let hour = Math.floor(sec / 3600);
  let minutes = Math.floor(sec / 60);
  let seconds = Math.floor(sec % 60);
  if (hour) {
    minutes = minutes % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
  }
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return hour ? `${hour}:${minutes}:${seconds}` : ` ${minutes}:${seconds}`;
};
