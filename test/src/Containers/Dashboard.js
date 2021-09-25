import React from 'react';
import { Link } from 'react-router-dom'
import { PrivateRoute } from '../Containers/PrivateRoute'
import { useSelector } from 'react-redux';
import RegistrationForm from '../Pages/RegistrationUsers/RegistrationForm';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Card, Drawer, List, CssBaseline, Typography, Divider, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import clsx from 'clsx';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    
    display: 'flex',
    backgroundSize: "inherit",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" ,
  },

  appBar: {
    backgroundColor:'#ffff',
    overflow: "hidden" ,
    zIndex: theme.zIndex.drawer + 1,

    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),

    backgroundSize: "inherit", 
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" 
  },
  appBarShift: {
   
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    
  },
  drawerOpen: {
    backgroundColor:'#ffff',
    width: drawerWidth,
    overflowY:'hidden',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
 
  },
  title: {
    flexGrow: 1,
    
    
  },
  title2: {
    flexGrow: 1,
    textAlign:'center',
    
  },
  drawerClose: {
    backgroundColor:'#ffff',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    overflowX: 'hidden',
    alignItems: 'center',
    backgroundColor:'#ffff',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  toolbar2: {
    display: 'flex',
    overflowX: 'hidden',
    alignItems: 'center',
    backgroundColor:'#ffff',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  
  SideBarWords:{
 
  },
  SidebarColor:{
    
    backgroundColor:'#ffff',
    backgroundSize: "inherit",    
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right" ,
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(0),
    backgroundColor: '#ffff',
    
    backgroundSize: "inherit",    
    backgroundRepeat: "repeat",
    backgroundPosition: "right" ,
    
  },
}));


const routes = [

  {
    path: '/dashboard/table',
    main: () => <RegistrationForm />,
  },
]

function Dashboard(props) {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const test = useSelector(state => state.login.userData.lifetime);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  function Logout() {
    sessionStorage.removeItem('test')
    props.history.push("/login");
  }

  if (!test) {
    return <Link to="/login">Please log in</Link>;
  }

  return (
    <div className={classes.root} >
      <CssBaseline />
      <Drawer   variant="permanent" className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })} classes={{ paper: clsx({ [classes.drawerOpen]: open, [classes.drawerClose]: !open, }), }}>
        <div className={classes.toolbar2}>
        <Typography variant="h6" noWrap className={classes.title2}>
            {'Test Product Panel'}
           
          </Typography>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" className={clsx(classes.menuButton, { [classes.hide]: open, })}>
            <ChevronRightIcon />
          </IconButton>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
    
          <List className={classes.SidebarColor}>
            <ListItem button onClick={() => props.history.push('/dashboard/table')}  >
              <ListItemIcon><AssignmentOutlinedIcon />
              </ListItemIcon>
              <ListItemText className={classes.SideBarWords} primary={'Product Table'} />
            </ListItem>
          </List>

        <Divider />
        <List className={classes.SidebarColor}>
        
          <ListItem onClick={Logout} >
            <ListItemIcon><ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} style={{cursor:'pointer'}} />
          </ListItem>
        </List>
      
      </Drawer>
      <main className={classes.content} style={{ overflow: 'hidden', }}>
       
        <Card >
          {routes.map((route, index) => (
            <PrivateRoute key={index} path={route.path} exact={route.exact} component={route.main} />
          ))}
        </Card>
      </main>
  
    </div >
  );
}

export { Dashboard };
