export const findAuthorName = (allUsersInfo, userId) => {
    const author = allUsersInfo.find(user => user.userId === userId);

    return author ? author.fullName : "";
};