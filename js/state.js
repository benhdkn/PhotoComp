// Shared app state and constants.

export const RESOLUTIONS = [
    { label: '1K', value: 1000 },
    { label: '2K', value: 2000 },
    { label: '3K', value: 3000 },
    { label: '4K', value: 4000 },
];

export const state = {
    currentPattern: null,     // working copy of the chosen layout (edge drags resize its frames)
    loadedImages: [],         // photo data URL per cell index
    frameAdjustments: {},     // zoom, position, rotation, brightness, contrast per cell index
    selectedFrameIndex: null,
    dragSourceIndex: null,    // cell whose photo is being dragged
    borderWidth: 5,
    outerBorderWidth: 5,
    cornerRadius: 0,
    shadowSize: 0,
    innerShadowSize: 0,
    outerShadowSides: { top: true, right: true, bottom: true, left: true },
    innerShadowSides: { top: true, right: true, bottom: true, left: true },
    exportResolution: 4000,
};

export const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/jpg'];

export function defaultAdjustment() {
    return { zoom: 1, x: 0, y: 0, rotation: 0, brightness: 100, contrast: 100 };
}
