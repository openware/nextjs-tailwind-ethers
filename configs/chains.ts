import chains from './chains.json'

export type Chain = {
  name: string
  chain: string
  network: string
  rpc: string[]
  faucets: string[]
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  infoURL: string
  shortName: string
  chainId: number
  networkId: number
  slip44?: number
  ens?: {
    registry: string
  }
  explorers?: {
    name: string
    url: string
    standard: string
  }[]
}

export default chains.map((chain: Chain) => {
  const injectedRpc = chain.rpc.map((url) =>
    url.replaceAll('${INFURA_API_KEY}', process.env.NEXT_PUBLIC_INFURA_ID!),
  )
  return { ...chain, rpc: injectedRpc }
})
