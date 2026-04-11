import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';

type GridValidRow = import('@mui/x-data-grid').GridValidRowModel;
type GridColOf<R extends GridValidRow> = import('@mui/x-data-grid').GridColDef<R>;
type GridCellParams<R extends GridValidRow> = import('@mui/x-data-grid').GridRenderCellParams<R>;
import Paper from '@mui/material/Paper';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';

// 定义订单状态类型
type OrderStatus = '已审核' | '待付款' | '进行中';

// 定义订单数据行类型
interface OrderRow {
  id: number;
  orderNo: string;
  customerName: string;
  amount: number;
  status: OrderStatus;
  createDate: string;
}

// 生成30条模拟订单数据
const generateMockRows = (): OrderRow[] => {
  const customers = ['王小明', '李芳芳', '张伟', '刘强', '陈丽', '赵磊', '周敏', '吴刚', '郑爽', '林晨','王小明', '李芳芳', '张伟', '刘强', '陈丽', '赵磊', '周敏', '吴刚', '郑爽', '林晨'];
  const statuses: OrderStatus[] = ['已审核', '待付款', '进行中'];
  
  return Array.from({ length: 30 }, (_, index) => {
    const id = index + 1;
    const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
    const randomAmount = Math.floor(Math.random() * 10000) / 100;
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const randomDay = Math.floor(Math.random() * 30) + 1;
    const randomMonth = Math.floor(Math.random() * 12) + 1;
    
    return {
      id,
      orderNo: `ORD-${String(id).padStart(4, '0')}`,
      customerName: randomCustomer,
      amount: randomAmount,
      status: randomStatus,
      createDate: `2026-${String(randomMonth).padStart(2, '0')}-${String(randomDay).padStart(2, '0')}`,
    };
  });
};

// 可编辑状态单元格组件
const StatusCell: React.FC<{ status: OrderStatus; onChange: (newStatus: OrderStatus) => void }> = ({ status, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as OrderStatus);
  };

  // 根据状态返回不同的样式颜色
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case '已审核':
        return '#2e7d32'; // 绿色
      case '待付款':
        return '#ed6c02'; // 橙色
      case '进行中':
        return '#0288d1'; // 蓝色
      default:
        return '#000';
    }
  };

  return (
    <Select
      value={status}
      onChange={handleChange}
      size="small"
      sx={{
        minWidth: 100,
        '& .MuiSelect-select': {
          py: 0.5,
          color: getStatusColor(status),
          fontWeight: 500,
        },
      }}
    >
      <MenuItem value="已审核" sx={{ color: '#2e7d32' }}>已审核</MenuItem>
      <MenuItem value="待付款" sx={{ color: '#ed6c02' }}>待付款</MenuItem>
      <MenuItem value="进行中" sx={{ color: '#0288d1' }}>进行中</MenuItem>
    </Select>
  );
};

const OrderTable: React.FC = () => {
  const [rows, setRows] = useState<OrderRow[]>(generateMockRows());

  // 处理状态变更
  const handleStatusChange = (id: number, newStatus: OrderStatus) => {
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id ? { ...row, status: newStatus } : row
      )
    );
  };

  const columns: GridColOf<OrderRow>[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'orderNo', headerName: '订单编号', width: 130 },
    { field: 'customerName', headerName: '客户名称', width: 130 },
    {
      field: 'amount',
      headerName: '订单金额',
      type: 'number',
      width: 120,
      valueFormatter: (value: number) => `¥${value.toFixed(2)}`,
    },
    {
      field: 'status',
      headerName: '状态',
      width: 150,
      renderCell: (params: GridCellParams<OrderRow>) => (
        <StatusCell
          status={params.row.status}
          onChange={(newStatus) => handleStatusChange(params.row.id, newStatus)}
        />
      ),
    },
    {
      field: 'createDate',
      headerName: '创建日期',
      width: 130,
    },
    {
      field: 'fullInfo',
      headerName: '完整信息',
      description: '显示订单完整描述',
      sortable: false,
      width: 200,
      valueGetter: (_value: unknown, row: OrderRow) =>
        `${row.orderNo} - ${row.customerName} - ¥${row.amount}`,
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <Paper sx={{ height: 500, width: '100%', p: 2 }}>
      <DataGrid<OrderRow>
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 25]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{ 
          border: 0,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
        }}
      />
    </Paper>
  );
};

export default OrderTable;