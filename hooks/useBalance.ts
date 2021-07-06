import type { ethers } from 'ethers'
import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import useBlockNumber from './useBlockNumber'

export async function getBalance(
  _: string,
  provider: any,
  address: string,
  __: number,
): Promise<BigNumber> {
  return provider.getBalance(address)
}

export default function useBalance(
  provider: ethers.providers.Web3Provider,
  address: string,
) {
  const [balance, setBalance] = useState<BigNumber>()
  const blockNumber = useBlockNumber(100)

  const key = ['useBalance', provider, address, blockNumber]
  const { data: latestBalance, error } = useSWR(
    key.every((k) => typeof k !== 'undefined') ? key : null,
    getBalance,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  useEffect(() => {
    if (typeof latestBalance !== 'undefined') {
      setBalance(latestBalance)
    }
  }, [latestBalance])

  if (error) {
    console.log(`[useBalance] Error:`, error, provider, address, blockNumber)
  }

  return balance
}
