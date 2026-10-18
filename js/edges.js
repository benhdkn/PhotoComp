// Draggable lines between cells to resize the layout.

import { positionFrame } from './comp.js';
import { state } from './state.js';

const MIN_CELL_SIZE = 5; // % of the comp

const EDGE_AXES = [
    { orientation: 'vertical',   pos: 'left', size: 'width',  cross: 'top',  crossSize: 'height' },
    { orientation: 'horizontal', pos: 'top',  size: 'height', cross: 'left', crossSize: 'width'  },
];

// Groups frame sides lying on the same straight interior line into one draggable edge
function findEdges(frames) {
    const near = (a, b) => Math.abs(a - b) < 0.05;
    const edges = [];

    EDGE_AXES.forEach(axis => {
        const coords = [];
        frames.forEach(f => {
            [f[axis.pos], f[axis.pos] + f[axis.size]].forEach(c => {
                if (c > 0.1 && c < 99.9 && !coords.some(x => near(x, c))) coords.push(c);
            });
        });

        coords.forEach(coord => {
            const sides = [];
            frames.forEach((f, i) => {
                const from = f[axis.cross], to = f[axis.cross] + f[axis.crossSize];
                if (near(f[axis.pos] + f[axis.size], coord)) sides.push({ i, isStart: false, from, to });
                if (near(f[axis.pos], coord)) sides.push({ i, isStart: true, from, to });
            });
            sides.sort((a, b) => a.from - b.from);

            // Sides that touch or overlap along the line form one continuous edge
            let edge = null;
            sides.forEach(s => {
                if (edge && s.from <= edge.to + 0.05) {
                    edge.sides.push(s);
                    edge.to = Math.max(edge.to, s.to);
                } else {
                    edge = { axis, coord, from: s.from, to: s.to, sides: [s] };
                    edges.push(edge);
                }
            });
        });
    });

    return edges;
}

export function renderEdgeHandles() {
    const composition = document.getElementById('composition');
    composition.querySelectorAll('.edge-handle').forEach(h => h.remove());

    findEdges(state.currentPattern.frames).forEach(edge => {
        const handle = document.createElement('div');
        handle.className = `edge-handle ${edge.axis.orientation}`;
        handle.style[edge.axis.pos] = `${edge.coord}%`;
        handle.style[edge.axis.cross] = `${edge.from}%`;
        handle.style[edge.axis.crossSize] = `${edge.to - edge.from}%`;
        handle.addEventListener('pointerdown', e => startEdgeDrag(e, edge, handle));
        handle.addEventListener('click', e => e.stopPropagation());
        composition.appendChild(handle);
    });
}

function startEdgeDrag(e, edge, handle) {
    e.preventDefault();
    handle.setPointerCapture(e.pointerId);
    handle.classList.add('active');

    const { pos, size } = edge.axis;
    const frames = state.currentPattern.frames;
    // Keep every cell on both sides of the line at least MIN_CELL_SIZE
    let min = 0, max = 100;
    edge.sides.forEach(s => {
        const f = frames[s.i];
        if (s.isStart) max = Math.min(max, f[pos] + f[size] - MIN_CELL_SIZE);
        else min = Math.max(min, f[pos] + MIN_CELL_SIZE);
    });

    const rect = document.getElementById('composition').getBoundingClientRect();

    const onMove = ev => {
        const pct = edge.axis.orientation === 'vertical'
            ? (ev.clientX - rect.left) / rect.width * 100
            : (ev.clientY - rect.top) / rect.height * 100;
        const coord = Math.round(Math.min(max, Math.max(min, pct)) * 100) / 100;

        edge.sides.forEach(s => {
            const f = frames[s.i];
            if (s.isStart) {
                f[size] = f[pos] + f[size] - coord;
                f[pos] = coord;
            } else {
                f[size] = coord - f[pos];
            }
            positionFrame(document.getElementById(`frame-${s.i}`), f);
        });
        handle.style[pos] = `${coord}%`;
    };

    const onUp = () => {
        handle.removeEventListener('pointermove', onMove);
        handle.removeEventListener('pointerup', onUp);
        handle.removeEventListener('pointercancel', onUp);
        // Rebuild after the click that follows pointerup, so it still lands on this handle
        setTimeout(renderEdgeHandles);
    };

    handle.addEventListener('pointermove', onMove);
    handle.addEventListener('pointerup', onUp);
    handle.addEventListener('pointercancel', onUp);
}
