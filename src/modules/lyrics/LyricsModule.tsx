import LyricsSegmentControls from '../../components/controls/LyricsSegmentControls'
import LyricsPractice from '../../components/practice/LyricsPractice'
import type { LyricToken } from '../../types'

interface LyricsModuleProps {
  tokens: LyricToken[]
  lyricIndex: number
  input: string
  rookieMode: boolean
  isCorrect: boolean
  segmentSize: number
  currentSegment: number
  setSegmentSize: (size: number) => void
  setCurrentSegment: (segment: number) => void
}

function LyricsModule({
  tokens,
  lyricIndex,
  input,
  rookieMode,
  isCorrect,
  segmentSize,
  currentSegment,
  setSegmentSize,
  setCurrentSegment,
}: LyricsModuleProps) {
  return (
    <>
      <LyricsSegmentControls
        lyricsSegmentSize={segmentSize}
        setLyricsSegmentSize={setSegmentSize}
        lyricsCurrentSegment={currentSegment}
        setLyricsCurrentSegment={setCurrentSegment}
        lyricIndex={lyricIndex}
        lyricTokens={tokens}
      />
      <LyricsPractice
        tokens={tokens}
        currentIndex={lyricIndex}
        input={input}
        rookieMode={rookieMode}
        isCorrect={isCorrect}
        segmentSize={segmentSize}
        currentSegment={currentSegment}
      />
    </>
  )
}

export default LyricsModule
