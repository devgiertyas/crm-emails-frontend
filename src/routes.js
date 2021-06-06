import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import Login from './pages/admin/login';
import Contacts from './pages/admin/contacts';
import ContactsEdit from './pages/admin/contacts/contacts.edit';
import ContactsCreate from './pages/admin/contacts/contacts.create';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersCreate from './pages/admin/users/users.create';

import PrivateRoute from './services/wAuth';

import Home from './pages/client/home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <PrivateRoute  path="/" exact component={Dashboard} />

                {/* Rota Admin */}
                <Route path="/admin/login" exact component={Login} />
                <PrivateRoute  path="/admin" exact component={Dashboard} />

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