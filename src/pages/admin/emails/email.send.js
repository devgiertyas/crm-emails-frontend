import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { DataGrid } from "@material-ui/data-grid";
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

export default function UsersEdit() {
    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'nome_contato', headerName: 'Nome', width: 300 },
        { field: 'email_contato', headerName: 'E-mail', width: 150 }
      ]
      const rows = [
        { id: 1, nome_contato: "Snow", email_contato: "Jon", age: 35 },
        { id: 2, nome_contato: "Lannister", email_contato: "Cersei", age: 42 },
        { id: 3, nome_contato: "Lannister", email_contato: "Jaime", age: 45 },
        { id: 4, nome_contato: "Stark", email_contato: "Arya", age: 16 }
      ];
          
  const classes = useStyles();

  const [nome , setNome] = useState('');
  const [email , setEmail] = useState('');
  const [senha , setSenha] = useState('');
  const [tipo , setTipo] = useState('');

  const { idUser } = useParams();


  useEffect(() => {
    async function getUsuario(){
      var response = await api.get('/api/usuarios.details/'+idUser);
      
      setNome(response.data.nome_usuario);
      setEmail(response.data.email_usuario);
      setSenha(response.data.senha_usuario);
      setTipo(response.data.tipo_usuario);
    }

    getUsuario();
  },[])

  async function handleSubmit(){

    const data = {
      nome_usuario:nome,
      email_usuario:email,
      senha_usuario:senha,
      tipo_usuario:tipo,
    _id:idUser}

      if(nome!==''&&email!==''&&senha!==''&&tipo!==''){
        const response = await api.put('/api/usuarios',data);

        if(response.status===200){
          window.location.href='/admin/users'
        }else{
          alert('Erro ao atualizar o usuário!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'E-mail'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin'}><ArrowBackIcon /> Voltar</Button>
              <Paper className={classes.paper}>
                <h2>Envio de e-mail</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={3}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="labelTipo">Grupo</InputLabel>
                    <Select
                      labelId="labelTipo"
                      id="tipo"
                      value={tipo}
                      onChange={e => setTipo(e.target.value)}
                    >
                      <MenuItem value={1}>Administrador</MenuItem>
                      <MenuItem value={2}>Gerente</MenuItem>
                      <MenuItem value={3}>Funcionário</MenuItem>
                    </Select>
                  </FormControl>
                  </Grid>
                  
                  <div style={{ height: 300, width: '100%' }}>
                  <label id="labelTipo">Lista de Destinatários</label>
                      <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={12}
                        checkboxSelection
                        hideFooterPagination
                      />
                    </div>
                </Grid>
              </Paper>
            </Grid>
            <div>
                    <TextField
          id="standard-full-width"
          label="Texto do E-mail"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}/>
        
                    </div>
          </Grid>
          <Button style={{ marginBottom: 10 }} variant="contained" color="primary" href={'/admin/email/sender'}>
              Enviar E-mail
            </Button>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}