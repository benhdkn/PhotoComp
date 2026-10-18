// Loading photos from files.

import { applyFrameAdjustment, renderFrames, selectFrame } from './comp.js';
import { GRID_PATTERNS } from './patterns.js';
import { selectCount, selectPattern } from './picker.js';
import { ACCEPTED_TYPES, defaultAdjustment, state } from './state.js';

export function onFileChange() {
    const files = Array.from(this.files).filter(file => {
        if (!ACCEPTED_TYPES.includes(file.type)) {
            alert(`Invalid file type: ${file.name}`);
            return false;
        }
        return true;
    });

    if (!files.length) return;

    // No layout yet: use the chosen photo count, or else match the number of photos,
    // and start from that count's first layout
    if (!state.currentPattern) {
        const activeCount = document.querySelector('.count-btn.active');
        const count = activeCount
            ? Number(activeCount.dataset.count)
            : Math.min(16, Math.max(2, files.length));
        selectCount(count);
        selectPattern(count, GRID_PATTERNS[count][0].id);
    }

    const emptySlots = getEmptySlots();
    if (!emptySlots.length) return;

    loadImages(files.slice(0, emptySlots.length))
        .then(images => {
            images.forEach((src, i) => {
                state.loadedImages[emptySlots[i]] = src;
            });
            renderFrames(state.loadedImages);
            document.getElementById('save').disabled = false;
        })
        .catch(err => {
            console.error('Failed to load images:', err);
            alert('Failed to load one or more images.');
        });
}

function getEmptySlots() {
    const slots = [];
    for (let i = 0; i < state.currentPattern.frames.length; i++) {
        if (!state.loadedImages[i]) slots.push(i);
    }
    return slots;
}

function loadImages(files) {
    const promises = files.map(file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = () => reject(new Error(`Failed to read: ${file.name}`));
        reader.readAsDataURL(file);
    }));
    return Promise.all(promises);
}

export function replaceFrame(i) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png';
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (!file || !ACCEPTED_TYPES.includes(file.type)) return;
        loadImages([file])
            .then(([src]) => {
                state.loadedImages[i] = src;
                state.frameAdjustments[i] = defaultAdjustment();
                renderFrames(state.loadedImages);
                applyFrameAdjustment(i);
                selectFrame(i);
            })
            .catch(err => console.error('Failed to replace image:', err));
    });
    input.click();
}
