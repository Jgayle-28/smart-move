export const jobFormInitialValues = {
  jobTitle: '',
  jobType: 'move',
  customer: '',
  pickUpAddress: '',
  pickUpAddress2: '',
  dropOffAddress: '',
  dropOffAddress2: '',
  jobDate: new Date(),
  jobStartTime: new Date(),
  jobComments: '',
  billTo: '',
  billingSameAsCustomer: false,
  paymentType: '',
}

export const categoryOptions = [
  {
    label: 'Move',
    value: 'move',
  },
  {
    label: 'Delivery',
    value: 'delivery',
  },
  {
    label: 'Pick Up and Drop Off',
    value: 'pu_do',
  },
  {
    label: 'Other',
    value: 'other',
  },
]

export const statusOptions = [
  {
    label: 'Paid',
    value: 'paid',
  },
  {
    label: 'Unpaid',
    value: 'unpaid',
  },
]
