const isDevelopment = process.env.NODE_ENV === 'development';

export const BACKEND_URL = isDevelopment ? 'http://localhost:4000' : 'https://bc-videochat-root-peer.herokuapp.com'