const { getWorksheet } = require('./xlsx.ts');
const dayjs = require('dayjs');
const fs = require('fs');

const argList = process.argv;

const region = argList.reduce((accumulator, curValue) => {
    if (curValue.indexOf('--region') > -1) {
        return curValue.split('=')[1];
    }
    return accumulator;
}, "") || "chinese";

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

(async () => {
    const todayStr = dateObj.format('YYYY-MM-DD');
    console.log(todayStr + '-' + region);
    const sheetToday = await getWorksheet(todayStr + '-' + region);

    const articleList = [];
    if (!sheetToday) {
        return;
    }
    sheetToday.eachRow((row, index) => {
        if (index === 1) {
            return;
        }

        const item = row.values;
        articleList.push(`[${articleList.length}. ${item[1]} - ${ item[2] }](${ item[5] })`);
    });

    if (articleList.length > 0) {
        fs.writeFile(`./hexo/source/_posts/daily-${ todayStr }-${region}.md`, `---\r\ntitle: 'daily-${ todayStr.replace(/-/g, '.') }'\r\ndate: ${ todayStr }\r\ntags:\r\n---\r\n\r\n${ articleList.join('\r\n') }`, (err) => {
            if (err) return console.log(err);
            console.log('post generate success');
        });
    }

})();