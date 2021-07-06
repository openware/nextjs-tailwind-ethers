import { ethers } from 'ethers'
import useWallet from '../../hooks/useWallet'

type Props = {
  symbol: string
}

export default function Balance({ symbol }: Props): JSX.Element {
  const { balance } = useWallet()

  return (
    <>
      {balance ? ethers.utils.commify(ethers.utils.formatEther(balance)) : ''}{' '}
      {symbol}
    </>
  )
}
