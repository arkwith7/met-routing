import React, { useState, useEffect, useMemo } from "react";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import { Drawer, IconButton, List } from "@mui/material";
import { useTheme } from '@mui/material';
import { withRouter } from "react-router-dom";
import classNames from "classnames";

import {
  Dashboard as DashboardIcon,
  Home as HomeIcon,
  PeopleAlt as PeopleAltIcon,
  Plagiarism as PlagiarismIcon,
  Apps as CoreIcon,
  Description as DocumentationIcon,
  AccountCircle as ProfileIcon,
  PlayArrow as PlayArrowIcon,
} from '@mui/icons-material'

// styles
import useStyles from "./styles";
import useStyles2 from "./components/SidebarLink/styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar
} from "../../context/LayoutContext";

function Sidebar({ location, structure }) {
  console.log("위치 location",location)
  let classes = useStyles();
  let classes2 = useStyles2()
  let theme = useTheme();

  const toggleDrawer = value => event => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    if (value && !isPermanent) toggleSidebar(layoutDispatch);
  };

  // global
  let { isSidebarOpened } = useLayoutState();
  let layoutDispatch = useLayoutDispatch();

  // local
  let [isPermanent, setPermanent] = useState(true);

  const isSidebarOpenedWrapper = useMemo(() => !isPermanent ? !isSidebarOpened : isSidebarOpened, [isPermanent, isSidebarOpened]);

  // 권한별 메뉴 표시를 위해 사용자 권한을 가져온다.
  const tempUser = localStorage.getItem('user');
  const user = JSON.parse(tempUser)
  console.log("user datatype", typeof (user));
  // const {userName, userRole} = user;
  console.log("Sidebar user", user);
  console.log("Sidebar userName", user.userName);
  // const userRole = user.userRole;
  console.log("Sidebar userRole", user.userRole);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpenedWrapper,
        [classes.drawerClose]: !isSidebarOpenedWrapper
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpenedWrapper,
          [classes.drawerClose]: !isSidebarOpenedWrapper
        })
      }}
      open={isSidebarOpenedWrapper}
      onClose={toggleDrawer(true)}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse)
            }}
          />
        </IconButton>
      </div>
      <List
        className={classes.sidebarList}
        classes={{ padding: classes.padding }}
      >
        <SidebarLink
          label="Dashboard"
          link="/admin/dashboard"
          location={location}
          isSidebarOpened={isSidebarOpenedWrapper}
          icon={<DashboardIcon />}
          toggleDrawer={toggleDrawer(true)}
        />

        <SidebarLink
          label="My Info."
          link="/admin/user/edit"
          location={location}
          isSidebarOpened={isSidebarOpenedWrapper}
          icon={<ProfileIcon />}
          toggleDrawer={toggleDrawer(true)}
        />

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="사용자정보"
              link="/admin/users"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<PeopleAltIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }
        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="OCR 서류정보"
              link="/admin/doc_master"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<PlagiarismIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

            {/* <SidebarLink
            label="Doc extraction items"
            link="/admin/doc_extraction_items"
            location={location}
            isSidebarOpened={isSidebarOpenedWrapper}
            icon={<CoreIcon />}
            toggleDrawer={toggleDrawer(true)}
          /> */}


        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="질병코드정보"
              link="/admin/disease_cd"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<CoreIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="수술코드정보"
              link="/admin/operation_cd"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<CoreIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="수가코드정보"
              link="/admin/insurance_cd"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<CoreIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="Ocr Log Info."
              link="/admin/ocr_log"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<CoreIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label="Documentation"
              link="/documentation"
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<DocumentationIcon />}
              toggleDrawer={toggleDrawer(true)}
              children={[
                {
                  label: "Getting Started",
                  link: "/documentation/getting-started",
                  children: [
                    {
                      label: "Quick start",
                      link: "/documentation/getting-started/quick-start",
                      icon: <PlayArrowIcon/>
                    }
                  ]
                },
                {
                  label: "Components",
                  link: "/documentation/components",
                  children: [
                    {
                      label: "Typography",
                      link: "/documentation/components/typography"
                    },
                    {
                      label: "Header",
                      link: "/documentation/components/header"
                    },
                    {
                      label: "Sidebar",
                      link: "/documentation/components/sidebar"
                    },
                    {
                      label: "Buttons",
                      link: "/documentation/components/buttons"
                    },
                  ]
                },
              ]}
            />
          )
        }

        {
          user.userRole === 'admin' && (
            <SidebarLink
              label='API docs'
              link='/admin/api-docs'
              location={location}
              isSidebarOpened={isSidebarOpenedWrapper}
              icon={<DocumentationIcon />}
              toggleDrawer={toggleDrawer(true)}
            />
          )
        }

      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    let windowWidth = window.innerWidth;
    let breakpointWidth = theme.breakpoints.values.md;
    let isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
