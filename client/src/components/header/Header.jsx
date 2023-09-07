import { useState } from 'react';
import { AppBar, Toolbar, Box, styled, Typography, IconButton, Drawer, List } from '@mui/material';
import { Menu } from '@mui/icons-material';

import Search from './Search';
import CustomButtons from './CustomButtons';
import { Link } from 'react-router-dom'
const StyledHeader = styled(AppBar)`
    background: #2874f0;
    height: 55px;
`;

const Component = styled(Link)`
    margin-left:12%;
    line-height:0;
    color: #FFFFFF;
    text-decoration: none;
`

const SubHeading = styled(Typography)`
    font-size: 12px;
    font-style: italic;
`

const PlusImage = styled('img')({
    width: 10,
    height: 10,
    marginLeft: 4
})

const MenuButton = styled(IconButton)(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block'
    }
}));


const CustomButtonWrapper = styled('span')(({ theme }) => ({
    margin: '0 5% 0 auto',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}));

const Header = () => {
    const logoURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/flipkart-plus_8d85f4.png';
    const subURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/plus_aef861.png';

    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false);
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const list = () => (
        <Box style={{ width: 250 }} onClick={handleClose}>
            <List>
                <listItem button>
                    <CustomButtons />
                </listItem>
            </List>
        </Box>
    );
    return (
        <div>
            <StyledHeader>
                <Toolbar style={{ minHeight: 55 }}>
                    <MenuButton>
                        <Menu color="inherit"
                            onClick={handleOpen} />
                    </MenuButton>
                    <Drawer open={open} onClick={handleClose}>{list()}</Drawer>
                    <Component to='/'>
                        {/* <Heading>Shopkart</Heading> */}
                        <img src={logoURL} alt='logo' style={{ width: 75 }} />
                        <Box style={{ display: 'flex' }}>
                            <SubHeading>Explore&nbsp;
                                <Box component="span" style={{ color: '#FFE500' }}>
                                    Plus
                                </Box>
                            </SubHeading>
                            <PlusImage src={subURL} />
                        </Box>
                    </Component>
                    <Search />
                    <CustomButtonWrapper>

                        <CustomButtons />
                    </CustomButtonWrapper>
                </Toolbar>
            </StyledHeader>
        </div>
    )
}

export default Header


