// Preset layouts per photo count. Frames are rectangles in % of the comp, listed in the
// order photos fill them.

const FULL = { top: 0, left: 0, width: 100, height: 100 };
const LEFT_HALF = { top: 0, left: 0, width: 50, height: 100 };
const RIGHT_HALF = { top: 0, left: 50, width: 50, height: 100 };
const TOP_HALF = { top: 0, left: 0, width: 100, height: 50 };
const BOTTOM_HALF = { top: 50, left: 0, width: 100, height: 50 };

const round = v => Math.round(v * 100) / 100;

// Start and size of the i-th of n equal parts, rounded so neighbouring edges line up exactly
function part(start, size, i, n) {
    const from = round(start + size * i / n);
    const to = round(start + size * (i + 1) / n);
    return [from, round(to - from)];
}

// One photo filling an area
function cell(area) {
    return { top: area.top, left: area.left, width: area.width, height: area.height };
}

// Rows of equal height, with counts[i] photos side by side in row i. Fills row by row.
function rows(counts, area = FULL) {
    return counts.flatMap((n, r) => {
        const [top, height] = part(area.top, area.height, r, counts.length);
        return Array.from({ length: n }, (_, c) => {
            const [left, width] = part(area.left, area.width, c, n);
            return { top, left, width, height };
        });
    });
}

// Columns of equal width, with counts[i] photos stacked in column i. Fills column by column.
function cols(counts, area = FULL) {
    return counts.flatMap((n, c) => {
        const [left, width] = part(area.left, area.width, c, counts.length);
        return Array.from({ length: n }, (_, r) => {
            const [top, height] = part(area.top, area.height, r, n);
            return { top, left, width, height };
        });
    });
}

// columns × rows grid, filled row by row
function grid(columns, rowCount, area = FULL) {
    return rows(Array(rowCount).fill(columns), area);
}

const layout = (id, name, frames) => ({ id, name, frames });

export const GRID_PATTERNS = {
    2: [
        layout('2-cols', 'Side by side', cols([1, 1])),
        layout('2-rows', 'Stacked', rows([1, 1])),
    ],
    3: [
        layout('3-1left-2right', '1 left + 2 right', cols([1, 2])),
        layout('3-2left-1right', '2 left + 1 right', cols([2, 1])),
        layout('3-cols', '3 columns', rows([3])),
        layout('3-2top-1bottom', '2 top + 1 bottom', rows([2, 1])),
    ],
    4: [
        layout('4-2x2', '2×2 grid', grid(2, 2)),
        layout('4-1left-3right', '1 left + 3 right', cols([1, 3])),
        layout('4-3left-1right', '3 left + 1 right', cols([3, 1])),
        layout('4-1top-3bottom', '1 top + 3 bottom', rows([1, 3])),
    ],
    5: [
        layout('5-2top-3bottom', '2 top + 3 bottom', rows([2, 3])),
        layout('5-3top-2bottom', '3 top + 2 bottom', rows([3, 2])),
        layout('5-1large-4small', '1 large + 4 small', [cell(LEFT_HALF), ...grid(2, 2, RIGHT_HALF)]),
    ],
    6: [
        layout('6-3x2', '3×2 grid', grid(3, 2)),
        layout('6-2x3', '2×3 grid', grid(2, 3)),
        layout('6-2large-4small', '2 top + 4 bottom', rows([2, 4])),
    ],
    7: [
        layout('7-3top-4bottom', '3 top + 4 bottom', rows([3, 4])),
        layout('7-4top-3bottom', '4 top + 3 bottom', rows([4, 3])),
        layout('7-1large-6small', '1 large + 6 small', [cell(LEFT_HALF), ...grid(3, 2, RIGHT_HALF)]),
    ],
    8: [
        layout('8-4x2', '4×2 grid', grid(4, 2)),
        layout('8-2x4', '2×4 grid', grid(2, 4)),
        layout('8-2large-6small', '2 top + 6 bottom', rows([2, 6])),
    ],
    9: [
        layout('9-3x3', '3×3 grid', grid(3, 3)),
        layout('9-1large-8small', '1 large + 8 small', [
            cell({ top: 0, left: 0, width: 50, height: 50 }),
            ...rows([2], { top: 0, left: 50, width: 50, height: 50 }),
            ...rows([6], BOTTOM_HALF),
        ]),
    ],
    10: [
        layout('10-5x2', '5×2 grid', grid(5, 2)),
        layout('10-2x5', '2×5 grid', grid(2, 5)),
        layout('10-4top-6bottom', '4 top + 6 bottom', rows([4, 6])),
    ],
    11: [
        layout('11-4-3-4', '4-3-4 rows', rows([4, 3, 4])),
        layout('11-1top-10bottom', '1 top + 10 bottom', [cell(TOP_HALF), ...grid(5, 2, BOTTOM_HALF)]),
        layout('11-1large-10small', '1 large + 10 small', [cell(LEFT_HALF), ...grid(2, 5, RIGHT_HALF)]),
    ],
    12: [
        layout('12-4x3', '4×3 grid', grid(4, 3)),
        layout('12-3x4', '3×4 grid', grid(3, 4)),
        layout('12-6x2', '6×2 grid', grid(6, 2)),
        layout('12-2top-10bottom', '2 top + 10 bottom', [...rows([2], TOP_HALF), ...grid(5, 2, BOTTOM_HALF)]),
    ],
    13: [
        layout('13-4-5-4', '4-5-4 rows', rows([4, 5, 4])),
        // 4×4 grid whose centre 2×2 is one large photo
        layout('13-1center-12around', '1 centre + 12 around', [
            ...rows([4], { top: 0, left: 0, width: 100, height: 25 }),
            cell({ top: 25, left: 0, width: 25, height: 25 }),
            cell({ top: 25, left: 25, width: 50, height: 50 }),
            cell({ top: 25, left: 75, width: 25, height: 25 }),
            cell({ top: 50, left: 0, width: 25, height: 25 }),
            cell({ top: 50, left: 75, width: 25, height: 25 }),
            ...rows([4], { top: 75, left: 0, width: 100, height: 25 }),
        ]),
        layout('13-1top-12bottom', '1 top + 12 bottom', [cell(TOP_HALF), ...grid(6, 2, BOTTOM_HALF)]),
    ],
    14: [
        layout('14-7x2', '7×2 grid', grid(7, 2)),
        layout('14-2x7', '2×7 grid', grid(2, 7)),
        layout('14-5-4-5', '5-4-5 rows', rows([5, 4, 5])),
        layout('14-2top-12bottom', '2 top + 12 bottom', [...rows([2], TOP_HALF), ...grid(6, 2, BOTTOM_HALF)]),
    ],
    15: [
        layout('15-5x3', '5×3 grid', grid(5, 3)),
        layout('15-3x5', '3×5 grid', grid(3, 5)),
        layout('15-6-3-6', '6-3-6 rows', rows([6, 3, 6])),
        layout('15-1large-14small', '1 large + 14 small', [cell(LEFT_HALF), ...grid(2, 7, RIGHT_HALF)]),
    ],
    16: [
        layout('16-4x4', '4×4 grid', grid(4, 4)),
        layout('16-8x2', '8×2 grid', grid(8, 2)),
        layout('16-2x8', '2×8 grid', grid(2, 8)),
        layout('16-5-6-5', '5-6-5 rows', rows([5, 6, 5])),
    ],
};
