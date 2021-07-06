import { useCallback, useState } from 'react'
import type { ProviderWhitelist } from '../../hooks/useDApp'
import useDApp from '../../hooks/useDApp'
import WalletModal from '../WalletModal'

export default function Connector(): JSX.Element {
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
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        onClick={() => setModal(true)}
      >
        Connect your wallet
      </button>
      <WalletModal
        open={showModal}
        setOpen={setModal}
        handleTriggerConnect={handleConnectWallet}
      />
    </>
  )
}
