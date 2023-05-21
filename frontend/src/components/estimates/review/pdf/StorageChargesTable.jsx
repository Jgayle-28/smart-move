import { Text, View } from '@react-pdf/renderer'

function StorageChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Storage Charges
            </Text>
          </View>
        </View>

        {/* Sub Header */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width20]}>Packing Items</Text>
          <Text style={[styles.tableCell, styles.width20]}>Quantity</Text>
          <Text style={[styles.tableCell, styles.width20]}>Price</Text>
          <Text style={[styles.tableCell, styles.width20]}>
            Days In Storage
          </Text>
          <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
            Total
          </Text>
        </View>
        {/* Packing Items */}
        {focusEstimate?.storage?.storageItems.map((item, i) => (
          <View style={styles.tableRow} key={i}>
            <Text style={[styles.tableCell, styles.width20]}>
              {item.storageItemName}
            </Text>
            <Text style={[styles.tableCell, styles.width20]}>
              {parseFloat(item.storageItemQty)}
            </Text>
            <Text style={[styles.tableCell, styles.width20]}>
              ${parseFloat(item.storageItemPrice).toLocaleString()}
            </Text>
            <Text style={[styles.tableCell, styles.width20]}>
              {parseFloat(item.storageItemTime)}
            </Text>
            <Text style={[styles.tableCell, styles.width20, styles.textRight]}>
              ${parseFloat(item.storageItemTotal).toLocaleString()}
            </Text>
          </View>
        ))}
        <View style={[styles.tableRow, styles.itemsRight]}>
          <Text style={[styles.tableCell, styles.width90, styles.textRight]}>
            Total
          </Text>
          <Text style={[styles.tableCell, styles.width10, styles.textRight]}>
            {' '}
            ${parseFloat(focusEstimate?.storage?.storageTotal).toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  )
}

export default StorageChargesTable
