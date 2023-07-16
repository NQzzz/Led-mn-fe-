import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import swal from 'sweetalert';

export default function AddUsers() {
    const user= JSON.parse(Cookies.get("user"))
    console.log(user)
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        style={{marginBottom: 12}}
        variant='contained'
        color='primary'
        onClick={handleClickOpen}>
        Add user
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title'>
          {'Add user'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText style={{width: 400}} id='alert-dialog-description'>
            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              label={'Name'}
            />
            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label='Email'
            />

            <TextField
              fullWidth
              style={{height: 40, margin: '12px 0' }}
              value={password}
              type={'password'}
              onChange={(e) => setPassword(e.target.value)}
              label='Password'
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
          <Button
            onClick={async () => {
              try {
                const res = await axios({
                  url: 'https://led-mn.vercel.app/api/users',
                  method: 'post',
                  data: {
                    name,
                    email,
                    status: 1,
                    password,
                    roleId: user.role_id
                  },
                  headers: { Authorization: `Bearer ${Cookies.get('token')}` },
                });
                const result = await res.data;
                if (result) {
                  swal('Thông báo', 'Create users success', 'success')
                    .then(() => handleClose())
                    .then(() => {
                      setName('');
                      setEmail('');
                      setPassword('');
                    });
                }
                return result;
              } catch (e) {
                swal('Notice', 'Create users failed', 'error');
              }
            }}
            color='primary'
            autoFocus>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
