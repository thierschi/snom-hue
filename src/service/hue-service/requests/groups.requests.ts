import axios, { AxiosRequestConfig } from 'axios';
import { getUserName } from '../services/username/username.service';
import { LightState } from '../states/light-state.builder';

const getGroups = async () => {
    const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `http://${
            process.env.HUE_BRIDGE_IP
        }/api/${await getUserName()}/groups`,
    };

    const groups = (await axios(requestConfig)).data;

    return groups;
};

const getGroupByName = async (
    name: string,
): Promise<[number | string | symbol, any]> => {
    const groups = await getGroups();

    const groupIds = Object.keys(groups);

    for (const id of groupIds) {
        if (groups[id].name == name) {
            return [id, groups[id]];
        }
    }

    return [0, undefined];
};

const setGroupState = async (
    groupId: string | number | symbol,
    state: LightState,
) => {
    const requestConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: `http://${
            process.env.HUE_BRIDGE_IP
        }/api/${await getUserName()}/groups/${String(groupId)}/action`,
        data: state.state,
    };

    axios(requestConfig);
};

export { getGroups, getGroupByName, setGroupState };
