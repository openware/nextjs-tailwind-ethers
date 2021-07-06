import { useWeb3React } from '@web3-react/core'
import type { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import useDebounce from './useDebounce'

export default function useBlockNumber(debounce: number = 0) {
  const { library } = useWeb3React<ethers.providers.Web3Provider>()
  const [blockNumber, setBlockNumber] = useState<number>(0)
  const currentBlockNumber = useDebounce(blockNumber, debounce)

  useEffect(() => {
    const onBlockChanged = (blockNumber: number) => {
      setBlockNumber(blockNumber)
    }
    library?.on('block', onBlockChanged)
    return () => {
      setBlockNumber(0)
      library?.off('block', onBlockChanged)
    }
  }, [library])

  return currentBlockNumber
}
