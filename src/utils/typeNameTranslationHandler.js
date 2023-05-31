export const typeNameTranslationHandler = (typeName) => {
    if (typeName === "awesome") {
        return "Harika"
    }
    else if (typeName === "like" || !typeName) {
        return "beğen"
    }
    else if (typeName === "informative") {
        return "Bilgilendirici"
    }
    else if (typeName === "funny") {
        return "Eğlenceli"
    }
}