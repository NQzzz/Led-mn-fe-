import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@material-ui/core';
import AddLeds from './AddLeds';
import UpdateLed from '../led_by_department/UpdateLed';
import UpdateDepartment from './UpdateDepartment';
import AddDepartment from './AddDepartment';
import DeleteDepartment from './DeleteDepartment';
import { AppContext } from 'src/App';

export default function DepartmentList() {
  const {priority}= useContext(AppContext)
  const [change, setChange]= useState()
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/departments', config)
      .then((response) => {
        // console.log(response.data);
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [change]);

  const handleDelete = (id) => {
    const updatedData = departmentData.filter((item) => item.id !== id);
    setDepartmentData(updatedData);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', flex: 1, renderCell: renderNameCell },
    { field: 'address', headerName: 'Address', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: renderStatusCell,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: priority=== 1 ? 6 : 2,
      renderCell: (params) => {
        return (
          <>
            <Button variant={'contained'} color={'primary'}>
              <Link
                state={{ ...params.row }}
                to='./leds'
                style={{ color: '#fff' }}>
                Led by department
              </Link>
            </Button>
            <AddLeds department_id={params.row.id} />
            {
              parseInt(priority) === 1 && 
              <>
                <UpdateDepartment setChange={setChange} {...params.row} />
                <DeleteDepartment setChange={setChange} {...params.row} />
              </>
            }
          </>
        );
      },
    },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    { field: 'updated_at', headerName: 'Updated At', flex: 1 },
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 150,
    //   renderCell: (params) => (
    //     <>
    //       <Link state={params.row.id} to={'/user/' + params.row.id}>
    //         <button className='departmentListEdit'>Edit</button>
    //       </Link>
    //       <DeleteOutline
    //         className='departmentListDelete'
    //         onClick={() => handleDelete(params.row.id)}
    //       />
    //     </>
    //   ),
    // },
  ];

  function renderStatusCell(params) {
    const status = params.value === 1 ? 'Active' : 'Inactive';
    return <span>{status}</span>;
  }

  function renderNameCell(params) {
    const departmentId = params.row.id;
    return <Link to={`/department/${departmentId}`}>{params.value}</Link>;
  }

  const departmentArray = Object.values(departmentData); // Chuyển đổi object thành mảng

  return (
    <div className='departmentList' style={{flexDirection: "column", gap: 10}}>
      <div>
      <div style={{fontSize: 18, marginBottom: 12}}>Danh sách phòng ban của hệ thống</div>
      {
        parseInt(priority) === 1 &&
        <AddDepartment setChange={setChange} />
      }
      </div>
      <DataGrid
        ref={dataGridRef}
        rows={departmentArray}
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
