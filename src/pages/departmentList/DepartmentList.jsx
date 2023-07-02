import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function DepartmentList() {
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
  }, []);

  const handleDelete = (id) => {
    const updatedData = departmentData.filter((item) => item.id !== id);
    setDepartmentData(updatedData);
  };

  const columns = [
    // { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 200 , renderCell: renderNameCell },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'status', headerName: 'Status', width: 120,renderCell: renderStatusCell },
    { field: 'created_at', headerName: 'Created At', width: 160 },
    { field: 'updated_at', headerName: 'Updated At', width: 160 },
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
    return (
      <Link to={`/department/${departmentId}`}>
        {params.value}
      </Link>
    );
  }

  const departmentArray = Object.values(departmentData); // Chuyển đổi object thành mảng

  return (
    <div className='departmentList'>
      <DataGrid ref={dataGridRef} rows={departmentArray} columns={columns} pageSize={8} />
    </div>
  );
}