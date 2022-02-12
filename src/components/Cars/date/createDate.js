export const createYear = () => {
    return new Date().getFullYear();
};

export const createToday = () => {
    return `${new Date().getFullYear()}-${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}-${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}`;
};

export const createDate = () => {
    return `${new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours()}:${new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes()}:${new Date().getSeconds() < 10 ? `0${new Date().getSeconds()}` : new Date().getSeconds()} ${new Date().getDate() < 10 ? `0${new Date().getDate()}` : new Date().getDate()}.${new Date().getMonth() + 1 < 10 ? `0${new Date().getMonth() + 1}` : new Date().getMonth() + 1}.${new Date().getFullYear()}`;
};