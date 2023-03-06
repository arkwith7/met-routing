import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress, Box, Grid } from '@mui/material';
import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import InfoIcon from '@mui/icons-material/Info';
import axios from 'axios';
// styles
import useStyles from './styles';
// components
import Widget from '../../components/Widget/Widget';

const Dashboard = () => {
  let classes = useStyles();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  const [users, setUsers] = useState(0);
  const [doc_master, setDoc_master] = useState(0);
  const [doc_extraction_items, setDoc_extraction_items] = useState(0);
  const [disease_cd, setDisease_cd] = useState(0);
  const [operation_cd, setOperation_cd] = useState(0);
  const [insurance_cd, setInsurance_cd] = useState(0);
  const [ocr_log, setOcr_log] = useState(0);

  const [currentUser, setCurrentUser] = useState(null);

  async function loadData() {
    const fns = [setUsers,setDoc_master,setDoc_extraction_items,setDisease_cd,setOperation_cd,setInsurance_cd,setOcr_log,];

    const responseUsers = await axios.get(`/users/count`);
    const responseDoc_master = await axios.get(`/doc_master/count`);
    const responseDoc_extraction_items = await axios.get(`/doc_extraction_items/count`);
    const responseDisease_cd = await axios.get(`/disease_cd/count`);
    const responseOperation_cd = await axios.get(`/operation_cd/count`);
    const responseInsurance_cd = await axios.get(`/insurance_cd/count`);
    const responseOcr_log = await axios.get(`/ocr_log/count`);
      Promise.all([responseUsers,responseDoc_master,responseDoc_extraction_items,responseDisease_cd,responseOperation_cd,responseInsurance_cd,responseOcr_log,])
          .then((res) => res.map((el) => el.data))
          .then((data) => data.forEach((el, i) => fns[i](el.count)));
  }

  useEffect(() => {
    setCurrentUser(managementValue.currentUser);
    loadData();
  }, [managementDispatch, managementValue]);

  if (!currentUser) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <div>
      <h1 className='page-title'>
        Welcome, {currentUser.firstName}! <br />
        <small>
          <small>Your role is {currentUser.role}</small>
        </small>
      </h1>
      <Grid container alignItems='center' columns={12} spacing={3}>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/users'} style={{ textDecoration: 'none' }}>
          <Widget title={'Users'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Users: <span className={classes.widgetTextCount}>{users}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/doc_master'} style={{ textDecoration: 'none' }}>
          <Widget title={'Doc_master'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Doc_master: <span className={classes.widgetTextCount}>{doc_master}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/doc_extraction_items'} style={{ textDecoration: 'none' }}>
          <Widget title={'Doc_extraction_items'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Doc_extraction_items: <span className={classes.widgetTextCount}>{doc_extraction_items}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/disease_cd'} style={{ textDecoration: 'none' }}>
          <Widget title={'Disease_cd'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Disease_cd: <span className={classes.widgetTextCount}>{disease_cd}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/operation_cd'} style={{ textDecoration: 'none' }}>
          <Widget title={'Operation_cd'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Operation_cd: <span className={classes.widgetTextCount}>{operation_cd}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/insurance_cd'} style={{ textDecoration: 'none' }}>
          <Widget title={'Insurance_cd'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Insurance_cd: <span className={classes.widgetTextCount}>{insurance_cd}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

    <Grid item xs={12} sm={6} lg={4} xl={3}>
        <Link to={'/admin/ocr_log'} style={{ textDecoration: 'none' }}>
          <Widget title={'Ocr_log'}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <InfoIcon color='primary' sx={{ mr: 1 }} />
              <p className={classes.widgetText}>Ocr_log: <span className={classes.widgetTextCount}>{ocr_log}</span></p>
            </div>
          </Widget>
        </Link>
        </Grid>

      </Grid>
    </div>
  );
};

export default Dashboard;
