import { Text, View } from '@react-pdf/renderer'

function AdditionalServicesChargesTable({ focusEstimate, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              Additional Service Charges
            </Text>
          </View>
        </View>

        {focusEstimate?.fees?.additionalFees.length > 0 && (
          <>
            {focusEstimate?.additionalServices?.services.map((service, i) => (
              <View style={styles.tableRow} key={i}>
                <Text style={[styles.tableCell, styles.width80]}>
                  {service.serviceName}
                </Text>
                <Text
                  style={[styles.tableCell, styles.width20, styles.textRight]}
                >
                  ${parseFloat(service.serviceAmount).toLocaleString()}
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
            $
            {parseFloat(
              focusEstimate?.additionalServices?.additionalServicesTotal
            ).toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  )
}

export default AdditionalServicesChargesTable
