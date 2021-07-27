/**
 * Interface that represents state of a light
 *
 * See https://developers.meethue.com/develop/hue-api
 * for further info.
 */
export interface ILightState {
    on?: boolean;
    bri?: number;
    hue?: number;
    sat?: number;
    xy?: [number, number];
    ct?: number;
    alert?: 'none' | 'select' | 'lselect';
    effect?: 'none' | 'colorloop';
    transitiontime?: number;
    bri_inc?: number;
    sat_inc?: number;
    hue_inc?: number;
    ct_inc?: number;
    xy_inc?: [number, number];
}
