import { Box, Button, Typography, styled, Badge } from '@mui/material';

import { ShoppingCart } from '@mui/icons-material'
import { Link } from 'react-router-dom'

import { useContext, useState } from 'react';
import LoginDialog from '../login/LoginDialog';
import { useSelector } from 'react-redux';

import { LoginContext } from '../../context/ContextProvider';
import Profile from './Profile';

const Wrapper = styled(Box)(({ theme }) => ({
    margin: '0 3% 0 auto',
    display: 'flex',
    '& > *': {
        marginRight: '40px !important',
        fontSize: 16,
        alignItems: 'center',
    },
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const Container = styled(Link)(({ theme }) => ({
    display: 'flex',
    textDecoration: 'none',
    color: 'inherit',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));

const LoginButton = styled(Button)(({ theme }) => ({
    color: '#2874f0',
    marginLeft: 10,
    background: '#FFFFFF',
    textTransform: 'none',
    fontWeight: 600,
    borderRadius: 2,
    padding: '5px 40px',
    height: 32,
    boxShadow: 'none',
    [theme.breakpoints.down('sm')]: {
        background: '#2874f0',
        color: '#FFFFFF'
    }
}));


const CustomButtons = () => {
    const [open, setOpen] = useState(false);
    const { account, setAccount } = useContext(LoginContext);

    const cartDetails = useSelector(state => state.cart);
    const { cartItems } = cartDetails;
    const openDialog = () => {
        setOpen(true);
    }
    return (
        <Wrapper>
            {
                account ? <Profile account={account} setAccount={setAccount} /> :
                    <LoginButton variant='contained' onClick={() => openDialog()}>
                        login
                    </LoginButton>

            }
            <Typography style={{ marginTop: 3, width: 135 }}>Become a Seller</Typography>
            <Container to="/cart">
                <Typography style={{ marginTop: 3, marginRight: 30 }}>More</Typography>                <Badge badgeContent={cartItems?.length} color="secondary">
                    <ShoppingCart />
                </Badge>
                <Typography style={{ marginLeft: 6 }}>
                    Cart
                </Typography>
            </Container>
            <LoginDialog open={open} setOpen={setOpen} />
        </Wrapper>
    )
}

export default CustomButtons;
