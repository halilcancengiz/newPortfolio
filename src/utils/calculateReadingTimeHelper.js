export const calculateReadingTime = (text) => {
    const averageReadingSpeed = 1200;
    const textLength = text.replace(/<[^>]+>/g, '').trim().length; // HTML etiketleri dahil olmayacak şekilde
    const readingTime = Math.ceil(textLength / averageReadingSpeed);
    return `${readingTime} min`;
}