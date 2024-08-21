// 

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonComponent (){

  return (
  <div className="flex justify-center gap-10 items-center mx-auto my-auto w-[90%] h-[90%]" >
  <Box sx={{ width:'80%' }}>
          <Skeleton />
          <div className="flex">
            <Skeleton variant="circular" width={'20%'} height={'20vh'} />
            <Skeleton variant="rectangular" width={'80%'} height={'20vh'} />
          </div>
          <Skeleton animation="wave" />
          <Skeleton animation={true} />
  </Box>
  </div>
  )
}