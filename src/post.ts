const { getWorksheet } = require('./xlsx.ts');
const dayjs = require('dayjs');

const argList = process.argv;

const unlimitDate = argList.indexOf('--alldate') > -1;

const argDate = argList.reduce((accumulator, curValue) => {
    if (curValue.indexOf('--date') > -1) {
        const val = curValue.split('=')[1];
        if (!isNaN(Number(val)) && Number(val) < 0) {
            return dayjs().subtract(-val, 'day');
        }
        return dayjs(val);
    }
    return accumulator;
}, "");

const dateObj = argDate || dayjs();

console.log(dateObj.format('YYYY-MM-DD HH:mm:ss'));

const region = 'chinese';

(async () => {
    const todayStr = dateObj.format('YYYY-MM-DD');
    console.log(todayStr + '-' + region);
    const sheetToday = await getWorksheet(todayStr + '-' + region);

    sheetToday.eachRow((row) => {
        console.log(row.values);
    });
})();