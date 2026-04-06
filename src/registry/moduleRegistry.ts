import { isJyutpingFinal } from '../data/finals'
import {
  COMPARISON_DEFAULT_LIST_ID,
  isComparisonListId,
} from '../modules/comparison/comparisonListRegistry'

/** 与界面渲染、键盘捕获等行为对应的模块类型 */
export type PracticeModuleKind = 'finals' | 'lyrics' | 'politeness' | 'comparison'

export interface PracticeModuleChildSegment {
  default: string
  validate: (value: string) => boolean
}

/** 单条练习模块元数据：新增模块时在此追加一项即可参与路由与侧栏 */
export interface PracticeModuleDefinition {
  /** URL 段 `/m/:pathSegment`，与 id 一致便于维护 */
  id: string
  pathSegment: string
  title: string
  navShort: string
  hint: string
  kind: PracticeModuleKind
  /** 是否启用全局键盘听写（对照类模块一般为 false） */
  captureKeys: boolean
  /** 需要二级段时使用，如 `/m/finals/aa` */
  childSegment?: PracticeModuleChildSegment
}

export const PRACTICE_MODULES: PracticeModuleDefinition[] = [
  {
    id: 'finals',
    pathSegment: 'finals',
    title: '韻母練習',
    navShort: '韻',
    hint: '按粵拼韻母練習打字',
    kind: 'finals',
    captureKeys: true,
    childSegment: {
      default: 'aa',
      validate: isJyutpingFinal,
    },
  },
  {
    id: 'lyrics',
    pathSegment: 'lyrics',
    title: '歌詞跟打',
    navShort: '歌',
    hint: '歌詞跟打',
    kind: 'lyrics',
    captureKeys: true,
  },
  {
    id: 'politeness',
    pathSegment: 'politeness',
    title: '禮貌用語',
    navShort: '禮',
    hint: '禮貌用語練習',
    kind: 'politeness',
    captureKeys: true,
  },
  {
    id: 'comparison',
    pathSegment: 'comparison',
    title: '普粵拼音對照',
    navShort: '對',
    hint: '普通話拼音與粵拼差異參考',
    kind: 'comparison',
    captureKeys: false,
    childSegment: {
      default: COMPARISON_DEFAULT_LIST_ID,
      validate: isComparisonListId,
    },
  },
]

export const MODULE_BY_SEGMENT: Record<string, PracticeModuleDefinition> = Object.fromEntries(
  PRACTICE_MODULES.map((m) => [m.pathSegment, m]),
)

export function getModuleByPathSegment(segment: string | undefined): PracticeModuleDefinition | undefined {
  if (!segment) return undefined
  return MODULE_BY_SEGMENT[segment]
}

export function moduleHref(mod: PracticeModuleDefinition): string {
  if (mod.childSegment) {
    return `/m/${mod.pathSegment}/${mod.childSegment.default}`
  }
  return `/m/${mod.pathSegment}`
}
