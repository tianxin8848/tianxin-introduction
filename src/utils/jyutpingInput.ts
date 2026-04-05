/** True if `input` is non-empty and diverges from the start of `target` (ASCII case-insensitive). */
export function jyutpingInputHasError(input: string, target: string): boolean {
  if (input.length === 0) return false
  const a = input.toLowerCase()
  const b = target.toLowerCase()
  for (let i = 0; i < a.length; i++) {
    if (i >= b.length || a[i] !== b[i]) return true
  }
  return false
}
