import { useCallback, useEffect, useRef, useState } from 'react'
import { PDFDownloadLink } from '@react-pdf/renderer'
import FilterFunnel01Icon from '@untitled-ui/icons-react/build/esm/FilterFunnel01'
import ArrowLeftIcon from '@untitled-ui/icons-react/build/esm/ArrowLeft'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Card,
  Typography,
  CardContent,
  Tab,
  Tabs,
} from '@mui/material'
import { invoicesApi } from 'src/api/invoices'
import { RouterLink } from 'src/components/router-link'
import { Seo } from 'src/components/seo'
import { useDialog } from 'src/hooks/use-dialog'
import { useMounted } from 'src/hooks/use-mounted'
import { usePageView } from 'src/hooks/use-page-view'
import { paths } from 'src/paths'
import { InvoicePdfDialog } from 'src/sections/dashboard/invoice/invoice-pdf-dialog'
import { InvoicePdfDocument } from 'src/sections/dashboard/invoice/invoice-pdf-document'
import { InvoicePreview } from 'src/sections/dashboard/invoice/invoice-preview'
import { getInitials } from 'src/utils/get-initials'
import { useRouter } from 'src/hooks/use-router'
import { useParams } from 'react-router'
import EstimateHeader from 'src/components/estimates/EstimateHeader'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from 'src/components/shared/Spinner'
import { clearFocusJob, getJob } from 'src/store/jobs/jobSlice'
import { EstimateSideBar } from 'src/components/estimates/EstimateSideBar'
import { EstimateContainer } from 'src/components/estimates/EstimateContainer'
// Tab Components
import Inventory from 'src/components/estimates/Inventory'
import Services from 'src/components/estimates/Services'
import Review from 'src/components/estimates/Review'

const tabs = [
  { label: 'Inventory', value: 'inventory' },
  { label: 'Services', value: 'services' },
  { label: 'Review', value: 'review' },
  { label: 'Actions', value: 'actions' },
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

  const invoice = useInvoice()
  const dialog = useDialog()
  const dispatch = useDispatch()

  const { jobId, estimateId } = useParams()
  const { focusJob, isLoading } = useSelector((state) => state.jobs)

  const focusEstimate = null

  useEffect(() => {
    if (jobId) {
      dispatch(getJob(jobId))
    }
    return () => {
      if (jobId) {
        dispatch(clearFocusJob())
      }
    }
  }, [])

  const toggleSidebar = useCallback(() => {
    setSideBarOpen((prevState) => !prevState)
  }, [])

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value)
  }, [])

  usePageView()

  if (!invoice) {
    return null
  }

  if (isLoading || (jobId && !focusJob) || (estimateId && !focusEstimate))
    return <Spinner />
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
        <Inventory toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'services' && (
        <Services toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'review' && (
        <Review toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
      )}
      {currentTab === 'actions' && (
        <Review toggleSidebar={toggleSidebar} sideBarOpen={sideBarOpen} />
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
