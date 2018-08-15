export const getTimeFromSec = sec => {
    let hour = Math.floor(sec / 3600);
    let minutes = hour ? (Math.floor(sec / 60) % 60) : Math.floor(sec / 60);
    let seconds = Math.floor(sec % 60)
    return hour ? `${hour}:${minutes}:${seconds}`:` ${minutes}:${seconds}`
}