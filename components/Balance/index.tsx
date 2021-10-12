import { ethers } from 'ethers'
import React, { FC } from 'react'
import { useWallet } from '../../hooks/useWallet'

type BalanceProps = {
  symbol: string
  precision?: number
}

export const Balance: FC<BalanceProps> = ({ symbol, precision }: BalanceProps) => {
  const { balance } = useWallet()

  return (
    <>
      {balance ?
        precision ?
          ethers.utils.commify((+ethers.utils.formatEther(balance)).toFixed(precision)) :
          ethers.utils.commify(ethers.utils.formatEther(balance))
        : ''
      }{' '}
      {symbol}
    </>
  )
}
