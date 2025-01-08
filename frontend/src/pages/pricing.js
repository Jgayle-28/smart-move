import { Box, Unstable_Grid2 as Grid } from '@mui/material'
import { Seo } from 'src/components/seo'
import { usePageView } from 'src/hooks/use-page-view'
import { HomeFaqs } from 'src/sections/home/home-faqs'
import HomePricing from 'src/sections/home/HomePricing'

const Page = () => {
  usePageView()

  return (
    <>
      <Seo title='Pricing' />
      <Box component='main' sx={{ flexGrow: 1 }}>
        <HomePricing />
        <HomeFaqs />
      </Box>
    </>
  )
}

export default Page
