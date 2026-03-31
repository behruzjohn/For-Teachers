import { Alert, Box, Typography } from "@mui/material";
import telegramIcon from "../../../../../assets/telegram.svg";

function FormAlert() {
  return (
    <Alert severity="info">
      <Typography variant="body2" sx={{ mb: 1 }}>
        CSHB uchun maxsus qulaylik joriy qilingan. Agar topshiriqlarda bir xil
        ball ko‘p takrorlansa, har biriga alohida ball kiritish o‘rniga
        o‘quvchining nechta to‘g‘ri bajarganligini kiritish orqali baholash
        mumkin. Tizim bu qiymatni avtomatik hisoblaydi.
      </Typography>

      <Typography variant="body2" sx={{ mb: 1 }}>
        Agar siz ham ushbu funksiyadan foydalanmoqchi bo‘lsangiz yoki taklif
        bildirmoqchi bo‘lsangiz, pastdagi telegram manzilga murojaat qiling:
      </Typography>

      <Box
        component="a"
        href="https://t.me/Behruzjon6789"
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          display: "inline-flex",
          alignItems: "center",
          textDecoration: "none",
          fontWeight: 500,
        }}
      >
        <img src={telegramIcon} alt="Telegram" width={32} height={32} />
        @Behruzjon6789
      </Box>
    </Alert>
  );
}

export default FormAlert;
