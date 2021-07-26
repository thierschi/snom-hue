import * as dotenv from 'dotenv';
import * as hue from './service/hue-service';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

hue.getUserName();
