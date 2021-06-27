import React, {useState,useEffect} from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import api from '../../../services/api'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();

  const [countEmails, setCountEmails] = useState('');
  
  useEffect(() =>{
    async function loadEmailsCount(){
      const response = await api.get("api/email/count");
      setCountEmails(response.data)
    }
    loadEmailsCount();
  },[]);

  return (
    <React.Fragment>
      <Title>Emails Enviados</Title>
      <Typography component="p" variant="h4">
        {countEmails}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
       
      </Typography>
      <div>
        <Link color="primary" href="/admin/email/dashboard" >
          Ver Emails Enviados
        </Link>
      </div>
    </React.Fragment>
  );
}
