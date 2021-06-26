import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import EmailSend from './pages/admin/emails/email.send';
import EmailSendContact from './pages/admin/emails/email.send.contacts'
import GroupCreate from './pages/admin/group/group.create';
import Group from './pages/admin/group';
import GroupEdit from './pages/admin/group/group.edit'
import Login from './pages/admin/login';
import Contacts from './pages/admin/contacts';
import ContactsEdit from './pages/admin/contacts/contacts.edit';
import ContactsCreate from './pages/admin/contacts/contacts.create';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersCreate from './pages/admin/users/users.create';


import PrivateRoute from './services/wAuth';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route  path="/" exact component={Login} />

                {/* Rota Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute  path="/admin" exact component={Dashboard} />

                <PrivateRoute  path="/admin/email/sender" exact component={EmailSend} />
                <PrivateRoute  path="/admin/email/sendercontact" exact component={EmailSendContact} />

                <Route  path="/admin/group/edit/:idGroup" exact component={GroupEdit} />
                <PrivateRoute  path="/admin/group/create" exact component={GroupCreate} />
                <PrivateRoute  path="/admin/group" exact component={Group} />

                <PrivateRoute  path="/admin/contacts" exact component={Contacts} />
                <PrivateRoute  path="/admin/contacts/create" exact component={ContactsCreate} />
                <PrivateRoute  path="/admin/contacts/edit/:idContact" exact component={ContactsEdit} />

                <PrivateRoute  path="/admin/users" exact component={Users} />
                <PrivateRoute  path="/admin/users/create" exact component={UsersCreate} />
                <PrivateRoute  path="/admin/users/edit/:idUser" exact component={UsersEdit} />

            </Switch>
        </BrowserRouter>
    )
}