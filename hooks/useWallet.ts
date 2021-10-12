import { useBalance, useDApp } from './'

export function useWallet() {
  const {
    context: { active, account, library, connector },
    connectorInfo,
    chain,
    signer,
  } = useDApp()
  const balance = useBalance(library!, account!)

  return {
    active,
    account,
    chain,
    signer,
    connectorInfo,
    connector,
    balance,
  }
}
