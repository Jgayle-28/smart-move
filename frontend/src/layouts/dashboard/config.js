import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Chip, SvgIcon } from '@mui/material'
import AlignLeft02Icon from 'src/icons/untitled-ui/duocolor/align-left-02'
import BarChartSquare02Icon from 'src/icons/untitled-ui/duocolor/bar-chart-square-02'
import Building04Icon from 'src/icons/untitled-ui/duocolor/building-04'
import CalendarIcon from 'src/icons/untitled-ui/duocolor/calendar'
import CheckDone01Icon from 'src/icons/untitled-ui/duocolor/check-done-01'
import CreditCard01Icon from 'src/icons/untitled-ui/duocolor/credit-card-01'
import CurrencyBitcoinCircleIcon from 'src/icons/untitled-ui/duocolor/currency-bitcoin-circle'
import File01Icon from 'src/icons/untitled-ui/duocolor/file-01'
import GraduationHat01Icon from 'src/icons/untitled-ui/duocolor/graduation-hat-01'
import HomeSmileIcon from 'src/icons/untitled-ui/duocolor/home-smile'

import LayoutAlt02Icon from 'src/icons/untitled-ui/duocolor/layout-alt-02'
import LineChartUp04Icon from 'src/icons/untitled-ui/duocolor/line-chart-up-04'
import Lock01Icon from 'src/icons/untitled-ui/duocolor/lock-01'
import LogOut01Icon from 'src/icons/untitled-ui/duocolor/log-out-01'
import Mail03Icon from 'src/icons/untitled-ui/duocolor/mail-03'
import Mail04Icon from 'src/icons/untitled-ui/duocolor/mail-04'
import MessageChatSquareIcon from 'src/icons/untitled-ui/duocolor/message-chat-square'
import ReceiptCheckIcon from 'src/icons/untitled-ui/duocolor/receipt-check'
import Share07Icon from 'src/icons/untitled-ui/duocolor/share-07'
import ShoppingBag03Icon from 'src/icons/untitled-ui/duocolor/shopping-bag-03'
import ShoppingCart01Icon from 'src/icons/untitled-ui/duocolor/shopping-cart-01'
import Truck01Icon from 'src/icons/untitled-ui/duocolor/truck-01'
import Upload04Icon from 'src/icons/untitled-ui/duocolor/upload-04'
import Users03Icon from 'src/icons/untitled-ui/duocolor/users-03'
import XSquareIcon from 'src/icons/untitled-ui/duocolor/x-square'
import ViewInArOutlinedIcon from '@mui/icons-material/ViewInArOutlined'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined'
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined'
import HubOutlinedIcon from '@mui/icons-material/HubOutlined'
import { tokens } from 'src/locales/tokens'
import { paths } from 'src/paths'
import { useSelector } from 'react-redux'

/**
 * Updates the MAIN nav routes
 */

export const useSections = () => {
  const { t } = useTranslation()
  const { company } = useSelector((state) => state.company)

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: t(tokens.nav.dashboard),
            path: paths.dashboard.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Share07Icon />
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.customers),
            path: paths.dashboard.customers.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Users03Icon />
              </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.list),
            //     path: paths.dashboard.customers.index,
            //   },
            //   {
            //     title: t(tokens.nav.add),
            //     path: paths.dashboard.customers.add,
            //   },
            //   {
            //     title: t(tokens.nav.details),
            //     path: paths.dashboard.customers.details,
            //   },
            //   {
            //     title: t(tokens.nav.edit),
            //     path: paths.dashboard.customers.edit,
            //   },
            // ],
          },
          {
            title: t(tokens.nav.jobs),
            path: paths.dashboard.jobs.index,
            icon: (
              <SvgIcon fontSize='small'>
                <Truck01Icon />
              </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.dashboard),
            //     path: paths.dashboard.logistics.index,
            //   },
            //   {
            //     title: t(tokens.nav.fleet),
            //     path: paths.dashboard.logistics.fleet,
            //   },
            // ],
          },
          {
            title: t(tokens.nav.estimates),
            path: paths.dashboard.estimates.index,
            icon: (
              <SvgIcon fontSize='small'>
                <LayoutAlt02Icon />
              </SvgIcon>
            ),
            // items: [
            //   {
            //     title: t(tokens.nav.postList),
            //     path: paths.dashboard.blog.index,
            //   },
            //   {
            //     title: t(tokens.nav.postDetails),
            //     path: paths.dashboard.blog.postDetails,
            //   },
            //   {
            //     title: t(tokens.nav.postCreate),
            //     path: paths.dashboard.blog.postCreate,
            //   },
            // ],
          },
          {
            title: 'Inventory',
            path: paths.dashboard.inventory.index,
            icon: (
              <SvgIcon fontSize='small'>
                <ViewInArOutlinedIcon />
                {/* <LineChartUp04Icon /> */}
              </SvgIcon>
            ),
          },
          {
            title: t(tokens.nav.calendar),
            path: paths.dashboard.calendar,
            icon: (
              <SvgIcon fontSize='small'>
                <CalendarIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'Employees',
            path: paths.dashboard.employees.index,
            icon: (
              <SvgIcon fontSize='small'>
                <HubOutlinedIcon />
                {/* <LineChartUp04Icon /> */}
              </SvgIcon>
            ),
          },
          // TODO: Need to add check here for elite subscription
          // {
          //   title: t(tokens.nav.analytics),
          //   path: paths.dashboard.analytics,
          //   icon: (
          //     <SvgIcon fontSize='small'>
          //       <BarChartSquare02Icon />
          //     </SvgIcon>
          //   ),
          // },

          {
            title: t(tokens.nav.account),
            path: paths.dashboard.account,
            icon: (
              <SvgIcon fontSize='small'>
                <TuneOutlinedIcon />
              </SvgIcon>
            ),
          },
          {
            title: 'help',
            path: paths.dashboard.help,
            icon: (
              <SvgIcon fontSize='small'>
                <ContactSupportOutlinedIcon />
              </SvgIcon>
            ),
          },

          // {
          //   title: t(tokens.nav.contact),
          //   path: paths.contact,
          //   icon: (
          //     <SvgIcon fontSize='small'>
          //       <Mail04Icon />
          //     </SvgIcon>
          //   ),
          // },

          //     {
          //       title: t(tokens.nav.crypto),
          //       path: paths.dashboard.crypto,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <CurrencyBitcoinCircleIcon />
          //         </SvgIcon>
          //       ),
          //       label: <Chip color='primary' label='New' size='small' />,
          //     },
          //   ],
          // },
          // {
          //   subheader: t(tokens.nav.concepts),
          //   items: [
          //     {
          //       title: t(tokens.nav.productList),
          //       path: paths.dashboard.products.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <ShoppingBag03Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.list),
          //           path: paths.dashboard.products.index,
          //         },
          //         {
          //           title: t(tokens.nav.create),
          //           path: paths.dashboard.products.create,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.orderList),
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <ShoppingCart01Icon />
          //         </SvgIcon>
          //       ),
          //       path: paths.dashboard.orders.index,
          //       items: [
          //         {
          //           title: t(tokens.nav.list),
          //           path: paths.dashboard.orders.index,
          //         },
          //         {
          //           title: t(tokens.nav.details),
          //           path: paths.dashboard.orders.details,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.invoiceList),
          //       path: paths.dashboard.invoices.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <ReceiptCheckIcon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.list),
          //           path: paths.dashboard.invoices.index,
          //         },
          //         {
          //           title: t(tokens.nav.details),
          //           path: paths.dashboard.invoices.details,
          //         },
          //       ],
          //     },

          //     {
          //       title: t(tokens.nav.academy),
          //       path: paths.dashboard.academy.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <GraduationHat01Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.dashboard),
          //           path: paths.dashboard.academy.index,
          //         },
          //         {
          //           title: t(tokens.nav.course),
          //           path: paths.dashboard.academy.courseDetails,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.jobList),
          //       path: paths.dashboard.jobs.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <Building04Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.browse),
          //           path: paths.dashboard.jobs.index,
          //         },
          //         {
          //           title: t(tokens.nav.details),
          //           path: paths.dashboard.jobs.companies.details,
          //         },
          //         {
          //           title: t(tokens.nav.create),
          //           path: paths.dashboard.jobs.create,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.socialMedia),
          //       path: paths.dashboard.social.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <Share07Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.profile),
          //           path: paths.dashboard.social.profile,
          //         },
          //         {
          //           title: t(tokens.nav.feed),
          //           path: paths.dashboard.social.feed,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.blog),
          //       path: paths.dashboard.blog.index,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <LayoutAlt02Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.postList),
          //           path: paths.dashboard.blog.index,
          //         },
          //         {
          //           title: t(tokens.nav.postDetails),
          //           path: paths.dashboard.blog.postDetails,
          //         },
          //         {
          //           title: t(tokens.nav.postCreate),
          //           path: paths.dashboard.blog.postCreate,
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.fileManager),
          //       path: paths.dashboard.fileManager,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <Upload04Icon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: t(tokens.nav.kanban),
          //       path: paths.dashboard.kanban,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <CheckDone01Icon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: t(tokens.nav.mail),
          //       path: paths.dashboard.mail,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <Mail03Icon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: t(tokens.nav.chat),
          //       path: paths.dashboard.chat,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <MessageChatSquareIcon />
          //         </SvgIcon>
          //       ),
          //     },
          //   ],
          // },
          // {
          //   subheader: t(tokens.nav.pages),
          //   items: [
          //     {
          //       title: t(tokens.nav.auth),
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <Lock01Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: t(tokens.nav.login),
          //           items: [
          //             {
          //               title: 'Classic',
          //               path: paths.authDemo.login.classic,
          //             },
          //             {
          //               title: 'Modern',
          //               path: paths.authDemo.login.modern,
          //             },
          //           ],
          //         },
          //         {
          //           title: t(tokens.nav.register),
          //           items: [
          //             {
          //               title: 'Classic',
          //               path: paths.authDemo.register.classic,
          //             },
          //             {
          //               title: 'Modern',
          //               path: paths.authDemo.register.modern,
          //             },
          //           ],
          //         },
          //         {
          //           title: t(tokens.nav.forgotPassword),
          //           items: [
          //             {
          //               title: 'Classic',
          //               path: paths.authDemo.forgotPassword.classic,
          //             },
          //             {
          //               title: 'Modern',
          //               path: paths.authDemo.forgotPassword.modern,
          //             },
          //           ],
          //         },
          //         {
          //           title: t(tokens.nav.resetPassword),
          //           items: [
          //             {
          //               title: 'Classic',
          //               path: paths.authDemo.resetPassword.classic,
          //             },
          //             {
          //               title: 'Modern',
          //               path: paths.authDemo.resetPassword.modern,
          //             },
          //           ],
          //         },
          //         {
          //           title: t(tokens.nav.verifyCode),
          //           items: [
          //             {
          //               title: 'Classic',
          //               path: paths.authDemo.verifyCode.classic,
          //             },
          //             {
          //               title: 'Modern',
          //               path: paths.authDemo.verifyCode.modern,
          //             },
          //           ],
          //         },
          //       ],
          //     },
          //     {
          //       title: t(tokens.nav.pricing),
          //       path: paths.pricing,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <CreditCard01Icon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: t(tokens.nav.checkout),
          //       path: paths.checkout,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <LogOut01Icon />
          //         </SvgIcon>
          //       ),
          //     },

          //     {
          //       title: t(tokens.nav.error),
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <XSquareIcon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: '401',
          //           path: paths['401'],
          //         },
          //         {
          //           title: '404',
          //           path: paths['404'],
          //         },
          //         {
          //           title: '500',
          //           path: paths['500'],
          //         },
          //       ],
          //     },
          //   ],
          // },
          // {
          //   subheader: 'Misc',
          //   items: [
          //     {
          //       title: 'Level 0',
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <AlignLeft02Icon />
          //         </SvgIcon>
          //       ),
          //       items: [
          //         {
          //           title: 'Level 1a',
          //           items: [
          //             {
          //               title: 'Level 2a',
          //               items: [
          //                 {
          //                   title: 'Level 3a',
          //                 },
          //                 {
          //                   title: 'Level 3b',
          //                   disabled: true,
          //                 },
          //               ],
          //             },
          //             {
          //               title: 'Level 2b',
          //             },
          //           ],
          //         },
          //         {
          //           title: 'Level 1b',
          //         },
          //       ],
          //     },
          //     {
          //       title: 'Disabled',
          //       disabled: true,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <XSquareIcon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: 'Label',
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <File01Icon />
          //         </SvgIcon>
          //       ),
          //       label: <Chip color='primary' label='New' size='small' />,
          //     },
          //     {
          //       title: 'Blank',
          //       path: paths.dashboard.blank,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <File01Icon />
          //         </SvgIcon>
          //       ),
          //     },
          //     {
          //       title: 'External Link',
          //       path: 'https://devias.io',
          //       external: true,
          //       icon: (
          //         <SvgIcon fontSize='small'>
          //           <File01Icon />
          //         </SvgIcon>
          //       ),
          //     },
        ],
      },
    ]
  }, [t])
}
