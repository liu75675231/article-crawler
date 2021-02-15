const { initOrGetWorksheet, writeToFile } = require('./xlsx.ts');
const {run, setReqConf} = require('./crawler.ts');

const dayjs = require('dayjs');
var isToday = require('dayjs/plugin/isToday');
dayjs.extend(isToday);

const argList = process.argv;

const isForceUpdate = argList.indexOf('--forceUpdate') > -1 ? true : false;

const argDate = argList.reduce((accumulator, curValue) => {
    if (curValue.indexOf('--date') > -1) {
        return curValue.split('=')[1];
    }
    return accumulator;
});

const dateObj = argDate ? dayjs(argDate) : dayjs();

(async () => {
    const todayStr = dateObj.format('YYYY-MM-DD');
    const sheetToday = await initOrGetWorksheet(todayStr);
    const originRowCount = sheetToday.rowCount - 1;

    setReqConf('https://devblogs.microsoft.com/typescript/', ($) => {
        const list = [];
        $("#most-recent article").each((index, elem) => {
            const $elem = $(elem);
            const articleDate = dayjs($elem.find(".entry-post-date").text());
            if (articleDate.isSame(dateObj, 'day')) {
                list.push({
                    type: 'Typescript',
                    title: $elem.find(".entry-title a").text(),
                    url: $elem.find(".entry-title a").attr("href"),
                    date: articleDate.format('YYYY-MM-DD'),
                });
            }
        });

        return list;
    });

    setReqConf('https://reactjs.org/blog/all.html', ($) => {
        const list = [];
        $(".css-a5dudd").each((index, elem) => {
            const $elem = $(elem);
            const articleDate = dayjs($elem.find(".css-14mg9l4").text());
            if (articleDate.isSame(dateObj, 'day')) {
                list.push({
                    type: 'React',
                    title: $elem.find(".css-m6cbzp").text(),
                    url: `https://reactjs.org${ $elem.find(".css-m6cbzp").attr("href") }`,
                    date: articleDate.format('YYYY-MM-DD'),
                });
            }
        });

        return list;
    });

    run((list) => {
        if (!isForceUpdate && list.length === originRowCount) {
            console.log('nothing update');
            return;
        }

        sheetToday.addRows(list);
        writeToFile();
        console.log('\x1b[33m%s\x1b[0m', 'has updated');
    });
})();


