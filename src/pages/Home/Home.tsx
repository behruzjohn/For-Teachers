import { saveAs } from 'file-saver';
import ExcelJS from 'exceljs';
import {
  borderStyle,
  borderStyleForHeaderTitle1,
  borderStyleForHeaderTitle2,
  Title,
} from '../../constants/data';
import { Container, Divider, Stack, Typography } from '@mui/material';
import Form from '../../components/Form/Form';
import { StyleHome } from './Home.style';
import type { FormValues } from '../../components/Form/types';
import BottomMath from './components/Math/Math';
import { useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { createClient } from '@supabase/supabase-js';
import type { classType, StudentsDataType } from './types';

function Home() {
  const [load, setLoad] = useState(false);
  const localData = localStorage.getItem('teacherInfo');
  const [classes, setClasses] = useState<classType[]>([]);
  const [students, setStudents] = useState<StudentsDataType[]>([]);
  const [allStudents, setAllStudents] = useState<StudentsDataType[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  let teacherName: string = '';
  let lesson = '';
  if (localData) {
    teacherName = JSON.parse(localData).name;
    lesson = JSON.parse(localData).lesson;
  }

  const subbaseUrl = 'https://oaglxlhfzfhblwrzsplh.supabase.co';
  const subbaseKey = 'sb_publishable_cD0WY9xAVN9xB71aHYwMKw__OoVtT_b';
  const subbase = createClient(subbaseUrl, subbaseKey);

  useEffect(() => {
    const getClassData = async () => {
      const { data } = await subbase.from('available_classes').select('*');

      if (data) {
        setClasses(data);
      }
    };
    getClassData();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoad(true);
      const { data } = await subbase.from('students').select('*');

      if (data) {
        const filtered = data.filter(
          (item) => item.className === selectedClass,
        );

        setAllStudents(filtered.sort());
        setStudents(filtered.sort());
      }
      setLoad(false);
    };
    fetchStudents();
  }, [selectedClass]);

  const handleChangeGender = (newGender: string) => {
    if (newGender === "O'gil bolalar") {
      setStudents(allStudents.filter((student) => student.gender === 'male'));
    } else if (newGender === 'Qiz bolalar') {
      setStudents(allStudents.filter((student) => student.gender === 'female'));
    } else {
      setStudents(allStudents);
    }
  };

  const handleClickDownload = async (data: FormValues) => {
    const headerColumnValues = [
      '№',
      'FIO',
      ...data.exercises.map((e) => `${e.title}\n(${e.score}-bal)`),
      'Jami',
      '%',
    ];

    const workBook = new ExcelJS.Workbook();
    const workSheet = workBook.addWorksheet(`${data?.class}-sinf`);

    //header-title
    const lastColumnLetter = workSheet.getColumn(
      headerColumnValues.length,
    ).letter;

    workSheet.mergeCells(`A1:${lastColumnLetter}1`);
    workSheet.mergeCells(`A2:${lastColumnLetter}2`);

    const titleCell = workSheet.getCell('A1');
    const titleCellDown = workSheet.getCell('A2');

    titleCell.value = Title;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCell.font = { bold: false, size: 12, color: { argb: '#000000' } };
    titleCell.border = borderStyleForHeaderTitle1;
    titleCell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
    };

    //title cell down
    titleCellDown.value = `${data?.class} sinf ${lesson} -  fanidan  ${data?.chorak}   ${data?.examName} natijalari tahlili O'qituvchi: ${teacherName}`;
    titleCellDown.alignment = { horizontal: 'center', vertical: 'middle' };
    titleCellDown.font = { bold: false, size: 12, color: { argb: '#000000' } };
    titleCellDown.border = borderStyleForHeaderTitle2;
    titleCellDown.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFFFFF' },
    };
    //

    //column

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

    for (let i = 0; i < students?.length; i++) {
      const row = workSheet.addRow([
        i + 1,
        students[i].fullName,
        ...new Array(data?.exercises.length).fill(''),
        {
          formula: `SUM(${firstExerciseColumnLetter}${i + 4}:${lastExerciseColumnLetter}${i + 4})`,
        },
      ]);

      row.eachCell((cell) => {
        cell.border = borderStyle;
        cell.font = { bold: false, color: { argb: '000000' } };

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
      students: students,
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

    workSheet.getColumn(totalColumnIndex).eachCell((cell, rowNumber) => {
      if (rowNumber > 3) {
        cell.font = { bold: true, color: { argb: '000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });

    workSheet.getColumn(1).eachCell((cell, rowNumber) => {
      if (rowNumber > 3) {
        cell.font = { bold: true, color: { argb: '000000' } };
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
      }
    });

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
              Hisobot yaratish
            </Typography>
            <Divider className='divider' />
          </Stack>
          <Stack alignItems='center'>
            <Form
              setSelectedClass={setSelectedClass}
              classNameData={classes}
              handleChangeGender={handleChangeGender}
              onSubmit={onsubmit}
            />
          </Stack>
        </StyleHome>
      </Container>
    </>
  );
}

export default Home;
