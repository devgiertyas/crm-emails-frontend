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
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SaveIcon from '@material-ui/icons/Save';
import api from '../../../services/api';
import { DataGrid } from "@material-ui/data-grid";
import { useParams } from 'react-router-dom';
import { List } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';

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

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [tipo, setTipo] = useState('');

    const { idUser } = useParams();


    async function handleSubmit() {
        

const response =  api.post('/api/email/send')

//console.log(response)

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
                                    <Grid item xs={12} sm={3}>
                                        <FormControl className={classes.formControl}>
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
                                                    }} />
                                            </div>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Button style={{ marginBottom: 10 }} variant="contained" color="primary" onClick={handleSubmit}>
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