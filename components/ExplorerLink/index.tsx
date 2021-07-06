import Link from 'next/link'
import type { Chain } from '../../configs/chains'

type Explorer = {
  name: string
  url: string
  standard: string
}

type ExploreType = 'address' | 'tx' | 'block'

function explorerLink(
  explorer: Explorer,
  type: ExploreType,
  value: string | number,
) {
  return `${explorer.url}/${type}/${value}`
}

function explorerName(explorer: Explorer) {
  return explorer.name
}

type Props = {
  chain: Chain
  type: ExploreType
  value: string | number
  Label?: (params: { explorer: Explorer; name: string }) => JSX.Element
}

export default function ExplorerLink({
  chain,
  type,
  value,
  Label = ({ name }) => <span className="capitalize">{name}</span>,
}: Props): JSX.Element {
  const [explorer] = chain.explorers ?? []

  return (
    <>
      {explorer && (
        <Link href={explorerLink(explorer, type, value)}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-700 truncate"
          >
            <Label explorer={explorer} name={explorerName(explorer)} />
          </a>
        </Link>
      )}
    </>
  )
}
