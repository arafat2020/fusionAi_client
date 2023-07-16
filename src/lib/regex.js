export function isAdmin(input) {
    let regex = /http:\/\/localhost:3000\/admin#\/[A-Za-z]+/i;
    return regex.test(input);
}