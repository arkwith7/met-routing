import React, { useState, useEffect } from 'react';
import {
  Grid,
  CircularProgress,
  Tabs,
  Tab,
  Grow,
  TextField as Input,
  Typography,
} from '@mui/material';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// logo
// import logo from './logo.svg';
import logo from './metlife_icon_large.svg';

// context
import {
  useUserDispatch,
  loginUser,
  registerUser,
  sendPasswordResetEmail,
} from '../../context/UserContext';
import { receiveToken, doInit } from '../../context/UserContext';

//components
import { Button } from '../../components/Wrappers/Wrappers';
import Widget from '../../components/Widget/Widget';
import config from '../../config';

const getGreeting = () => {
  const d = new Date();
  if (d.getHours() >= 4 && d.getHours() <= 12) {
    return 'Good Morning';
  } else if (d.getHours() >= 13 && d.getHours() <= 16) {
    return 'Good Day';
  } else if (d.getHours() >= 17 && d.getHours() <= 23) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

function Login(props) {

  console.log("로그인 페이지입니다...")
  let classes = useStyles();
  const tab = new URLSearchParams(props.location.search).get('tab');

  // global
  let userDispatch = useUserDispatch();

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const token = params.get('token');
    if (token) {
      receiveToken(token, userDispatch);
      doInit()(userDispatch);
    }
  }, []); // eslint-disable-line

  // local
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);
  let [activeTabId, setActiveTabId] = useState(+tab ?? 0);
  let [nameValue, setNameValue] = useState('');
  let [loginValue, setLoginValue] = useState('admin');
  let [newUserEmailValue, setNewUserEmailValue] = useState('');
  let [passwordValue, setPasswordValue] = useState('password');
  let [newUserPasswordValue, setNewUserPasswordValue] = useState('');
  let [forgotEmail, setForgotEmail] = useState('');
  let [isForgot, setIsForgot] = useState(false);

  let isLoginFormValid = () => {
    return loginValue && passwordValue;
  };

  let isSingUpFormValid = () => {
    return newUserEmailValue && newUserPasswordValue?.length >= 3 && nameValue;
  };

  let loginOnEnterKey = (event) => {
    if (event.key === 'Enter' && isLoginFormValid()) {
      loginUser(
        userDispatch,
        loginValue,
        passwordValue,
        props.history,
        setIsLoading,
        setError,
      );
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt='logo' className={classes.logotypeImage} />
        <Typography className={classes.logotypeText}>
          <Typography className={classes.logotypeText}>AIDocs-Admin</Typography>
        </Typography>
      </div>
      <div
        className={
          !isForgot ? classes.formContainer : classes.customFormContainer
        }
      >
        <div className={classes.form}>
          <React.Fragment>
            <Typography variant='h1' className={classes.greeting}>
              {getGreeting()}, User
            </Typography>
            <Grow
              in={error}
              style={
                !error ? { display: 'none' } : { display: 'inline-block' }
              }
            >
              <Typography className={classes.errorMessage}>
                사용자 ID 또는 비밀번호가 잘못 되었습니다.
              </Typography>
            </Grow>
            <Input
              id='userName'
              InputProps={{
                classes: {
                  underline: classes.InputUnderline,
                  input: classes.Input,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin='normal'
              placeholder='사용자 ID'
              type='text'
              fullWidth
              onKeyDown={(e) => loginOnEnterKey(e)}
            />
            <Input
              id='password'
              InputProps={{
                classes: {
                  underline: classes.InputUnderline,
                  input: classes.Input,
                },
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin='normal'
              placeholder='비밀번호'
              type='password'
              fullWidth
              onKeyDown={(e) => loginOnEnterKey(e)}
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress
                  size={26}
                  className={classes.loginLoader}
                />
              ) : (
                <Button
                  disabled={!isLoginFormValid()}
                  onClick={() =>
                    loginUser(
                      userDispatch,
                      loginValue,
                      passwordValue,
                      props.history,
                      setIsLoading,
                      setError,
                    )
                  }
                  variant='contained'
                  color='primary'
                  size='large'
                >
                  Login
                </Button>
              )}

            </div>
          </React.Fragment>
        </div>
        <Typography color='primary' className={classes.copyright}>
          {new Date().getFullYear()}{' '}
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href='https://infinov.com'
            rel='noopener noreferrer'
            target='_blank'
          >
            Infinov
          </a>
          , LLC. All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
