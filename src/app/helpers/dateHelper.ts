export const generateDateToString = (date?: Date) => {
    if(!date) return "";
    const year = date.getFullYear();
    const month = date.getUTCMonth() < 10? `0${date.getUTCMonth()}`: date.getUTCMonth()
    const day = date.getDate() < 10? `0${date.getDate()}`: date.getDate()

    return `${year}-${month}-${day}`
}   

export const generateYearLimitInDate = (years : number): Date => {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear() + years, 1, 1);
}