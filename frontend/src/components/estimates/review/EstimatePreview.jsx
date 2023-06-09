import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import {
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { Logo } from 'src/components/logo'
import Spinner from 'src/components/shared/Spinner'
import { useSelector } from 'react-redux'
import { formatPhoneNumber } from 'src/utils/format-phone-number'

// import parse from 'html-react-parser'

export const EstimatePreview = (props) => {
  const { focusJob } = useSelector((state) => state.jobs)
  const { company } = useSelector((state) => state.company)
  const { focusEstimate } = useSelector((state) => state.estimates)

  if (!focusEstimate || !focusJob || !company) return <Spinner />
  return (
    <Card sx={{ p: 6 }}>
      <Stack
        alignItems='flex-start'
        direction='row'
        justifyContent='space-between'
        spacing={3}
      >
        {/*----- Header ----- */}
        <div>
          <Box
            sx={{
              display: 'inline-flex',
              height: 24,
              width: 24,
            }}
          >
            <Logo />
          </Box>
          <Typography variant='h4'>{company?.companyName || ''}</Typography>
        </div>

        <div>
          <Typography variant='caption'>
            {company?.companyEmail || ''}
            <br />
            {formatPhoneNumber(company?.companyPhoneNumber) || ''}
            <br />
            www.fillerwebsite.com
          </Typography>
        </div>
      </Stack>

      {/*----- Move Data -----*/}
      <Box sx={{ mt: 10 }}>
        <Grid container justifyContent='space-between'>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='body2'>
              Customer: {focusJob?.customer?.customerName || ''}
            </Typography>

            <Typography gutterBottom variant='body2'>
              Phone:{' '}
              {formatPhoneNumber(focusJob?.customer?.customerPhoneNumber) || ''}
            </Typography>

            <Typography gutterBottom variant='body2'>
              Email: {focusJob?.customer?.customerEmail || ''}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='body2'>
              Customer Rep: {focusJob?.createdBy?.name || ''}
            </Typography>

            <Typography gutterBottom variant='body2'>
              Rep Phone: {formatPhoneNumber(company?.companyPhoneNumber) || ''}
            </Typography>

            <Typography gutterBottom variant='body2'>
              Rep Email: {focusJob?.createdBy?.email || ''}
            </Typography>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography gutterBottom variant='body2'>
              Move Date:{' '}
              {focusJob?.jobDate
                ? format(new Date(focusJob?.jobDate), 'MM/dd/yyyy')
                : 'TBD'}
            </Typography>
            <Typography gutterBottom variant='body2'>
              Move Time:{' '}
              {focusJob?.jobStartTime
                ? format(new Date(focusJob?.jobStartTime), 'hh:mm aa')
                : 'TBD'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      {/*------ To & From ------*/}
      <Box sx={{ mt: 6 }}>
        <Grid container justifyContent='space-between'>
          <Grid xs={12} md={6}>
            <Typography gutterBottom variant='body2'>
              Moving From:{' '}
              {focusJob?.pickUpAddress?.description?.length
                ? focusJob?.pickUpAddress?.description
                : 'TBD'}
            </Typography>
          </Grid>
          <Grid xs={12} md={6}>
            <Typography gutterBottom variant='body2'>
              Moving To:{' '}
              {focusJob?.dropOffAddress?.length
                ? focusJob?.dropOffAddress?.description
                : 'TBD'}
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Table sx={{ mt: 6 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              Move Charges
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell width='75%'>Move Hours</TableCell>
            <TableCell align='right'>
              {focusEstimate?.moveCharges?.totalMoveHours} hr(s)
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell width='75%'>
              {' '}
              Move charges based on {focusEstimate?.moveCharges?.totalMen} men &{' '}
              {focusEstimate?.moveCharges?.totalTrucks}
              truck(s) for {focusEstimate?.moveCharges?.totalMoveHours} hours @{' '}
              {focusEstimate?.moveCharges?.ratePerHour}/hr
            </TableCell>
            <TableCell align='right'>
              <Typography variant='subtitle1'>
                ${focusEstimate?.moveCharges?.totalMoveCost.toLocaleString()}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*----- Packing Charges -----*/}
      {focusEstimate?.packing?.packingItems.length && (
        <Table sx={{ mt: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4}>
                Packing Charges
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sub header / cell desc */}
            <TableRow>
              <TableCell>Packing Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
            {focusEstimate?.packing?.packingItems.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.packingItem}</TableCell>
                <TableCell>{parseFloat(item.packingItemQty)}</TableCell>
                <TableCell>{parseFloat(item.packingItemPrice)}</TableCell>
                <TableCell align='right'>
                  ${parseFloat(item.packingTotalItemAmt).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                  <Typography variant='subtitle1'>Total</Typography>
                  <Typography variant='subtitle1'>
                    $
                    {parseFloat(
                      focusEstimate?.packing?.packingTotal
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/*----- Fee Charges -----*/}
      {focusEstimate?.fees?.tripFee > 0 ||
      focusEstimate?.fees?.receivingFee > 0 ||
      focusEstimate?.fees?.additionalFees.length > 0 ? (
        <Table sx={{ mt: 4, '&:last-child': { border: 0 } }}>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4}>
                Fees
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {focusEstimate?.fees?.tripFee > 0 && (
              <TableRow>
                <TableCell>Trip Fee</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>
                  ${focusEstimate?.fees?.tripFee.toLocaleString()}{' '}
                </TableCell>
              </TableRow>
            )}
            {focusEstimate?.fees?.receivingFee > 0 && (
              <TableRow>
                <TableCell>Receiving Fee</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>
                  ${focusEstimate?.fees?.receivingFee.toLocaleString()}
                </TableCell>
              </TableRow>
            )}
            {focusEstimate?.fees?.additionalFees.length > 0 && (
              <>
                {focusEstimate?.fees?.additionalFees.map((fee, i) => (
                  <TableRow key={i}>
                    <TableCell>{fee.feeName}</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align='right'>
                      ${parseFloat(fee.feeAmount).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </>
            )}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                {/* <Typography variant='subtitle1'>Sub Total</Typography> */}
              </TableCell>
              <TableCell align='right'>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                  <Typography variant='subtitle1'>Sub Total</Typography>
                  <Typography variant='subtitle1'>
                    ${focusEstimate?.fees?.feesTotal.toLocaleString()}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ) : null}
      {/*----- Additional Services Charges -----*/}
      {focusEstimate?.additionalServices?.services.length && (
        <Table sx={{ mt: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={4}>
                Additional Services Charges
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {focusEstimate?.additionalServices?.services.map((service, i) => (
              <TableRow key={i}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell align='right'>
                  ${parseFloat(service.serviceAmount).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                {/* <Typography variant='subtitle1'>Total</Typography> */}
              </TableCell>
              <TableCell align='right'>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                  <Typography variant='subtitle1'>Total</Typography>
                  <Typography variant='subtitle1'>
                    $
                    {parseFloat(
                      focusEstimate?.additionalServices?.additionalServicesTotal
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/*----- Storage Charges -----*/}
      {focusEstimate?.storage?.storageItems.length && (
        <Table sx={{ mt: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center' colSpan={5}>
                Storage Charges
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Sub header / cell desc */}
            <TableRow>
              <TableCell>Storage Item</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Days In Storage</TableCell>
              <TableCell align='right'>Total</TableCell>
            </TableRow>
            {focusEstimate?.storage?.storageItems.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.storageItemName}</TableCell>
                <TableCell>{parseFloat(item.storageItemQty)}</TableCell>
                <TableCell>
                  ${parseFloat(item.storageItemPrice).toLocaleString()}
                </TableCell>
                <TableCell>{parseFloat(item.storageItemTime)}</TableCell>
                <TableCell align='right'>
                  ${parseFloat(item.storageItemTotal).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Stack direction='row' justifyContent='flex-end' spacing={1}>
                  <Typography variant='subtitle1'>Total</Typography>
                  <Typography variant='subtitle1'>
                    $
                    {parseFloat(
                      focusEstimate?.storage?.storageTotal
                    ).toLocaleString()}
                  </Typography>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
      {/* {focusJob?.jobComments && (
        <Table sx={{ mt: 6 }}>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Job Comments</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{parse(focusJob?.jobComments)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )} */}
      {/*----- Totals -----*/}
      <Grid container justifyContent='flex-end'>
        <Grid xs={12} md={6}>
          <Table sx={{ mt: 6 }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2} align='center'>
                  Totals
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*----- Move Charges -----*/}
              <TableRow>
                <TableCell>Move Charges</TableCell>
                <TableCell>
                  ${focusEstimate?.moveCharges?.totalMoveCost.toLocaleString()}
                </TableCell>
              </TableRow>
              {/*----- Packing Charges -----*/}
              {focusEstimate?.packing?.packingTotal > 0 && (
                <TableRow>
                  <TableCell>Packing Charges</TableCell>
                  <TableCell>
                    ${focusEstimate?.packing?.packingTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {/*----- Fee Charges -----*/}
              {focusEstimate?.fees?.feesTotal > 0 && (
                <TableRow>
                  <TableCell>Fee Charges</TableCell>
                  <TableCell>
                    ${focusEstimate?.fees?.feesTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {/*----- Additional Services Charges -----*/}
              {focusEstimate?.additionalServices?.additionalServicesTotal >
                0 && (
                <TableRow>
                  <TableCell>Additional Services</TableCell>
                  <TableCell>
                    $
                    {focusEstimate?.additionalServices?.additionalServicesTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {/*----- Storage Charges -----*/}
              {focusEstimate?.storage?.storageTotal > 0 && (
                <TableRow>
                  <TableCell>StorageCharges</TableCell>
                  <TableCell>
                    ${focusEstimate?.storage?.storageTotal.toLocaleString()}
                  </TableCell>
                </TableRow>
              )}
              {/*----- Total -----*/}
              <TableRow>
                <TableCell>
                  <Typography variant='subtitle1'>Grand Total</Typography>
                </TableCell>
                <TableCell>${focusEstimate?.totalCharges}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
      </Grid>
      <Table sx={{ mt: 6 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Understanding Your Estimate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              - Please be advised this is just an estimate. The total charges
              for your move are based on actual moving time plus the travel.
              Packing materials are billed for an additional cost. All jobs are
              subject to a minimum charge of 1 hour. Please ask your sales
              person.
              <br /> - We will provide a blanket wrap service while we transport
              your items. <br />- Full replacement value insurance is included
              in the cost.
              <br /> - The last hour is always prorated into 15 minute
              increments.
              <br /> - The FULL invoice for services is payable at the
              completion of the move by: Check, Cashier's Check, Money Order,
              Cash or Visa & Master Card with a 4% administration fee on cards.
              <br />- Cancellation Policy: A 72 hour (3 Day) notice of
              cancellation is required to receive a return of deposit
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {/*----- Inventory / Items To Be Moved -----*/}
      <Table sx={{ mt: 6 }}>
        <TableHead>
          <TableRow>
            <TableCell align='center' colSpan={2}>
              Items To Be Moved
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {focusEstimate?.inventory?.map((room, i) => (
            <Fragment key={i}>
              {/* Room Header */}
              <TableRow>
                <TableCell align='center' colSpan={2}>
                  {room.roomName}
                </TableCell>
              </TableRow>
              {/* Room Items */}
              {room.items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell width='75%'>{item.name}</TableCell>
                  <TableCell>{item.itemAmt}</TableCell>
                </TableRow>
              ))}
            </Fragment>
          ))}
        </TableBody>
      </Table>
      <Table sx={{ mt: 6 }}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Qty</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell align='right'>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>{focusJob?.jobType}</TableCell>
            <TableCell>1</TableCell>
            <TableCell>${focusEstimate?.totalCharges}</TableCell>
            <TableCell align='right'>${focusEstimate?.totalCharges}</TableCell>
          </TableRow>
          {/* {items.map((item, index) => {
            const unitAmount = numeral(item.unitAmount).format(
              `${item.currency}0,0.00`
            )
            const totalAmount = numeral(item.totalAmount).format(
              `${item.currency}0,0.00`
            )

            return (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{unitAmount}</TableCell>
                <TableCell align='right'>{totalAmount}</TableCell>
              </TableRow>
            )
          })} */}
          {/* <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Subtotal</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>{subtotalAmount}</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Taxes</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>{taxAmount}</Typography>
            </TableCell>
          </TableRow> */}
          <TableRow>
            <TableCell colSpan={3} sx={{ borderBottom: 'none' }} />
            <TableCell sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle1'>Total</Typography>
            </TableCell>
            <TableCell align='right' sx={{ borderBottom: 'none' }}>
              <Typography variant='subtitle2'>
                ${focusEstimate?.totalCharges}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  )
}
