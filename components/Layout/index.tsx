import type {
  FooterProps,
  navigationApp,
  navigationAppItem,
  SidebarProps,
} from '@openware/react-opendax'
import { Layout as SharedLayout } from '@openware/react-opendax'
import type { PropsWithChildren } from 'react'
import Navigation from '../../configs/navigation'

export const navigations: navigationApp[] = [
  {
    app: "mainapp",
    pathnames: Navigation.main.map<navigationAppItem>(nav => (
      {
        name: nav.name,
        icon: <nav.icon className="text-gray-500 flex-shrink-0 h-6 w-6" />,
        path: nav.href,
      }
    ))
  },
];

const footerProps: FooterProps = {
  className: 'bg-white',
  options: {
    navigations: Navigation.footer,
    socials: Navigation.social,
    upIcon: function upIcon() {
      return (
        <svg width="10" height="6" viewBox="0 0 12 8">
          <path d="M11.715 7.12905L11.1374 7.71235C10.9373 7.9041 10.7035 8 10.4367 8C10.1643 8 9.93335 7.9041 9.74335 7.71235L6.00003 3.9329L2.25673 7.71224C2.06676 7.90399 1.83573 7.99989 1.5635 7.99989C1.29653 7.99989 1.06283 7.90399 0.862654 7.71224L0.292677 7.12894C0.0975231 6.93204 1.12728e-07 6.69609 1.36485e-07 6.42129C1.60685e-07 6.14138 0.0976311 5.90809 0.29265 5.72149L5.30676 0.659102C5.49169 0.462179 5.72265 0.363637 6 0.363637C6.27215 0.363637 6.50583 0.462152 6.70079 0.659103L11.7149 5.7215C11.9049 5.91335 12 6.14661 12 6.42129C12 6.69097 11.905 6.92678 11.715 7.12905Z" />
        </svg>
      )
    },
    downIcon: function upIcon() {
      return (
        <svg width="10" height="6" viewBox="0 0 10 6">
          <path d="M0.713781 0.903217L1.14695 0.465737C1.29706 0.321926 1.47238 0.25 1.6725 0.25C1.87675 0.25 2.04999 0.321926 2.19249 0.465737L4.99998 3.30033L7.80745 0.465819C7.94993 0.322008 8.12321 0.250082 8.32738 0.250082C8.5276 0.250082 8.70288 0.322008 8.85301 0.465819L9.28049 0.903298C9.42686 1.05097 9.5 1.22794 9.5 1.43403C9.5 1.64397 9.42678 1.81893 9.28051 1.95888L5.51993 5.75567C5.38123 5.90337 5.20802 5.97727 5 5.97727C4.79589 5.97727 4.62063 5.90339 4.47441 5.75567L0.713802 1.95888C0.571301 1.81499 0.5 1.64004 0.5 1.43403C0.49998 1.23178 0.57128 1.05491 0.713781 0.903217Z" />
        </svg>
      )
    },
  },
}

const sidebarProps: SidebarProps = {
  currentApp: 'mainapp',
  navigations,
  navClassNames: 'no-underline duration-200 group flex items-center px-2 py-2 text-sm font-medium rounded-md text-cta-contrast',
  navActiveClassNames: 'text-gray-900 bg-gray-100',
  navInactiveClassNames: 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
  isLoggedin: false,
  buttonsList: [ { name: 'Metamask' }],
}

export default function Layout(
  props: PropsWithChildren<{ className?: string }>,
): JSX.Element {
  return (
    <SharedLayout
      containerClassName={props.className}
      footerProps={footerProps}
      sidebarProps={sidebarProps}
    >
      {props.children}
    </SharedLayout>
  )
}
