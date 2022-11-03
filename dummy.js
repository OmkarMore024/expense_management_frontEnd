const api = process.env.REACT_APP_API_URL;
console.log(api);

const date1 = new Date(Date.now()).toLocaleDateString();
console.log(date1);
const date2 = new Date("3-22-2022").toLocaleDateString();
const date3 = new Date(Date.now() + 7 * 86400000).toLocaleDateString();
console.log(date3);
const iosDate = new Date(Date.now()).toISOString();
console.log(date1 === date2);
console.log(date1 > date2);
console.log(date1 < date2);
console.log(date1 < date3);

console.log(iosDate);
console.log(new Date("2020-01-24"));
console.log(Date.now());
console.log(Date.now("2020-01-24"));
