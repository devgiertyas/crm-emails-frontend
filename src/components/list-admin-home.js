import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import EmailIcon from '@material-ui/icons/Email';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import GroupIcon from '@material-ui/icons/Group';

import ExitToApp from '@material-ui/icons/ExitToApp';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/admin/usuarios" >
      <ListItemIcon>
        <ContactMailIcon />
      </ListItemIcon>
      <ListItemText primary="Contatos" />
    </ListItem>
    <ListItem button component="a" href="/admin/produtos" >
      <ListItemIcon>
        <EmailIcon />
      </ListItemIcon>
      <ListItemText primary="E-mails" />
    </ListItem>
    <ListItem button component="a" href="/admin/users" >
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Usuários" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Opções</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <ExitToApp />
      </ListItemIcon>
      <ListItemText primary="Sair" />
    </ListItem>
  </div>
);
