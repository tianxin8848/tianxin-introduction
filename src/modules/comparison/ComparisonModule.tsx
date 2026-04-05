import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { PINYIN_COMPARISON_ROWS } from './comparisonData'

function ComparisonModule() {
  return (
    <Paper
      component="section"
      elevation={1}
      sx={{ width: '100%', maxWidth: 760, p: 2, borderRadius: 2 }}
      aria-label="普通話拼音與粵拼對照"
    >
      <Typography variant="h6" component="h2" gutterBottom>
        普通話拼音與粵拼差異（參考）
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        以下為常見對照思路，實際讀音請以詞典與音頻為準。
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>普通話拼音習慣</TableCell>
              <TableCell>粵拼示例方向</TableCell>
              <TableCell>說明</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {PINYIN_COMPARISON_ROWS.map((row) => (
              <TableRow key={row.mandarin}>
                <TableCell>{row.mandarin}</TableCell>
                <TableCell>{row.cantonese}</TableCell>
                <TableCell>{row.note}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ComparisonModule
