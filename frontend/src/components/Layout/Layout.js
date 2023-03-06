import React, { useEffect } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import classnames from 'classnames'

import SettingsIcon from '@mui/icons-material/Settings';
import GithubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';

import {
    Fab,
    IconButton
} from '@mui/material'
import { connect } from 'react-redux';
// styles
import useStyles from './styles'

// components
import Header from '../Header'
import Sidebar from '../Sidebar'
import Footer from '../Footer'
import { Link } from '../Wrappers'
import ColorChangeThemePopper from './components/ColorChangeThemePopper'

import EditUser from '../../pages/user/EditUser';

// pages
import Dashboard from '../../pages/dashboard'
import BreadCrumbs from '../../components/BreadCrumbs'

// context
import { useLayoutState } from '../../context/LayoutContext'

import UsersFormPage from 'pages/CRUD/Users/form/UsersFormPage';
import UsersTablePage from 'pages/CRUD/Users/table/UsersTablePage';

import Doc_masterFormPage from 'pages/CRUD/Doc_master/form/Doc_masterFormPage';
import Doc_masterTablePage from 'pages/CRUD/Doc_master/table/Doc_masterTablePage';

import Doc_extraction_itemsFormPage from 'pages/CRUD/Doc_extraction_items/form/Doc_extraction_itemsFormPage';
import Doc_extraction_itemsTablePage from 'pages/CRUD/Doc_extraction_items/table/Doc_extraction_itemsTablePage';

import Disease_cdFormPage from 'pages/CRUD/Disease_cd/form/Disease_cdFormPage';
import Disease_cdTablePage from 'pages/CRUD/Disease_cd/table/Disease_cdTablePage';

import Operation_cdFormPage from 'pages/CRUD/Operation_cd/form/Operation_cdFormPage';
import Operation_cdTablePage from 'pages/CRUD/Operation_cd/table/Operation_cdTablePage';

import Insurance_cdFormPage from 'pages/CRUD/Insurance_cd/form/Insurance_cdFormPage';
import Insurance_cdTablePage from 'pages/CRUD/Insurance_cd/table/Insurance_cdTablePage';

import Ocr_logFormPage from 'pages/CRUD/Ocr_log/form/Ocr_logFormPage';
import Ocr_logTablePage from 'pages/CRUD/Ocr_log/table/Ocr_logTablePage';

const Redirect = (props) => {
  useEffect(() => window.location.replace(props.url))
  return <span>Redirecting...</span>;
}

function Layout(props) {
    const classes = useStyles()
    const [anchorEl, setAnchorEl] = React.useState(null)

    const open = Boolean(anchorEl)
    const id = open ? 'add-section-popover' : undefined
    const handleClick = event => {
        setAnchorEl(open ? null : event.currentTarget)
    }

    // global
    let layoutState = useLayoutState()

    return (
        <div className={classes.root}>
            <Header history={props.history} />
            <Sidebar />
            <div
                className={classnames(classes.content, {
                    [classes.contentShift]: layoutState.isSidebarOpened,
                })}
            >
                <div className={classes.fakeToolbar} />
                <BreadCrumbs />
                <Switch>

                    <Route path="/admin/dashboard" component={Dashboard} />
                    <Route path="/admin/user/edit" component={EditUser} />
                    <Route
                      path={'/admin/api-docs'}
                      exact
                      component={(props) => <Redirect url={process.env.NODE_ENV === 'production'
                        ? window.location.origin + '/api-docs'
                        : 'http://localhost:8080/api-docs'} {...props}/>}
                    />

                    <Route path={"/admin/users"} exact component={UsersTablePage} />
                    <Route path={"/admin/users/new"} exact component={UsersFormPage} />
                    <Route path={"/admin/users/:id/edit"} exact component={UsersFormPage} />

                    <Route path={"/admin/doc_master"} exact component={Doc_masterTablePage} />
                    <Route path={"/admin/doc_master/new"} exact component={Doc_masterFormPage} />
                    <Route path={"/admin/doc_master/:id/edit"} exact component={Doc_masterFormPage} />

                    <Route path={"/admin/doc_extraction_items"} exact component={Doc_extraction_itemsTablePage} />
                    <Route path={"/admin/doc_extraction_items/new"} exact component={Doc_extraction_itemsFormPage} />
                    <Route path={"/admin/doc_extraction_items/:id/edit"} exact component={Doc_extraction_itemsFormPage} />

                    <Route path={"/admin/disease_cd"} exact component={Disease_cdTablePage} />
                    <Route path={"/admin/disease_cd/new"} exact component={Disease_cdFormPage} />
                    <Route path={"/admin/disease_cd/:id/edit"} exact component={Disease_cdFormPage} />

                    <Route path={"/admin/operation_cd"} exact component={Operation_cdTablePage} />
                    <Route path={"/admin/operation_cd/new"} exact component={Operation_cdFormPage} />
                    <Route path={"/admin/operation_cd/:id/edit"} exact component={Operation_cdFormPage} />

                    <Route path={"/admin/insurance_cd"} exact component={Insurance_cdTablePage} />
                    <Route path={"/admin/insurance_cd/new"} exact component={Insurance_cdFormPage} />
                    <Route path={"/admin/insurance_cd/:id/edit"} exact component={Insurance_cdFormPage} />

                    <Route path={"/admin/ocr_log"} exact component={Ocr_logTablePage} />
                    <Route path={"/admin/ocr_log/new"} exact component={Ocr_logFormPage} />
                    <Route path={"/admin/ocr_log/:id/edit"} exact component={Ocr_logFormPage} />

                </Switch>
                <Fab
                    color="primary"
                    aria-label="settings"
                    onClick={e => handleClick(e)}
                    className={classes.changeThemeFab}
                    style={{ zIndex: 100 }}
                >
                    <SettingsIcon style={{ color: '#fff' }} />
                </Fab>
                <ColorChangeThemePopper
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                />
                <Footer>
                    <div>
                        <Link
                            color={'primary'}
                            href={'https://infinov.com/'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Infinov
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://infinov.com/aboutus'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            About Us
                        </Link>
                        <Link
                            color={'primary'}
                            href={'https://infinov.com/services'}
                            target={'_blank'}
                            className={classes.link}
                        >
                            Services
                        </Link>
                    </div>
                </Footer>
            </div>
        </div>
    )
}

export default withRouter(connect()(Layout))
