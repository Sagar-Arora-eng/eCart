import { useState } from "react";
import { Button, Box, styled } from "@mui/material";
import { ShoppingCart as Cart, FlashOn as Flash } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { addToCart } from "../../redux/actions/cartActions";
import { useDispatch } from "react-redux";

const LeftContainer = styled(Box)(({ theme }) => ({
  minWidth: "40%",
  padding: "40px 20px 0 80px",
  [theme.breakpoints.down("lg")]: {
    padding: "20px 40px",
  },
}));

const Image = styled("img")({
  width: "90%",
  padding: "15px",
});

const StyledButton = styled(Button)(({ theme }) => ({
  width: "48%",
  borderRadius: 2,
  height: 50,
  [theme.breakpoints.down("lg")]: {
    width: "46%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "48%",
  },
}));

const ActionItem = ({ product }) => {
  const navigate = useNavigate();
  const { id } = product;
  const [quantity] = useState(1);
  const dispatch = useDispatch();

  const stripePromise = loadStripe(
    "pk_test_51NdCsOSJnXaMpyMKI9btV8qL2hgztGgpCKSPu525a2JBmQekdh15CkSNBqM9s4OuLdkMXedwUf9QNHtcLL6TWrxJ00hDPboTZx"
  );
  const buyNow = async () => {
    const stripe = await stripePromise;
    const response = await fetch(
      "http://localhost:8000/create-checkout-session",
      {
        method: "POST",
      }
    );
    const session = await response.json();
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.error(result.error);
    }
  };

  const addItemToCart = () => {
    dispatch(addToCart(id, quantity));
    navigate("/cart");
  };

  return (
    <LeftContainer>
      <Box
        style={{
          padding: "15px 20px",
          border: "1px solid #f0f0f0",
          width: "90%",
        }}
      >
        <Image src={product.detailUrl} alt="detailurl" />
        <br />
        <StyledButton
          onClick={() => addItemToCart()}
          style={{ marginRight: 10, background: "#ff9f00" }}
          variant="contained"
        >
          <Cart />
          Add to Cart
        </StyledButton>
        <StyledButton
          style={{ background: "#f b641b" }}
          onClick={() => buyNow()}
          variant="contained"
        >
          <Flash /> Buy Now
        </StyledButton>
      </Box>
    </LeftContainer>
  );
};

export default ActionItem;
