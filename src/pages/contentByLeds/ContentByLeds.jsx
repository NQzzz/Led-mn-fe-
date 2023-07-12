// import './departmentlist.css';
import { DataGrid } from '@material-ui/data-grid';
// import { DeleteOutline } from '@material-ui/icons';
// import { dataUser, userRows } from '../../dummyData';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef  } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddContent from './AddContent';
import { Button } from '@material-ui/core';
import ViewContent from './ViewContent';

export default function ContentByLed(props) {
  const {id }= useParams()
  console.log(useLocation().state)
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null); 
  const [change, setChange]= useState(false)
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get('https://led-mn.vercel.app/api/display-content/led-panels/'+ id || "", config)
      .then((response) => {
        // console.log(response.data);
        setDepartmentData(response.data.map(item=> (item.display_content)));
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
    { field: 'name', headerName: 'Name', flex: 1 , renderCell: (params)=> {
        if(params.row.name?.length > 0) {
            return params.row.name
        }
        else {
            return "No name"
        }
    } },
    { field: 'type', headerName: 'Type', flex: 1 },
    { field: 'path', headerName: 'Path', flex: 1 },
    {field: "action", headerName: "Action", flex: 1, renderCell: (params)=> {
      return <>
        <ViewContent {...params.row} />
      </>
    }}
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
    <div className='departmentList' style={{flexDirection: "column", gap: 10}}>
      <AddContent setChange={setChange} />
      <DataGrid ref={dataGridRef} rows={departmentArray} columns={columns} pageSize={8} />
    </div>
  );
}