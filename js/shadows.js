// Inner and outer shadows, for both the preview (CSS) and the export (canvas).

import { state } from './state.js';

const SHADOW_SIDES = ['top', 'right', 'bottom', 'left'];

const SHADOW_PAD = 60; // px, how far shadows can reach; also the depth of the .caster strips in the CSS

export const INNER_SHADOW_HTML = `<div class="inner-shadow">${
    ['caster-top', 'caster-right', 'caster-bottom', 'caster-left', 'fillet-tl', 'fillet-tr', 'fillet-br', 'fillet-bl']
        .map(c => `<div class="caster ${c.startsWith('fillet') ? 'fillet ' : ''}${c}"></div>`).join('')
}</div>`;

// Corners of the photo area clockwise from top left, with the sides meeting there
const SHADOW_CORNERS = [['left', 'top'], ['top', 'right'], ['right', 'bottom'], ['bottom', 'left']];

// Outline of the outer shadow area: the photo area grown by SHADOW_PAD on enabled sides,
// mitred at 45° from each photo corner. Returns [cornerIndex, 'inner' | 'outer'] points.
function getOuterShadowOutline(sides) {
    return SHADOW_CORNERS.flatMap(([a, b], i) => {
        if (sides[a] && sides[b]) return [[i, 'outer']];
        if (sides[a]) return [[i, 'outer'], [i, 'inner']];
        if (sides[b]) return [[i, 'inner'], [i, 'outer']];
        return [[i, 'inner']];
    });
}

// Limits each shadow to its enabled sides, in the preview
export function updateShadowShapes() {
    const wrapper = document.getElementById('composition-wrapper');
    SHADOW_SIDES.forEach(side => wrapper.classList.toggle(`inner-off-${side}`, !state.innerShadowSides[side]));

    const p = SHADOW_PAD;
    const xs = { inner: ['0%', '100%', '100%', '0%'], outer: [`${-p}px`, `calc(100% + ${p}px)`, `calc(100% + ${p}px)`, `${-p}px`] };
    const ys = { inner: ['0%', '0%', '100%', '100%'], outer: [`${-p}px`, `${-p}px`, `calc(100% + ${p}px)`, `calc(100% + ${p}px)`] };
    const points = getOuterShadowOutline(state.outerShadowSides).map(([c, k]) => `${xs[k][c]} ${ys[k][c]}`);
    wrapper.style.setProperty('--outer-shadow-clip', `polygon(${points.join(', ')})`);
}

// Each photo casts an even shadow onto the lines around it, on all four sides.
// Shared by the preview (CSS box-shadow) and the export (canvas), in preview px.
function getOuterShadows() {
    if (!state.shadowSize) return [];
    return [
        { x: 0, y: 0, blur: state.shadowSize, color: 'rgba(0, 0, 0, 0.8)' },
    ];
}

export function updateOuterShadow() {
    const shadows = getOuterShadows();
    const css = shadows.length
        ? shadows.map(s => `${s.x}px ${s.y}px ${s.blur}px ${s.color}`).join(', ')
        : 'none';
    document.getElementById('composition-wrapper').style.setProperty('--outer-shadow', css);
}

// Even shadow just inside each photo's edges, on all four sides. Same units as getOuterShadows.
function getInnerShadows() {
    if (!state.innerShadowSize) return [];
    return [
        { x: 0, y: 0, blur: state.innerShadowSize, color: 'rgba(0, 0, 0, 0.6)' },
    ];
}

export function updateInnerShadow() {
    const shadows = getInnerShadows();
    const css = shadows.length
        ? shadows.map(s => `drop-shadow(${s.x}px ${s.y}px ${s.blur}px ${s.color})`).join(' ')
        : 'none';
    const wrapper = document.getElementById('composition-wrapper');
    wrapper.style.setProperty('--inner-shadow', css);
    wrapper.classList.toggle('inner-shadow-on', shadows.length > 0);
}

// Same shapes as the preview's .caster elements, drawn just outside the (already clipped)
// photo area so only their shadow falls inside
export function drawInnerShadow(ctx, x, y, w, h, radius, scale) {
    const shadows = getInnerShadows();
    if (!shadows.length) return;

    const p = SHADOW_PAD * scale;
    const r = Math.min(radius, w / 2, h / 2);
    const on = state.innerShadowSides;
    const shape = pts => {
        ctx.moveTo(...pts[0]);
        pts.slice(1).forEach(pt => ctx.lineTo(...pt));
        ctx.closePath();
    };

    ctx.save();
    ctx.beginPath();
    if (on.top)    shape([[x - p, y - p], [x + w + p, y - p], [x + w, y], [x, y]]);
    if (on.right)  shape([[x + w + p, y - p], [x + w + p, y + h + p], [x + w, y + h], [x + w, y]]);
    if (on.bottom) shape([[x + w + p, y + h + p], [x - p, y + h + p], [x, y + h], [x + w, y + h]]);
    if (on.left)   shape([[x - p, y + h + p], [x - p, y - p], [x, y], [x, y + h]]);
    if (r > 0) {
        if (on.top && on.left)     { ctx.moveTo(x, y);         ctx.lineTo(x + r, y);         ctx.arc(x + r, y + r, r, -Math.PI / 2, Math.PI, true);         ctx.closePath(); }
        if (on.top && on.right)    { ctx.moveTo(x + w, y);     ctx.lineTo(x + w, y + r);     ctx.arc(x + w - r, y + r, r, 0, -Math.PI / 2, true);           ctx.closePath(); }
        if (on.bottom && on.right) { ctx.moveTo(x + w, y + h); ctx.lineTo(x + w - r, y + h); ctx.arc(x + w - r, y + h - r, r, Math.PI / 2, 0, true);       ctx.closePath(); }
        if (on.bottom && on.left)  { ctx.moveTo(x, y + h);     ctx.lineTo(x, y + h - r);     ctx.arc(x + r, y + h - r, r, Math.PI, Math.PI / 2, true);      ctx.closePath(); }
    }
    ctx.fillStyle = 'black';
    shadows.forEach(s => {
        ctx.shadowColor = s.color;
        ctx.shadowOffsetX = s.x * scale;
        ctx.shadowOffsetY = s.y * scale;
        ctx.shadowBlur = s.blur * scale;
        ctx.fill();
    });
    ctx.restore();
}

// Draws the photo area's shadow onto its share of the lines (cell box minus photo area),
// matching CSS: an outer box-shadow never shows under its own element
export function drawOuterShadow(ctx, x, y, w, h, radius, scale) {
    const shadows = getOuterShadows();
    if (!shadows.length) return;

    const p = SHADOW_PAD * scale;
    const xs = { inner: [x, x + w, x + w, x], outer: [x - p, x + w + p, x + w + p, x - p] };
    const ys = { inner: [y, y, y + h, y + h], outer: [y - p, y - p, y + h + p, y + h + p] };

    ctx.save();
    ctx.beginPath();
    getOuterShadowOutline(state.outerShadowSides).forEach(([c, k]) => ctx.lineTo(xs[k][c], ys[k][c]));
    ctx.closePath();
    ctx.roundRect(x, y, w, h, radius);
    ctx.clip('evenodd');

    // Fill the shape far off to the side and shift its shadow back, so only the shadow lands
    const away = w + h + 1000;
    shadows.forEach(s => {
        ctx.shadowColor = s.color;
        ctx.shadowOffsetX = s.x * scale + away;
        ctx.shadowOffsetY = s.y * scale;
        ctx.shadowBlur = s.blur * scale;
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.roundRect(x - away, y, w, h, radius);
        ctx.fill();
    });
    ctx.restore();
}
