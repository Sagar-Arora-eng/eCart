import { useEffect } from "react";
import NavBar from "./NavBar";
import Banner from "./Banner";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";


import { Box, styled } from '@mui/material';
import { getProducts } from "../../redux/actions/productActions";
import { useDispatch, useSelector } from 'react-redux';

const Component = styled(Box)`
    padding: 20px 10px;
    background: #F2F2F2;
    overflow: hidden;
`;

const Home = () => {

    const { products } = useSelector(state => state.getProducts);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <NavBar />
            <Component>
                <Banner />
                <MidSlide products={products} />
                <MidSection />
                <Slide
                    products={products}
                    title='Discounts for You'
                    timer={false}
                    multi={true}
                />
                <Slide
                    products={products}
                    title='Suggested Items'
                    timer={false}
                    multi={true}
                />
                <Slide
                    products={products}
                    title='Top Selection'
                    timer={false}
                    multi={true}
                />
                <Slide
                    products={products}
                    title='Recommended Items'
                    timer={false}
                    multi={true}
                />
            </Component>
        </>
    )
}

export default Home;