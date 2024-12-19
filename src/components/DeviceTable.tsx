import React, { useState, useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "../styles/DevicesTable.scss";
import { devicesRow, devicesCol, Device, createDevice, UpdateDevice } from '../data/mockData';
import Box from '@mui/joy/Box';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Tooltip from '@mui/joy/Tooltip';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import UpdateDevicesMenu from './UpdateDeviceMenu';

function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Device;
  label: string;
  numeric: boolean;
}
interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Device) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}
interface HeadCell {
  disablePadding: boolean;
  id: keyof Device;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'id',
    numeric: true,
    disablePadding: true,
    label: 'Id',
  },
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'roomName',
    numeric: true,
    disablePadding: false,
    label: 'Room Name',
  },
  {
    id: 'buildingName',
    numeric: true,
    disablePadding: false,
    label: 'Building Name',
  },
  {
    id: 'status',
    numeric: true,
    disablePadding: false,
    label: 'Status',
  },
  {
    id: 'quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'Action',
  },
];
function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Device) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <thead >
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all tickets',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                  : undefined
              }
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon
                      sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon
                      sx={[active ? { opacity: 1 } : { opacity: 0 }]}
                    />
                  ) : null
                }
                sx={{
                  fontWeight: 'lg',
                  '& svg': {
                    transition: '0.1s',
                    transform:
                      active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },

                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}
interface EnhancedTableToolbarProps {
  numSelected: number;
}
function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;
  return (
    <Box
      sx={[
        {
          display: 'flex',
          alignItems: 'center',
          py: 1,
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          borderTopLeftRadius: 'var(--unstable_actionRadius)',
          borderTopRightRadius: 'var(--unstable_actionRadius)',
          backgroundColor: 'lightgray'
        },
        numSelected > 0 && {
          bgcolor: 'background.level1',
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          level="body-lg"
          sx={{ flex: '1 1 100%' }}
          id="tableTitle"
          component="div"
        >
          Devices
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Xoa">
          <IconButton size="sm" color="danger" variant="solid">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton size="sm" variant="outlined" color="neutral">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
export var total_rows = 0;
export default function TableSortAndSelection() {
  const [device, setDevices] = useState<Device[]>([]);
  const [deviceToEdit, setDeviceToEdit] = useState<UpdateDevice | null>(null);
  const [filteredDevice, setFilterDevice] = useState<Device[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Device>('id');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/equipment/list");
      const mapped_response = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        roomName: item.room?.roomName ?? "Unknown",
        buildingName: item.room?.building?.buildingName ?? "Unknown",
        quantity: item.quantity,
        status: item.status,
      }));
      setDevices(mapped_response);
      setFilterDevice(mapped_response);
      total_rows = mapped_response.lenght;
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  useEffect(() => {

    fetchData();
    // Set up periodic refresh
    const intervalId = setInterval(fetchData, 30000); // Refresh every 30 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);


  const handleDelete = async (id: number) => {
    console.log("Deleting item with ID:", id); // Check if this is logged when clicking Delete button
    if (!window.confirm("Are you sure you want to delete this device?")) {
      return;
    }

    try {
      // Send a POST request to delete the item
      await axios.post(`/api/equipment/delete/${id}`);
      setDevices(device.filter((item) => item.id !== id)); // Remove item from the state
      setFilterDevice(filteredDevice.filter((item) => item.id !== id));
      console.log(`Device with ID ${id} deleted successfully.`);
    } catch (error) {
      console.error("Error deleting device:", error);
      alert("An error occurred while deleting the device. Please try again.");
    }
  };

  const rows = filteredDevice;

  // Search handler
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = device.filter((item) =>
      item.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilterDevice(filtered);
  };

  const handleClose = () => {
    fetchData();
    setDialogOpen(false);
  };
  const handleUpdate = async (updatedDevice) => {
    try {
      const response = await axios.post("/api/equipment/update", updatedDevice);
      if (response.status === 200) {
        alert("Device updated successfully.");
        fetchData();  // Refetch the devices list after update
      } else {
        alert("Failed to update device.");
      }
      setDevices(device.map((item) => (item.id === updatedDevice.id ? response.data : item)));
      setFilterDevice(filteredDevice.map((item) => (item.id === updatedDevice.id ? response.data : item)));
      setUpdateDialogOpen(false);
    } catch (error) {
      console.error("Error updating device:", error);
    }
  };
  // Open update form
  const openUpdateForm = (device) => {
    setSelectedDevice(device);
    setUpdateDialogOpen(true);
  };
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Device,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event: any, newValue: number | null) => {
    setRowsPerPage(parseInt(newValue!.toString(), 10));
    setPage(0);
  };
  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Sheet variant="outlined"
      sx={{ width: { xs: '90%', md: '1500px' }, borderRadius: '16px', top: { xs: '10%', md: '10px' }, left: '50px', backgroundColor: 'whitesmoke' }
      }
    >
      <EnhancedTableToolbar numSelected={selected.length} />
      <TextField
        label="Search by name"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          '--TableCell-headBackground': 'transparent',
          '--TableCell-selectedBackground': (theme) =>
            theme.vars.palette.success.softBg,
          '& thead th:nth-child(1)': {
            width: '30px',
          },
          '& thead th:nth-child(2)': {
            width: 'flex',
          },
          '& tr > *:nth-child(n+3)': { textAlign: 'center' },
        }}
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <tbody>
          {[...rows]
            .sort(getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = selected.includes(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  // selected={isItemSelected}
                  style={
                    isItemSelected
                      ? ({
                        '--TableCell-dataBackground':
                          'var(--TableCell-selectedBackground)',
                        '--TableCell-headBackground':
                          'var(--TableCell-selectedBackground)',
                      } as React.CSSProperties)
                      : {}
                  }
                >
                  <th scope="row">
                    <Checkbox
                      checked={isItemSelected}
                      slotProps={{
                        input: {
                          'aria-labelledby': labelId,
                        },
                      }}
                      sx={{ verticalAlign: 'top' }}
                    />
                  </th>
                  <th id={labelId} scope="row">
                    {row.id}
                  </th>
                  <td>{row.name}</td>
                  <td>{row.roomName}</td>
                  <td>{row.buildingName}</td>
                  <td>{row.status}</td>
                  <td>{row.quantity}</td>
                  <td>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        setDialogOpen(true)
                        openUpdateForm(row);
                      }}
                    >
                      Edit
                    </Button>
                    <UpdateDevicesMenu
                      open={updateDialogOpen}
                      onClose={() => setUpdateDialogOpen(false)}
                      onSubmit={handleUpdate}
                      deviceData={selectedDevice} />
                    <Button
                      variant="contained"
                      color="error"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row.id);
                      }}
                    >
                      Delete
                    </Button>

                  </td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr
              style={
                {
                  height: `calc(${emptyRows} * 40px)`,
                  '--TableRow-hoverBackground': 'transparent',
                } as React.CSSProperties
              }
            >
              <td colSpan={7} aria-hidden />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={8}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  justifyContent: 'flex-end',
                }}
              >
                <FormControl orientation="horizontal" size="sm">
                  <FormLabel>Rows per page:</FormLabel>
                  <Select onChange={handleChangeRowsPerPage} value={rowsPerPage}>
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={25}>25</Option>
                  </Select>
                </FormControl>
                <Typography sx={{ textAlign: 'center', minWidth: 80 }}>
                  {labelDisplayedRows({
                    from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
                    to: getLabelDisplayedRowsTo(),
                    count: rows.length === -1 ? -1 : rows.length,
                  })}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={page === 0}
                    onClick={() => handleChangePage(page - 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowLeftIcon />
                  </IconButton>
                  <IconButton
                    size="sm"
                    color="neutral"
                    variant="outlined"
                    disabled={
                      rows.length !== -1
                        ? page >= Math.ceil(rows.length / rowsPerPage) - 1
                        : false
                    }
                    onClick={() => handleChangePage(page + 1)}
                    sx={{ bgcolor: 'background.surface' }}
                  >
                    <KeyboardArrowRightIcon />
                  </IconButton>
                </Box>
              </Box>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Sheet >
  );
}
