import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from "js-cookie"
import swal from 'sweetalert';

export default function UpdateContent(props) {
  const user= JSON.parse(Cookies.get("user"))
  const {  id, setChange } = props;
  const [open, setOpen] = React.useState(false);
  const [name, setName]= useState('')
  const [type, setType]= useState("")
  const [path, setPath]= useState("")
  const [file, setFile]= useState()
  const [value, setValue]= useState("")

  useEffect(()=> {
    setName(props.name)
    setType(props.type)
    setPath(props.path)
  }, [props])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function getFileType(file) {
    return file.type;
  }
  const onImageChange = (item) => {
    const fileType = getFileType(item.target.files[0]);
    setFile(item.target.files[0]);
    setType(fileType);
  };
  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  };
  const handleFileImage = () => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `https://led-mn.vercel.app/api/display-content/presigned-url?contentType=${type}`,
          config,
        )
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
  const handleUpload = (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(data?.url, file)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };
  return (
    <div>
      <Button
        variant='contained'
        onClick={handleClickOpen} style={{ marginLeft: 12, background: "#2dc275", color: "#fff"}}>
        Update content
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Update content'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            <TextField
                fullWidth
              style={{  height: 40, margin: '12px 0' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={'Name'}
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
              value={name}
              onChange={(e)=> setName(e.target.value)}
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
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button onClick={async ()=> {
                handleFileImage()
                  .then((data) => handleUpload(data).then(data2=> console.log(123)).catch(e=> console.log(123)))
                  .catch(e=> console.log(123))
          }} color='primary' autoFocus>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
