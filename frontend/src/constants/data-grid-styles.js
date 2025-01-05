export const defaultDataGridStyles = {
  minHeight: 400,
  '& .MuiDataGrid-columnHeaders': {
    backgroundColor: (theme) =>
      `${theme.palette.mode === 'dark' ? '#424242' : '#eee'} !important`,
    borderBottom: (theme) =>
      `1px solid ${
        theme.palette.mode === 'dark' ? theme.palette.neutral[900] : '#F2F4F7'
      }`,
  },
  '& .MuiDataGrid-row': {
    borderBottom: (theme) =>
      `1px solid ${
        theme.palette.mode === 'dark' ? theme.palette.neutral[900] : '#F2F4F7'
      }`,
  },
}
