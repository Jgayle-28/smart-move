import { useMemo } from 'react'
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
// PDF sections
import MoveChargesTable from './pdf/MoveChargesTable'
import PackingChargesTable from './pdf/PackingChargesTable'
import FeeChargesTable from './pdf/FeeChargesTable'
import AdditionalServicesChargesTable from './pdf/AdditionalServicesChargesTable'
import StorageChargesTable from './pdf/StorageChargesTable'
// import JobComments from './pdf/JobComments'
import TotalChargesTable from './pdf/TotalChargesTable'
import EstimatePolicy from './pdf/EstimatePolicy'
import ItemsTable from './pdf/ItemsTable'
// import parse from 'html-react-parser'

const useStyles = () => {
  const theme = useTheme()

  return useMemo(() => {
    return StyleSheet.create({
      page: {
        backgroundColor: '#FFFFFF',
        padding: 24,
      },
      h6: {
        fontSize: 12,
        fontWeight: 600,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: 9,
        fontWeight: 400,
        lineHeight: 1.43,
        color: '#2F3746',
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      brand: {
        height: 24,
        width: 24,
      },
      moveData: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },

      addresses: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
      },
      // Table classes -------------------->
      tableHeader: {
        backgroundColor: '#F8F9FA',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 8,
      },
      tableHeaderItem: {
        fontSize: 8,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: '.3px',
        color: '#2F3746',
        textTransform: 'uppercase',
      },
      tableBody: { padding: 8 },
      tableRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#F8F9FA',
        borderStyle: 'solid',
        width: '100%',
        padding: 8,
        '&:last-child td, &:last-child th': { border: 0 },
      },
      tableCell: {
        fontSize: 9,
        fontWeight: 400,
        color: '#2F3746',
        lineHeight: 1.57,
      },
      // Utility classes -------------------->
      section: { marginTop: 32 },
      textCenter: { textAlign: 'center' },
      textRight: { textAlign: 'right' },
      textLeft: { textAlign: 'left' },
      // width
      width100: { width: '100%' },
      width90: { width: '90%' },
      width80: { width: '80%' },
      width75: { width: '75%' },
      width50: { width: '50%' },
      width33: { width: '33.33%' },
      width25: { width: '25%' },
      width20: { width: '20%' },
      width10: { width: '10%' },
      // Flexbox
      itemsRight: { justifyContent: 'flex-end' },
      itemsLeft: { justifyContent: 'flex-start' },
      itemsCenter: { justifyContent: 'center' },
      // Margin
      mlAuto: { marginLeft: 'auto' },
      // Padding
      p8: { padding: 8 },
    })
  }, [theme])
}

export const EstimatePdfDocument = ({ focusJob, company, focusEstimate }) => {
  const today = new Date()
  const dueDate = format(addDays(today, 7).getTime(), 'MM/dd/yyyy')
  const styles = useStyles()

  if (!focusEstimate || !focusJob || !company) return <Spinner />
  return (
    <Document>
      <Page size='A4' style={styles.page} wrap>
        {/*----- Header ----- */}
        <View style={styles.header}>
          <View>
            <Image source='/assets/logo.jpg' style={styles.brand} />
            <Text style={styles.h6}>{company?.companyName || ''}</Text>
          </View>
          {/*------ Company Data ------*/}
          <View>
            <Text style={styles.body2}>{company?.companyEmail || ''}</Text>
            <Text style={styles.body2}>
              {formatPhoneNumber(company?.companyPhoneNumber) || ''}
            </Text>
            <Text style={styles.body2}>{company?.companyWebsite || ''}</Text>
          </View>
        </View>
        {/*----- Move Data -----*/}
        <View style={styles.moveData}>
          <View>
            <Text style={styles.body2}>
              Customer: {focusJob?.customer?.customerName || ''}
            </Text>
            <Text style={styles.body2}>
              Phone:{' '}
              {formatPhoneNumber(focusJob?.customer?.customerPhoneNumber) || ''}
            </Text>
            <Text style={styles.body2}>
              Email: {focusJob?.customer?.customerEmail || ''}
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              Customer Rep: {focusJob?.createdBy?.name || ''}
            </Text>
            <Text style={styles.body2}>
              Rep Phone: {formatPhoneNumber(company?.companyPhoneNumber) || ''}
            </Text>
            <Text style={styles.body2}>
              Rep Email: {focusJob?.createdBy?.email || ''}
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              Move Date:{' '}
              {focusJob?.jobDate
                ? format(new Date(focusJob?.jobDate), 'MM/dd/yyyy')
                : 'TBD'}
            </Text>
            <Text style={styles.body2}>
              Move Time:{' '}
              {focusJob?.jobStartTime
                ? format(new Date(focusJob?.jobStartTime), 'hh:mm aa')
                : 'TBD'}
            </Text>
          </View>
        </View>
        <View style={styles.addresses}>
          <Text style={[styles.body2, styles.width50]}>
            Moving From:{' '}
            {focusJob?.pickUpAddress?.length ? focusJob?.pickUpAddress : 'TBD'}
          </Text>
          <Text style={[styles.body2, styles.width50]}>
            Moving To:{' '}
            {focusJob?.dropOffAddress?.length
              ? focusJob?.dropOffAddress
              : 'TBD'}
          </Text>
        </View>
        {/*----- Move Charges -----*/}
        <MoveChargesTable focusEstimate={focusEstimate} styles={styles} />
        {/*----- Packing Charges -----*/}
        {focusEstimate?.packing?.packingItems.length && (
          <PackingChargesTable focusEstimate={focusEstimate} styles={styles} />
        )}
        {/*----- Fee Charges -----*/}
        {focusEstimate?.fees?.tripFee > 0 ||
        focusEstimate?.fees?.receivingFee > 0 ||
        focusEstimate?.fees?.additionalFees.length > 0 ? (
          <FeeChargesTable focusEstimate={focusEstimate} styles={styles} />
        ) : null}
        {/*----- Additional Services -----*/}
        {focusEstimate?.additionalServices?.services.length && (
          <AdditionalServicesChargesTable
            focusEstimate={focusEstimate}
            styles={styles}
          />
        )}
        {/*----- Storage -----*/}
        {focusEstimate?.storage?.storageItems.length && (
          <StorageChargesTable focusEstimate={focusEstimate} styles={styles} />
        )}
        {/*----- Job Comments -----*/}
        {/* {focusJob?.jobComments && (
          <JobComments
            focusJob={focusJob}
            comments={parse(focusJob?.jobComments)}
            styles={styles}
          />
        )} */}

        {/*----- Totals -----*/}
        <TotalChargesTable focusEstimate={focusEstimate} styles={styles} />
        {/*----- Estimate Policy -----*/}
        <EstimatePolicy styles={styles} />
        {/* Items To Be Moved */}
        <ItemsTable focusEstimate={focusEstimate} styles={styles} />
      </Page>
    </Document>
  )
}
