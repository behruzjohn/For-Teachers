import {
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  Controller,
  type Control,
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
} from "react-hook-form";
import add from "../../../../assets/add.svg";
import deleteIcon from "../../../../assets/delete.svg";
import assignment from "../../../../assets/add-file.png";

import { type FormValues } from "../../types/index";

type Props = {
  fields: FieldArrayWithId<FormValues, "exercises", "id">[];
  control: Control<FormValues>;
  append: UseFieldArrayAppend<FormValues, "exercises">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<FormValues>;
};
function ExercisesField({ fields, control, append, remove, errors }: Props) {
  return (
    <div className="exercises">
      <div className="exercises-header">
        <img src={assignment} alt="icon" width={22} height={22} />
        <Typography>Topshiriqlar</Typography>
      </div>

      {fields.map((item, index) => (
        <Stack key={item.id} flexDirection="row" gap={1} mb={2}>
          <Stack style={{ width: "100%" }}>
            <Controller
              name={`exercises.${index}.score`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label={`Topshiriq ${index + 1}`}
                  style={{ marginTop: 4 }}
                  {...field}
                  type="number"
                  required
                  error={!!errors?.exercises?.[index]?.score}
                  placeholder="Balini kiriting"
                />
              )}
            />
          </Stack>
          <Stack mt={1.1}>
            <IconButton
              onClick={() => remove(index)}
              disabled={fields.length === 1}
            >
              <img width={24} height={24} src={deleteIcon} />
            </IconButton>
          </Stack>
        </Stack>
      ))}
      <Stack alignItems="flex-end" justifyContent="center">
        <Button
          startIcon={<img width={24} height={24} src={add} />}
          color="info"
          size="small"
          variant="contained"
          onClick={() =>
            append({
              title: `Topshiriq ${fields.length + 1}`,
              score: "",
              width: 14,
            })
          }
        >
          Yana topshiriq qo'shish
        </Button>
      </Stack>
    </div>
  );
}

export default ExercisesField;
