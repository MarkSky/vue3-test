export interface WheelPrize {
    label: string;
    color: number;
}

export interface WheelImages {
    inner          : string; // 中間可旋轉圓盤
    backgroundImg01: string; // 外圈背景01
    backgroundImg02: string; // 外圈背景02
    pointer?       : string; // 指針圖片
    pointerFrame1? : string;
    pointerFrame2? : string;
    treasure       : string;  // 中獎寶箱
}

export interface WheelSounds {
    tick?: string;
    end? : string;
}

export type AlignMode = 'natural' | 'snap12';

export interface WheelConfig {
    prizes    : WheelPrize[];
    images    : WheelImages;
    sounds?   : WheelSounds;
    alignMode?: AlignMode; // ⭐ 新增
}
