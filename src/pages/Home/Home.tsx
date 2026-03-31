import { Container, Divider, Stack, Typography } from "@mui/material";
import Form from "../../components/Form/Form";
import { StyleHome } from "./Home.style";
import type { FormValues } from "../../components/Form/types";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import type { classType, StudentsDataType } from "./types";
import handleClickDownload from "../../components/TableActions/TableActions";
import { fetchStudents, getClassData } from "./helpers";

function Home() {
  const [load, setLoad] = useState(false);
  const localData = localStorage.getItem("teacherInfo");
  const [classes, setClasses] = useState<classType[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [students, setStudents] = useState<StudentsDataType[]>([]);
  const [allStudents, setAllStudents] = useState<StudentsDataType[]>([]);

  let teacherName: string = "";
  let lesson = "";

  if (localData) {
    teacherName = JSON.parse(localData).name;
    lesson = JSON.parse(localData).lesson;
  }

  useEffect(() => {
    getClassData(setClasses, setLoad);
  }, []);

  useEffect(() => {
    if (selectedClass?.length) {
      fetchStudents(setLoad, selectedClass, setStudents, setAllStudents);
    }
  }, [selectedClass]);

  const onsubmit = (data: FormValues) => {
    setLoad(true);
    handleClickDownload(teacherName, data, lesson, students);
    setTimeout(() => {
      setLoad(false);
    }, 800);
  };

  return (
    <>
      {load && <Loader />}
      <Container maxWidth="md">
        <StyleHome>
          <Stack className="form-header">
            <Typography ml={3} variant="h5" fontSize={16} fontWeight={500}>
              Hisobot yaratish
            </Typography>
            <Divider className="divider" />
          </Stack>
          <Stack alignItems="center">
            <Form
              setSelectedClass={setSelectedClass}
              classNameData={classes}
              onSubmit={onsubmit}
              allStudents={allStudents}
              setStudents={setStudents}
            />
          </Stack>
        </StyleHome>
      </Container>
    </>
  );
}

export default Home;
