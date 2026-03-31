import {
  Autocomplete,
  Button,
  FormControl,
  Stack,
  TextField,
} from "@mui/material";

import { Controller, useFieldArray, useForm } from "react-hook-form";
import { StyleForm } from "./Form.style";
import { Choraks, FORM_OPTIONS, Genders } from "./constants";
import type { FormValues } from "./types";
import download from "../../assets/download.svg";
import type { classType, StudentsDataType } from "../../pages/Home/types";
import { handleChangeGender } from "../../pages/Home/helpers";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import ExercisesField from "./components/ExersizesField/ExersizesField";
import FormAlert from "./components/ExersizesField/NotificationForm/NotificationForm";

type FormProps = {
  onSubmit: (data: FormValues) => void;
  classNameData: classType[];
  allStudents: StudentsDataType[];
  setStudents: Dispatch<SetStateAction<StudentsDataType[]>>;
  setSelectedClass: React.Dispatch<React.SetStateAction<string>>;
};

function Form({
  setSelectedClass,
  classNameData,
  onSubmit,
  allStudents,

  setStudents,
}: FormProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    watch,
  } = useForm<FormValues>({
    defaultValues: {
      exercises: [{ title: "Topshiriq 1", score: "", width: 14 }],
    },
  });

  const classForm = watch("class");

  useEffect(() => {
    resetField("gender");
  }, [classForm]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  return (
    <StyleForm>
      <Stack
        mb={4}
        gap={2.4}
        component="form"
        className="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormAlert />
        <Stack flexDirection="row" gap={2}>
          <Controller
            name="examName"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className="examName">
                <Autocomplete
                  {...field}
                  disablePortal
                  value={field.value || null}
                  options={FORM_OPTIONS}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="CHSB yoki BSB ni kiriting" />
                  )}
                />
              </FormControl>
            )}
          />
          <Controller
            name="chorak"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className="examName">
                <Autocomplete
                  {...field}
                  disablePortal
                  options={Choraks}
                  value={field.value ? String(field.value) : ""}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Chorakni tanlang" />
                  )}
                />
              </FormControl>
            )}
          />
        </Stack>
        <Stack flexDirection="row" gap={2}>
          <Controller
            name="class"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className="class">
                <Autocomplete
                  {...field}
                  disablePortal
                  options={classNameData}
                  value={(field?.value as unknown as classType) || null}
                  onChange={(_, newValue: classType | null) => {
                    field.onChange(newValue);

                    setSelectedClass(
                      typeof newValue === "string" ? newValue : "",
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Sinfni tanlang" />
                  )}
                />
              </FormControl>
            )}
          />

          <Controller
            name="gender"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControl fullWidth className="class">
                <Autocomplete
                  {...field}
                  disablePortal
                  options={Genders}
                  value={field.value ? String(field.value) : ""}
                  onChange={(_, newValue) => {
                    field.onChange(newValue);
                    handleChangeGender(
                      newValue || "",
                      allStudents,
                      setStudents,
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Jinsini tanlang" />
                  )}
                />
              </FormControl>
            )}
          />
        </Stack>
        <Controller
          name="totalScore"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth className="count-of-students">
              <TextField
                label="Jami ballni kiriting..."
                type="number"
                {...field}
                required
                error={!!errors[field.name]}
              />
            </FormControl>
          )}
        />

        <ExercisesField
          fields={fields}
          remove={remove}
          append={append}
          errors={errors}
          control={control}
        />

        <Stack>
          <Button
            style={{ height: 40 }}
            color="success"
            startIcon={<img width={20} height={20} src={download} />}
            variant="contained"
            type="submit"
          >
            Yuklab olish
          </Button>
        </Stack>
      </Stack>
    </StyleForm>
  );
}
export default Form;
