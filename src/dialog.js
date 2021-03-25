import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography } from '@material-ui/core';


export default function DraggableDialog(props) {
  console.log(props)
  return (
    <Dialog
      open={props.open}
      onClose={() => {
        props.close()
      }}
      aria-labelledby="draggable-dialog-title"
    >
      <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
        Question Details
        </DialogTitle>
      <DialogContent>
        <DialogContentText className="main-dialog-container">

          <Typography variant="h6" className="typo-header">
            {  props.dialogData.Title}
          </Typography>
          <a target="_blank" rel="noreferrer"  href={props.dialogData.link} className="anchor-tag">
            <Typography variant="h4" className="typo-link">
              {"Link"}
            </Typography>
          </a>

        </DialogContentText>
      </DialogContent >
      <DialogActions>
        <Button autoFocus onClick={() => { props.close() }} color="primary">
          ok
          </Button>
      </DialogActions>
    </Dialog >
  );
}