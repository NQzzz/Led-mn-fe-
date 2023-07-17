import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { dataUser, userRows } from '../../dummyData';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddUsers from './AddUser';
import DeleteUsers from './DeleteUsers';
import UpdateUser from './UpdateUser';
import { AppContext } from 'src/App';

export default function UserList() {
  const { priority } = useContext(AppContext);
  const [change, setChange] = useState(false);
  const [data, setData] = useState([]);
  const token = Cookies.get('token');
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  useEffect(() => {
    console.log(config);
    axios
      .get('https://led-mn.vercel.app/api/users', config)
      .then((response) => {
        console.log(response.data);
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [change]);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1 },
    {
      field: 'user',
      headerName: 'User',
      flex: 1,
      renderCell: (params) => {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.avatar} alt='' />
            {params.row.name}
          </div>
        );
      },
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
    },
    {
      field: 'action',
      headerName: 'Action',
      flex: priority === 1 ? 1 : 0,
      renderCell: (params) => {
        // console.log(params)
        return (
          <>
            {/* {priority === 1 && <AddUsers setChange={setChange} />} */}
            {
              priority === 1 && <>
                <UpdateUser {...params.row} setChange={setChange} />
                <DeleteUsers {...params.row} setChange={setChange} />
              </>
            }
          </>
        );
      },
    },
  ];

  return (
    <div
      className='userList'
      style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <div style={{ fontSize: 18, marginBottom: 12 }}>
          Danh sách tài khoản trên hệ thống
        </div>
        {priority === 1 && <AddUsers setChange={setChange} />}
      </div>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
      />
    </div>
  );
}
