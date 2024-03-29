import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
import { useAppSelector } from "../store/configureStore";
import { useState, useEffect } from "react";

const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'Error', path: '/about' },
    { title: 'contact', path: '/contact' },
]

const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' }
]

const navStyles = {
    color: 'inherit',
    typography: 'h6',
    textDecoration: 'none',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}

interface Props {
    darkMode: boolean;
    handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
    const {basket} = useAppSelector(state => state.basket);
    const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);

    const [loginStatus, setLoginStatus] = useState(localStorage.getItem('loginstatus'));

    useEffect(() => {
        const timer = setInterval(() => {
        const currentStatus = localStorage.getItem('loginstatus');
        
        if (currentStatus !== loginStatus) {
            setLoginStatus(currentStatus);
        }
        }, 1000); // Checks every second

        // Clean up interval on unmount
        return () => clearInterval(timer);
    }, [loginStatus]);

    const handleLogout = () => {
        // Set 'loginstatus' property to 'false'.
        localStorage.loginstatus = 'false';
        console.log(localStorage.loginstatus);
        // Also update the state.
        setLoginStatus('false');
    }

    const currentRightLinks = loginStatus === 'true' ? [{ title: 'logout', path: '/login' }] : rightLinks;
    
    return (
        <AppBar position='static' sx={{ mb: 4 }}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant='h6'
                        component={NavLink}
                        to='/'
                        sx={navStyles}>
                        React Online Store
                    </Typography>
                </Box>
                {loginStatus === 'true' ?(
                <Box>
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                ) : <></>}
                <Box display='flex' alignItems='center'>
                    {loginStatus === 'true' ?(
                        <IconButton component={Link} to='/basket' size='large' edge='start' color='inherit' sx={{ mr: 2 }}>
                            <Badge badgeContent={itemCount} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    ) : <></>}
                    

                    <List sx={{ display: 'flex' }}>
                        {currentRightLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles}
                                onClick={title === 'logout' ? handleLogout : undefined}
                            >
                                {title.toUpperCase()}
                            </ListItem>

                        ))}
                    </List>
                </Box>

            </Toolbar>
        </AppBar>
    )
}