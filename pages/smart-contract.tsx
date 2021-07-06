import { XCircleIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import Head from 'next/head'
import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import chains from '../configs/chains'
import ERC20ABI from '../contracts/erc20.abi.json'
import useContract from '../hooks/useContract'
import useWallet from '../hooks/useWallet'
import { appTitle } from '../libs/page'

export default function SmartContract(): JSX.Element {
  const token = useMemo(
    () => ({
      address: '0x7ef95a0fee0dd31b22626fa2e10ee6a223f8a684', // USDT
      chainId: 97, // BSC Testnet
    }),
    [],
  )

  const abi = useMemo(() => {
    return ERC20ABI.filter(
      (item) =>
        (item.type === 'function' && item.inputs?.length === 0) ||
        item.name === 'balanceOf',
    )
  }, [])

  const [selectedChainId, setChainId] = useState<number>(token.chainId)
  const [selectedAddress, setAddress] = useState<string>(token.address)

  const chain = useMemo(() => {
    return chains.find((chain) => chain.chainId === selectedChainId)
  }, [selectedChainId])

  const provider = useMemo(() => {
    const url = chain?.rpc[0]
    return new ethers.providers.JsonRpcProvider(url)
  }, [chain])

  const contract = useContract(selectedAddress, abi, provider)

  const [values, setValues] = useState<{ [key: string]: any }>({})
  const [error, setError] = useState<Error>()

  const { account: ownerAddress } = useWallet()

  useEffect(() => {
    setValues({})
    setError(undefined)
    ;(async () => {
      const updatedValues: { [key: string]: any } = {}
      await contract?.deployed()
      abi
        .filter((item) => !!item.name)
        .map(async (item) => {
          const inputs = (item.inputs ?? [])
            .map((input) => {
              if (input.name === '_owner') return ownerAddress
            })
            .filter(Boolean)

          let value = ''
          if (inputs.length === (item.inputs ?? []).length) {
            const result = await contract?.functions[item.name as string](
              ...inputs,
            )
            value = result[0].toString()
          }
          updatedValues[item.name as string] = value
          setValues({ ...updatedValues })
        })
    })().catch((error) => {
      console.error(error)
      setError(error)
    })
  }, [contract, ownerAddress, abi])

  return (
    <>
      <Head>
        <title>{appTitle('Smart Contract')}</title>
      </Head>
      <Layout>
        <div className="px-2 pt-4 bg-white border-b border-gray-200">
          <form
            className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
              <div>
                <div>
                  <h1 className="text-xl leading-6 font-bold text-gray-900">
                    ERC20 Smart Contract
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This information will be displayed at the selected chain and
                    contract address.
                  </p>
                </div>

                <div className="mt-3 space-y-4 sm:space-y-3">
                  <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-3">
                    <label
                      htmlFor="chain"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Chain
                    </label>
                    <div className="mt-1 sm:mt-0 sm:col-span-2">
                      <div className="max-w-lg flex rounded-md shadow-sm">
                        <select
                          id="chain"
                          name="chain"
                          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          defaultValue={token.chainId}
                          onChange={(e) => setChainId(+e.target.value)}
                        >
                          {chains.map((chain) => (
                            <option key={chain.chainId} value={chain.chainId}>
                              {chain.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pb-3 space-y-4 sm:space-y-3">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-3">
                      <label
                        htmlFor="contract_address"
                        className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                      >
                        Contract Address
                      </label>
                      <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <div className="max-w-lg flex rounded-md shadow-sm">
                          <input
                            type="text"
                            name="contract_address"
                            id="contract_address"
                            autoComplete="contract_address"
                            className="flex-1 block w-full focus:ring-indigo-500 focus:border-indigo-500 min-w-0 rounded-md sm:text-sm border-gray-300"
                            defaultValue={token.address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="pb-3">
                      <div className="rounded-md bg-red-50 p-4">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <XCircleIcon
                              className="h-5 w-5 text-red-400"
                              aria-hidden="true"
                            />
                          </div>
                          <div className="ml-3">
                            <div className="text-sm text-red-700">
                              {error.toString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-8 mb-6">
          <h2 className="max-w-6xl mx-auto mt-8 px-4 text-lg leading-6 font-medium text-gray-900 sm:px-6 lg:px-8">
            Read Contract
          </h2>

          <div className="block">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col mt-2">
                <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="hidden px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider lg:block">
                          Type
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {abi.map((item) => (
                        <tr key={item.name} className="bg-white">
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div className="flex">
                              <p className="text-gray-900 font-medium">
                                {item.name}
                              </p>
                            </div>
                          </td>
                          <td className="hidden px-6 py-4 whitespace-nowrap text-sm text-gray-500 lg:block">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                              {item.type}
                            </span>
                          </td>
                          <td className="max-w-0 w-full px-6 py-4 text-right whitespace-nowrap text-sm text-gray-500">
                            <span className="text-gray-900 font-medium">
                              {item.name ? values[item.name] : ''}
                            </span>
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
    </>
  )
}
