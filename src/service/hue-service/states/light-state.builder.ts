import _ from 'lodash';
import { ILightState } from '../model/light-state.types';

class LightState {
    private internalState: ILightState = {};

    public constructor(obj?: any) {
        if (_.isUndefined(obj)) {
            return;
        }

        if ('on' in obj && _.isBoolean(obj.on)) {
            this.state.on = obj.on;
        }

        if ('bri' in obj && _.isNumber(obj.bri)) {
            this.state.bri = obj.bri;
        }

        if ('hue' in obj && _.isNumber(obj.hue)) {
            this.state.hue = obj.hue;
        }

        if ('sat' in obj && _.isNumber(obj.sat)) {
            this.state.sat = obj.sat;
        }

        if (
            'xy' in obj &&
            Array.isArray(obj.xy) &&
            obj.xy.length === 2 &&
            _.isNumber(obj.xy[0]) &&
            _.isNumber(obj.xy[1])
        ) {
            this.state.xy = obj.xy;
        }

        if ('ct' in obj && _.isNumber(obj.ct)) {
            this.state.ct = obj.ct;
        }

        if (
            'alert' in obj &&
            _.isString(obj.alert) &&
            ['none', 'select', 'lselect'].indexOf(obj.alert) > -1
        ) {
            this.state.alert = obj.alert;
        }

        if (
            'effect' in obj &&
            _.isString(obj.effect) &&
            ['none', 'colorloop'].indexOf(obj.effect) > -1
        ) {
            this.state.effect = obj.effect;
        }

        if ('transitiontime' in obj && _.isNumber(obj.transitiontime)) {
            this.state.transitiontime = obj.transitiontime;
        }
        if ('bri_inc' in obj && _.isNumber(obj.bri_inc)) {
            this.state.bri_inc = obj.bri_inc;
        }
        if ('sat_inc' in obj && _.isNumber(obj.sat_inc)) {
            this.state.sat_inc = obj.sat_inc;
        }
        if ('hue_inc' in obj && _.isNumber(obj.hue_inc)) {
            this.state.hue_inc = obj.hue_inc;
        }
        if ('ct_inc' in obj && _.isNumber(obj.ct_inc)) {
            this.state.ct_inc = obj.ct_inc;
        }

        if (
            'xy_inc' in obj &&
            Array.isArray(obj.xy_inc) &&
            obj.xy_inc.length === 2 &&
            _.isNumber(obj.xy_inc[0]) &&
            _.isNumber(obj.xy_inc[1])
        ) {
            this.state.xy_inc = obj.xy_inc;
        }
    }

    public get state() {
        return this.internalState;
    }

    public on = (on = true): LightState => {
        this.internalState.on = on;
        return this;
    };

    public brightness = (brightnessValue: number): LightState => {
        const flooredBrightnessValue = Math.floor(brightnessValue);

        this.state.bri =
            flooredBrightnessValue < 1
                ? 1
                : flooredBrightnessValue > 254
                ? 254
                : flooredBrightnessValue;

        return this;
    };

    public hue = (hueValue: number): LightState => {
        const flooredHueValue = Math.floor(hueValue);

        this.state.hue =
            flooredHueValue < 0
                ? 0
                : flooredHueValue > 65535
                ? 65535
                : flooredHueValue;

        return this;
    };

    public saturation = (saturationValue: number): LightState => {
        const flooredSaturationValue = Math.floor(saturationValue);

        this.state.sat =
            flooredSaturationValue < 0
                ? 0
                : flooredSaturationValue > 254
                ? 254
                : flooredSaturationValue;

        return this;
    };

    public xy = (x: number, y: number): LightState => {
        this.state.xy = [x < 0 ? 0 : x > 1 ? 1 : x, y < 0 ? 0 : y > 1 ? 1 : y];

        return this;
    };

    public colorTemperature = (colorTemperatureValue: number): LightState => {
        const flooredColorTemperatureValue = Math.floor(colorTemperatureValue);

        this.state.ct = flooredColorTemperatureValue;

        return this;
    };

    public alert = (alertValue: 'none' | 'select' | 'lselect'): LightState => {
        this.state.alert = alertValue;

        return this;
    };

    public effect = (effectValue: 'none' | 'colorloop'): LightState => {
        this.state.effect = effectValue;

        return this;
    };

    public transitionTime = (transitionTimeValue: number): LightState => {
        this.state.transitiontime = transitionTimeValue;

        return this;
    };

    public brightnessIncrease = (
        brightnessIncreaseValue: number,
    ): LightState => {
        const flooredBrightnessIncreaseValue = Math.floor(
            brightnessIncreaseValue,
        );

        this.state.bri_inc =
            flooredBrightnessIncreaseValue < -254
                ? -254
                : flooredBrightnessIncreaseValue > 254
                ? 254
                : flooredBrightnessIncreaseValue;

        return this;
    };

    public saturationIncrease = (
        saturationIncreaseValue: number,
    ): LightState => {
        const flooredSaturationIncreaseValue = Math.floor(
            saturationIncreaseValue,
        );

        this.state.sat_inc =
            flooredSaturationIncreaseValue < -254
                ? -254
                : flooredSaturationIncreaseValue > 254
                ? 254
                : flooredSaturationIncreaseValue;

        return this;
    };

    public hueIncrease = (hueIncreaseValue: number): LightState => {
        const flooredHueIncreaseValue = Math.floor(hueIncreaseValue);

        this.state.hue_inc =
            flooredHueIncreaseValue < -65534
                ? -65534
                : flooredHueIncreaseValue > 65534
                ? 65534
                : flooredHueIncreaseValue;

        return this;
    };

    public xyIncrease = (
        xIncreaseValue: number,
        yIncreaseValue: number,
    ): LightState => {
        this.state.xy_inc = [
            xIncreaseValue < -1 ? -1 : xIncreaseValue > 1 ? 1 : xIncreaseValue,
            yIncreaseValue < -1 ? -1 : yIncreaseValue > 1 ? 1 : yIncreaseValue,
        ];

        return this;
    };
}

export { LightState };
