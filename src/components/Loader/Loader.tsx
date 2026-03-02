import { CircularProgress } from '@mui/material';
import { StyleLoader } from './Loader.style';

type Props = {
  isInner?: boolean;
  minHeight?: number | string;
};

function Loader({ isInner, minHeight = 160 }: Props) {
  return (
    <StyleLoader minHeight={minHeight} className={isInner ? 'inner' : ''}>
      <CircularProgress />
    </StyleLoader>
  );
}

export default Loader;
