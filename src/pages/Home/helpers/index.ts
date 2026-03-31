import type { Dispatch, SetStateAction } from "react";
import type { classType, StudentsDataType } from "../types";
import { subbase } from "../constants";

export const handleChangeGender = (
  newGender: string,
  allStudents: StudentsDataType[],
  setStudents: Dispatch<SetStateAction<StudentsDataType[]>>,
) => {
  const middle = Math.ceil(allStudents.length / 2);

  if (newGender === "O'gil bolalar") {
    setStudents(allStudents.filter((student) => student.gender === "male"));
  } else if (newGender === "Qiz bolalar") {
    setStudents(allStudents.filter((student) => student.gender === "female"));
  } else if (newGender === "1-guruh") {
    setStudents(allStudents.slice(0, middle));
  } else if (newGender === "2-guruh") {
    setStudents(allStudents.slice(middle));
  } else {
    setStudents(allStudents);
  }
};

export const getClassData = async (
  setClasses: Dispatch<SetStateAction<classType[]>>,
  setLoad: Dispatch<SetStateAction<boolean>>,
) => {
  setLoad(true);
  const { data } = await subbase.from("available_classes").select("*");
  if (data) {
    setLoad(false);
    setClasses(data.map((item) => item.class_name));
  }
};

export const fetchStudents = async (
  setLoad: Dispatch<SetStateAction<boolean>>,
  selectedClass: string,
  setStudents: Dispatch<SetStateAction<StudentsDataType[]>>,
  setAllStudents: Dispatch<SetStateAction<StudentsDataType[]>>,
) => {
  setLoad(true);
  const { data } = await subbase
    .from("students")
    .select("*")
    .eq("className", selectedClass);

  if (data) {
    setAllStudents(data.sort());
    setStudents(data.sort());
  }
  setLoad(false);
};
