export const checkIfTypeExists = (arr, type) => {
    return arr[0].likes.some(item => item.type === type);
};


