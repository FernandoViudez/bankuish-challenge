import { FirebaseAuthConfig } from '../type/firebase-auth.config';

export const environment = {
  env: process.env.ENV,
  port: Number(process.env.PORT) || 3000,
  db: {
    type: (process.env.DB_TYPE || 'mysql') as any,
    name: process.env.DB_NAME || 'bankuish_challenge',
    port: Number(process.env.DB_PORT) || 3306,
    host: process.env.DB_HOST,
    user: {
      name: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASSWORD,
    },
  },
  firebaseAuthConfig: JSON.parse(
    process.env.FIREBASE_AUTH_ADMIN_CONFIG || '{}',
  ) as FirebaseAuthConfig,
};
Object.freeze(environment);
