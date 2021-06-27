import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Title from './Title';
import api from '../../../services/api';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import PageviewIcon from '@material-ui/icons/Pageview';
import { DataGrid } from '@material-ui/data-grid'


function preventDefault(event) {
  event.preventDefault();
}

export const SituacaoStatus = (situacao) => {
  switch (situacao) {
    case 1:
      {
        return <CheckIcon style={{ color: 'green' }}></CheckIcon>
      }
    case 0:
      {
        return <CloseIcon style={{ color: 'red' }} />
      }
    default:
      break;
  }
}

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
]

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();

  const [emails, setEmails] = useState([]);

  useEffect(() => {
    async function loadlastEmails() {
      const response = await api.get("/api/email/lasts");
      setEmails(response.data)
    }
    loadlastEmails();
  }, []);

  return (
    <React.Fragment>
      <Title>Ultimos 5 Emails Enviados</Title>
      <div style={{ height: 370, width: '100%' }}>
        <DataGrid
          rows={emails}
          columns={columns}
          pageSize={12}
          hideFooterPagination
        />
      </div>
      <div className={classes.seeMore}>
        <Link color="primary" href="/admin/email/dashboard">
          Ver todos os Emails Enviados
        </Link>
      </div>
    </React.Fragment>
  );
}
