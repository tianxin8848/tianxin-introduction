import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { ComparisonListDefinition } from '../comparisonData'

/** URL：`/m/comparison/list-o` — 國語 -uo 與粵拼 -o 類對照 */
const listO: ComparisonListDefinition = {
  navShort: 'o',
  navLabel: 'uo → o（list-o）',
  title: '普通話 uo 與粵拼 o',
  description:
    '許多普通話帶介音 uo 的音節，在粵語拼寫中常簡化為以 o 為韻腹的形式（聲母、聲調仍因字而異）。下表為你整理的示例：多、火、羅、錯、鎖。',
  renderBody() {
    return (
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>示例字</TableCell>
              <TableCell>國語拼音</TableCell>
              <TableCell>粵拼示例</TableCell>
              <TableCell>說明</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>多</TableCell>
              <TableCell>dou</TableCell>
              <TableCell>do1</TableCell>
              <TableCell>國語 uo，粵拼常作 o</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>火</TableCell>
              <TableCell>huo</TableCell>
              <TableCell>fo2</TableCell>
              <TableCell>聲母與韻母拼法均可能與國語不同，僅示意對照</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>羅</TableCell>
              <TableCell>luo</TableCell>
              <TableCell>lo4</TableCell>
              <TableCell>luo → lo</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>錯</TableCell>
              <TableCell>cuo</TableCell>
              <TableCell>co3</TableCell>
              <TableCell>cuo → co</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>鎖</TableCell>
              <TableCell>suo</TableCell>
              <TableCell>so2</TableCell>
              <TableCell>suo → so</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
}

export default listO
