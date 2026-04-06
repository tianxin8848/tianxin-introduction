import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import type { ComparisonListDefinition } from '../comparisonData'

/**
 * 需使用 JSX 時請用 .tsx；URL：`/m/comparison/list-yu`
 * 標題與說明仍由下方物件提供，此處只負責表格主體。
 */
const listYu: ComparisonListDefinition = {
  navShort: 'ü',
  navLabel: 'ü → eoi（list-ü）',
  title: '普通話 ü 與粵拼 -eoi',
  description:
    '普通話中 yu、ü 類音節，粵語常體現為 eoi 等拼寫；實際對應因字而異，以下為你提供的示例音節對照。',
  renderBody() {
    return (
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 1 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>國語拼音示例</TableCell>
              <TableCell>粵拼示例</TableCell>
              <TableCell>說明</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>qu</TableCell>
              <TableCell>heoi3</TableCell>
              <TableCell>如「去」類音節</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>lv</TableCell>
              <TableCell>leoi5</TableCell>
              <TableCell>國語拼音寫作 lv（實際 ü），粵拼常見 -eoi</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>xu</TableCell>
              <TableCell>seoi1</TableCell>
              <TableCell>如「需」類音節</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>qu</TableCell>
              <TableCell>ceoi2</TableCell>
              <TableCell>同形國語音節對應另一粵語讀法（示例）</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    )
  },
}

export default listYu
