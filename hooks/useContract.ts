import { ethers } from 'ethers'
import { useMemo } from 'react'

export default function useContract<T extends ethers.Contract>(
  address: string | undefined,
  abi: ethers.ContractInterface,
  signerOrProvider?: ethers.Signer | ethers.providers.Provider | undefined,
): T | null {
  return useMemo(() => {
    if (typeof address === 'undefined') return null
    return new ethers.Contract(address, abi, signerOrProvider) as T
  }, [address, abi, signerOrProvider])
}
