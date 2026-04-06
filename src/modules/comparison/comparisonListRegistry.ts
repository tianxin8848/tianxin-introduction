import type { ComparisonListDefinition } from './comparisonData'

export type ComparisonListId = string

export interface ComparisonListEntry extends ComparisonListDefinition {
  id: ComparisonListId
}

const listModules = import.meta.glob<ComparisonListDefinition>('./lists/*.{ts,tsx}', {
  eager: true,
  import: 'default',
})

function pathToId(path: string): ComparisonListId | null {
  const m = path.match(/\.\/lists\/(.+)\.(ts|tsx)$/)
  return m?.[1] ?? null
}

const sortedEntries: [ComparisonListId, ComparisonListDefinition][] = Object.entries(listModules)
  .map(([path, data]) => {
    const id = pathToId(path)
    if (!id || data == null) return null
    return [id, data] as [ComparisonListId, ComparisonListDefinition]
  })
  .filter((x): x is [ComparisonListId, ComparisonListDefinition] => x !== null)
  .sort(([a], [b]) => a.localeCompare(b))

if (sortedEntries.length === 0) {
  throw new Error('comparison: 請在 src/modules/comparison/lists/ 下至少新增一個 *.{ts,tsx} 列表檔')
}

export const COMPARISON_LIST_IDS: readonly ComparisonListId[] = sortedEntries.map(([id]) => id)

export const COMPARISON_DEFAULT_LIST_ID: ComparisonListId = sortedEntries[0]![0]

export const COMPARISON_LISTS: Record<ComparisonListId, ComparisonListEntry> = Object.fromEntries(
  sortedEntries.map(([id, def]) => [id, { ...def, id }]),
) as Record<ComparisonListId, ComparisonListEntry>

export function isComparisonListId(value: string): value is ComparisonListId {
  return Object.prototype.hasOwnProperty.call(COMPARISON_LISTS, value)
}

export function getComparisonListTabs(): { id: ComparisonListId; short: string; label: string }[] {
  return sortedEntries.map(([id, def], index) => ({
    id,
    short: def.navShort ?? String(index + 1),
    label: def.navLabel ?? `對照表（${id}）`,
  }))
}
