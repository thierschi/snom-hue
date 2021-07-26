import axios, { AxiosRequestConfig } from 'axios';
import * as _ from 'lodash';
import storage from 'node-persist';

const getUserName = async () => {
    await storage.init();

    const username = await storage.getItem('username');

    if (!_.isUndefined(username)) {
        return username;
    }

    const appName = process.env.HUE_APP_NAME;
    const deviceName = process.env.HUE_DEVICE_NAME;

    if (_.isUndefined(appName) || _.isUndefined(deviceName)) {
        throw new Error(`The following environment variables need to be set in order to proceed:
			- HUE_APP_NAME
			- HUE_DEVICE_NAME
		`);
    }

    const requestBody: Record<string, string> = {
        devicetype: `${appName}#${deviceName}`,
    };

    const requestConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'http://192.168.178.56/api',
        data: requestBody,
    };

    const res = await axios(requestConfig);

    if ('success' in res.data[0] && 'username' in res.data[0].success) {
        const username = res.data[0].success.username;

        await storage.setItem('username', username);

        return username;
    }

    const error = res.data[0].error;

    if (error.description === 'link button not pressed') {
        console.log(
            'Please press the link button on your bridge and restart the script.',
        );
        process.exit();
    }
};

export { getUserName };
