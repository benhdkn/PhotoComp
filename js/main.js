// Entry point: wires up the controls.

import { applyFrameAdjustment, autoFitFrame, clearFrame, deselectAll, updateCornerRadius, updateFrameBorders } from './comp.js';
import { saveToJpg } from './export.js';
import { onFileChange, replaceFrame } from './photos.js';
import { selectCount } from './picker.js';
import { updateInnerShadow, updateOuterShadow, updateShadowShapes } from './shadows.js';
import { RESOLUTIONS, state } from './state.js';

function init() {
    const countPicker = document.getElementById('count-picker');
    for (let n = 2; n <= 16; n++) {
        const btn = document.createElement('button');
        btn.className = 'count-btn';
        btn.textContent = n;
        btn.dataset.count = n;
        btn.addEventListener('click', () => selectCount(n));
        countPicker.appendChild(btn);
    }

    const resPicker = document.getElementById('res-picker');
    RESOLUTIONS.forEach(res => {
        const btn = document.createElement('button');
        btn.className = 'res-btn' + (res.value === state.exportResolution ? ' active' : '');
        btn.textContent = res.label;
        btn.addEventListener('click', () => {
            state.exportResolution = res.value;
            document.querySelectorAll('.res-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
        resPicker.appendChild(btn);
    });

    document.getElementById('file').addEventListener('change', onFileChange);
    document.getElementById('save').addEventListener('click', saveToJpg);
    document.addEventListener('click', deselectAll);

    document.getElementById('zoom-slider').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        state.frameAdjustments[state.selectedFrameIndex].zoom = Number(this.value) / 100;
        document.getElementById('zoom-value').value = this.value;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    document.getElementById('zoom-value').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        const val = Math.min(300, Math.max(100, Number(this.value) || 100));
        state.frameAdjustments[state.selectedFrameIndex].zoom = val / 100;
        document.getElementById('zoom-slider').value = val;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    document.getElementById('x-slider').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        state.frameAdjustments[state.selectedFrameIndex].x = Number(this.value);
        document.getElementById('x-value').value = this.value;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    document.getElementById('x-value').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        const val = Math.min(50, Math.max(-50, Number(this.value) || 0));
        state.frameAdjustments[state.selectedFrameIndex].x = val;
        document.getElementById('x-slider').value = val;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    document.getElementById('y-slider').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        state.frameAdjustments[state.selectedFrameIndex].y = Number(this.value);
        document.getElementById('y-value').value = this.value;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    document.getElementById('y-value').addEventListener('input', function () {
        if (state.selectedFrameIndex === null) return;
        const val = Math.min(50, Math.max(-50, Number(this.value) || 0));
        state.frameAdjustments[state.selectedFrameIndex].y = val;
        document.getElementById('y-slider').value = val;
        applyFrameAdjustment(state.selectedFrameIndex);
    });

    // Rotation (degrees), brightness and contrast (%): slider and number box kept in sync
    [['rotation', -180, 180], ['brightness', 0, 200], ['contrast', 0, 200]].forEach(([key, min, max]) => {
        const slider = document.getElementById(`${key}-slider`);
        const number = document.getElementById(`${key}-value`);

        slider.addEventListener('input', function () {
            if (state.selectedFrameIndex === null) return;
            state.frameAdjustments[state.selectedFrameIndex][key] = Number(this.value);
            number.value = this.value;
            applyFrameAdjustment(state.selectedFrameIndex);
        });

        number.addEventListener('input', function () {
            if (state.selectedFrameIndex === null) return;
            const val = Math.min(max, Math.max(min, Number(this.value) || 0));
            state.frameAdjustments[state.selectedFrameIndex][key] = val;
            slider.value = val;
            applyFrameAdjustment(state.selectedFrameIndex);
        });
    });

    document.getElementById('fit-btn').addEventListener('click', () => {
        if (state.selectedFrameIndex !== null) autoFitFrame(state.selectedFrameIndex);
    });

    document.getElementById('replace-btn').addEventListener('click', () => {
        if (state.selectedFrameIndex !== null) replaceFrame(state.selectedFrameIndex);
    });

    document.getElementById('clear-btn').addEventListener('click', () => {
        if (state.selectedFrameIndex !== null) clearFrame(state.selectedFrameIndex);
    });

    document.getElementById('frame-settings').addEventListener('click', e => e.stopPropagation());

    document.getElementById('border-slider').addEventListener('input', function () {
        state.borderWidth = Number(this.value);
        document.getElementById('border-value').value = state.borderWidth;
        updateFrameBorders();
    });

    document.getElementById('border-value').addEventListener('input', function () {
        state.borderWidth = Math.min(30, Math.max(0, Number(this.value) || 0));
        document.getElementById('border-slider').value = state.borderWidth;
        updateFrameBorders();
    });

    document.getElementById('outer-border-slider').addEventListener('input', function () {
        state.outerBorderWidth = Number(this.value);
        document.getElementById('outer-border-value').value = state.outerBorderWidth;
        updateFrameBorders();
    });

    document.getElementById('outer-border-value').addEventListener('input', function () {
        state.outerBorderWidth = Math.min(30, Math.max(0, Number(this.value) || 0));
        document.getElementById('outer-border-slider').value = state.outerBorderWidth;
        updateFrameBorders();
    });

    document.getElementById('corner-slider').addEventListener('input', function () {
        state.cornerRadius = Number(this.value);
        document.getElementById('corner-value').value = state.cornerRadius;
        updateCornerRadius();
    });

    document.getElementById('corner-value').addEventListener('input', function () {
        state.cornerRadius = Math.min(50, Math.max(0, Number(this.value) || 0));
        document.getElementById('corner-slider').value = state.cornerRadius;
        updateCornerRadius();
    });

    document.getElementById('shadow-slider').addEventListener('input', function () {
        state.shadowSize = Number(this.value);
        document.getElementById('shadow-value').value = state.shadowSize;
        updateOuterShadow();
    });

    document.getElementById('shadow-value').addEventListener('input', function () {
        state.shadowSize = Math.min(20, Math.max(0, Number(this.value) || 0));
        document.getElementById('shadow-slider').value = state.shadowSize;
        updateOuterShadow();
    });

    document.getElementById('inner-shadow-slider').addEventListener('input', function () {
        state.innerShadowSize = Number(this.value);
        document.getElementById('inner-shadow-value').value = state.innerShadowSize;
        updateInnerShadow();
    });

    document.getElementById('inner-shadow-value').addEventListener('input', function () {
        state.innerShadowSize = Math.min(20, Math.max(0, Number(this.value) || 0));
        document.getElementById('inner-shadow-slider').value = state.innerShadowSize;
        updateInnerShadow();
    });

    [['outer-shadow-sides', state.outerShadowSides], ['inner-shadow-sides', state.innerShadowSides]].forEach(([id, sides]) => {
        document.getElementById(id).addEventListener('click', e => {
            const btn = e.target.closest('.side-btn');
            if (!btn) return;
            sides[btn.dataset.side] = !sides[btn.dataset.side];
            btn.classList.toggle('active', sides[btn.dataset.side]);
            updateShadowShapes();
        });
    });
}

init();
