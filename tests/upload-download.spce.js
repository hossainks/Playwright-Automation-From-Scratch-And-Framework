const ExcelJS = require('exceljs');

async function readExcel(sheet, searchText) {
  let output = { row: -1, col: -1 };
  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, colNumber) => {
      if (cell.value === searchText) {
        output.row = rowNumber;
        output.col = colNumber;
      }
    });
  });
  return output;
}

async function updateExcel(
  workSheet,
  workbook,
  output,
  targetText,
  filePath,
  change
) {
  if (output.row !== -1) {
    const cell = workSheet.getCell(output.row, output.col + change.changeCol);
    cell.value = targetText;
    await workbook.xlsx.writeFile(filePath);
    console.log('Updated successfully!');
  } else {
    console.log(`Targeted cell not found in the sheet.`);
  }
}

async function processExcel(filePath, searchText, targetText, change) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const workSheet = workbook.getWorksheet('Sheet1');

  // Update the cell if found
  const output = await readExcel(workSheet, searchText);
  await updateExcel(workSheet, workbook, output, targetText, filePath, change);
}

processExcel('download.xlsx', 'Mango', 350, { changeRow: 0, changeCol: 2 });
