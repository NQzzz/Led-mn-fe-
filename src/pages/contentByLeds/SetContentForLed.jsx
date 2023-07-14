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
import { useParams } from 'react-router-dom';

export default function SetContentForLed(props) {
  const { setChange, id: contentId } = props;
  const {id }= useParams()
  const [open, setOpen] = useState(false);
  

  function getFileType(file) {
    return file.type;
  }

  const config = {
    headers: { Authorization: `Bearer ${Cookies.get('token')}` },
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button style={{background: "orange", marginLeft: 12, color: "#fff"}} variant='contained' onClick={handleClickOpen}>
        Set content for led
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Content</DialogTitle>
        <DialogContent>
          <Fragment>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button
                onClick={async () => {
                  try {
                    const res= await axios({
                      url: "https://led-mn.vercel.app/api/display-content/"+ contentId + "/led-panel",
                      method: "post",
                      headers: {
                        "Authorization": `Bearer ${Cookies.get('token')}`
                      },
                      data: {
                        "ledPanelId": id
                      }
                    })
                    const result= await res.data
                    if(result) {
                      swal("Notice", "Set content for led successfully", "success")
                    }
                  }
                  catch(e) {
                    swal("Notice", "Set content for led failed", "error")
                  }
                }}>
                Set content
              </Button>
            </DialogActions>
          </Fragment>
        </DialogContent>
      </Dialog>
    </div>
  );
}
