import * as _ from 'lodash';

const getUserName = () => {
    const appName = process.env.HUE_APP_NAME;
    const deviceName = process.env.HUE_DEVICE_NAME;

    if (_.isUndefined(appName) || _.isUndefined(deviceName)) {
        console.log(
            'Please specify HUE_APP_NAME and HUE_DEVICE_NAME in the environment variables.',
        );
    }

    console.log(`App Name: ${appName}\nDevice Name: ${deviceName}`);
};

export { getUserName };
