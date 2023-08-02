import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';

const SchedulePopup = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [content, setContent] = useState('');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    // Xử lý việc lưu lịch hẹn và nội dung tại đây
    console.log('Selected Date:', selectedDate);
    console.log('Content:', content);

    // Đóng popup sau khi đã lưu thông tin
    onClose();
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Chọn lịch hẹn và nội dung</DialogTitle>
      <DialogContent>
        <TextField
          id="date"
          type="date"
          label="Chọn ngày giờ"
          value={selectedDate}
          onChange={handleDateChange}
          showTimeInput
          InputLabelProps={{
          shrink: true,
        }}
        />
        <DialogContentText>Nội dung lịch hẹn:</DialogContentText>
        <TextField
          value={content}
          onChange={handleContentChange}
          placeholder="Nhập nội dung lịch hẹn"
          fullWidth
          multiline
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>Lưu</Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchedulePopup;
