import axios from 'axios';
console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
if (process.env.NODE_ENV === 'production') {
    require('dotenv').config({ path: '.env' });
} else {
    require('dotenv').config({ path: '.env.development' });
}
console.log(process.env.NEXT_PUBLIC_AIP_URL);
export const instance = axios.create({
    // baseURL: 'https://simpleruns-backend.vercel.app/api',
    // baseURL: 'http://170.64.154.214/api',
    // baseUrl: process.env.BACKEND_SERVER_URL,
    baseURL: process.env.NEXT_PUBLIC_AIP_URL,
    // baseURL: 'http://localhost:8000/api',
    timeout: 50000,
    headers: { 'Access-Control-Allow-Origin': '*' }
});