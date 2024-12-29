import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import { IconButton, SvgIcon, Tooltip } from '@mui/material'
import { useDialog } from 'src/hooks/use-dialog'
import { SearchDialog } from './search-dialog'

export const SearchButton = () => {
  const dialog = useDialog()

  return (
    <>
      <Tooltip title='Search'>
        <IconButton onClick={dialog.handleOpen}>
          <SvgIcon fontSize='small'>
            <SearchOutlinedIcon />
          </SvgIcon>
        </IconButton>
      </Tooltip>
      <SearchDialog onClose={dialog.handleClose} open={dialog.open} />
    </>
  )
}
