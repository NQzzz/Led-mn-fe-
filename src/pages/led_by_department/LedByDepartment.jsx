// import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import UpdateLed from './UpdateLed';
import DeleteLed from './DeleteLed';

export default function LedByDepartment(props) {
  const { id, name, address } = useLocation().state;
  console.log(useLocation().state);
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null);
  const [change, setChange] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/led-panels/' + id || '', config)
      .then((response) => {
        // console.log(response.data);
        setDepartmentData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, change]);

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
    { field: 'size', headerName: 'Size', flex: 1 },
    { field: 'created_at', headerName: 'Created At', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 2,
      renderCell: (params) => {
        return (
          <>
            <UpdateLed {...params.row} setChange={setChange} />
            <DeleteLed {...params.row} setChange={setChange} />
          </>
        );
      },
    },
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
    <>
      <div className='departmentList' style={{display: "flex", flexDirection: "column"}}>
        <div>
          <div style={{fontSize: 18, marginBottom: 12}}>Danh sách bảng led của chi nhánh {name || "_"}</div>
          <div style={{marginBottom: 12}}>Địa chỉ: {address || "_"}</div>
        </div>
        <DataGrid
          ref={dataGridRef}
          rows={departmentArray}
          columns={columns}
          pageSize={8}
        />
      </div>
    </>
  );
}
