import { Text, View } from '@react-pdf/renderer'

function JobComments({ comments, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Job Comments
            </Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.width100]}>{comments}</Text>
        </View>
      </View>
    </>
  )
}

export default JobComments
