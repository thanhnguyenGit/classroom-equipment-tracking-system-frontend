import { DataGrid, GridColDef } from '@mui/x-data-grid';
import "../styles/DevicesTable.scss";
import { devicesRow, devicesCol } from '../data/mockData';




const paginationModel = { page: 0, pageSize: 5 };
const DevicesTable = () => {
  return (
    <div className='devicestable'>
      <DataGrid
        rows={devicesRow}
        columns={devicesCol}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </div>
  );
};

export default DevicesTable;
