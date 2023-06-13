import { utils as XLSXUtils, writeFile } from 'xlsx'

export function exportToExcel(data, filename) {
  const worksheet = XLSXUtils.json_to_sheet(data)
  const workbook = XLSXUtils.book_new()
  XLSXUtils.book_append_sheet(workbook, worksheet, 'Sheet1')
  writeFile(workbook, `${filename}.xlsx`, { bookType: 'xlsx', type: 'buffer' })
}
