import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from "js-cookie"
import swal from 'sweetalert';
import { useInView } from 'react-intersection-observer';

const renderType= (type)=> {
  if(type=== 0) {
    return "Text"
  }
  if(type=== 1) {
    return "Image"
  }
  if(type=== 2) {
    return "Video"
  }
  else {
    return "Unknown"
  }
}

export default function ViewContent(props) {
  const { id } = props;
  const {ref, inView }= useInView()
  const [data, setData]= useState()
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [deviceCode, setDeviceCode] = useState('');
  const [size, setSize] = useState('');
  useEffect(()=> {
    if(inView=== true) {

        (async ()=> {
            try {
                const res= await axios({
                    url: "https://led-mn.vercel.app/api/display-content/"+ id,
                    method: "get",
                    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                })
                const result= await res.data
                if(result) {
                    setData(result)
                }
            }catch(e) {
                swal("Notice", "View failed", "error")
            }
          })()
    }
  }, [id, inView])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{ marginLeft: 12 }}
        variant='contained'
        color='primary'
        onClick={handleClickOpen}>
        View content
      </Button>
      <Dialog
        ref={ref}
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'View content'}
        </DialogTitle>
        <DialogContent style={{width: 400}}>
          <DialogContentText id='alert-dialog-description'>
            <div style={{marginTop: 8}}>Name</div>
            <div style={{fontWeight: 600, fontSize: 18, marginBottom: 12}}>{props?.name?.length > 0 ? props?.name : "No name"}</div>
            <div style={{marginTop: 8}}>Type</div>
            <div style={{fontWeight: 600, fontSize: 18, marginBottom: 12}}>{renderType(props?.type)}</div>
            <div style={{marginTop: 8}}>Path</div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
