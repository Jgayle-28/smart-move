import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material'
import { useRef } from 'react'

import { EstimateContainer } from './EstimateContainer'
import { EstimateSideBar } from './EstimateSideBar'

function Review({ toggleSidebar, sideBarOpen }) {
  const rootRef = useRef(null)
  return (
    <>
      <Box
        component='main'
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <EstimateSideBar
            currentTab='review'
            container={rootRef.current}
            onClose={toggleSidebar}
            open={sideBarOpen}
          />
          <EstimateContainer open={true}>
            <Card sx={{ marginTop: 3 }}>
              <Box
                display='flex'
                alignItems='center'
                direction='row'
                justifyContent='space-between'
                sx={{ padding: 2 }}
              >
                <div>
                  <Typography sx={{ paddingLeft: 1 }} variant='h6'>
                    Item List
                  </Typography>
                </div>
                <Stack alignItems='center' direction='row' spacing={1}>
                  {/* <Button
                    color='inherit'
                    startIcon={
                      <SvgIcon>
                        <FilterFunnel01Icon />
                      </SvgIcon>
                    }
                    onClick={toggleSidebar}
                  >
                    Rooms
                  </Button> */}
                  {/* <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant='contained'
                  >
                    New
                  </Button> */}
                </Stack>
              </Box>
              <Divider />
              <CardContent>
                <h1>Temp Stuff</h1>
              </CardContent>
            </Card>
          </EstimateContainer>
        </Box>
      </Box>
    </>
  )
}

export default Review
