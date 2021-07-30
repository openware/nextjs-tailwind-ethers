import { MenuAlt2Icon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useMemo } from 'react'
import navigation from '../../configs/navigation'

type Props = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>
}

export default function NavBottomBar({ setSidebarOpen }: Props): JSX.Element {
  const router = useRouter()
  const navs = useMemo(() => {
    return navigation.main.filter((item) => item.mobile)
  }, [])
  const isActivePath = (path: string) => router.pathname === path

  return (
    <div className="relative z-10 flex-shrink-0 flex h-16 bg-white border-t border-b border-gray-200">
      <div className="flex-1 flex justify-between">
        <nav className="flex-1 flex flex-row bg-white">
          {navs.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                'group flex flex-1 flex-col justify-center items-center text-sm font-medium',
                isActivePath(item.href)
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              <item.icon
                className={classNames(
                  isActivePath(item.href)
                    ? 'text-gray-500'
                    : 'text-gray-400 group-hover:text-gray-500',
                  'flex-shrink-0 h-6 w-6',
                )}
                aria-hidden="true"
              />
              <span>{item.name}</span>
            </a>
          ))}
        </nav>
      </div>
      <button
        className="px-4 border-l border-gray-200 text-gray-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  )
}
