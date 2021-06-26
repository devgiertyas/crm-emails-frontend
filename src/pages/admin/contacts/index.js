import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid'
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import api from '../../../services/api';

import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },

}));

export default function Contacts() {
  const classes = useStyles();
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'nome_contato', headerName: 'Nome', width: 300 },
    { field: 'telefone_contato', headerName: 'Telefone', width: 150 },
    { field: 'email_contato', headerName: 'E-mail', width: 150 },
    { field: 'grupo_id', headerName: 'Grupo', width: 150 },
    {
      field: "actions",
      headerName: "Ações",
      sortable: false,
      width: 200,
      disableClickEventBubbling: true,
      renderCell: (params) => {
          return (
            <div>
            <Button variant="contained" color="primary" href={'/admin/contacts/edit/'+params.row.id}><AutorenewIcon /> Editar</Button>
            <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}><ClearIcon /></Button>
            </div>
          );
       }
    }
  ]

  const [selectionModel, setSelectionModel] = React.useState([]);

  useEffect(() => {
    async function loadContacts() {
      const response = await api.get("/api/contacts");
      setContatos(response.data)
      setLoading(false);
    }
    loadContacts();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este contato?")) {
      var result = await api.delete('/api/contacts/' + id);
      if (result.status === 200) {
        window.location.href = '/admin/contacts';
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    }
  }

  function GetIdSelect()
  {
    console.log(selectionModel);
  }

  return (
    <div className={classes.root}>
      <MenuAdmin title={'CONTATOS'} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{ marginBottom: 10 }} variant="contained" color="primary" href={'/admin/contacts/create'}>
                <AddIcon />
              Cadastrar
            </Button>
            <Button style={{ marginBottom: 10 }} variant="contained" color="primary" href={'/admin/email/sendercontact'} onClick={GetIdSelect}>
                <AddIcon />
              Enviar E-mail
            </Button>
              <Paper className={classes.paper}>
                <h2>Listagem de Contatos</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <div style={{ height: 400, width: '100%' }}>
                      <DataGrid
                        rows={contatos}
                        columns={columns}
                        pageSize={12}
                        checkboxSelection
                        hideFooterPagination
                        onSelectionModelChange={(newSelection) => {
                          setSelectionModel(newSelection.selectionModel);
                      }}
                      selectionModel={selectionModel}
                      />
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}