import React, { PropsWithChildren } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import copy from 'copy-to-clipboard';

// Third Party
import { FileCopy, CheckSharp } from '@material-ui/icons';

export type CopyButtonProps = {
  content: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ content }) => {
  const [recentlyClicked, _setRecentlyClicked] = React.useState(false);

  const handleOnClick = () => {
    copy(content);
    _setRecentlyClicked(true);
    setTimeout(() => _setRecentlyClicked(false), 2000);
  };

  return (
    <Button onClick={handleOnClick} data-testid="copy-button">
      {recentlyClicked ? <CheckSharp /> : <FileCopy />}
    </Button>
  );
};

interface AboutDialogProps {
  open: boolean;
  onClose(): void;
}

function InviteUserDialog({ open, onClose }: PropsWithChildren<AboutDialogProps>) {
  const url = `${process.env.REACT_APP_MEET_NOW_BASE_URL}${window.location.pathname.toString()}/guest`;

  return (
    <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="xs">
      <DialogTitle>Share Video Link</DialogTitle>
      <Divider />
      <div style={{ display: 'flex' }}>
        <DialogContent>
          <DialogContentText>{url}</DialogContentText>
        </DialogContent>
        <CopyButton content={url} />
      </div>
      <Divider />
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InviteUserDialog;
