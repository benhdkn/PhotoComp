// Numeric settings: each is a slider plus a number box (`<id>-slider`, `<id>-value`) kept in sync.

import { applyFrameAdjustment, updateCornerRadius, updateFrameBorders } from './comp.js';
import { updateInnerShadow, updateOuterShadow } from './shadows.js';
import { state } from './state.js';

// Grid settings, stored directly on `state`
const GRID_SETTINGS = [
    { key: 'outerBorderWidth', id: 'outer-border', min: 0, max: 30, update: () => updateFrameBorders() },
    { key: 'borderWidth', id: 'border', min: 0, max: 30, update: () => updateFrameBorders() },
    { key: 'cornerRadius', id: 'corner', min: 0, max: 50, update: updateCornerRadius },
    { key: 'shadowSize', id: 'shadow', min: 0, max: 20, update: updateOuterShadow },
    { key: 'innerShadowSize', id: 'inner-shadow', min: 0, max: 20, update: updateInnerShadow },
];

// Selected photo settings, stored on its frameAdjustments entry. Zoom is stored as a factor
// but shown in %, hence `scale`.
const PHOTO_SETTINGS = [
    { key: 'zoom', id: 'zoom', min: 100, max: 300, scale: 100 },
    { key: 'x', id: 'x', min: -50, max: 50 },
    { key: 'y', id: 'y', min: -50, max: 50 },
    { key: 'rotation', id: 'rotation', min: -180, max: 180 },
    { key: 'brightness', id: 'brightness', min: 0, max: 200 },
    { key: 'contrast', id: 'contrast', min: 0, max: 200 },
];

export function showSetting(id, value) {
    document.getElementById(`${id}-slider`).value = value;
    document.getElementById(`${id}-value`).value = value;
}

export function showPhotoSettings(adj) {
    PHOTO_SETTINGS.forEach(s => showSetting(s.id, Math.round(adj[s.key] * (s.scale ?? 1))));
}

// Calls onChange with the new value whenever either input changes; typed values are clamped
function bindSetting({ id, min, max }, onChange) {
    const slider = document.getElementById(`${id}-slider`);
    const number = document.getElementById(`${id}-value`);

    slider.addEventListener('input', () => {
        number.value = slider.value;
        onChange(Number(slider.value));
    });

    number.addEventListener('input', () => {
        const val = Math.min(max, Math.max(min, Number(number.value) || 0));
        slider.value = val;
        onChange(val);
    });
}

export function bindSettings() {
    GRID_SETTINGS.forEach(s => {
        // Start from the app's values, not whatever the browser restored into the inputs on reload
        showSetting(s.id, state[s.key]);
        bindSetting(s, value => {
            state[s.key] = value;
            s.update();
        });
    });

    PHOTO_SETTINGS.forEach(s => {
        bindSetting(s, value => {
            const i = state.selectedFrameIndex;
            if (i === null) return;
            state.frameAdjustments[i][s.key] = value / (s.scale ?? 1);
            applyFrameAdjustment(i);
        });
    });
}
