import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import {
  borderStyle,
  borderStyleForHeaderTitle,
  Title,
} from '../../constants/data';
import { Container, Divider, Stack, Typography } from '@mui/material';
import Form from '../../components/Form/Form';
import { StyleHome } from './Home.style';
import type { FormValues } from '../../components/Form/types';
import BottomMath from './components/Math/Math';
import { useState } from 'react';
import Loader from '../../components/Loader/Loader';

function Home() {
  const [load, setLoad] = useState(false);
  const localData = localStorage.getItem('teacherInfo');
  let teacherName: string;
  if (localData?.length) {
    teacherName = JSON.parse(localData).name;
  }

  const handleClickDownload = async (data: FormValues) => {
    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet(`${data?.class}-sinf`);

    //header-title
    workSheet.mergeCells('A1:G1');
    workSheet.mergeCells('A2:G2');
    const titleCell = workSheet.getCell('A1');
    const titleCellDown = workSheet.getCell('A2');

    titleCell.value = Title;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.font = { bold: false, size: 12, color: { argb: '#000000' } };
    titleCellDown.border = borderStyle;
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
    };

    //title cell down
    titleCellDown.value = `${data?.class} -  fanidan  ${data?.chorak}   ${data?.examName} natijalari tahlili O'qituvchi: ${teacherName}`;
    titleCellDown.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCellDown.font = { bold: false, size: 12, color: { argb: '#000000' } };
    titleCellDown.border = borderStyleForHeaderTitle;
    titleCellDown.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
    };
    //

    //column

    const headerColumnValues = [
      '№',
      'FIO',
      ...data.exercises.map((e) => `${e.title}\n(${e.score}-bal)`),
      'Jami',
      '%',
    ];

    const headerRow = workSheet.addRow(headerColumnValues);

    data?.exercises.map((item, index) => {
      workSheet.getColumn(index + 3).width = item.width;
    });

    headerRow.height = 50;

    workSheet.getColumn(1).width = 5;
    workSheet.getColumn(2).width = 40;

    //

    //rows

    const firstExerciseColumnLetter = workSheet.getColumn(3).letter;
    const lastExerciseColumnLetter = workSheet.getColumn(
      data?.exercises?.length + 2,
    ).letter;

    const studentsColumn = workSheet.getColumn(2);
    const firstExerciseColumn = workSheet.getColumn(3);
    const lastExerciseColumn = workSheet.getColumn(data?.exercises?.length + 2);

    for (let i = 0; i < data?.countOfStudents; i++) {
      const row = workSheet.addRow([
        i + 1,
        ...new Array(data?.exercises.length + 1).fill(''),
        {
          formula: `SUM(${firstExerciseColumnLetter}${i + 4}:${lastExerciseColumnLetter}${i + 4})`,
        },
      ]);

      row.eachCell((cell) => {
        cell.border = borderStyle;
        cell.font = { bold: true, color: { argb: '000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' },
        };
      });
    }
    studentsColumn.font = { bold: false, color: { argb: '000000' } };
    firstExerciseColumn.font = { bold: false, color: { argb: '000000' } };
    lastExerciseColumn.font = { bold: false, color: { argb: '000000' } };

    BottomMath({
      data: data,
      workSheet: workSheet,
      headerColumnValues: headerColumnValues?.length - 1,
    });

    const percentColumnIndex = headerColumnValues.length;
    const totalColumnIndex = percentColumnIndex - 1;
    const lastRowNumber = workSheet.rowCount - 1;
    workSheet.getColumn(percentColumnIndex).eachCell((cell, index) => {
      const totalCell = workSheet.getCell(index, totalColumnIndex);
      if (index > 3 && index <= lastRowNumber - 2) {
        cell.border = borderStyle;
        cell.font = { bold: true, color: { argb: '000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFFFF' },
        };

        cell.value = {
          formula: `${totalCell.address}/${data?.totalScore}*100`,
        };
      }
    });

    //style

    workSheet.getRow(3).eachCell((cell) => {
      cell.font = { bold: true, color: { argb: '000000' } };
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFFFF' },
      };
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
      };
      cell.border = borderStyle;
    });
    //

    //save
    const buffer = await workBook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    saveAs(
      blob,
      `${data?.class} sinf ${data?.chorak} chorak ${data?.examName} baholar tahlili (${teacherName}).xlsx`,
    );
  };

  const onsubmit = (data: FormValues) => {
    handleClickDownload(data);
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 800);
  };

  return (
    <>
      {load && <Loader />}
      <Container maxWidth='md'>
        <StyleHome>
          <Stack className='form-header'>
            <Typography ml={3} variant='h5' fontSize={16} fontWeight={500}>
              Create Exel File
            </Typography>
            <Divider className='divider' />
          </Stack>
          <Stack alignItems='center'>
            <Form onSubmit={onsubmit} />
          </Stack>
        </StyleHome>
      </Container>
    </>
  );
}

export default Home;
