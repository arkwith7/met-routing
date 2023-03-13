import React from 'react'
import Widget from '../Widget'
import { Link } from 'react-router-dom'
import {
    Box,
    Grid,
    Breadcrumbs,
    Tabs,
    Tab,
} from '@mui/material'
import { Typography, Button } from '../Wrappers'
import {
    NavigateNext as NavigateNextIcon,
    CalendarToday as CalendarIcon,
} from '@mui/icons-material'
import { useLocation } from 'react-router-dom';
import { withStyles } from '@mui/styles'

// styles
import useStyles from '../Layout/styles'

// components
import structure from '../Sidebar/SidebarStructure'


// Tab styling
const CustomTab = withStyles(theme => ({
    root: {
        minWidth: 72,
        textTransform: 'none',
        fontWeight: 400,
    },
}))(props => <Tab {...props} />)

//Sidebar structure
const BreadCrumbs = () => {
    const location = useLocation()
    const classes = useStyles()
    const [value, setValue] = React.useState(2)

    // 20230313추가

    const leftTitle = (item) => {
        if (item == 'Doc_master') {
            return "OCR 서류정보"
        } else if (item == 'Disease_cd') {
            return "질병코드정보"
        } else if (item == 'Operation_cd') {
            return "수술코드정보"
        } else if (item == 'Insurance_cd') {
            return "수가코드정보"
        } else if (item == 'Ocr_log') {
            return "OCR Log Info"
        } else {
            return item
        }
    }

    const renderBreadCrumbs = () => {
        let url = location.pathname;
        let route = url.split('/')
            .slice(1)
            .map(route => route
                .split('-')
                .map(word => word[0].toUpperCase() + word.slice(1))
                .join(' ')
            );

        // console.log("route", route)

        route.splice(2, 1)
        const length = route.length;
        return route.map((item, index) => {
            let middlewareUrl = "/" + url.split('/').slice(1, index + 2).join('/');

            return (
                <Breadcrumbs
                    key={index + '_b'}
                    separator={
                        <NavigateNextIcon fontSize="small" />
                    }
                    aria-label="breadcrumb"
                >
                    <Typography variant="h6" color={length === index + 1 ? "primary" : ""}>
                        {length === index + 1 ?
                            leftTitle(item) :
                            <Link to={middlewareUrl} style={{ color: 'unset', textDecoration: 'none' }}>
                                {item}
                            </Link>
                        }
                    </Typography>
                </Breadcrumbs>
            )
        })
    }


    const handleChange = (event, newValue) => {
        setValue(newValue)
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        }
    }
    return (
        <Widget
            disableWidgetMenu
            inheritHeight
            className={classes.margin}
            bodyClass={classes.navPadding}
        >
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                wrap={'nowrap'}
                style={{ overflowX: 'auto' }}
            >
                {
                    // eslint-disable-next-line array-callback-return
                    structure.map(c => {
                        if (
                            window.location.hash.includes(c.link) &&
                            c.link && c.label === "Dashboard"
                        ) {
                            return (
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    key={c.id}
                                >
                                    <Breadcrumbs aria-label="breadcrumb">
                                        <Typography variant="h4">
                                            {c.label}
                                        </Typography>
                                    </Breadcrumbs>
                                    {window.location.hash.includes(
                                        '/app/dashboard'
                                    ) && (
                                            <Tabs
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="simple tabs example"
                                                variant="scrollable"
                                                scrollButtons="auto"
                                                style={{ marginLeft: 38 }}
                                            >
                                                <CustomTab
                                                    label="Today"
                                                    {...a11yProps(0)}
                                                />
                                                <CustomTab
                                                    label="This week"
                                                    {...a11yProps(1)}
                                                />
                                                <CustomTab
                                                    label="This month"
                                                    {...a11yProps(2)}
                                                />
                                                <CustomTab
                                                    label="This year"
                                                    {...a11yProps(3)}
                                                />
                                            </Tabs>
                                        )}
                                </Box>
                            )
                        }
                    })}
                {window.location.hash.includes('/app/dashboard') ? (
                    <Box display="flex" alignItems="center">
                        <CalendarIcon
                            className={classes.calendarIcon}
                        />
                        <Typography className={classes.date} style={{ marginRight: 38 }}>
                            29 Oct 2019, Tuesday
                        </Typography>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                        >
                            Latest Reports
                        </Button>
                    </Box>
                ) : (
                    <Breadcrumbs
                        separator={
                            <NavigateNextIcon fontSize="small" />
                        }
                        aria-label="breadcrumb"
                    >
                        {renderBreadCrumbs()}
                    </Breadcrumbs>
                )}
            </Grid>
        </Widget>

    )
}
export default BreadCrumbs
