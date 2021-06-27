import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import { useParams } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Autocomplete from '@material-ui/lab/Autocomplete';

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

export default function EmailView() {
    const classes = useStyles();
    const [assunto, setAssunto] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [contatos, setContatos] = useState([]);
    const [erro, setErro] = useState('');
    const { idEmail } = useParams();
    const [data, setData] = useState('');

    useEffect(() => {
        async function loadEmail() {
            const response = await api.get("/api/email.details/" + idEmail);
            setAssunto(response.data.assunto)
            setMensagem(response.data.mensagem)
            setErro(response.data.erro)
            setData(response.data.createdAt)
            const teste = [];

            for (let i = 0; i < response.data.contacts.length; i++) {

                teste.push(response.data.contacts[i])
                contatos.push(response.data.contacts[i])

            }

            setContatos(teste)
        }
        loadEmail();
    }, []);

    return (
        <div className={classes.root}>
            <MenuAdmin title={'E-mail'} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2>Visualização de E-mail</h2>
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
                                    <Grid item xs={12} sm={3}>
                                    <TextField
                                            disabled
                                            id="data"
                                            name="data"
                                            label="Data de Envio"
                                            fullWidth
                                            autoComplete="data"
                                            value={new Date(data).toLocaleString('pt-br')}
                                            onChange={e => setData(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            disabled
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
                                        <TextField
                                            disabled
                                            multiline
                                            id="mensagem"
                                            name="mensagem"
                                            label="Mensagem"
                                            variant="outlined"
                                            fullWidth
                                            autoComplete="mensagem"
                                            value={mensagem}
                                            onChange={e => setMensagem(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12}>
                                        <TextField
                                            disabled
                                            multiline
                                            id="situacao"
                                            name="situacao"
                                            label="Situação"
                                            variant="outlined"
                                            fullWidth
                                            autoComplete="situacao"
                                            value={erro}
                                            onChange={e => setErro(e.target.value)}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                    <Button style={{marginBottom:10}} variant="contained" href={'/admin/email/dashboard'}><ArrowBackIcon />  Voltar</Button>
                        <Footer />
                    </Box>
                </Container>
            </main>
        </div>
    );
}