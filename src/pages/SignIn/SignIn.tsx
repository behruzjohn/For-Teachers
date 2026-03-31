import {
  Autocomplete,
  Button,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { StyleSignIn } from "./SignIn.style";
import { LESSONS } from "./constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [lessonVal, setLessonVal] = useState<string>("");
  const [teacherName, setTeacherName] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmitLogin = () => {
    if (lessonVal.length && teacherName.length) {
      const data = { name: teacherName, lesson: lessonVal };
      localStorage.setItem("teacherInfo", JSON.stringify(data));
      navigate("/home");
    }
  };

  return (
    <Container maxWidth="md">
      <StyleSignIn>
        <Stack p={1}>
          <Typography>Ro'yxatdan o'ting</Typography>
        </Stack>
        <Divider />
        <Stack mt={2} alignItems="center" justifyContent="center">
          <Stack className="container" gap={2}>
            <Stack gap={2} component="form">
              <TextField
                type="text"
                onChange={(item) => {
                  setTeacherName(item.target.value);
                }}
                required
                placeholder="To'lliq ism familyangizni kiriting"
              />

              <Autocomplete
                style={{ marginTop: 2 }}
                disablePortal
                value={lessonVal || null}
                options={LESSONS}
                onChange={(_, newValue) => {
                  setLessonVal(newValue || "");
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Qaysi fandan dars o'tasiz?" />
                )}
              />
            </Stack>
            <Button
              className="signInBtn"
              onClick={handleSubmitLogin}
              color="success"
              variant="contained"
            >
              Ro'yxatdan o'tish
            </Button>
          </Stack>
        </Stack>
      </StyleSignIn>
    </Container>
  );
}
export default SignIn;
