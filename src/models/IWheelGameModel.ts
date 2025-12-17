export interface WheelPrize {
    label: string;
    color: number;
}

export interface WheelImages {
    inner          : string; // 中間可旋轉圓盤
    backgroundImg01: string; // 外圈背景01
    backgroundImg02: string; // 外圈背景02
    pointer?       : string;
}

export interface WheelSounds {
    tick?: string;
    end? : string;
}

export interface WheelConfig {
    prizes : WheelPrize[];
    images : WheelImages;
    sounds?: WheelSounds;
}
