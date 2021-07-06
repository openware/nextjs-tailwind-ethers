import { MenuAlt2Icon } from '@heroicons/react/outline'
import type { Dispatch, SetStateAction } from 'react'
import Account from '../Account'

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function Layout({ setSidebarOpen }: Props): JSX.Element {
  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-b border-gray-200">
      <button
        className="px-4 border-r border-gray-200 text-gray-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex-1 px-4 flex justify-between">
        <div className="flex-1 flex">
          {/* Put some lef-top elements here */}
        </div>
        <div className="ml-4 flex items-center md:ml-6">
          <Account showAddress={true} />
        </div>
      </div>
    </div>
  )
}
