export const generateDateToString = (date: Date) => {
    
    const year = date.getFullYear();
    const month = date.getUTCMonth() < 10? `0${date.getUTCMonth()}`: date.getUTCMonth()
    const day = date.getDate() < 10? `0${date.getDate()}`: date.getDate()

    return `${year}-${month}-${day}`
}   
