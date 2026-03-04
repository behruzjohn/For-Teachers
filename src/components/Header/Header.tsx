import {
  Avatar,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import schoolIcon from '../../assets/graduation-cap.png';
import { HEADER_PATH } from './constants';
import { StyleHeader } from './Header.style';
import { useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const params = useLocation();
  const navigate = useNavigate();
  const isLogin = localStorage.getItem('teacherInfo');

  const isMobile = useMediaQuery('(max-width: 768px)');

  let data;
  if (isLogin?.length) {
    data = JSON.parse(isLogin);
  }

  return (
    <StyleHeader>
      <Stack
        className='header'
        flexDirection='row'
        justifyContent='space-around'
        alignItems='center'
        flexWrap='wrap'
        gap={isMobile ? 1 : 2}
      >
        <Stack flexDirection='row' alignItems='center'>
          <IconButton disableRipple aria-disabled>
            <img
              src={schoolIcon}
              alt='icon'
              width={isMobile ? 20 : 24}
              height={isMobile ? 20 : 24}
            />
          </IconButton>

          <Typography
            style={{ fontSize: 16 }}
            className='header-title'
            variant='caption'
          >
            11-maktab
          </Typography>
        </Stack>

        <Stack
          className='header_links'
          flexDirection='row'
          gap={isMobile ? 3 : 5}
        >
          {HEADER_PATH?.map((val) => {
            return (
              <li className='header_links-li'>
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
          <Stack className='profile'>
            <CardHeader
              avatar={<Avatar src='/path/to/image.jpg' alt={data?.name} />}
              title={data?.name}
              subheader={data?.lesson}
            />
          </Stack>
        ) : (
          <div
            className='containerOfProfile'
            onClick={() => navigate('/signIn')}
          >
            <Stack className='profile'>
              <Chip
                className='chip'
                color='info'
                style={{ fontFamily: 'system-ui' }}
                label="Ro'yxatdan o'ting!"
              />
            </Stack>
          </div>
        )}
      </Stack>
      <Divider />
    </StyleHeader>
  );
}
export default Header;
