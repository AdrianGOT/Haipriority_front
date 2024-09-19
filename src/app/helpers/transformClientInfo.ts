export const generateCardName = (clientName: string) => {
    const firstLetter =  clientName.charAt(0);
    const restOfName = clientName.slice(1,clientName.length);
    return `${firstLetter.toUpperCase()}${restOfName}`;
}