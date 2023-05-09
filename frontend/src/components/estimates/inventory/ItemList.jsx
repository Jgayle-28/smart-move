import {
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Stack,
} from '@mui/material'
import { Scrollbar } from 'src/components/scrollbar'

function ItemList({ currentRoomItems, handleAddItemClick }) {
  return (
    <>
      <div>
        <Scrollbar
          sx={{
            height: 400,
          }}
        >
          <List>
            {currentRoomItems.map((item) => (
              <ListItemButton
                key={item.itemName}
                sx={{
                  borderBottomWidth: 1,
                  borderBottomStyle: 'solid',
                  borderBottomColor: 'divider',
                }}
                onClick={() => handleAddItemClick(item)}
              >
                <ListItemText
                  sx={{ textAlign: 'center' }}
                  primary={
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      {item.itemName}
                      <Typography variant='caption' color='text.secondary'>
                        {item.itemWeight} / {item.itemVolume}
                      </Typography>
                    </Stack>
                  }
                />
              </ListItemButton>
            ))}
          </List>
        </Scrollbar>
      </div>
    </>
  )
}

export default ItemList
