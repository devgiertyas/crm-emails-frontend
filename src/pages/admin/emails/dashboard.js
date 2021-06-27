import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { DataGrid } from '@material-ui/data-grid'
import MenuAdmin from '../../../components/admin-home';
import Footer from '../../../components/footer-admin';
import api from '../../../services/api';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

import Button from '@material-ui/core/Button';
import PageviewIcon from '@material-ui/icons/Pageview';


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

export const SituacaoStatus = (situacao) => {
    switch (situacao) {
        case 1:
            {
                return <CheckIcon style={{color:'green'}}></CheckIcon>
            }
        case 0:
            {
                return <CloseIcon style={{color:'red'}}/>
            }
        default:
            break;
    }
}

export default function DashboardEmails() {
    const classes = useStyles();
    const [grupos, setGrupos] = useState([]);
    const [loading, setLoading] = useState(true);
    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
        {
            field: 'usuario', headerName: 'Usuario de Envio', width: 200,
            renderCell: (params) => {
                return (
                    <div>
                        {(params.row.usuario.nome_usuario)}</div>
                )
            }
        },
        { field: 'assunto', headerName: 'Assunto', width: 200 },
        {
            field: 'createdAt', headerName: 'Envio', width: 150,
            renderCell: (params) => {
                return (
                    new Date(params.row.createdAt).toLocaleString('pt-br')
                )
            }
        },
        {
            field: 'situacao', headerName: 'Situação', width: 150,
            renderCell: (params) => {
                return (
                    SituacaoStatus(params.row.situacao)
                )
            }
        },
        {
            field: "actions",
            headerName: "Ações",
            sortable: false,
            width: 200,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                return (
                    <div>
                        <Button variant="contained" color="primary" href={'admin/email/view/' + params.row.id}><PageviewIcon /> Ver</Button>
                    </div>
                );
            }
        }
    ]

    useEffect(() => {
        async function loadGroups() {
            const response = await api.get("/api/email/list");
            setGrupos(response.data)
            setLoading(false);
            console.log(grupos)
        }
        loadGroups();
    }, []);

    return (
        <div className={classes.root}>
            <MenuAdmin title={'Emails Enviados'} />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item sm={12}>
                            <Paper className={classes.paper}>
                                <h2>Relatórios de Emails</h2>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} sm={12}>
                                        <div style={{ height: 500, width: '100%' }}>
                                            <DataGrid
                                                rows={grupos}
                                                columns={columns}
                                                pageSize={12}
                                                checkboxSelection
                                                hideFooterPagination
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