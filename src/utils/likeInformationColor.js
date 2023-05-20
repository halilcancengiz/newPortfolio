export const likeInformationColor = (type) => {

    if (type === "awesome") {
        return "text-[#C53F3F]"
    }
    else if (type === "informative") {
        return "text-[orange]"
    }
    else if (type === "like") {
        return "text-[#6FC276]"
    } else {
        return "text-[#4282EE]"
    }

}