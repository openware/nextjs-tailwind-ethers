import classNames from 'classnames'
import Image from 'next/image'
import { useState } from 'react'
import useDApp from '../../hooks/useDApp'
import useEagerConnect from '../../hooks/useEagerConnect'
import useENSName from '../../hooks/useENSName'
import useWallet from '../../hooks/useWallet'
import { shortenHex } from '../../libs/utils'
import AccountModal from '../AccountModal'
import Balance from '../Balance'
import Connector from '../Connector'

const WalletIcon = ({
  classNames = '',
  stroke = 'rgb(55, 65, 81)',
}: {
  classNames?: string
  stroke?: string
}): JSX.Element => (
  <svg
    className={classNames}
    fill="none"
    viewBox="0 0 512 512"
    stroke={stroke}
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
)

type Props = {
  contentClassNames?: string
}

export default function Account({
  contentClassNames = '',
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
    return (
      <Connector
        Label={() => (
          <>
            <span className="md:hidden lg:inline">
              Connect your wallet
            </span>
            <span className="hidden md:inline lg:hidden">
              <WalletIcon classNames="h-5 w-5" stroke="white" />
            </span>
          </>
        )}
      />
    )
  }

  return (
    <div className="flex-shrink-0 w-full flex-1 lg:ml-2">
      <a
        role="button"
        className="flex justify-center lg:justify-start p-2 group block rounded-md hover:bg-gray-50"
        onClick={() => setModal(true)}
      >
        <div className="flex items-center">
          <div>
            <Image
              className="inline-block h-9 w-9 rounded-full"
              src="/images/avatar.jpeg"
              alt="avatar"
              width={40}
              height={40}
            />
          </div>
          <div className={classNames('ml-3 truncate', contentClassNames)}>
            <p className="flex text-sm font-bold text-gray-700 group-hover:text-gray-900">
              <WalletIcon classNames="h-5 w-5 mr-2" />
              {ENSName || `${shortenHex(account, 4)}`}
            </p>
            <p className="text-xs font-medium truncate text-gray-500 group-hover:text-gray-700">
              {chain && <Balance symbol={chain.nativeCurrency.symbol} />}
            </p>
          </div>
        </div>
      </a>
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
