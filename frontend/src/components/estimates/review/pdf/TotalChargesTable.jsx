import { Text, View } from '@react-pdf/renderer'

function TotalChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={[styles.section, styles.width50, styles.mlAuto]}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Totals
            </Text>
          </View>
        </View>
        {/*----- Move Charges -----*/}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width80]}>Move Charges</Text>
          <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
            ${focusEstimate?.moveCharges?.totalMoveCost.toLocaleString()}
          </Text>
        </View>
        {/*----- Packing Charges -----*/}
        {focusEstimate?.packing?.packingTotal > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>
              Packing Charges
            </Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${focusEstimate?.packing?.packingTotal.toLocaleString()}
            </Text>
          </View>
        )}
        {/*----- Fee Charges -----*/}
        {focusEstimate?.fees?.feesTotal > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>Fee Charges</Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${focusEstimate?.fees?.feesTotal.toLocaleString()}
            </Text>
          </View>
        )}
        {/*----- Additional Services -----*/}
        {focusEstimate?.additionalServices?.additionalServicesTotal > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>
              Additional Services
            </Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              $
              {focusEstimate?.additionalServices?.additionalServicesTotal.toLocaleString()}
            </Text>
          </View>
        )}
        {/*----- Storage Charges -----*/}
        {focusEstimate?.storage?.storageTotal > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>
              Storage Charges
            </Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${focusEstimate?.storage?.storageTotal.toLocaleString()}
            </Text>
          </View>
        )}
        {/*----- Total Charges -----*/}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width80]}>Grand Total</Text>
          <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
            ${focusEstimate?.totalCharges}
          </Text>
        </View>
      </View>
    </>
  )
}

export default TotalChargesTable
