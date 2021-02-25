const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
let originWorksheetRowCount = 1; // 预留一条数据给标题的

function getOriginWorksheetRowCount () {
    return originWorksheetRowCount - 1;
}

function setColumn (worksheet) {
    worksheet.columns = [
        {
            header: '标题',
            key: 'title',
            width: 50,
        },
        {
            header: '文章类别',
            key: 'type',
            width: 30,
        },
        {
            header: '发布日期',
            key: 'date',
            width: 20,
        },
        {
            header: '是否阅读',
            key: '',
            width: 10,
        },
        {
            header: '链接',
            key: 'url',
            width: 100,
        },
    ]
}

async function initOrGetWorksheet (name) {
    try {
        await workbook.xlsx.readFile("./articlelist.xlsx");
    } catch (e) {

    }

    let worksheet = workbook.getWorksheet(name);

    if (worksheet) {
        originWorksheetRowCount = worksheet.rowCount;
        workbook.removeWorksheet(name)
    }

    worksheet = workbook.addWorksheet(name);
    setColumn(worksheet);

    return worksheet;
}

function writeToFile () {
    const worksheetNum = workbook.worksheets.length;
    workbook.views = [
        {
            firstSheet: worksheetNum - 4, activeTab: worksheetNum - 1, visibility: 'visible'
        }
    ]
    workbook.xlsx.writeFile('./articlelist.xlsx')
}

module.exports = {
    initOrGetWorksheet,
    writeToFile,
    getOriginWorksheetRowCount,
}
