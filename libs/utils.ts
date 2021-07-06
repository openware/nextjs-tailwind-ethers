export function shortenHex(hex: string | undefined | null, length = 4) {
  return `${hex?.substring(0, length + 2)}…${hex?.substring(
    hex?.length - length,
  )}`
}
