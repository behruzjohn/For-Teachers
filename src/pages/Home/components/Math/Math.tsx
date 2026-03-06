import type { Worksheet } from 'exceljs';
import type { FormValues } from '../../../../components/Form/types';
import { borderStyle } from '../../../../constants/data';
import type { StudentsDataType } from '../../types';
type Props = {
  data: FormValues;
  workSheet: Worksheet;
  students: StudentsDataType[];
  headerColumnValues: number;
};

function BottomMath({ data, workSheet, headerColumnValues, students }: Props) {
  const count = (title: boolean) => {
    const countArr = [];
    if (title) {
      for (let i = 0; i < headerColumnValues; i++) {
        countArr.push('');
      }

      return countArr;
    } else {
      for (let i = 0; i < headerColumnValues - 1; i++) {
        countArr.push('');
      }
      return countArr;
    }
  };

  let currentRow = Number(students?.length) + 4;

  const endRow = currentRow - 1;

  workSheet.insertRow(currentRow, ["O'rtacha ball:", ...count(true)]);
  workSheet.mergeCells(`A${currentRow}:B${currentRow}`);

  const row1 = workSheet.getRow(currentRow);

  row1.eachCell((cell) => {
    cell.numFmt = '0';
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = borderStyle;
  });

  for (let col = 3; col <= headerColumnValues + 1; col++) {
    const columnLetter = workSheet.getColumn(col).letter;

    workSheet.getCell(`${columnLetter}${currentRow}`).value = {
      formula: `AVERAGE(${columnLetter}4:${columnLetter}${endRow})`,
    };
  }

  //
  currentRow++;

  workSheet.insertRow(currentRow, ["O'rtacha foizi:", ...count(false)]);
  workSheet.mergeCells(`A${currentRow}:B${currentRow}`);

  const row2 = workSheet.getRow(currentRow);

  row2.eachCell((cell) => {
    cell.numFmt = '0';
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = borderStyle;
  });

  for (let col = 3; col <= headerColumnValues; col++) {
    const columnLetter = workSheet.getColumn(col).letter;
    const score =
      col === headerColumnValues
        ? `${columnLetter}${currentRow - 1}*${data?.totalScore}/100`
        : `${columnLetter}${currentRow - 1}*${data?.exercises[col - 3]?.score}/100`;

    workSheet.getCell(`${columnLetter}${currentRow}`).value = {
      formula: score,
    };
  }

  //
  currentRow++;
  workSheet.insertRow(currentRow, ["Bo'shliq:", ...count(false)]);
  workSheet.mergeCells(`A${currentRow}:B${currentRow}`);

  const row3 = workSheet.getRow(currentRow);

  row3.eachCell((cell) => {
    cell.numFmt = '0';
    cell.font = { bold: true };
    cell.alignment = { horizontal: 'center', vertical: 'middle' };
    cell.border = borderStyle;
  });

  for (let col = 3; col <= headerColumnValues; col++) {
    const columnLetter = workSheet.getColumn(col).letter;

    workSheet.getCell(`${columnLetter}${currentRow}`).value = {
      formula: `100-${columnLetter}${currentRow - 1}`,
    };
  }
}

export default BottomMath;
