// The on-screen comp: cells, photos and their adjustments, selection.

import { renderEdgeHandles } from './edges.js';
import { showPhotoSettings, showSetting } from './settings.js';
import { INNER_SHADOW_HTML, updateShadowShapes } from './shadows.js';
import { defaultAdjustment, state } from './state.js';

export function applyPattern(pattern) {
    const composition = document.getElementById('composition');
    composition.innerHTML = '';
    state.frameAdjustments = {};
    deselectAll();

    pattern.frames.forEach((f, i) => {
        state.frameAdjustments[i] = defaultAdjustment();

        const frame = document.createElement('div');
        frame.className = 'frame';
        frame.id = `frame-${i}`;
        positionFrame(frame, f);

        const shadow = document.createElement('div');
        shadow.className = 'outer-shadow';
        frame.appendChild(shadow);

        const inner = document.createElement('div');
        inner.className = 'frame-inner';
        const image = document.createElement('div');
        image.className = 'frame-image';
        inner.appendChild(image);
        inner.insertAdjacentHTML('beforeend', INNER_SHADOW_HTML);
        frame.appendChild(inner);

        frame.addEventListener('click', (e) => {
            e.stopPropagation();
            const isSelected = frame.classList.contains('selected');
            deselectAll();
            if (!isSelected) selectFrame(i);
        });

        // Keyboard: Tab to a cell, Enter or Space to select it
        frame.tabIndex = 0;
        frame.setAttribute('role', 'button');
        frame.setAttribute('aria-label', `Cell ${i + 1}`);
        frame.setAttribute('aria-pressed', false);
        frame.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            frame.click();
        });

        // Only photos can be dragged; dropping on another cell swaps the two
        frame.draggable = true;

        frame.addEventListener('dragstart', (e) => {
            if (!state.loadedImages[i]) {
                e.preventDefault();
                return;
            }
            state.dragSourceIndex = i;
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(i));
            frame.classList.add('dragging');
        });

        frame.addEventListener('dragend', () => {
            state.dragSourceIndex = null;
            frame.classList.remove('dragging');
            document.querySelectorAll('.frame.drop-target').forEach(el => el.classList.remove('drop-target'));
        });

        frame.addEventListener('dragover', (e) => {
            if (state.dragSourceIndex === null || state.dragSourceIndex === i) return;
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            frame.classList.add('drop-target');
        });

        frame.addEventListener('dragleave', (e) => {
            if (!frame.contains(e.relatedTarget)) frame.classList.remove('drop-target');
        });

        frame.addEventListener('drop', (e) => {
            if (state.dragSourceIndex === null || state.dragSourceIndex === i) return;
            e.preventDefault();
            frame.classList.remove('drop-target');
            swapFrames(state.dragSourceIndex, i);
        });

        composition.appendChild(frame);
    });

    renderFrames(state.loadedImages);
    updateFrameBorders();
    renderEdgeHandles();

    document.getElementById('composition-label').classList.add('visible');
    document.getElementById('composition-wrapper').classList.add('visible');
    document.getElementById('grid-controls').classList.add('visible');
    document.getElementById('export-section').classList.add('visible');
}

export function positionFrame(frame, f) {
    frame.style.top = `${f.top}%`;
    frame.style.left = `${f.left}%`;
    frame.style.width = `${f.width}%`;
    frame.style.height = `${f.height}%`;
}

export function getOuterSides(f) {
    return {
        top:    f.top < 0.1,
        left:   f.left < 0.1,
        bottom: (f.top + f.height) > 99.9,
        right:  (f.left + f.width) > 99.9,
    };
}

export function updateFrameBorders(innerW = state.borderWidth, outerW = state.outerBorderWidth, container = document) {
    if (!state.currentPattern) return;
    const wrapper = container === document
        ? document.getElementById('composition-wrapper')
        : container;
    state.currentPattern.frames.forEach((f, i) => {
        const frame = wrapper.querySelector(`#frame-${i}`);
        if (!frame) return;
        const outer = getOuterSides(f);
        frame.style.borderTopWidth    = outer.top    ? '0' : `${innerW}px`;
        frame.style.borderLeftWidth   = outer.left   ? '0' : `${innerW}px`;
        frame.style.borderBottomWidth = outer.bottom ? '0' : `${innerW}px`;
        frame.style.borderRightWidth  = outer.right  ? '0' : `${innerW}px`;
    });
    wrapper.style.padding = `${outerW}px`;
    updateShadowShapes();
}

export function updateCornerRadius() {
    document.getElementById('composition-wrapper').style.setProperty('--corner-radius', `${state.cornerRadius}px`);
}

export function renderFrames(images) {
    if (!state.currentPattern) return;
    images.forEach((src, i) => {
        const image = document.querySelector(`#frame-${i} .frame-image`);
        if (!image) return;
        image.style.backgroundImage = src ? `url(${src})` : '';
    });
}

export function selectFrame(i) {
    state.selectedFrameIndex = i;
    const frame = document.getElementById(`frame-${i}`);
    frame.classList.add('selected');
    frame.setAttribute('aria-pressed', true);

    showPhotoSettings(state.frameAdjustments[i]);

    document.getElementById('frame-settings').classList.add('visible');
}

export function deselectAll() {
    state.selectedFrameIndex = null;
    document.querySelectorAll('.frame.selected').forEach(f => {
        f.classList.remove('selected');
        f.setAttribute('aria-pressed', false);
    });
    document.getElementById('frame-settings').classList.remove('visible');
}

export function applyFrameAdjustment(i) {
    const image = document.querySelector(`#frame-${i} .frame-image`);
    if (!image) return;
    const { zoom, x, y, rotation, brightness, contrast } = state.frameAdjustments[i];
    image.style.transform = `scale(${zoom}) translate(${x}%, ${y}%) rotate(${rotation}deg)`;
    image.style.filter = brightness === 100 && contrast === 100
        ? ''
        : `brightness(${brightness}%) contrast(${contrast}%)`;
}

// Zooms the photo just enough to cover its cell (it starts out fitted inside it),
// taking its rotation into account
export function autoFitFrame(i) {
    const src = state.loadedImages[i];
    if (!src) return;
    const cell = document.querySelector(`#frame-${i} .frame-inner`);
    const img = new Image();
    img.onload = () => {
        const W = cell.clientWidth, H = cell.clientHeight;
        const contain = Math.min(W / img.naturalWidth, H / img.naturalHeight);
        const w = img.naturalWidth * contain, h = img.naturalHeight * contain;
        // The cell's bounding box, seen from the rotated photo, must fit inside the photo
        const a = state.frameAdjustments[i].rotation * Math.PI / 180;
        const cos = Math.abs(Math.cos(a)), sin = Math.abs(Math.sin(a));
        const zoom = Math.max((W * cos + H * sin) / w, (W * sin + H * cos) / h);
        const zoomPct = Math.min(300, Math.ceil(zoom * 100));

        state.frameAdjustments[i].zoom = zoomPct / 100;
        applyFrameAdjustment(i);
        if (state.selectedFrameIndex === i) showSetting('zoom', zoomPct);
    };
    img.src = src;
}

export function releaseImage(src) {
    if (src) URL.revokeObjectURL(src);
}

export function clearFrame(i) {
    releaseImage(state.loadedImages[i]);
    state.loadedImages[i] = null;
    state.frameAdjustments[i] = defaultAdjustment();
    const image = document.querySelector(`#frame-${i} .frame-image`);
    if (image) image.style.backgroundImage = '';
    applyFrameAdjustment(i); // also clears any brightness/contrast filter
    deselectAll();
}

function swapFrames(a, b) {
    [state.loadedImages[a], state.loadedImages[b]] = [state.loadedImages[b] || null, state.loadedImages[a] || null];
    [state.frameAdjustments[a], state.frameAdjustments[b]] = [state.frameAdjustments[b], state.frameAdjustments[a]];
    renderFrames(state.loadedImages);
    applyFrameAdjustment(a);
    applyFrameAdjustment(b);
    deselectAll();
    selectFrame(b);
}
