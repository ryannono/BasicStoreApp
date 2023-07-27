// eslint-disable-next-line node/no-extraneous-import
import {UserPayload} from '@prisma/client';

export type MutableUserPayload = Omit<
  UserPayload['scalars'],
  'createdAt' | 'updatedAt' | 'id' | 'stripeCustomerId'
>;

export type TokenUserPayload = Pick<
  UserPayload['scalars'],
  'id' | 'email' | 'firstName' | 'lastName'
>;

export type LoginUserPayload = Pick<MutableUserPayload, 'email' | 'password'>;
