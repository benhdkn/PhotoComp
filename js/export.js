// JPEG export: redraws the comp on a canvas at the chosen resolution.

import { getOuterSides } from './comp.js';
import { drawInnerShadow, drawOuterShadow } from './shadows.js';
import { RESOLUTIONS, defaultAdjustment, state } from './state.js';

// Same maths as CSS brightness() then contrast(), on the export's pixels
// (canvas filters aren't available in every browser)
function applyBrightnessContrast(ctx, w, h, brightness, contrast) {
    const b = brightness / 100, c = contrast / 100;
    const image = ctx.getImageData(0, 0, w, h);
    const d = image.data;
    for (let p = 0; p < d.length; p += 4) {
        d[p]     = (d[p]     * b - 127.5) * c + 127.5;
        d[p + 1] = (d[p + 1] * b - 127.5) * c + 127.5;
        d[p + 2] = (d[p + 2] * b - 127.5) * c + 127.5;
    }
    ctx.putImageData(image, 0, 0);
}

function generateFilename() {
    const now = new Date();
    const date = now.toLocaleDateString('en-CA'); // YYYY-MM-DD
    const time = now.toTimeString().slice(0, 8).replace(/:/g, '-'); // HH-MM-SS
    const res = RESOLUTIONS.find(r => r.value === state.exportResolution)?.label ?? `${state.exportResolution}px`;
    return `PhotoComp_${date}_${time}_${res}.jpeg`;
}

export function saveToJpg() {
    document.getElementById('export-overlay').classList.add('visible');

    const scale = state.exportResolution / 600;
    const scaledBorder = Math.round(state.borderWidth * scale);
    const scaledOuterBorder = Math.round(state.outerBorderWidth * scale);
    const scaledCorner = state.cornerRadius * scale;
    const exportTotal = state.exportResolution + 2 * scaledOuterBorder;

    const imagePromises = state.loadedImages.map(src => {
        if (!src) return Promise.resolve(null);
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    });

    Promise.all(imagePromises)
        .then(images => {
            const canvas = document.createElement('canvas');
            canvas.width = exportTotal;
            canvas.height = exportTotal;
            const ctx = canvas.getContext('2d');

            // White base — covers outer border + inner grid lines
            ctx.fillStyle = 'white';
            ctx.fillRect(0, 0, exportTotal, exportTotal);

            // Photo area of each cell, inside its share of the lines
            const areas = state.currentPattern.frames.map(f => {
                const outer = getOuterSides(f);

                const fx = scaledOuterBorder + f.left / 100 * state.exportResolution;
                const fy = scaledOuterBorder + f.top / 100 * state.exportResolution;
                const fw = f.width / 100 * state.exportResolution;
                const fh = f.height / 100 * state.exportResolution;

                const bT = outer.top    ? 0 : scaledBorder;
                const bL = outer.left   ? 0 : scaledBorder;
                const bR = outer.right  ? 0 : scaledBorder;
                const bB = outer.bottom ? 0 : scaledBorder;

                return { x: fx + bL, y: fy + bT, w: fw - bL - bR, h: fh - bT - bB };
            });

            // Outer shadows first, under every photo, like the preview
            areas.forEach(a => drawOuterShadow(ctx, a.x, a.y, a.w, a.h, scaledCorner, scale));

            areas.forEach(({ x: innerX, y: innerY, w: innerW, h: innerH }, i) => {
                const img = images[i];

                ctx.save();
                ctx.beginPath();
                ctx.roundRect(innerX, innerY, innerW, innerH, scaledCorner);
                ctx.clip();

                // Opaque photo area, so neighbouring shadows never show through letterboxing
                ctx.fillStyle = 'white';
                ctx.fillRect(innerX, innerY, innerW, innerH);

                if (img) {
                    const adj = state.frameAdjustments[i] || defaultAdjustment();

                    // Replicate background-size: contain
                    const containScale = Math.min(innerW / img.naturalWidth, innerH / img.naturalHeight);
                    const renderedW = img.naturalWidth * containScale;
                    const renderedH = img.naturalHeight * containScale;

                    // Replicate transform: scale(zoom) translate(x%, y%) rotate(r), around the cell centre
                    const drawPhoto = (c, left, top) => {
                        c.translate(left + innerW / 2, top + innerH / 2);
                        c.scale(adj.zoom, adj.zoom);
                        c.translate(innerW * adj.x / 100, innerH * adj.y / 100);
                        c.rotate(adj.rotation * Math.PI / 180);
                        c.drawImage(img, -renderedW / 2, -renderedH / 2, renderedW, renderedH);
                    };

                    if (adj.brightness === 100 && adj.contrast === 100) {
                        ctx.save();
                        drawPhoto(ctx, innerX, innerY);
                        ctx.restore();
                    } else {
                        // Draw the cell on its own layer so only the photo's pixels are adjusted
                        const layer = document.createElement('canvas');
                        layer.width = Math.ceil(innerW);
                        layer.height = Math.ceil(innerH);
                        const lctx = layer.getContext('2d');
                        drawPhoto(lctx, 0, 0);
                        applyBrightnessContrast(lctx, layer.width, layer.height, adj.brightness, adj.contrast);
                        ctx.drawImage(layer, innerX, innerY);
                    }
                }

                drawInnerShadow(ctx, innerX, innerY, innerW, innerH, scaledCorner, scale);
                ctx.restore();
            });

            const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
            const link = document.createElement('a');
            link.download = generateFilename();
            link.href = dataUrl;
            link.click();
        })
        .catch(err => {
            console.error('Export failed:', err);
            alert('Export failed. See console for details.');
        })
        .finally(() => {
            document.getElementById('export-overlay').classList.remove('visible');
        });
}
