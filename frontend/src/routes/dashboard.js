import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as DashboardLayout } from 'src/layouts/dashboard'

const IndexPage = lazy(() => import('src/pages/dashboard/index'))

// Customers
const CustomerListPage = lazy(() =>
  import('src/pages/dashboard/customers/List')
)
const CustomerDetailPage = lazy(() =>
  import('src/pages/dashboard/customers/detail')
)
const CustomerEditPage = lazy(() =>
  import('src/pages/dashboard/customers/edit')
)
const CustomerAddPage = lazy(() => import('src/pages/dashboard/customers/edit'))

// Invoice
const InvoiceListPage = lazy(() => import('src/pages/dashboard/invoices/list'))
const InvoiceDetailPage = lazy(() =>
  import('src/pages/dashboard/invoices/detail')
)

// Jobs
const JobsList = lazy(() => import('src/pages/dashboard/jobs/list'))
const JobCreatePage = lazy(() => import('src/pages/dashboard/jobs/create'))
const JobDetailPage = lazy(() => import('src/pages/dashboard/jobs/detail'))
// Estimates
const EstimateList = lazy(() => import('src/pages/dashboard/estimates/list'))
const EstimateCreatePage = lazy(() =>
  import('src/pages/dashboard/estimates/create')
)
const EstimateDetailPage = lazy(() =>
  import('src/pages/dashboard/estimates/detail')
)
// Inventory
const InventoryPage = lazy(() =>
  import('src/pages/dashboard/inventory/InventoryPage')
)
// Employees
const EmployeeList = lazy(() => import('src/pages/dashboard/employees/list'))
const EmployeeCreatePage = lazy(() =>
  import('src/pages/dashboard/employees/create')
)
const EmployeeDetailPage = lazy(() =>
  import('src/pages/dashboard/employees/detail')
)
// Help
const HelpPage = lazy(() => import('src/pages/dashboard/HelpPage'))

const CompanyDetailPage = lazy(() => import('src/pages/dashboard/jobs/detail'))

// Other
const AccountPage = lazy(() => import('src/pages/dashboard/account'))
const AnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'))
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'))

/**
 * Maps page routes to application
 */

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: (
      <DashboardLayout>
        <Suspense>
          <Outlet />
        </Suspense>
      </DashboardLayout>
    ),
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
      {
        path: 'customers',
        children: [
          {
            index: true,
            element: <CustomerListPage />,
          },
          {
            path: 'add',
            element: <CustomerAddPage />,
          },
          {
            path: ':customerId',
            element: <CustomerDetailPage />,
          },
          {
            path: ':customerId/edit',
            element: <CustomerEditPage />,
          },
        ],
      },
      {
        path: 'invoices',
        children: [
          {
            index: true,
            element: <InvoiceListPage />,
          },
          {
            path: ':invoiceId',
            element: <InvoiceDetailPage />,
          },
        ],
      },
      {
        path: 'jobs',
        children: [
          {
            index: true,
            element: <JobsList />,
          },
          {
            path: 'create',
            element: <JobCreatePage />,
          },
          {
            path: ':jobId',
            element: <JobDetailPage />,
          },
          {
            path: ':jobId/:mode',
            element: <JobDetailPage />,
          },
          {
            path: 'companies',
            children: [
              {
                path: ':companyId',
                element: <CompanyDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'Estimates',
        children: [
          {
            index: true,
            element: <EstimateList />,
          },
          {
            path: ':jobId/create',
            element: <EstimateCreatePage />,
          },
          {
            path: ':jobId/edit/:estimateId',
            element: <EstimateCreatePage />,
          },
          {
            path: ':estimateId/:edit',
            element: <EstimateDetailPage />,
          },
          {
            path: 'companies',
            children: [
              {
                path: ':companyId',
                element: <CompanyDetailPage />,
              },
            ],
          },
        ],
      },
      {
        path: 'employees',
        children: [
          {
            index: true,
            element: <EmployeeList />,
          },
          {
            path: 'create',
            element: <EmployeeCreatePage />,
          },
          {
            path: ':employeeId',
            element: <EmployeeDetailPage />,
          },
          // {
          //   path: ':employeeId/:mode',
          //   element: <EmployeeDetailPage />,
          // },
        ],
      },
      {
        path: 'Inventory',
        children: [
          {
            index: true,
            element: <InventoryPage />,
          },
        ],
      },

      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'calendar',
        element: <CalendarPage />,
      },
      {
        path: 'help',
        element: <HelpPage />,
      },
    ],
  },
]
