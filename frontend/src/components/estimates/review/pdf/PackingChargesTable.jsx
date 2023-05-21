import { Text, View } from '@react-pdf/renderer'

function PackingChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Packing Charges
            </Text>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width25]}>Packing Item</Text>
          <Text style={[styles.tableCell, styles.width25]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.width25]}>Price</Text>
          <Text style={[styles.tableCell, styles.width25, styles.textRight]}>
            Total
          </Text>
        </View>
        {/* Packing Items */}
        {focusEstimate?.packing?.packingItems.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={[styles.tableCell, styles.width25]}>
              {item.packingItem}
            </Text>
            <Text style={[styles.tableCell, styles.width25]}>
              {parseFloat(item.packingItemQty)}
            </Text>
            <Text style={[styles.tableCell, styles.width25]}>
              {parseFloat(item.packingItemPrice)}
            </Text>
            <Text style={[styles.tableCell, styles.width25, styles.textRight]}>
              ${parseFloat(item.packingTotalItemAmt).toLocaleString()}
            </Text>
          </View>
        ))}
        <View style={[styles.tableRow, styles.itemsRight]}>
          <Text style={[styles.tableCell, styles.width90, styles.textRight]}>
            Total
          </Text>
          <Text style={[styles.tableCell, styles.width10, styles.textRight]}>
            {' '}
            ${parseFloat(focusEstimate?.packing?.packingTotal).toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  )
}

export default PackingChargesTable
