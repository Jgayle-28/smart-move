import { Text, View } from '@react-pdf/renderer'

function MoveChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Move Charges
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width80]}>Move Hours</Text>
          <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
            {focusEstimate?.moveCharges?.totalMoveHours} hr(s)
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width80]}>
            {' '}
            Move charges based on {focusEstimate?.moveCharges?.totalMen} men &{' '}
            {focusEstimate?.moveCharges?.totalTrucks}
            truck(s) for {focusEstimate?.moveCharges?.totalMoveHours} hours @{' '}
            {focusEstimate?.moveCharges?.ratePerHour}/hr
          </Text>
          <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
            ${focusEstimate?.moveCharges?.totalMoveCost.toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  )
}

export default MoveChargesTable
