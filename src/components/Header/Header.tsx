import {
  Avatar,
  Box,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import schoolIcon from "../../assets/graduation-cap.png";
import { HEADER_PATH } from "./constants";
import { StyleHeader } from "./Header.style";
import { useLocation, useNavigate } from "react-router-dom";
import logOut from "../../assets/log-out.svg";
import { useState } from "react";
type HeaderLinkType = {
  title: string;
  path: string;
};
function Header() {
  const params = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const isLogin = localStorage.getItem("teacherInfo");

  const isMobile = useMediaQuery("(max-width: 768px)");

  let data;
  if (isLogin?.length) {
    data = JSON.parse(isLogin);
  }

  const onLogout = () => {
    localStorage.clear();
    setAnchorEl(null);
    navigate("/signIn");
  };

  return (
    <StyleHeader>
      <Stack
        className="header"
        flexDirection="row"
        justifyContent="space-around"
        alignItems="center"
        flexWrap="wrap"
        gap={isMobile ? 1 : 2}
      >
        <Stack flexDirection="row" alignItems="center">
          <IconButton disableRipple aria-disabled>
            <img
              src={schoolIcon}
              alt="icon"
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </IconButton>

          <Typography
            style={{ fontSize: 16 }}
            className="header-title"
            variant="caption"
          >
            11-maktab
          </Typography>
        </Stack>

        <Stack
          className="header_links"
          flexDirection="row"
          gap={isMobile ? 3 : 5}
        >
          {HEADER_PATH?.map((val: HeaderLinkType) => {
            return (
              <li className="header_links-li">
                <a
                  style={{
                    fontWeight: params.pathname === val.path ? 500 : 300,
                  }}
                  href={val?.path}
                >
                  {val?.title}
                </a>
              </li>
            );
          })}
        </Stack>
        {isLogin?.length ? (
          <Stack className="profile">
            <Box
              onClick={(e) => setAnchorEl(e.currentTarget)}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.25,
                px: 1.25,
                py: 0.75,
                borderRadius: 2,
                border: "1px solid",
                borderColor: open ? "primary.main" : "divider",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <Avatar
                src="/path/to/image.jpg"
                alt={data?.name}
                sx={{ width: 32, height: 32, fontSize: 13 }}
              />
              <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
                <Typography variant="body2" fontWeight={500} lineHeight={1.2}>
                  {data?.name}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  lineHeight={1.2}
                >
                  {data?.lesson}
                </Typography>
              </Box>
              <KeyboardArrowDownIcon
                sx={{
                  fontSize: 18,
                  color: "text.secondary",
                  transition: "transform 0.2s",
                  transform: open ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              slotProps={{
                paper: {
                  sx: { minWidth: 200, mt: 0.5, borderRadius: 2 },
                },
              }}
            >
              <MenuItem
                style={{ backgroundColor: "white", border: "1px dashed red" }}
                onClick={onLogout}
                sx={{
                  mt: 0.5,
                  mx: 0.75,
                  borderRadius: 1.5,
                  color: "error.main",
                  backgroundColor: "white",
                  gap: 1,
                }}
              >
                <img width={18} height={18} src={logOut} />
                Akkauntdan chiqish
              </MenuItem>
            </Menu>
          </Stack>
        ) : (
          <div
            className="containerOfProfile"
            onClick={() => navigate("/signIn")}
          >
            <Stack className="profile">
              <Chip
                className="chip"
                color="info"
                style={{ fontFamily: "system-ui" }}
                label="Ro'yxatdan o'ting!"
              />
            </Stack>
          </div>
        )}
      </Stack>
      <Divider style={{ marginTop: 12 }} />
    </StyleHeader>
  );
}
export default Header;
