import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';

import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ClearIcon from '@material-ui/icons/Clear';
import api from '../../../services/api'
import { DataGrid } from '@material-ui/data-grid'

import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {display: 'flex',},
  title: {flexGrow: 1,},
  appBarSpacer: theme.mixins.toolbar,
  content: {flexGrow: 1,height: '100vh',overflow: 'auto',},
  container: {paddingTop: theme.spacing(2),paddingBottom: theme.spacing(4),},
  paper: {padding: 35,display: 'flex',overflow: 'auto',flexDirection: 'column',},
  formControl:{width:'100%'},
  btnSuccess:{ backgroundColor:"green",color:"#fff","&:hover":{backgroundColor:"#12b912"}}
}));

export default function GroupEdit() {
  const classes = useStyles();
  const [nome , setNome] = useState('');
  const [idProject , setId] = useState('');
  const [contatos, setContatos] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'nome_contato', headerName: 'Nome', width: 300 },
    { field: 'telefone_contato', headerName: 'Telefone', width: 150 },
    { field: 'email_contato', headerName: 'E-mail', width: 150 },
    {
        field: "actions",
        headerName: "Ações",
        sortable: false,
        width: 200,
        disableClickEventBubbling: true,
        renderCell: (params) => {
            return (
              <div>
              <Button variant="contained" color="secondary" onClick={() => handleDelete(params.row.id)}><ClearIcon /></Button>
              </div>
            );
         }
        }   
  ]

  const { idGroup } = useParams();

  useEffect(() => {
    async function getGroup() {
      var response  = await api.get('/api/grupos.details/'+idGroup);
      
      setNome(response.data.nome_grupo);

     setContatos(response.data.contacts);
    setId(response.data._id);
    }
    getGroup();
  }, []);

  async function handleDelete(id) {
    if (window.confirm("Deseja realmente excluir este contato?")) {

        const data = {contatos:[]}
        
      for (let index = 0; index < contatos.length; index++) {
         
        if(id != contatos[index].id)
        data.contatos.push(contatos[index].id)

      
      }  
      console.log(contatos)
       console.log(data)

      var result = await api.put('/api/grupos/removercontato/' + idProject, data);

      if (result.status === 200) {
        window.location.href = '/admin/group/edit/' + idProject;
      
      } else {
        alert('Ocorreu um erro. Por favor, tente novamente!');
      }
    
    }
  }

  const [selectionModel, setSelectionModel] = React.useState([]);

  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'Grupos'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{marginBottom:10}} variant="contained" href={'/admin/group'}><ArrowBackIcon />  Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Edição de Grupo</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Descrição"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <h3>Contatos do Grupo</h3>
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
                  <Grid item xs={12} sm={12}>
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