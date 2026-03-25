import type { Worksheet } from "exceljs";
import type { FormValues } from "../../../../components/Form/types";
import { borderStyle } from "../../../../constants/data";
import type { StudentsDataType } from "../../types";
type Props = {
  data: FormValues;
  lesson: string;
  workSheet: Worksheet;
  students: StudentsDataType[];
  headerColumnValues: number;
};

function BottomMath({
  data,
  workSheet,
  headerColumnValues,
  students,
  lesson,
}: Props) {
  const isEnglish = lesson === "Ingliz tili";
  const count = (title: boolean) => {
    const countArr = [];
    if (title) {
      for (let i = 0; i < headerColumnValues; i++) {
        countArr.push("");
      }

      return countArr;
    } else {
      for (let i = 0; i < headerColumnValues - 1; i++) {
        countArr.push("");
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
    cell.numFmt = "0";
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
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

  workSheet.insertRow(currentRow, ["O'rtacha foizi:", ...count(true)]);
  workSheet.mergeCells(`A${currentRow}:B${currentRow}`);

  const row2 = workSheet.getRow(currentRow);

  row2.eachCell((cell) => {
    cell.numFmt = "0";
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = borderStyle;
  });

  const firstExColumn = workSheet.getColumn(3).letter;
  const lastExColumn = workSheet.getColumn(headerColumnValues - 1).letter;
  let totalMaxScore = 0;
  const averageScoreRow = currentRow - 1;

  for (let col = 3; col <= headerColumnValues; col++) {
    const columnLetter = workSheet.getColumn(col).letter;

    if (col < headerColumnValues) {
      const maxScore = Number(data?.exercises[col - 3]?.score) || 0;
      totalMaxScore += maxScore;

      console.log(columnLetter, averageScoreRow);

      workSheet.getCell(`${columnLetter}${currentRow}`).value = {
        formula: `${columnLetter}${averageScoreRow}/${maxScore}*100`,
      };
    } else {
      workSheet.getCell(`${columnLetter}${currentRow}`).value = {
        formula: `${columnLetter}${averageScoreRow}/${totalMaxScore}*100`,
      };
    }
  }

  const percentColumnLetter = workSheet.getColumn(
    headerColumnValues + 1,
  ).letter;

  const averageFormula = `IFERROR(AVERAGEIF(${percentColumnLetter}4:${percentColumnLetter}${endRow},">0"),0)`;

  const lastColumnLetter = workSheet.getColumn(headerColumnValues + 1).letter;
  const lastCell = workSheet.getCell(`${lastColumnLetter}${currentRow}`);
  lastCell.value = {
    formula: averageFormula,
  };
  lastCell.font = { bold: true };
  lastCell.alignment = { horizontal: "center", vertical: "middle" };
  lastCell.border = borderStyle;

  //
  currentRow++;
  workSheet.insertRow(currentRow, ["Bo'shliq:", ...count(false)]);
  workSheet.mergeCells(`A${currentRow}:B${currentRow}`);

  const row3 = workSheet.getRow(currentRow);

  row3.eachCell((cell) => {
    cell.numFmt = "0";
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = borderStyle;
  });

  for (let col = 3; col <= headerColumnValues; col++) {
    const columnLetter = workSheet.getColumn(col).letter;

    workSheet.getCell(`${columnLetter}${currentRow}`).value = {
      formula: `IFERROR(100-${columnLetter}${currentRow - 1},0)`,
    };
  }
}

export default BottomMath;
