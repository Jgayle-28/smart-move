import { Fragment } from 'react'
import { Text, View } from '@react-pdf/renderer'

function ItemsTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Items To Be Moved
            </Text>
          </View>
        </View>
        {focusEstimate?.inventory?.map((room, i) => (
          <Fragment key={i}>
            {/* Room Header */}
            <View style={styles.tableRow}>
              <Text
                style={[styles.tableCell, styles.width100, styles.textCenter]}
              >
                {room.roomName}
              </Text>
            </View>

            {/* Room Items */}
            {room.items.map((item, index) => (
              <Fragment key={index}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCell, styles.width75]}>
                    {item.name}
                  </Text>
                  <Text style={[styles.tableCell, styles.textRight]}>
                    {item.itemAmt}
                  </Text>
                </View>
              </Fragment>
            ))}
          </Fragment>
        ))}
      </View>
    </>
  )
}

export default ItemsTable
