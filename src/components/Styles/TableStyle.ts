import type { Table } from "exceljs";
import ExcelJS from "exceljs";
import { borderStyle } from "../../constants/data";

const StyleTable = (workSheet: ExcelJS.Worksheet, totalColumnIndex: number) => {
  workSheet.getColumn(totalColumnIndex).eachCell((cell, rowNumber) => {
    if (rowNumber > 3) {
      cell.font = { bold: true, color: { argb: "000000" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    }
  });

  workSheet.getColumn(1).eachCell((cell, rowNumber) => {
    if (rowNumber > 3) {
      cell.font = { bold: true, color: { argb: "000000" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
    }
  });

  workSheet.getRow(3).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "000000" } };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFFFFFF" },
    };
    cell.alignment = {
      horizontal: "center",
      vertical: "middle",
      wrapText: true,
    };
    cell.border = borderStyle;
  });
};
export default StyleTable;
