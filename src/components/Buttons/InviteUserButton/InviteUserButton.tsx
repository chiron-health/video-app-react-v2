import * as React from 'react';

import Button from '@material-ui/core/Button';
import { PersonAddOutlined } from '@material-ui/icons';
import InviteUserDialog from '../../InviteUserDialog/InviteUserDialog';

export default function InviteUserButton(props: { disabled?: boolean; className?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <InviteUserDialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      />
      <Button
        className={props.className}
        onClick={() => {
          setOpen(true);
        }}
        disabled={props.disabled}
        startIcon={<PersonAddOutlined />}
      >
        Invite User
      </Button>
    </>
  );
}
