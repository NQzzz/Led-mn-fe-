import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import Cookies from 'js-cookie';
import swal from "sweetalert"

export default function AddContent(props) {
  const { setChange } = props;
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
  const [key, setKey] = useState({});
  const [file, setFile] = useState({});
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState('');
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  function getFileType(file) {
    return file.type;
  }

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  };

  const onImageChange = (item) => {
    const fileType = getFileType(item.target.files[0]);
    setFile(item.target.files[0]);
    setType(fileType);
  };

  const handleFileImage = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://led-mn.vercel.app/api/display-content/presigned-url?contentType=${type}`,
          config,
        )
        .then((response) => {
          setKey(response.data);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  const handleCreate = () => {
    const jsonData = {
      type: type=== "text" ? 0 : (type=== "image" ? 1 : 2),
      name: message,
      path: key.key,
    };
    axios
      .post(
        'https://led-mn.vercel.app/api/display-content/1',
        jsonData, config
      )
      .then((response) => {
        console.log(response.data);
        swal("Notice", "Create content success", "success")
        .then(()=> setChange(prev=> !prev))
        .then(()=> handleClose())
        .then(()=> setValue(""))
      })
      .catch((error) => {
        console.error(error);
        swal("Notice", "Create content faied", "error")
        .then(()=> handleClose())
      });
  };

  const handleUpload = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(data?.url, file)
        .then((response) => {
          setStatus(response.status);
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    if (type !== '') {
      handleFileImage();
    }
  }, [type]);

  useEffect(() => {
    if (status === 200) {
      handleCreate();
    }
  }, [status]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpload();
    handleClose();
  };

  return (
    <div>
      <Button color={"primary"} variant='contained' onClick={handleClickOpen}>
        Add Content
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Content</DialogTitle>
        <DialogContent>
          <Fragment>
            <TextField
              fullWidth
              label='Name'
              value={message}
              onChange={handleChange}
              required
            />
            <FormControl fullWidth style={{ marginBottom: 12 }}>
              <InputLabel>Type</InputLabel>
              <Select
                value={value}
                onChange={(event) => setValue(event.target.value)}
                required>
                <MenuItem value='video'>Video</MenuItem>
                <MenuItem value='image'>Image</MenuItem>
                <MenuItem value='text'>Text</MenuItem>
              </Select>
            </FormControl>
            {
              value === "text" ? 
              <TextField
              fullWidth
              label='Name'
              value={message}
              onChange={handleChange}
              required
            /> :
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <label
                  htmlFor='file'
                  style={{
                    backgroundColor: '#2196f3',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}>
                  Chọn file
                </label>
                <input
                  type='file'
                  id='file'
                  onChange={onImageChange}
                  style={{ position: 'absolute', left: '-9999px' }}
                />
              </div>
            }
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={() =>
                  handleFileImage()
                  .then((data) => handleUpload(data).then(data2=> console.log(data2)).catch(e=> console.error(e)))
                  .catch(e=> console.error(e))
                }>
                Create
              </Button>
            </DialogActions>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
}
