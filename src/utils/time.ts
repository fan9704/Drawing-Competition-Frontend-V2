export function getCurrentTime() {
    const now = new Date();
    return now;
    const utc = now.getTime() - now.getTimezoneOffset() * 60000;
    const newDate = new Date(utc);
    return newDate;
}
