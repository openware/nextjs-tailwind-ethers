import classNames from 'classnames'
import React, { FC, useState } from 'react'
import {
  useDApp,
  useEagerConnect,
  useENSName,
  useWallet,
} from '../../hooks'
import { shortenHex } from '../../helpers'
import { AccountModal, Balance, Connector } from '../'
import { Metamask } from '../../assets/images/Metamask'
import { WalletIcon } from '../../assets/images/WalletIcon'

export type AccountProps = {
  contentClassNames?: string;
  label?: string;
  buttonClassNames?: string;
  collapseLeftBar?: boolean;
}

export const Account: FC<AccountProps> = ({
  contentClassNames,
  label,
  buttonClassNames,
  collapseLeftBar,
}: AccountProps) => {
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
            {collapseLeftBar ?
              <span>
                <WalletIcon classNames="h-5 w-5" stroke="white" />
              </span> :
              <span className={buttonClassNames}>
                {label}
              </span>}
          </>
        )}
      />
    )
  }

  return (
    <>
      <a
        role="button"
        className="flex justify-center lg:justify-start p-2 group block rounded-md hover:bg-gray-50"
        onClick={() => setModal(true)}
      >
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center bg-indigo-50 rounded-full">
            <div className="flex w-5">
                <Metamask />
            </div>
          </div>
          {!collapseLeftBar && <div className={classNames('ml-2 truncate', contentClassNames)}>
            <p className="flex text-base font-bold text-gray-700 group-hover:text-gray-900">
              {chain && <Balance symbol={chain.nativeCurrency.symbol} precision={6} />}
            </p>
            <p className="text-xs font-medium truncate text-gray-500 group-hover:text-gray-700">
              {ENSName || `${shortenHex(account, 4)}`}
            </p>
          </div>}
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
    </>
  )
}

Account.defaultProps = {
    label: 'Connect your wallet',
} as AccountProps
