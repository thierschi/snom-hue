import * as dotenv from 'dotenv';
import { startApi } from './api';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

startApi();
