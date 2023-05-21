import { Text, View } from '@react-pdf/renderer'

function EstimatePolicy({ company, styles }) {
  return (
    <>
      <View style={styles.section}>
        <View style={styles.tableHeader}>
          <View style={styles.width100}>
            <Text style={[styles.tableHeaderItem, styles.textCenter]}>
              UNDERSTANDING YOUR ESTIMATE
            </Text>
          </View>
        </View>

        <View style={styles.p8}>
          <View>
            <Text style={styles.body2}>
              - Please be advised this is just an estimate. The total charges
              for your move are based on actual moving time plus the travel.
              Packing materials are billed for an additional cost. All jobs are
              subject to a minimum charge of 1 hour. Please ask your sales
              person.
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              - We will provide a blanket wrap service while we transport your
              items.
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              - Full replacement value insurance is included in the cost.
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              - The last hour is always prorated into 15 minute increments.
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              - The FULL invoice for services is payable at the completion of
              the move by: Check, Cashier's Check, Money Order, Cash or Visa &
              Master Card with a 4% administration fee on cards.
            </Text>
          </View>
          <View>
            <Text style={styles.body2}>
              - Cancellation Policy: A 72 hour (3 Day) notice of cancellation is
              required to receive a return of deposit.
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default EstimatePolicy
