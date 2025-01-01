import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as DashboardLayout } from 'src/layouts/dashboard'

const IndexPage = lazy(() => import('src/pages/dashboard/index'))

// Academy
const AcademyDashboardPage = lazy(() =>
  import('src/pages/dashboard/academy/dashboard')
)
const AcademyCoursePage = lazy(() =>
  import('src/pages/dashboard/academy/course')
)

// Blog
const BlogPostListPage = lazy(() => import('src/pages/dashboard/blog/list'))
const BlogPostDetailPage = lazy(() => import('src/pages/dashboard/blog/detail'))
const BlogPostCreatePage = lazy(() => import('src/pages/dashboard/blog/create'))

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
const JobsList = lazy(() => import('src/pages/dashboard/jobs/List'))
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
// Help
const HelpPage = lazy(() => import('src/pages/dashboard/HelpPage'))

// Job Board
const JobBrowsePage = lazy(() => import('src/pages/dashboard/jobs/browse'))
const CompanyDetailPage = lazy(() => import('src/pages/dashboard/jobs/detail'))

// Logistics
const LogisticsDashboardPage = lazy(() =>
  import('src/pages/dashboard/logistics/dashboard')
)
const LogisticsFleetPage = lazy(() =>
  import('src/pages/dashboard/logistics/fleet')
)

// Orders
const OrderListPage = lazy(() => import('src/pages/dashboard/orders/list'))
const OrderDetailPage = lazy(() => import('src/pages/dashboard/orders/detail'))

// Products
const ProductListPage = lazy(() => import('src/pages/dashboard/products/list'))
const ProductCreatePage = lazy(() =>
  import('src/pages/dashboard/products/create')
)

// Social
const SocialFeedPage = lazy(() => import('src/pages/dashboard/social/feed'))
const SocialProfilePage = lazy(() =>
  import('src/pages/dashboard/social/profile')
)

// Other
const AccountPage = lazy(() => import('src/pages/dashboard/account'))
const AnalyticsPage = lazy(() => import('src/pages/dashboard/analytics'))
const BlankPage = lazy(() => import('src/pages/dashboard/blank'))
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'))
const ChatPage = lazy(() => import('src/pages/dashboard/chat'))
const CryptoPage = lazy(() => import('src/pages/dashboard/crypto'))
const EcommercePage = lazy(() => import('src/pages/dashboard/ecommerce'))
const FileManagerPage = lazy(() => import('src/pages/dashboard/file-manager'))
const KanbanPage = lazy(() => import('src/pages/dashboard/kanban'))
const MailPage = lazy(() => import('src/pages/dashboard/mail'))

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
      // {
      //   path: 'academy',
      //   children: [
      //     {
      //       index: true,
      //       element: <AcademyDashboardPage />,
      //     },
      //     {
      //       path: 'courses',
      //       children: [
      //         {
      //           path: ':courseId',
      //           element: <AcademyCoursePage />,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: 'blog',
      //   children: [
      //     {
      //       index: true,
      //       element: <BlogPostListPage />,
      //     },
      //     {
      //       path: 'create',
      //       element: <BlogPostCreatePage />,
      //     },
      //     {
      //       path: ':postId',
      //       element: <BlogPostDetailPage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'help',
      //   children: [
      //     {
      //       index: true,
      //       element: <HelpPage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'jobBoard',
      //   children: [
      //     {
      //       index: true,
      //       element: <JobBrowsePage />,
      //     },
      //     {
      //       path: 'create',
      //       element: <JobCreatePage />,
      //     },

      //     {
      //       path: 'companies',
      //       children: [
      //         {
      //           path: ':companyId',
      //           element: <CompanyDetailPage />,
      //         },
      //       ],
      //     },
      //   ],
      // },
      // {
      //   path: 'logistics',
      //   children: [
      //     {
      //       index: true,
      //       element: <LogisticsDashboardPage />,
      //     },
      //     {
      //       path: 'fleet',
      //       element: <LogisticsFleetPage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'orders',
      //   children: [
      //     {
      //       index: true,
      //       element: <OrderListPage />,
      //     },
      //     {
      //       path: ':orderId',
      //       element: <OrderDetailPage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'products',
      //   children: [
      //     {
      //       index: true,
      //       element: <ProductListPage />,
      //     },
      //     {
      //       path: 'create',
      //       element: <ProductCreatePage />,
      //     },
      //   ],
      // },
      // {
      //   path: 'social',
      //   children: [
      //     {
      //       path: 'feed',
      //       element: <SocialFeedPage />,
      //     },
      //     {
      //       path: 'profile',
      //       element: <SocialProfilePage />,
      //     },
      //   ],
      // },

      // {
      //   path: 'analytics',
      //   element: <AnalyticsPage />,
      // },
      // {
      //   path: 'blank',
      //   element: <BlankPage />,
      // },

      // {
      //   path: 'chat',
      //   element: <ChatPage />,
      // },
      // {
      //   path: 'crypto',
      //   element: <CryptoPage />,
      // },
      // {
      //   path: 'ecommerce',
      //   element: <EcommercePage />,
      // },
      // {
      //   path: 'file-manager',
      //   element: <FileManagerPage />,
      // },
      // {
      //   path: 'kanban',
      //   element: <KanbanPage />,
      // },
      // {
      //   path: 'mail',
      //   element: <MailPage />,
      // },
    ],
  },
]
