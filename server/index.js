import express from "express";
import Connection from "./database/db.js";
import DefaultData from "./default.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import Router from "./routes/route.js";
import cors from "cors";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51NdCsOSJnXaMpyMKSd6T7EiVZtIj6ywQEpdJ5hoED1R2bIRcDMUe4q7Ic3FIJm3iaBgsid7S0b2aieAD1AjPINv900HImyMdLi",
  {
    apiVersion: "2023-08-16",
  }
);

const app = express();

dotenv.config();

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", Router);
const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

DefaultData();

app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price: "price_1NnYvJSJnXaMpyMKoWXl7AV6",
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: "http://localhost:3000/",
    cancel_url: "http://localhost:3000/",
  });

  res.json({ id: session.id });
});
