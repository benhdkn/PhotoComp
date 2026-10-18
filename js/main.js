// Entry point: wires up the controls.

import { autoFitFrame, clearFrame, deselectAll } from './comp.js';
import { setPressed } from './dom.js';
import { saveToJpg } from './export.js';
import { onFileChange, replaceFrame } from './photos.js';
import { selectCount } from './picker.js';
import { bindSettings } from './settings.js';
import { updateShadowShapes } from './shadows.js';
import { RESOLUTIONS, state } from './state.js';

function init() {
    const countPicker = document.getElementById('count-picker');
    for (let n = 2; n <= 16; n++) {
        const btn = document.createElement('button');
        btn.className = 'count-btn';
        btn.setAttribute('aria-pressed', false);
        btn.textContent = n;
        btn.dataset.count = n;
        btn.addEventListener('click', () => selectCount(n));
        countPicker.appendChild(btn);
    }

    const resPicker = document.getElementById('res-picker');
    RESOLUTIONS.forEach(res => {
        const btn = document.createElement('button');
        btn.className = 'res-btn';
        setPressed(btn, res.value === state.exportResolution);
        btn.textContent = res.label;
        btn.addEventListener('click', () => {
            state.exportResolution = res.value;
            document.querySelectorAll('.res-btn').forEach(b => setPressed(b, b === btn));
        });
        resPicker.appendChild(btn);
    });

    const fileInput = document.getElementById('file');
    fileInput.addEventListener('change', onFileChange);
    document.getElementById('file-label').addEventListener('click', () => fileInput.click());
    document.getElementById('save').addEventListener('click', saveToJpg);
    document.addEventListener('click', deselectAll);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') deselectAll();
    });

    bindSettings();

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

    [['outer-shadow-sides', state.outerShadowSides], ['inner-shadow-sides', state.innerShadowSides]].forEach(([id, sides]) => {
        document.getElementById(id).addEventListener('click', e => {
            const btn = e.target.closest('.side-btn');
            if (!btn) return;
            sides[btn.dataset.side] = !sides[btn.dataset.side];
            setPressed(btn, sides[btn.dataset.side]);
            updateShadowShapes();
        });
    });
}

init();
