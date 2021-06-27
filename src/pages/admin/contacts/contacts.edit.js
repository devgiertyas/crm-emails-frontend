import React,{useState,useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
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
  const classes = useStyles();

  const [nome , setNome] = useState('');
  const [email , setEmail] = useState('');
  const [telefone , setTelefone] = useState('');

  const { idContact } = useParams();

  useEffect(() => {
    async function getContatc(){
      var response = await api.get('/api/contacts.details/'+idContact);
      
      setNome(response.data.nome_contato);
      setEmail(response.data.email_contato);
      setTelefone(response.data.telefone_contato);
    }

    getContatc();
  },[])

  async function handleSubmit(){

    const data = {
        nome_contato:nome,
        email_contato:email,
        telefone_contato:telefone,
    _id:idContact}

      if(nome!==''&&email!==''&&telefone!==''){
        const response = await api.put('/api/contacts',data);

        if(response.status===200){
          window.location.href='/admin/contacts'
        }else{
          alert('Erro ao atualizar o contato!');
        }
      }else{
        alert('Por favor, preencha todos os dados!');
      }
  }
  
  return (
    <div className={classes.root}>
      
      <MenuAdmin title={'Contatos'}/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
            <Button style={{marginBottom:10,marginRight:5}} variant="contained" href={'/admin/contacts'}><ArrowBackIcon /> Voltar</Button>
            <Button style={{marginBottom:10}} variant="contained" color="primary" href={'/admin/contacts/create'}>
              <AddIcon />
              Cadastrar
            </Button>
              <Paper className={classes.paper}>
                <h2>Atualização de Contato</h2>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      required
                      id="nome"
                      name="nome"
                      label="Nome completo"
                      fullWidth
                      autoComplete="nome"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      autoComplete="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={3}>
                    <TextField
                      required
                      id="telefone"
                      name="telefone"
                      label="Telefone"
                      fullWidth
                      autoComplete="Telefone"
                      value={telefone}
                      onChange={e => setTelefone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12}>
                  <Button variant="contained"  onClick={handleSubmit} className={classes.btnSuccess}>
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