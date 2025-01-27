import PropTypes from 'prop-types'
import { Box, Card, CardHeader, Tab, Tabs } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Chart } from 'src/components/chart'
import { useSelector } from 'react-redux'

const useChartOptions = () => {
  const theme = useTheme()

  return {
    chart: {
      background: 'transparent',
      stacked: true,
      toolbar: {
        show: false,
      },
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.mode === 'dark'
        ? theme.palette.primary.darkest
        : theme.palette.primary.light,
    ],
    dataLabels: {
      enabled: false,
    },
    legend: {
      labels: {
        colors: theme.palette.text.secondary,
      },
      onItemClick: {
        toggleDataSeries: false,
      },
      onItemHover: {
        highlightDataSeries: false,
      },
    },
    grid: {
      borderColor: theme.palette.divider,
      strokeDashArray: 2,
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        columnWidth: '32px',
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      y: {
        formatter: (value) => `${value} job(s)`,
      },
    },
    xaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      labels: {
        style: {
          colors: theme.palette.text.secondary,
        },
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
  }
}

export const OverviewTotalJobsPerMonth = () => {
  const { annualJobs } = useSelector((state) => state.jobs)
  const chartOptions = useChartOptions()

  //  chartSeries={[
  //               {
  //                 name: 'This year',
  //                 data: [40, 37, 41, 42, 45, 42, 36, 45, 40, 44, 38, 41],
  //               },
  //               {
  //                 name: 'Last year',
  //                 data: [26, 22, 19, 22, 24, 28, 23, 25, 24, 21, 17, 19],
  //               },
  //             ]}

  return (
    <Card>
      <CardHeader
        subheader='A breakdown of jobs per month'
        title='Workload Analytics'
        // action={
        //   <Tabs value='year'>
        //     <Tab label='Year' value='year' />
        //     <Tab label='Month' value='month' />
        //     <Tab label='Week' value='week' />
        //   </Tabs>
        // }
      />
      <Box sx={{ height: 336 }}>
        <Chart
          height={300}
          options={chartOptions}
          series={[{ name: 'This Year', data: annualJobs }]}
          type='bar'
        />
      </Box>
    </Card>
  )
}

OverviewTotalJobsPerMonth.propTypes = {
  chartSeries: PropTypes.array.isRequired,
}
