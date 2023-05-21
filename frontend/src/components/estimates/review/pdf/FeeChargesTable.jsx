import { Text, View } from '@react-pdf/renderer'

function FeeChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Fee Charges
            </Text>
          </View>
        </View>
        {focusEstimate?.fees?.tripFee > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>Trip Fee</Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${focusEstimate?.fees?.tripFee.toLocaleString()}{' '}
            </Text>
          </View>
        )}
        {focusEstimate?.fees?.receivingFee > 0 && (
          <View style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.width80]}>Trip Fee</Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${focusEstimate?.fees?.receivingFee.toLocaleString()}
            </Text>
          </View>
        )}
        {/* Additional fees */}
        {focusEstimate?.fees?.additionalFees.length > 0 && (
          <>
            {focusEstimate?.fees?.additionalFees.map((fee, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.tableCell, styles.width80]}>
                  {fee.feeName}
                </Text>
                <Text
                  style={[styles.tableCell, styles.width20, styles.textRight]}
                >
                  ${parseFloat(fee.feeAmount).toLocaleString()}
                </Text>
              </View>
            ))}
          </>
        )}
        <View style={[styles.tableRow, styles.itemsRight]}>
          <Text style={[styles.tableCell, styles.width90, styles.textRight]}>
            Total
          </Text>
          <Text style={[styles.tableCell, styles.width10, styles.textRight]}>
            {' '}
            ${focusEstimate?.fees?.feesTotal.toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  )
}

export default FeeChargesTable
