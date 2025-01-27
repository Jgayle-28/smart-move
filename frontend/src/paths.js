export const paths = {
  index: '/',
  checkout: '/checkout',
  contact: '/contact',
  pricing: '/pricing',
  termsOfService: '/terms-of-service',
  auth: {
    login: '/login',
    // OLD
    auth0: {
      callback: '/auth/auth0/callback',
      login: '/auth/auth0/login',
    },
    jwt: {
      login: '/auth/jwt/login',
      register: '/auth/jwt/register',
    },
    firebase: {
      login: '/auth/firebase/login',
      register: '/auth/firebase/register',
    },
    amplify: {
      confirmRegister: '/auth/amplify/confirm-register',
      forgotPassword: '/auth/amplify/forgot-password',
      login: '/auth/amplify/login',
      register: '/auth/amplify/register',
      resetPassword: '/auth/amplify/reset-password',
    },
  },
  authDemo: {
    forgotPassword: {
      classic: '/auth-demo/forgot-password/classic',
      modern: '/auth-demo/forgot-password/modern',
    },
    login: {
      classic: '/auth-demo/login/classic',
      modern: '/auth-demo/login/modern',
    },
    register: {
      classic: '/auth-demo/register/classic',
      modern: '/auth-demo/register/modern',
    },
    resetPassword: {
      classic: '/auth-demo/reset-password/classic',
      modern: '/auth-demo/reset-password/modern',
    },
    verifyCode: {
      classic: '/auth-demo/verify-code/classic',
      modern: '/auth-demo/verify-code/modern',
    },
  },
  dashboard: {
    index: '/dashboard',
    customers: {
      index: '/dashboard/customers',
      add: '/dashboard/customers/add',
      details: '/dashboard/customers/:customerId',
      edit: '/dashboard/customers/:customerId/edit',
    },
    jobs: {
      index: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      details: '/dashboard/jobs/:jobId',
      edit: '/dashboard/jobs/:jobId/:mode',
      companies: {
        details: '/dashboard/jobs/companies/:companyId',
      },
    },
    estimates: {
      index: '/dashboard/estimates',
      detail: '/dashboard/estimates/:estimate',
      create: '/dashboard/estimates/:jobId/create',
      edit: '/dashboard/estimates/:jobId/edit/:estimateId',
    },
    inventory: {
      index: '/dashboard/inventory',
      create: '/dashboard/inventory/create',
      details: '/dashboard/inventory/:inventoryId',
      edit: '/dashboard/inventory/:inventoryId/:mode',
    },
    employees: {
      index: '/dashboard/employees',
      create: '/dashboard/employees/create',
      details: '/dashboard/employees/:employeeId',
      edit: '/dashboard/employees/:employeeId/:mode',
    },
    help: '/dashboard/help',
    account: '/dashboard/account',
    calendar: '/dashboard/calendar',

    // OLD
    academy: {
      index: '/dashboard/academy',
      courseDetails: '/dashboard/academy/courses/:courseId',
    },
    analytics: '/dashboard/analytics',
    blank: '/dashboard/blank',
    blog: {
      index: '/dashboard/blog',
      postDetails: '/dashboard/blog/:postId',
      postCreate: '/dashboard/blog/create',
    },
    chat: '/dashboard/chat',
    crypto: '/dashboard/crypto',
    ecommerce: '/dashboard/ecommerce',
    fileManager: '/dashboard/file-manager',
    invoices: {
      index: '/dashboard/invoices',
      details: '/dashboard/invoices/:orderId',
    },

    jobBoard: {
      index: '/dashboard/jobs',
      create: '/dashboard/jobs/create',
      companies: {
        details: '/dashboard/jobs/companies/:companyId',
      },
    },
    kanban: '/dashboard/kanban',
    logistics: {
      index: '/dashboard/logistics',
      fleet: '/dashboard/logistics/fleet',
    },
    mail: '/dashboard/mail',
    orders: {
      index: '/dashboard/orders',
      details: '/dashboard/orders/:orderId',
    },
    products: {
      index: '/dashboard/products',
      create: '/dashboard/products/create',
    },
    social: {
      index: '/dashboard/social',
      profile: '/dashboard/social/profile',
      feed: '/dashboard/social/feed',
    },
  },
  components: {
    index: '/components',
    dataDisplay: {
      detailLists: '/components/data-display/detail-lists',
      tables: '/components/data-display/tables',
      quickStats: '/components/data-display/quick-stats',
    },
    lists: {
      groupedLists: '/components/lists/grouped-lists',
      gridLists: '/components/lists/grid-lists',
    },
    forms: '/components/forms',
    modals: '/components/modals',
    charts: '/components/charts',
    buttons: '/components/buttons',
    typography: '/components/typography',
    colors: '/components/colors',
    inputs: '/components/inputs',
  },
  docs: 'https://material-kit-pro-react-docs.devias.io',
  401: '/401',
  404: '/404',
  500: '/500',
}
