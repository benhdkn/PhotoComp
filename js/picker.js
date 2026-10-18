// Photo count and layout pickers.

import { applyPattern } from './comp.js';
import { GRID_PATTERNS } from './patterns.js';
import { state } from './state.js';

const THUMB_W = 60;
const THUMB_H = 60;

export function selectCount(n) {
    document.querySelectorAll('.count-btn').forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.count) === n);
    });
    renderPatternPicker(n);
    document.getElementById('pattern-section').classList.add('visible');
}

function renderPatternPicker(count) {
    const list = document.getElementById('pattern-list');
    list.innerHTML = '';
    state.currentPattern = null;

    GRID_PATTERNS[count].forEach(pattern => {
        const thumb = document.createElement('div');
        thumb.className = 'pattern-thumb';
        thumb.dataset.patternId = pattern.id;

        thumb.appendChild(createPatternSvg(pattern.frames));

        const label = document.createElement('span');
        label.textContent = pattern.name;
        thumb.appendChild(label);

        thumb.addEventListener('click', () => selectPattern(count, pattern.id));
        list.appendChild(thumb);
    });
}

export function selectPattern(count, patternId) {
    // Work on a copy so dragging cell edges never alters the preset
    const preset = GRID_PATTERNS[count].find(p => p.id === patternId);
    state.currentPattern = { ...preset, frames: preset.frames.map(f => ({ ...f })) };

    document.querySelectorAll('.pattern-thumb').forEach(thumb => {
        thumb.classList.toggle('active', thumb.dataset.patternId === patternId);
    });

    applyPattern(state.currentPattern);
}

function createPatternSvg(frames) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('width', THUMB_W);
    svg.setAttribute('height', THUMB_H);
    svg.setAttribute('viewBox', '0 0 500 500');

    const bg = document.createElementNS(ns, 'rect');
    bg.setAttribute('width', '500');
    bg.setAttribute('height', '500');
    bg.setAttribute('fill', '#3a3a3c');
    svg.appendChild(bg);

    frames.forEach(f => {
        const rect = document.createElementNS(ns, 'rect');
        rect.setAttribute('x', f.left / 100 * 500);
        rect.setAttribute('y', f.top / 100 * 500);
        rect.setAttribute('width', f.width / 100 * 500);
        rect.setAttribute('height', f.height / 100 * 500);
        rect.setAttribute('fill', '#6e6e73');
        rect.setAttribute('stroke', '#1c1c1e');
        rect.setAttribute('stroke-width', '12');
        svg.appendChild(rect);
    });

    return svg;
}
