// 

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

export default function SkeletonComponent (){

  return (
    <div className="my-[5vh]">

  <div className="flex justify-center gap-10 items-center mx-auto my-auto w-[90%] h-[90%]" >
  <Box sx={{ width:'80%' }}>
          <Skeleton />
            <div className="flex flex-col">
              <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
              <br/>
              <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
              <br/>
              <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
              <br/>
              <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
              <br/>
              <Skeleton variant="rectangular" width={'100%'} height={'10vh'} />
              <br/>
            </div>
       
          <Skeleton animation={true} />
  </Box>
  </div>
    </div>
  )
}