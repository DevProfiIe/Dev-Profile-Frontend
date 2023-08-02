/* Libraries & Hooks */
import { Box, CircularProgress } from '@mui/material';
import { Wrapper } from './loader.styles';

const Loader: React.FC = (): JSX.Element => {
  return (
    <Wrapper>
      <Box display='flex' alignItems='center' justifyContent='center' sx={{ height: '100%' }}>
        <CircularProgress />
      </Box>
    </Wrapper>
  );
};

export default Loader;
