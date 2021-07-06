import type { AbstractConnector } from '@web3-react/abstract-connector'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import type { ethers } from 'ethers'
import { useCallback, useMemo } from 'react'
import appConfig from '../configs/app'
import chains from '../configs/chains'

const { supportedChainIds } = appConfig.blockchain

export type ProviderWhitelist = 'Injected' | 'WalletConnect'

export const providerCache = {
  key: 'APP_CONNECT_CACHED_PROVIDER',
  set(name: ProviderWhitelist) {
    localStorage.setItem(this.key, name)
  },
  get(): ProviderWhitelist | null {
    return localStorage.getItem(this.key) as ProviderWhitelist
  },
  clear() {
    localStorage.removeItem(this.key)
  },
}

export const connectorsByProvider: {
  [id in ProviderWhitelist]: {
    connector: AbstractConnector
    preConnect?: () => void
    postDisconnect?: () => void
  }
} = {
  Injected: {
    connector: new InjectedConnector({
      supportedChainIds,
    }),
  },
  WalletConnect: {
    connector: new WalletConnectConnector({
      supportedChainIds,
      infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
      bridge: 'https://bridge.walletconnect.org',
      qrcode: true,
      pollingInterval: 10000,
    }),
    preConnect() {
      const connector = this.connector as WalletConnectConnector
      // clean WalletConnect provider cache
      if (connector.walletConnectProvider?.wc?.uri) {
        connector.walletConnectProvider = undefined
      }
    },
    postDisconnect() {
      const connector = this.connector as WalletConnectConnector
      connector.walletConnectProvider?.disconnect()
    },
  },
}

export const getConnectorInfo = (
  connector?: AbstractConnector,
): { id: ProviderWhitelist; name: string } | undefined => {
  switch (connector?.constructor) {
    case InjectedConnector:
      return {
        id: 'Injected',
        name: window.ethereum?.isMetaMask ? 'MetaMask' : 'Injected',
      }
    case WalletConnectConnector:
      return {
        id: 'WalletConnect',
        name: 'WalletConnect',
      }
    default:
      return
  }
}

export default function useDApp() {
  const context = useWeb3React<ethers.providers.Web3Provider>()
  const { account, activate, connector, error, chainId, library, deactivate } =
    context

  const signer = useMemo(() => {
    return library?.getSigner()
  }, [library])

  const chain = useMemo(() => {
    return chainId
      ? chains.find((chain) => chain.chainId === chainId)
      : undefined
  }, [chainId])

  const connectorInfo = useMemo(() => {
    return getConnectorInfo(connector)
  }, [connector])

  const connectWithProvider = useCallback(
    (providerId: ProviderWhitelist): Promise<void> => {
      if (account) {
        return Promise.resolve().then(() => {
          providerCache.set(providerId)
        })
      } else {
        console.log(`[${providerId}] Account connecting`)
        const connector = connectorsByProvider[providerId]
        if (connector.preConnect) {
          connector.preConnect()
        }
        return activate(connector.connector, undefined, true).then(() => {
          providerCache.set(providerId)
        })
      }
    },
    [account],
  )

  const disconnect = useCallback(() => {
    providerCache.clear()
    deactivate()
    if (connectorInfo) {
      const connector = connectorsByProvider[connectorInfo?.id]
      if (connector.postDisconnect) {
        connector.postDisconnect()
      }
    }
  }, [connector, connectorInfo])

  return {
    context,
    chain,
    signer,
    connectorInfo,
    connectWithProvider,
    disconnect,
    error,
  }
}
