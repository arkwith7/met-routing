import React, { useEffect } from 'react';
import { Grid, Box, TextField } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useParams } from 'react-router';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import { useLocation, useHistory } from 'react-router-dom';
import useStyles from './styles';

import {
  PersonOutline as PersonOutlineIcon,
  Lock as LockIcon,
} from '@mui/icons-material';
import uuid from 'uuid/v4';

import Widget from '../../components/Widget';
import { Typography, Button } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import {
  useManagementDispatch,
  useManagementState,
} from '../../context/ManagementContext';
import config from '../../config';
import Axios from 'axios';

import { actions } from '../../context/ManagementContext';
import { showSnackbar } from '../../components/Snackbar';

const EditUser = () => {
  const classes = useStyles();
  const [tab, setTab] = React.useState(0);
  const [password, setPassword] = React.useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
  });
  const [data, setData] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  let { id } = useParams();
  const fileInput = React.useRef(null);
  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };
  const location = useLocation();
  const managementDispatch = useManagementDispatch();
  const managementValue = useManagementState();

  function extractExtensionFrom(filename) {
    if (!filename) {
      return null;
    }

    const regex = /(?:\.([^.]+))?$/;
    return regex.exec(filename)[1];
  }

  const uploadToServer = async (file, path, filename) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);
    const uri = `/file/upload/${path}`;
    await Axios.post(uri, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const privateUrl = `${path}/${filename}`;

    return `${config.baseURLApi}/file/download?privateUrl=${privateUrl}`;
  };

  const handleFile = async (event) => {
    const file = event.target.files[0];

    const extension = extractExtensionFrom(file.name);
    const id = uuid();
    const filename = `${id}.${extension}`;
    const privateUrl = `users/avatar/${filename}`;

    const publicUrl = await uploadToServer(file, 'users/avatar', filename);
    let avatarObj = {
      id: id,
      name: file.name,
      sizeInBytes: file.size,
      privateUrl,
      publicUrl,
      new: true,
    };

    setData({
      ...data,
      avatar: [...data.avatar, avatarObj],
    });

    return null;
  };
  const history = useHistory();

  useEffect(() => {
    actions.doFind(sessionStorage.getItem('user_id'))(managementDispatch);
    // eslint-disable-next-line  react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (location.pathname.includes('edit')) {
      setEditable(true);
    }
  }, [location.pathname]);

  useEffect(() => {
    setData(managementValue.currentUser);
  }, [managementDispatch, managementValue, id]);

  const deleteOneImage = (id) => {
    setData({
      ...data,
      avatar: data.avatar.filter((avatar) => avatar.id !== id),
    });
  };

  function handleSubmit() {
    actions.doUpdate(
      sessionStorage.getItem('user_id'),
      data,
      history,
    )(managementDispatch);
    showSnackbar({ type: 'success', message: 'User Edited' });
  }

  function handleUpdatePassword() {
    actions.doChangePassword(password)(managementDispatch);
  }

  function handleChangePassword(e) {
    setPassword({
      ...password,
      [e.target.name]: e.target.value,
    });
  }

  function handleChange(e) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Widget>
          <Box display={'flex'} justifyContent={'center'}>
            <Tabs
              indicatorColor='primary'
              textColor='primary'
              value={tab}
              onChange={handleChangeTab}
              aria-label='full width tabs example'
            >
              <Tab
                label='사용자계정'
                icon={<PersonOutlineIcon />}
                classes={{ wrapper: classes.icon }}
              />
              <Tab
                label='사용자정보'
                icon={<PersonOutlineIcon />}
                classes={{ wrapper: classes.icon }}
              />
              <Tab
                label='비밀번호변경'
                icon={<LockIcon />}
                classes={{ wrapper: classes.icon }}
              />
            </Tabs>
          </Box>
        </Widget>
      </Grid>
      <Grid item xs={12}>
        <Widget>
          <Grid item justifyContent={'center'} container>
            <Box display={'flex'} flexDirection={'column'} width={600}>
              {tab === 0 ? (
                <>
                  <Typography
                    variant={'h5'}
                    weight={'medium'}
                    style={{ marginBottom: 30 }}
                  >
                    사용자 계정
                  </Typography>
                  <TextField
                    label='사용자 ID'
                    value={data?.userName || ''}
                    onChange={handleChange}
                    name='userName'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    disabled
                  />
                  <TextField
                    label='Email'
                    value={data?.email || ''}
                    name='email'
                    onChange={handleChange}
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                  />
                  <FormControl variant='outlined' style={{ marginBottom: 35 }}>
                    <InputLabel id='demo-simple-select-outlined-label'>
                      Role
                    </InputLabel>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      label='Role'
                      id='demo-simple-select-outlined'
                      defaultValue='user'
                      value={data?.role || ''}
                      name='email'
                      onChange={handleChange}
                    >
                      <MenuItem value={'admin'}>Admin</MenuItem>
                      <MenuItem value={'user'}>User</MenuItem>
                    </Select>
                  </FormControl>
                </>
              ) : tab === 1 ? (
                <>
                  <Typography
                    variant={'h5'}
                    weight={'medium'}
                    style={{ marginBottom: 35 }}
                  >
                    사용자 정보
                  </Typography>
                  <Typography weight={'medium'}>Photo:</Typography>
                  <div className={classes.galleryWrap}>
                    {data && data.avatar && data.avatar.length !== 0
                      ? data.avatar.map((avatar, idx) => (
                          <div className={classes.imgWrap}>
                            <span
                              className={classes.deleteImageX}
                              onClick={() => deleteOneImage(avatar.id)}
                            ></span>
                            <img
                              src={avatar.publicUrl}
                              alt='avatar'
                              height={'100%'}
                            />
                          </div>
                        ))
                      : null}
                  </div>
                  <label
                    className={classes.uploadLabel}
                    style={{ cursor: 'pointer' }}
                  >
                    {'아바타 이미지 Upload'}
                    <input
                      style={{ display: 'none' }}
                      accept='image/*'
                      type='file'
                      ref={fileInput}
                      onChange={handleFile}
                    />
                  </label>

                  <Typography size={'sm'} style={{ marginBottom: 35 }}>
                    .PNG, .JPG, .JPEG
                  </Typography>
                  <TextField
                    label='사용자 ID'
                    variant='outlined'
                    defaultValue='User ID'
                    value={data && data.userName}
                    name='userName'
                    onChange={handleChange}
                    style={{ marginBottom: 35 }}
                    disabled
                  />
                  <TextField
                    label='사용자 이름'
                    variant='outlined'
                    defaultValue={'한글성명'}
                    value={data && data.korName}
                    name='korName'
                    onChange={handleChange}
                    style={{ marginBottom: 35 }}
                  />
                  <TextField
                    label='Phone'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    defaultValue={'010-666-7070'}
                    value={data && data.phone}
                    name='phone'
                    onChange={handleChange}
                  />
                  <TextField
                    label='Email'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    type={'email'}
                    defaultValue={'Jane@gmail.com'}
                    value={data && data.email}
                    name='email'
                    onChange={handleChange}
                  />
                </>
              ) : tab === 2 ? (
                <>
                  <Typography
                    variant={'h5'}
                    weight={'medium'}
                    style={{ marginBottom: 35 }}
                  >
                    비밀번호
                  </Typography>
                  <TextField
                    label='Current Password'
                    type='password'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    defaultValue={'Current Password'}
                    value={password.currentPassword || ''}
                    name='currentPassword'
                    onChange={handleChangePassword}
                  />
                  <TextField
                    label='New Password'
                    type='password'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    defaultValue={'New Password'}
                    value={password.newPassword || ''}
                    name='newPassword'
                    onChange={handleChangePassword}
                  />
                  <TextField
                    label='Confirm Password'
                    type='password'
                    variant='outlined'
                    style={{ marginBottom: 35 }}
                    defaultValue={'Verify Password'}
                    value={password.confirmPassword || ''}
                    name='confirmPassword'
                    onChange={handleChangePassword}
                  />
                </>
              ) : (
                <>
                  <Typography
                    variant={'h5'}
                    weight={'medium'}
                    style={{ marginBottom: 35 }}
                  >
                    Settings
                  </Typography>
                  <FormControl variant='outlined' style={{ marginBottom: 35 }}>
                    <Select
                      labelId='demo-simple-select-outlined-label'
                      id='demo-simple-select-outlined'
                      value={10}
                    >
                      <MenuItem value={10}>English</MenuItem>
                      <MenuItem value={20}>Admin</MenuItem>
                      <MenuItem value={30}>Super Admin</MenuItem>
                    </Select>
                  </FormControl>
                  <Typography weight={'bold'}>Communication:</Typography>
                  <Box display={'flex'}>
                    <FormControlLabel
                      control={
                        <Checkbox checked name='checkedB' color='secondary' />
                      }
                      label='Email'
                    />
                    <FormControlLabel
                      control={<Checkbox name='checkedB' color='secondary' />}
                      label='Messages'
                    />
                    <FormControlLabel
                      control={<Checkbox name='checkedB' color='secondary' />}
                      label='Phone'
                    />
                  </Box>
                  <Box display={'flex'} mt={2} alignItems={'center'}>
                    <Typography weight={'medium'}>
                      Email notification
                    </Typography>
                    <Switch color={'primary'} checked />
                  </Box>
                  <Box display={'flex'} mt={2} mb={2} alignItems={'center'}>
                    <Typography weight={'medium'}>
                      Send copy to personal email
                    </Typography>
                    <Switch color={'primary'} />
                  </Box>
                </>
              )}
              {editable && (
                <Box display={'flex'} justifyContent={'space-between'}>
                  {tab !== 2 ? (
                    <>
                      <Button variant={'outlined'} color={'primary'}>
                        초기화
                      </Button>
                      <Button variant={'contained'} onClick={handleSubmit}>
                        저장
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant={'outlined'} color={'primary'}>
                        초기화
                      </Button>
                      <Button
                        variant={'contained'}
                        onClick={handleUpdatePassword}
                      >
                        비밀번호 저장
                      </Button>
                    </>
                  )}
                </Box>
              )}
            </Box>
          </Grid>
        </Widget>
      </Grid>
    </Grid>
  );
};

export default EditUser;
