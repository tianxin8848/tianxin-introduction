import type { LyricToken } from '../../types'

interface LyricsSegmentControlsProps {
  lyricsSegmentSize: number;
  setLyricsSegmentSize: (size: number) => void;
  lyricsCurrentSegment: number;
  setLyricsCurrentSegment: (segment: number) => void;
  lyricIndex: number;
  lyricTokens: LyricToken[];
}

function LyricsSegmentControls({
  lyricsSegmentSize,
  setLyricsSegmentSize,
  lyricsCurrentSegment,
  setLyricsCurrentSegment,
  lyricIndex,
  lyricTokens
}: LyricsSegmentControlsProps) {
  return (
    <div className="lyrics-segment-controls">
      <div className="segment-size-control">
        <label htmlFor="segmentSize">每段字数: </label>
        <select
          id="segmentSize"
          value={lyricsSegmentSize}
          onChange={(e) => {
            const newSize = parseInt(e.target.value)
            setLyricsSegmentSize(newSize)
            const newSegment = Math.floor(lyricIndex / newSize)
            setLyricsCurrentSegment(newSegment)
          }}
        >
          <option value="30">30字</option>
          <option value="50">50字</option>
          <option value="80">80字</option>
          <option value="100">100字</option>
          <option value="0">不分段</option>
        </select>
      </div>
      
      {lyricsSegmentSize > 0 && (
        <div className="segment-nav-controls">
          <button
            onClick={() => setLyricsCurrentSegment(Math.max(0, lyricsCurrentSegment - 1))}
            disabled={lyricsCurrentSegment === 0}
          >
            上一段
          </button>
          <span className="segment-info">
            段落 {lyricsCurrentSegment + 1} / {Math.ceil(lyricTokens.length / lyricsSegmentSize)}
          </span>
          <button
            onClick={() => {
              const totalSegments = Math.ceil(lyricTokens.length / lyricsSegmentSize)
              setLyricsCurrentSegment(Math.min(totalSegments - 1, lyricsCurrentSegment + 1))
            }}
            disabled={lyricsCurrentSegment >= Math.ceil(lyricTokens.length / lyricsSegmentSize) - 1}
          >
            下一段
          </button>
        </div>
      )}
    </div>
  )
}

export default LyricsSegmentControls
