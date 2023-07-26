export const httptoHttps = (string='') => {
    const arr = string.split('//')
    return `https://${arr[1]}`
};
