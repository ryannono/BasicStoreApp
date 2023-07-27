// eslint-disable-next-line node/no-extraneous-require
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY!);

export default stripe;
