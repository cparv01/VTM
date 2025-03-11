import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import axios from 'axios';

const NotificationComponent = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:8000/api/notifications')
      .then(response => {
        setNotifications(response.data);
        if (response.data.length > 0) {
          setOpen(true); // Open modal if there are notifications
        }
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAction = (id, action) => {
    axios.post(`http://localhost:8000/api/notifications/${id}/action`, { action })
      .then(response => {
        console.log(response.data);
        if (action === '1') {
          setNotifications(notifications.filter(notification => notification.id !== id));
        } else if (action === 'close') {
          setOpen(false);
        }
      })
      .catch(error => {
        console.error('Error updating notification:', error);
      });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <MenuItem onClick={() => setOpen(true)}>
        <IconButton
          size="large"
          aria-label={`show ${notifications.length} new notifications`}
          color="inherit"
        >
          <Badge badgeContent={notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="notification-modal-title"
        aria-describedby="notification-modal-description"
      >
        <Box sx={modalStyle}>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 2 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Box>

          <Typography id="notification-modal-title" variant="h6" component="h2">
            Notifications
          </Typography>
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {!notifications.length && (
              <Typography variant="body1" textAlign="center" sx={{ padding: 2 }}>
                No notifications have been received yet.
              </Typography>
            )}
            <List>
              {notifications.map((notification) => (
                <ListItem key={notification.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                  <ListItemText primary={notification.message} />
                  
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAction(notification.id, '1')}
                  >
                    OK
                  </Button>
                  {/* <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleAction(notification.id, '2')}
                    style={{ marginLeft: 8 }}
                  >
                    Close
                  </Button> */}
                  </Box>
              </ListItem>
            ))}
          </List>
        </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default NotificationComponent;
