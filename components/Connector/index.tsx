import { useCallback, useState } from 'react'
import type { ProviderWhitelist } from '../../hooks/useDApp'
import useDApp from '../../hooks/useDApp'
import WalletModal from '../WalletModal'

type Props = {
  Label?: () => JSX.Element
}

export default function Connector({
  Label = () => <span>Connect your wallet</span>,
}: Props): JSX.Element {
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
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-cta-color-main hover:bg-primary-cta-color-hover"
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
