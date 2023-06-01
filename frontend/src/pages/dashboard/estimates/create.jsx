import { useCallback, useEffect, useRef, useState } from 'react'
import { Box, Divider, Tab, Tabs } from '@mui/material'
import { invoicesApi } from 'src/api/invoices'
import { Seo } from 'src/components/seo'
import { useDialog } from 'src/hooks/use-dialog'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { InvoicePdfDialog } from 'src/sections/dashboard/invoice/invoice-pdf-dialog'
import { useRouter } from 'src/hooks/use-router'
import EstimateHeader from 'src/components/estimates/EstimateHeader'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { clearFocusJob, getJob, updateJob } from 'src/store/jobs/jobSlice'
import {
  addEstimate,
  updateEstimate,
  getEstimate,
  deleteEstimate,
  clearEstimate,
  updateTempInventory,
} from 'src/store/estimates/estimateSlice'
import { toast } from 'react-hot-toast'
import { paths } from 'src/paths'
import { useParams } from 'react-router'
// Tab Components
import Inventory from 'src/components/estimates/Inventory'
import Services from 'src/components/estimates/Services'
import Review from 'src/components/estimates/Review'
import Invoice from 'src/components/estimates/Invoice'
import Actions from 'src/components/estimates/Actions'
import { calculateTotalMoveCost } from 'src/utils/services/move-charges'
import { nanoid } from 'nanoid'

const tabs = [
  { label: 'Inventory', value: 'inventory' },
  { label: 'Services', value: 'services' },
  { label: 'Review', value: 'review' },
  { label: 'Invoice', value: 'invoice' },
  // { label: 'Actions', value: 'actions' },
]
const useInvoice = () => {
  const isMounted = useMounted()
  const [invoice, setInvoice] = useState(null)

  const handleInvoiceGet = useCallback(async () => {
    try {
      const response = await invoicesApi.getInvoice()

      if (isMounted()) {
        setInvoice(response)
      }
    } catch (err) {
      console.error(err)
    }
  }, [isMounted])

  useEffect(
    () => {
      handleInvoiceGet()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return invoice
}

const Page = () => {
  const [sideBarOpen, setSideBarOpen] = useState(true)
  const [currentTab, setCurrentTab] = useState('inventory')

  const tempInventoryRef = useRef([])

  const invoice = useInvoice()
  const dialog = useDialog()
  const dispatch = useDispatch()
  const router = useRouter()
  usePageView()

  const { jobId, estimateId } = useParams()
  const { focusJob } = useSelector((state) => state.jobs)
  const { user } = useSelector((state) => state.auth)
  const {
    focusEstimate,
    tempInventory,
    moveCharges,
    packing,
    additionalServices,
    storage,
    fees,
    totalWeight,
    totalVolume,
    totalItemCount,
  } = useSelector((state) => state.estimates)

  useEffect(() => {
    if (jobId) {
      dispatch(getJob(jobId))
    }
    if (estimateId) {
      dispatch(getEstimate(estimateId))
    }
    return () => {
      dispatch(clearFocusJob())
      dispatch(clearEstimate())
    }
  }, [jobId, estimateId])

  const toggleSidebar = useCallback(() => {
    setSideBarOpen((prevState) => !prevState)
  }, [])

  const handleTabsChange = (event, value) => {
    // Updates the store in redux on tab change, this prevents error while adding items to the inventory
    if (currentTab === 'inventory') {
      dispatch(updateTempInventory(tempInventoryRef.current))
    }
    setCurrentTab(value)
  }

  const handleSaveEstimate = () => {
    const estimateData = {
      job: focusJob._id,
      company: focusJob.company,
      customer: focusJob.customer._id,
      createdBy: user._id,
      invoiceId: focusEstimate?.invoiceId ? focusEstimate.invoiceId : nanoid(7),
      inventory: tempInventory,
      moveCharges,
      packing,
      additionalServices,
      storage,
      fees,
      totalWeight,
      totalVolume,
      totalItemCount,
      totalCharges: calculateTotalMoveCost(
        moveCharges?.totalMoveCost,
        packing?.packingTotal,
        additionalServices?.additionalServicesTotal,
        fees?.totalFees,
        storage?.storageTotal
      ),
    }
    // check for required fields
    if (tempInventory?.length === 0 || tempInventory === null) {
      return toast.error('Please add inventory items to the estimate')
    }
    if (moveCharges === null) {
      return toast.error(
        'Please enter the total number of men, trucks, and rate per hour'
      )
    }
    if (moveCharges.totalMen === '') {
      return toast.error('Please enter the number of men on the job')
    }
    if (moveCharges.totalTrucks === '') {
      return toast.error('Please enter the number of trucks on the job')
    }
    if (moveCharges.ratePerHour === '') {
      return toast.error('Please enter a valid rate per hour')
    }

    try {
      if (estimateId) {
        dispatch(updateEstimate({ ...focusEstimate, ...estimateData }))
          .unwrap()
          .then(() => {
            toast.success('Estimate successfully updated')
          })
      } else {
        // Only need to add estimate id to job if it is a new estimate
        dispatch(addEstimate(estimateData))
          .unwrap()
          .then((res) => {
            if (res) {
              dispatch(updateJob({ ...focusJob, estimate: res._id }))
            }
            toast.success('Estimate successfully created')
            router.push(
              `${paths.dashboard.estimates.index}/${focusJob._id}/edit/${res._id}`
            )
          })
      }
    } catch (err) {
      console.error(err)
    }
  }

  if (!invoice) {
    return null
  }

  const handleDeleteEstimate = async () => {
    try {
      dispatch(deleteEstimate(estimateId))
        .unwrap()
        .then(() => {
          toast.success('Estimate successfully deleted')
          router.push(paths.dashboard.jobs.index)
        })
    } catch (error) {
      console.error(error)
    }
  }

  // When creating a new estimate only the jobId is passed in the url when editing you will have both jobId and estimateId
  if ((jobId && !focusJob) || (estimateId && !focusEstimate)) return <Spinner />
  return (
    <>
      <Seo title='Dashboard: Estimate Create' />
      <Box
        component='main'
        sx={{
          px: 5,
          paddingBottom: 2,
        }}
      >
        <EstimateHeader
          currentTab={currentTab}
          isEdit={!!estimateId}
          job={focusJob || focusEstimate.job}
          invoice={invoice}
          dialog={dialog}
          handleSaveEstimate={handleSaveEstimate}
          handleDeleteEstimate={handleDeleteEstimate}
          disableDelete={!estimateId}
        />
      </Box>

      <Divider />
      <Tabs
        indicatorColor='primary'
        onChange={handleTabsChange}
        scrollButtons='auto'
        sx={{ px: 3 }}
        textColor='primary'
        value={currentTab}
        variant='scrollable'
      >
        {tabs.map((tab) => (
          <Tab key={tab.value} label={tab.label} value={tab.value} />
        ))}
      </Tabs>

      <Divider />
      {currentTab === 'inventory' && (
        <Inventory
          tempInventoryRef={tempInventoryRef}
          toggleSidebar={toggleSidebar}
          sideBarOpen={sideBarOpen}
        />
      )}
      {currentTab === 'services' && (
        <Services toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'review' && (
        <Review toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'invoice' && (
        <Invoice toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'actions' && (
        <Actions toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      <InvoicePdfDialog
        invoice={invoice}
        onClose={dialog.handleClose}
        open={dialog.open}
      />
    </>
  )
}

export default Page
