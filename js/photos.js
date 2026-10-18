// Loading photos from files.

import { applyFrameAdjustment, releaseImage, renderFrames, selectFrame } from './comp.js';
import { showMessage } from './dom.js';
import { GRID_PATTERNS } from './patterns.js';
import { selectCount, selectPattern } from './picker.js';
import { ACCEPTED_TYPES, defaultAdjustment, state } from './state.js';

export function onFileChange() {
    const all = Array.from(this.files);
    const files = all.filter(file => ACCEPTED_TYPES.includes(file.type));
    const skipped = all.filter(file => !files.includes(file)).map(file => file.name);
    if (skipped.length) showMessage('photo-message', `Only JPEG and PNG photos are supported. Skipped: ${skipped.join(', ')}`);

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
            showMessage('photo-message', 'Some photos could not be loaded.');
        });
}

function getEmptySlots() {
    const slots = [];
    for (let i = 0; i < state.currentPattern.frames.length; i++) {
        if (!state.loadedImages[i]) slots.push(i);
    }
    return slots;
}

// Object URLs point at the files in memory, without copying them into base64 text.
// Release them with releaseImage() once a photo is no longer used.
function loadImages(files) {
    return Promise.resolve(files.map(file => URL.createObjectURL(file)));
}

export function replaceFrame(i) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/jpeg,image/png';
    input.addEventListener('change', function () {
        const file = this.files[0];
        if (!file) return;
        if (!ACCEPTED_TYPES.includes(file.type)) {
            showMessage('photo-message', `Only JPEG and PNG photos are supported. Skipped: ${file.name}`);
            return;
        }
        loadImages([file])
            .then(([src]) => {
                releaseImage(state.loadedImages[i]);
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
