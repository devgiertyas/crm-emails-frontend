import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from './pages/admin/dashboard';
import Contacts from './pages/admin/contacts';
import ContactsEdit from './pages/admin/contacts/contacts.edit';
import ContactsCreate from './pages/admin/contacts/contacts.create';

import Users from './pages/admin/users';
import UsersEdit from './pages/admin/users/users.edit';
import UsersCreate from './pages/admin/users/users.create';

import Home from './pages/client/home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                {/* Rota Cliente */}
                <Route path="/" exact component={Dashboard} />

                {/* Rota Admin */}
                <Route path="/admin" exact component={Dashboard} />

                <Route path="/admin/contacts" exact component={Contacts} />
                <Route path="/admin/contacts/create" exact component={ContactsCreate} />
                <Route path="/admin/produtos/edit/:idContact" exact component={ContactsEdit} />

                <Route path="/admin/users" exact component={Users} />
                <Route path="/admin/users/create" exact component={UsersCreate} />
                <Route path="/admin/users/edit/:idUser" exact component={UsersEdit} />

            </Switch>
        </BrowserRouter>
    )
}