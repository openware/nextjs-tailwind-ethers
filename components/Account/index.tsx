import { useState } from 'react'
import useDApp from '../../hooks/useDApp'
import useEagerConnect from '../../hooks/useEagerConnect'
import useENSName from '../../hooks/useENSName'
import useWallet from '../../hooks/useWallet'
import { shortenHex } from '../../libs/utils'
import AccountModal from '../AccountModal'
import Balance from '../Balance'
import Connector from '../Connector'

type Props = {
  className?: string
  showAddress?: boolean
  showIcon?: boolean
}

export default function Account({
  showAddress = true,
  showIcon = true,
}: Props): JSX.Element | null {
  const [showModal, setModal] = useState(false)
  const triedToEagerConnect = useEagerConnect()
  const { active, account, chain } = useWallet()
  const { disconnect } = useDApp()
  const ENSName = useENSName(account)

  if (!triedToEagerConnect) {
    return null
  }

  if (!active) {
    return <Connector />
  }

  return (
    <div>
      <div className="group rounded-lg flex bg-gray-100">
        <span className="p-1 px-2 rounded-md flex items-center text-sm text-gray-600 font-medium">
          {chain && <Balance symbol={chain.nativeCurrency.symbol} />}
        </span>
        {showAddress && (
          <button
            className="flex rounded-md text-white border border-indigo-600 bg-indigo-600 hover:bg-indigo-700 p-1 px-2 text-sm font-medium"
            onClick={() => setModal(true)}
          >
            {showIcon && (
              <svg
                className="mx-auto h-5 w-5 text-gray-400 mr-2"
                fill="none"
                viewBox="0 0 512 512"
                stroke="white"
                aria-hidden="true"
              >
                <rect
                  width="416"
                  height="288"
                  x="48"
                  y="144"
                  fill="none"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  rx="48"
                  ry="48"
                ></rect>
                <path
                  fill="none"
                  strokeLinejoin="round"
                  strokeWidth="32"
                  d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v49"
                ></path>
                <path
                  strokeWidth="32"
                  d="M368 320a32 32 0 1132-32 32 32 0 01-32 32z"
                ></path>
              </svg>
            )}
            {ENSName || `${shortenHex(account, 4)}`}
          </button>
        )}
      </div>
      {account && chain && (
        <AccountModal
          open={showModal}
          setOpen={setModal}
          address={account}
          chain={chain}
          handleLogout={() => disconnect()}
        />
      )}
    </div>
  )
}
