import classNames from 'classnames'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import NavSidebar from '../NavSidebar'
import NavTopBar from '../NavTopBar'

export default function Layout(
  props: PropsWithChildren<{ className?: string }>,
): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      <NavSidebar open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <NavTopBar setSidebarOpen={setSidebarOpen} />
        <main
          className={classNames(
            'flex-1 relative overflow-y-auto focus:outline-none',
            props.className,
          )}
        >
          {props.children}
        </main>
      </div>
    </div>
  )
}
