import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getIdUsuario } from '../../../services/auth';


const useStyles = makeStyles((theme) => ({
    root: { display: 'flex', },
    title: { flexGrow: 1, },
    appBarSpacer: theme.mixins.toolbar,
    content: { flexGrow: 1, height: '100vh', overflow: 'auto', },
    container: { paddingTop: theme.spacing(2), paddingBottom: theme.spacing(4), },
    paper: { padding: 35, display: 'flex', overflow: 'auto', flexDirection: 'column', },
    formControl: { width: '100%' },
    btnSuccess: { backgroundColor: "green", color: "#fff", "&:hover": { backgroundColor: "#12b912" } }
}));

const teste = data => {

    for (let index = 0; index < data.length; index++) {

        return (
            <Chip label={data[index].nome} />
        )
    }
}

export default function SendEmailContact() {

    const classes = useStyles();

    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [contatos, setContatos] = useState([]);

    const { idContact } = useParams();

    useEffect(() => {
        async function getContatc() {

            const teste = [];
            const contatc = idContact.split(',')

            for (let index = 0; index < contatc.length; index++) {
                var response = await api.get('/api/contacts.details/' + contatc[index])
                teste.push(response.data)
                contatos.push(response.data)
                
            }

            setContatos(teste)
            console.log(contatos)
        }

        getContatc();
    }, [])

    async function handleSubmit() {
        
        const data = {
             remetentes: contatos,
             assunto: assunto,
             mensagem: mensagem,
             idUsuario : getIdUsuario()
        } 

        const response = await api.post('/api/email/send', data)

        console.log('Response',response);
        
        if(response.status===200){
            alert('E-mail Enviado com sucesso!');
            window.location.href='/admin/contacts'
          }else{
            alert('Erro ao enviar e-mail!');
          }
         
    }

    return (
        <div className={classes.root}>

            <MenuAdmin title={'E-mail'} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Button style={{ marginBottom: 10, marginRight: 5 }} variant="contained" href={'/admin'}><ArrowBackIcon /> Voltar</Button>
                            <Paper className={classes.paper}>
                                <h2>Envio de e-mail</h2>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <div>
                                            <Autocomplete
                                            autoComplete={false}
                                            disabled={true}
                                                multiple
                                                id="tags-standard"
                                                options={contatos}
                                                getOptionLabel={(option) => option.nome_contato}
                                                filterSelectedOptions={false}
                                                defaultValue={contatos}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        label="Contatos"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            id="assunto"
                                            name="assunto"
                                            label="Assunto"
                                            fullWidth
                                            autoComplete="assunto"
                                            value={assunto}
                                            onChange={e => setAssunto(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <FormControl className={classes.formControl}>
                                            <TextField
                                                id="filled-multiline-static"
                                                label="Mensagem"
                                                multiline
                                                rows={4}
                                                variant="outlined"
                                                style={{ width: '100%' }}
                                                value={mensagem}
                                                name="mensagem"
                                                onChange={e => setMensagem(e.target.value)}
                                            />
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button style={{ marginBottom: 10, marginTop: 10 }} variant="contained" color="primary" onClick={handleSubmit}>
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