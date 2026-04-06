import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import type { ComparisonListId } from './comparisonListRegistry'
import { COMPARISON_LISTS } from './comparisonListRegistry'

interface ComparisonModuleProps {
  listId: ComparisonListId
}

function ComparisonModule({ listId }: ComparisonModuleProps) {
  const { title, description, rows, renderBody } = COMPARISON_LISTS[listId]

  return (
    <Paper
      component="section"
      elevation={1}
      sx={{ width: '100%', maxWidth: 760, p: 2, borderRadius: 2 }}
      aria-label="普通話拼音與粵拼對照"
    >
      <Typography variant="h6" component="h2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>
      {renderBody != null ? (
        renderBody()
      ) : (
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
              {(rows ?? []).map((row) => (
                <TableRow key={row.mandarin}>
                  <TableCell>{row.mandarin}</TableCell>
                  <TableCell>{row.cantonese}</TableCell>
                  <TableCell>{row.note}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  )
}

export default ComparisonModule
