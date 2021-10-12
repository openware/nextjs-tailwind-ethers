import React, { FC } from 'react'
import { useCallback, useState } from 'react'
import type { ProviderWhitelist } from '../../hooks/useDApp'
import { useDApp } from '../../hooks'
import { WalletModal } from '../WalletModal'

type ConnectorProps = {
  Label?: () => JSX.Element
}

export const Connector: FC<ConnectorProps> = ({
  Label = () => <span>Connect your wallet</span>,
}: ConnectorProps) => {
  const [showModal, setModal] = useState(false)
  const { connectWithProvider } = useDApp()

  const handleConnectWallet = useCallback(
    (provider: ProviderWhitelist) => {
      connectWithProvider(provider).catch(console.error)
      setModal(false)
    },
    [connectWithProvider],
  )

  return (
    <>
      <button
        type="button"
        className="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-cta-color-main hover:bg-primary-cta-color-hover"
        onClick={() => setModal(true)}
      >
        <Label />
      </button>
      <WalletModal
        open={showModal}
        setOpen={setModal}
        handleTriggerConnect={handleConnectWallet}
      />
    </>
  )
}
