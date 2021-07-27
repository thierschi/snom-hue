import express from 'express';
import _ from 'lodash';
import {
    getGroupByName,
    setGroupState,
} from '../service/hue-service/requests/groups.requests';
import { LightState } from '../service/hue-service/states/light-state.builder';

const startApi = () => {
    const app = express();

    app.get('/toggleLight', (req, res) => {
        if (_.isUndefined(req.query.group)) {
            res.status(400).send();
            return;
        }

        const groupName = String(req.query.group);

        getGroupByName(groupName).then(([id, group]) => {
            const on = group.state.any_on;

            const newState = new LightState().on(!on);

            setGroupState(id, newState);

            res.status(200).send();
        });
    });

    app.get('/call', (req, res) => {
        if (_.isUndefined(req.query.group) || _.isUndefined(req.query.type)) {
            res.status(400).send();
            return;
        }

        const groupName = String(req.query.group);
        const type = String(req.query.type);

        if (type !== 'incoming') {
            res.status(418).send();
        }

        getGroupByName(groupName).then(async ([id, group]) => {
            const oldState = new LightState(group.action);

            const newState = new LightState().alert('lselect').hue(21845);

            setGroupState(id, newState);

            setTimeout(() => {
                setGroupState(id, oldState.alert('none').effect('none'));
                res.status(200).send();
            }, 5000);
        });
    });

    app.get('/dnd', (req, res) => {
        if (_.isUndefined(req.query.group) || _.isUndefined(req.query.on)) {
            res.status(400).send();
            return;
        }

        const groupName = String(req.query.group);
        const on = String(req.query.on) === 'true';

        getGroupByName(groupName).then(async ([id, group]) => {
            const oldState = new LightState(group.action);

            const newState = new LightState().hue(on ? 0 : 21845);

            await setGroupState(id, newState);
            //await setGroupState(id, newState.alert('select'));

            setTimeout(() => {
                setGroupState(id, oldState.alert('none').effect('none'));
                res.status(200).send();
            }, 1000);
        });
    });

    app.listen(3000);
};

export { startApi };
