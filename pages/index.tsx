import { ExternalLinkIcon, GlobeIcon } from '@heroicons/react/outline'
import classNames from 'classnames'
import { ethers } from 'ethers'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import Connector from '../components/Connector'
import ExplorerLink from '../components/ExplorerLink'
import Layout from '../components/Layout'
import chains from '../configs/chains'
import useWallet from '../hooks/useWallet'
import { appTitle } from '../libs/page'
import { shortenHex } from '../libs/utils'

export default function Home(): JSX.Element {
  const { active, account, chain, connectorInfo } = useWallet()
  const [wallets, setWallets] = useState<{ [key: number]: string }>({})

  // Get ethers providers
  const providers = useMemo(() => {
    if (!active) return []
    return chains.map((chain) => ({
      decimals: chain.nativeCurrency.decimals,
      rpc: new ethers.providers.JsonRpcProvider(chain.rpc[0]),
    }))
  }, [active])

  // Get networks balance
  useEffect(() => {
    if (!providers.length || !account) return
    const updatedWallets: { [key: number]: string } = {}
    providers.map(async (provider) => {
      await provider.rpc.ready
      const [network, balance] = await Promise.all([
        provider.rpc.network ?? provider.rpc.getNetwork(),
        provider.rpc
          .getBalance(account)
          .then((balance) =>
            ethers.utils.commify(
              ethers.utils.formatUnits(balance, provider.decimals),
            ),
          )
          .catch((error) => {
            console.error(error)
            return '0'
          }),
      ])
      updatedWallets[network.chainId] = balance
      setWallets({ ...updatedWallets })
    })
  }, [providers, account])

  const statusStyles: { [key: string]: string } = {
    ETH: 'bg-green-100 text-green-800',
    BSC: 'bg-yellow-100 text-yellow-800',
    Matic: 'bg-purple-100 text-purple-800',
  }

  return (
    <>
      <Head>
        <title>{appTitle('Home')}</title>
      </Head>
      {!active ? (
        <Layout className="flex">
          <div className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 512 512"
                stroke="currentColor"
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
              <h3 className="mt-2 text-md font-medium text-gray-900">
                No wallet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by connecting a wallet.
              </p>
              <div className="mt-6">
                <Connector />
              </div>
            </div>
          </div>
        </Layout>
      ) : (
        <Layout>
          <div className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
              <div className="py-6 md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <div className="hidden sm:block">
                      <Image
                        className="hidden h-16 w-16 rounded-full sm:block"
                        src="/images/avatar.jpeg"
                        alt="avatar"
                        width={64}
                        height={64}
                      />
                    </div>
                    <div>
                      <div className="flex items-center">
                        <div className="sm:hidden">
                          <Image
                            className="h-16 w-16 rounded-full sm:hidden"
                            src="/images/avatar.jpeg"
                            alt="avatar"
                            width={64}
                            height={64}
                          />
                        </div>
                        <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                          Welcome, {shortenHex(account, 4)}
                        </h1>
                      </div>
                      <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                        <dt className="sr-only">Company</dt>
                        <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                          <GlobeIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          {chain?.name}
                        </dd>
                        <dt className="sr-only">Account status</dt>
                        <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                          <svg
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                            x-description="Heroicon name: solid/check-circle"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          {connectorInfo?.name} account
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 mb-6">
            <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
              Wallet
            </h2>

            {/* Activity table */}
            <div className="block">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col mt-2">
                  <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead>
                        <tr>
                          <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Network
                          </th>
                          <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider lg:block">
                            Chain
                          </th>
                          <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="hidden px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider lg:block">
                            Explorer
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {chains.map((chain) => (
                          <tr key={chain.chainId} className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <div className="flex">
                                <a
                                  href={chain.infoURL}
                                  className="group inline-flex space-x-2 truncate text-sm"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLinkIcon
                                    className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                  />
                                  <p className="text-gray-500 truncate group-hover:text-gray-900">
                                    {chain.name}
                                  </p>
                                </a>
                              </div>
                            </td>
                            <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 lg:block">
                              <span
                                className={classNames(
                                  statusStyles[chain.chain],
                                  'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize',
                                )}
                              >
                                {chain.chain}
                              </span>
                            </td>
                            <td className="max-w-0 w-full px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                              <span className="text-gray-900 font-medium">
                                {chain.chainId in wallets
                                  ? wallets[chain.chainId]
                                  : '-'}{' '}
                              </span>
                              {chain.nativeCurrency.symbol}
                            </td>
                            <td className="hidden px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500 lg:block">
                              {account && (
                                <ExplorerLink
                                  chain={chain}
                                  type={'address'}
                                  value={account}
                                />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      )}
    </>
  )
}
