import { useMemo } from 'react'
import PropTypes from 'prop-types'
import {
  Document,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'
import { useTheme } from '@mui/material/styles'
import { addDays, format } from 'date-fns'
import { formatPhoneNumber } from 'src/utils/format-phone-number'
import Spinner from 'src/components/shared/Spinner'

const useStyles = () => {
  const theme = useTheme()

  return useMemo(() => {
    return StyleSheet.create({
      page: {
        backgroundColor: '#FFFFFF',
        padding: 24,
      },
      h4: {
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1.235,
      },
      h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
      },
      alignRight: {
        textAlign: 'right',
      },
      subtitle2: {
        fontSize: 10,
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body2: {
        fontSize: 10,
        fontWeight: 400,
        lineHeight: 1.43,
      },
      gutterBottom: {
        marginBottom: 4,
      },
      colorSuccess: {
        color: theme.palette.success.main,
      },
      colorWarning: {
        color: theme.palette.warning.main,
      },
      uppercase: {
        textTransform: 'uppercase',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      brand: {
        height: 24,
        width: 24,
      },
      company: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },
      references: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },
      billing: {
        marginTop: 32,
      },
      items: {
        marginTop: 32,
      },
      itemRow: {
        borderBottomWidth: 1,
        borderColor: '#EEEEEE',
        borderStyle: 'solid',
        flexDirection: 'row',
      },
      itemNumber: {
        padding: 6,
        width: '10%',
      },
      itemDescription: {
        padding: 6,
        width: '50%',
      },
      itemQty: {
        padding: 6,
        width: '10%',
      },
      itemUnitAmount: {
        padding: 6,
        width: '15%',
      },
      itemTotalAmount: {
        padding: 6,
        width: '15%',
      },
      summaryRow: {
        flexDirection: 'row',
      },
      summaryGap: {
        padding: 6,
        width: '70%',
      },
      summaryTitle: {
        padding: 6,
        width: '15%',
      },
      summaryValue: {
        padding: 6,
        width: '15%',
      },
      notes: {
        marginTop: 32,
      },
    })
  }, [theme])
}

export const InvoicePdfDocument = ({ focusJob, company, focusEstimate }) => {
  const today = new Date()
  const dueDate = format(addDays(today, 7).getTime(), 'MM/dd/yyyy')
  const styles = useStyles()

  if (!focusEstimate || !focusJob || !company) return <></>
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/*----- Header ----- */}
        <View style={styles.header}>
          <View>
            <Image source='/assets/logo.jpg' style={styles.brand} />
            <Text style={styles.h6}>{company?.companyName || ''}</Text>
          </View>
          <View>
            {focusJob?.isPaid ? (
              <Text style={[styles.h4, styles.uppercase, styles.colorSuccess]}>
                PAID
              </Text>
            ) : (
              <Text style={[styles.h4, styles.uppercase, styles.colorWarning]}>
                UNPAID
              </Text>
            )}

            <Text style={styles.subtitle2}>
              {focusEstimate?.invoiceId?.toUpperCase() || ''}
            </Text>
          </View>
        </View>
        {/*----- Company Data -----*/}
        <View style={styles.company}>
          <View>
            <Text style={styles.body2}> {company?.companyAddress || ''}</Text>
            {/* <Text style={styles.body2}>Level 2, C, 442456</Text>
            <Text style={styles.body2}>San Francisco, CA, USA</Text> */}
          </View>
          <View>
            {/* <Text style={styles.body2}>Company No. 4675933</Text>
            <Text style={styles.body2}>EU VAT No. 949 67545 45</Text> */}
          </View>
          <View>
            <Text style={styles.body2}>{company?.companyEmail}</Text>
            <Text style={styles.body2}>
              {formatPhoneNumber(company?.companyPhoneNumber) || ''}
            </Text>
            <Text style={styles.body2}>{company?.companyWebsite || ''}</Text>
          </View>
        </View>
        {/*----- Invoice Data -----*/}
        <View style={styles.references}>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Due Date
            </Text>
            <Text style={styles.body2}>{dueDate || ''}</Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>
              Date of issue
            </Text>
            <Text style={styles.body2}>
              {(today && format(today, 'MM/dd/yyyy')) || ''}
            </Text>
          </View>
          <View>
            <Text style={[styles.subtitle2, styles.gutterBottom]}>Number</Text>
            <Text style={styles.body2}>
              {focusEstimate?.invoiceId?.toUpperCase() || ''}
            </Text>
          </View>
        </View>
        {/*----- Billed to -----*/}
        <View style={styles.billing}>
          <Text style={[styles.subtitle2, styles.gutterBottom]}>Billed to</Text>
          <Text style={styles.body2}>
            {focusJob?.billTo
              ? focusJob?.billTo
              : focusJob?.customer?.customerName || ''}
          </Text>
          <Text style={styles.body2}>
            {focusJob?.customer?.customerAddress.description || ''}
          </Text>
        </View>
        {/*----- Billing Table -----*/}
        <View style={styles.items}>
          {/*----- Header -----*/}
          <View style={styles.itemRow}>
            <View style={styles.itemNumber}>
              <Text style={styles.h6}>#</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.h6}>Description</Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.h6}>Qty</Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={styles.h6}>Unit Price</Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.h6, styles.alignRight]}>Total</Text>
            </View>
          </View>
          {/*----- Billing Row -----*/}
          <View style={styles.itemRow}>
            <View style={styles.itemNumber}>
              <Text style={styles.body2}>1</Text>
            </View>
            <View style={styles.itemDescription}>
              <Text style={styles.body2}>{focusJob?.jobType || ''}</Text>
            </View>
            <View style={styles.itemQty}>
              <Text style={styles.body2}>1</Text>
            </View>
            <View style={styles.itemUnitAmount}>
              <Text style={[styles.body2, styles.alignRight]}>
                ${focusEstimate?.totalCharges || ''}
              </Text>
            </View>
            <View style={styles.itemTotalAmount}>
              <Text style={[styles.body2, styles.alignRight]}>
                ${focusEstimate?.totalCharges || ''}
              </Text>
            </View>
          </View>
          {/* {items.map((item, index) => {
            const unitAmount = numeral(item.unitAmount).format(
              `${item.currency}0,0.00`
            )
            const totalAmount = numeral(item.totalAmount).format(
              `${item.currency}0,0.00`
            )

            return (
              <View key={item.id} style={styles.itemRow}>
                <View style={styles.itemNumber}>
                  <Text style={styles.body2}>{index + 1}</Text>
                </View>
                <View style={styles.itemDescription}>
                  <Text style={styles.body2}>{item.description}</Text>
                </View>
                <View style={styles.itemQty}>
                  <Text style={styles.body2}>{item.quantity}</Text>
                </View>
                <View style={styles.itemUnitAmount}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    {unitAmount}
                  </Text>
                </View>
                <View style={styles.itemTotalAmount}>
                  <Text style={[styles.body2, styles.alignRight]}>
                    {totalAmount}
                  </Text>
                </View>
              </View>
            )
          })} */}
          {/* <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Subtotal</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>
                testie
              </Text>
            </View>
          </View> */}
          {/* <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Taxes</Text>
            </View>
            <View style={styles.summaryValue}>
              
              <Text style={[styles.body2, styles.alignRight]}>{taxAmount}</Text>
            </View>
          </View> */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryGap} />
            <View style={styles.summaryTitle}>
              <Text style={styles.body2}>Total</Text>
            </View>
            <View style={styles.summaryValue}>
              <Text style={[styles.body2, styles.alignRight]}>
                ${focusEstimate?.totalCharges || ''}
              </Text>
            </View>
          </View>
        </View>
        {/* <View style={styles.notes}>
          <Text style={[styles.h6, styles.gutterBottom]}>Notes</Text>
          <Text style={styles.body2}>
            Please make sure you have the right bank registration number as I
            had issues before and make sure you guys cover transfer expenses.
          </Text>
        </View> */}
      </Page>
    </Document>
  )
}
