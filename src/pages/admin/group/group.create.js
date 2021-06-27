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
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api'
import { DataGrid } from '@material-ui/data-grid'

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

export default function GroupCreate() {
  const classes = useStyles();

  const [nome , setNome] = useState('');

  const columns = [
    { field: 'id', headerName: 'ID', hide: true },
    { field: 'nome_contato', headerName: 'Nome', width: 300 },
    { field: 'telefone_contato', headerName: 'Telefone', width: 150 },
    { field: 'email_contato', headerName: 'E-mail', width: 150 }
  ]
  const [contatos, setContatos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadContacts() {
      const response = await api.get("/api/contacts");
      setContatos(response.data)
      setLoading(false);
    }
    loadContacts();
  }, []);

  const [selectionModel, setSelectionModel] = React.useState([]);

  async function handleSubmit(){

    const data = {
      nome_grupo:nome,
      contatos: selectionModel}

    if(nome!==''&&selectionModel!==''){
        const response = await api.post('/api/grupos',data);

        if(response.status===200){
          window.location.href='/admin/group'
          alert('Grupo Cadastrado com Sucesso!');
        }else{
          alert('Erro ao cadastrar o Grupo!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'Grupos'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Button style={{marginBottom:10}} variant="contained" href={'/admin/users'}><ArrowBackIcon />  Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Cadastro de Grupos</h2>
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
                  <h3>Selecionar Contatos do Grupo</h3>
                    <div style={{ height: 350, width: '100%' }}>
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
                  <Button variant="contained" onClick={handleSubmit} className={classes.btnSuccess}>
                  <SaveIcon /> Salvar
                  </Button>
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