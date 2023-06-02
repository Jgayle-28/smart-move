import React from 'react'

function EstiamteListTable() {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* {enableBulkActions && (
        <Stack
          direction='row'
          spacing={2}
          sx={{
            alignItems: 'center',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? 'neutral.800' : 'neutral.50',
            display: enableBulkActions ? 'flex' : 'none',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            px: 2,
            py: 0.5,
            zIndex: 10,
          }}
        >
          <Checkbox
            checked={selectedAll}
            indeterminate={selectedSome}
            onChange={(event) => {
              if (event.target.checked) {
                onSelectAll?.()
              } else {
                onDeselectAll?.()
              }
            }}
          />
          <Button color='inherit' size='small'>
            Delete
          </Button>
          <Button color='inherit' size='small'>
            Edit
          </Button>
        </Stack>
      )} */}
      <Scrollbar>
        <Table sx={{ minWidth: 700 }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding='checkbox'>
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      onSelectAll?.()
                    } else {
                      onDeselectAll?.()
                    }
                  }}
                />
              </TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Address</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers && customers.length ? (
              customers.map((customer) => {
                // const isSelected = selected.includes(customer.id)
                // const location = `${customer.city}, ${customer.state}, ${customer.country}`
                // const totalSpent = numeral(customer.totalSpent).format(
                //   `${customer.currency}0,0.00`
                // )

                return (
                  <TableRow hover key={customer.id}>
                    {/* <TableCell padding='checkbox'>
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectOne?.(customer.id)
                        } else {
                          onDeselectOne?.(customer.id)
                        }
                      }}
                      value={isSelected}
                    />
                  </TableCell> */}
                    <TableCell>
                      <Stack alignItems='center' direction='row' spacing={1}>
                        <Avatar
                          // src={customer.avatar}
                          sx={{
                            height: 42,
                            width: 42,
                            bgcolor: stringToColor(customer.customerName),
                          }}
                        >
                          {getInitials(customer.customerName)}
                        </Avatar>
                        <div>
                          <Link
                            color='inherit'
                            component={RouterLink}
                            href={paths.dashboard.customers.details}
                            variant='subtitle2'
                          >
                            {customer.customerName}
                          </Link>
                          <Typography color='text.secondary' variant='body2'>
                            {customer.customerEmail}
                          </Typography>
                        </div>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {formatPhoneNumber(customer.customerPhoneNumber)}
                    </TableCell>
                    <TableCell>{customer.customerEmail}</TableCell>
                    <TableCell>
                      <Typography variant='subtitle2'>
                        {customer.customerAddress}
                      </Typography>
                    </TableCell>
                    <TableCell align='right'>
                      <IconButton
                        component={RouterLink}
                        href={`/dashboard/customers/${customer._id}/edit`}
                      >
                        <SvgIcon fontSize='small'>
                          <Edit02Icon />
                        </SvgIcon>
                      </IconButton>
                      <IconButton
                        component={RouterLink}
                        href={`/dashboard/customers/${customer._id}`}
                      >
                        <SvgIcon fontSize='small'>
                          <ArrowRightIcon />
                        </SvgIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} align='center'>
                  You Have not added any customers yet
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Scrollbar>
      {customers.length && customers.length > rowsPerPage && (
        <TablePagination
          component='div'
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      )}
    </Box>
  )
}

export default EstiamteListTable
