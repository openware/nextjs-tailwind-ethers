import { useEffect, useState } from 'react'
import useDApp from './useDApp'

export default function useENSName(address?: string | null) {
  const {
    context: { library, chainId },
  } = useDApp()
  const [ENSName, setENSName] = useState('')

  useEffect(() => {
    if (address) {
      library
        ?.lookupAddress(address)
        .then((name: string | null) => {
          if (name) {
            setENSName(name)
          }
        })
        .catch(() => {})
    }
    return () => {
      setENSName('')
    }
  }, [library, address, chainId])

  return ENSName
}
