import { DataGrid } from '@material-ui/data-grid';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import AddContent from './AddContent';
import ViewContent from './ViewContent'; // Import ViewContent từ file tương ứng
import UpdateContent from './UpdateContent'; // Import UpdateContent từ file tương ứng
import DeleteContent from './DeleteContent'; // Import DeleteContent từ file tương ứng
import { IconButton, Popover } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';

export default function ContentByLed() {
  const { id } = useParams();
  const [departmentData, setDepartmentData] = useState([]);
  const token = Cookies.get('token');
  const dataGridRef = useRef(null);
  const [change, setChange] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  useEffect(() => {
    axios
      .get(`https://led-mn.vercel.app/api/display-content/led-panels/${id}`, config)
      .then((response) => {
        setDepartmentData(response.data.map((item) => item.display_content));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id, change]);

  const handleDelete = (id) => {
    const updatedData = departmentData.filter((item) => item.id !== id);
    setDepartmentData(updatedData);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedContent, setSelectedContent] = useState(null);

  const handleActionClick = (event, content) => {
    setAnchorEl(event.currentTarget);
    setSelectedContent(content);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedContent(null);
  };

  const handleDeleteContent = () => {
    if (selectedContent) {
      handleDelete(selectedContent.id);
    }
    handleMenuClose();
  };

  const columns = [
    { field: 'name', headerName: 'Name', flex: 1, renderCell: (params) => params.row.name || 'No name' },
    { field: 'type', headerName: 'Type', flex: 1, renderCell: (params) => renderTypeCell(params.value) },
    {
      field: 'action',
      headerName: 'Action',
      flex: 3,
      renderCell: (params) => (
        <IconButton onClick={(event) => handleActionClick(event, params.row)}>
          <MoreVert />
        </IconButton>
      ),
    },
  ];

  const renderTypeCell = (type) => {
    let displayType = '';
    if (type === 0) {
      displayType = 'Text';
    } else if (type === 1) {
      displayType = 'Image';
    } else if (type === 2) {
      displayType = 'Video';
    }
    return <span>{displayType}</span>;
  };

  return (
    <div className='departmentList' style={{ flexDirection: 'column', gap: 10 }}>
      <AddContent setChange={setChange} />
      <DataGrid ref={dataGridRef} rows={departmentData} columns={columns} pageSize={8} />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {selectedContent && (
          <div>
            <ViewContent {...selectedContent} />
            <UpdateContent {...selectedContent} setChange={setChange} />
            <DeleteContent {...selectedContent} setChange={setChange} />
          </div>
        )}
      </Popover>
    </div>
  );
}
