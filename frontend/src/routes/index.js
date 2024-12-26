import Error401Page from 'src/pages/401'
import Error404Page from 'src/pages/404'
import Error500Page from 'src/pages/500'
import ContactPage from 'src/pages/contact'
import CheckoutPage from 'src/pages/checkout'
import PricingPage from 'src/pages/pricing'
import { authRoutes } from './auth'
import { authDemoRoutes } from './auth-demo'
import { componentsRoutes } from './components'
import { dashboardRoutes } from './dashboard'

import { lazy } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout as MarketingLayout } from 'src/layouts/marketing'
import { Layout as AuthClassicLayout } from 'src/layouts/auth/classic-layout'
import { Layout as AuthModernLayout } from 'src/layouts/auth/modern-layout'

/**
 * Routes used
 */
import HomePage from 'src/pages'
import RegisterPage from 'src/pages/auth/register'
const LoginPage = lazy(() => import('src/pages/auth/login'))
const PaymentSuccessPage = lazy(() => import('src/pages/auth/PaymentSuccess'))
const ForgotPasswordModernPage = lazy(() =>
  import('src/pages/auth-demo/forgot-password/modern')
)
const VerifyCodeModernPage = lazy(() =>
  import('src/pages/auth-demo/verify-code/modern')
)
const ResetPasswordModernPage = lazy(() =>
  import('src/pages/auth-demo/reset-password/modern')
)
export const routes = [
  {
    element: (
      <MarketingLayout>
        <Outlet />
      </MarketingLayout>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'pricing',
        element: <PricingPage />,
      },
      ...componentsRoutes,
    ],
  },
  ...authRoutes,
  ...authDemoRoutes,
  ...dashboardRoutes,
  // AUTH
  {
    path: 'register',
    element: (
      // <AuthModernLayout>
      <RegisterPage />
      // </AuthModernLayout>
    ),
  },
  {
    path: 'login',
    element: (
      <AuthClassicLayout>
        <LoginPage />
      </AuthClassicLayout>
    ),
  },
  {
    path: 'forgot-password',
    element: (
      <AuthModernLayout>
        <ForgotPasswordModernPage />
      </AuthModernLayout>
    ),
  },
  {
    path: 'verify-code',
    element: (
      <AuthModernLayout>
        <VerifyCodeModernPage />
      </AuthModernLayout>
    ),
  },
  {
    path: 'reset-password/:token',
    element: (
      <AuthModernLayout>
        <ResetPasswordModernPage />
      </AuthModernLayout>
    ),
  },
  {
    path: 'payment-success',
    element: (
      <AuthClassicLayout>
        <PaymentSuccessPage />
      </AuthClassicLayout>
    ),
  },
  {
    path: 'checkout',
    element: <CheckoutPage />,
  },
  {
    path: 'contact',
    element: <ContactPage />,
  },
  {
    path: '401',
    element: <Error401Page />,
  },
  {
    path: '404',
    element: <Error404Page />,
  },
  {
    path: '500',
    element: <Error500Page />,
  },
  {
    path: '*',
    element: <Error404Page />,
  },
]
