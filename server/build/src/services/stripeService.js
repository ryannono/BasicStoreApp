"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line node/no-extraneous-require
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
exports.default = stripe;
//# sourceMappingURL=stripeService.js.map