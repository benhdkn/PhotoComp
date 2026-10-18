// Preset layouts per photo count. Frames are rectangles in % of the comp.

export const GRID_PATTERNS = {
    2: [
        {
            id: '2-cols', name: 'Side by side',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 50, height: 100 },
            ]
        },
        {
            id: '2-rows', name: 'Stacked',
            frames: [
                { top: 0, left: 0, width: 100, height: 50 },
                { top: 50, left: 0, width: 100, height: 50 },
            ]
        },
    ],
    3: [
        {
            id: '3-1left-2right', name: '1 left + 2 right',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 50, width: 50, height: 50 },
            ]
        },
        {
            id: '3-2left-1right', name: '2 left + 1 right',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 50, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 100 },
            ]
        },
        {
            id: '3-cols', name: '3 columns',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 100 },
                { top: 0, left: 33.33, width: 33.34, height: 100 },
                { top: 0, left: 66.67, width: 33.33, height: 100 },
            ]
        },
        {
            id: '3-2top-1bottom', name: '2 top + 1 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 100, height: 50 },
            ]
        },
    ],
    4: [
        {
            id: '4-2x2', name: '2×2 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 50, height: 50 },
                { top: 50, left: 50, width: 50, height: 50 },
            ]
        },
        {
            id: '4-1left-3right', name: '1 left + 3 right',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 50, height: 33.33 },
                { top: 33.33, left: 50, width: 50, height: 33.34 },
                { top: 66.67, left: 50, width: 50, height: 33.33 },
            ]
        },
        {
            id: '4-3left-1right', name: '3 left + 1 right',
            frames: [
                { top: 0, left: 0, width: 50, height: 33.33 },
                { top: 33.33, left: 0, width: 50, height: 33.34 },
                { top: 66.67, left: 0, width: 50, height: 33.33 },
                { top: 0, left: 50, width: 50, height: 100 },
            ]
        },
        {
            id: '4-1top-3bottom', name: '1 top + 3 bottom',
            frames: [
                { top: 0, left: 0, width: 100, height: 50 },
                { top: 50, left: 0, width: 33.33, height: 50 },
                { top: 50, left: 33.33, width: 33.34, height: 50 },
                { top: 50, left: 66.67, width: 33.33, height: 50 },
            ]
        },
    ],
    5: [
        {
            id: '5-2top-3bottom', name: '2 top + 3 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 33.33, height: 50 },
                { top: 50, left: 33.33, width: 33.34, height: 50 },
                { top: 50, left: 66.67, width: 33.33, height: 50 },
            ]
        },
        {
            id: '5-3top-2bottom', name: '3 top + 2 bottom',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 50 },
                { top: 0, left: 33.33, width: 33.34, height: 50 },
                { top: 0, left: 66.67, width: 33.33, height: 50 },
                { top: 50, left: 0, width: 50, height: 50 },
                { top: 50, left: 50, width: 50, height: 50 },
            ]
        },
        {
            id: '5-1large-4small', name: '1 large + 4 small',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 25, height: 50 },
                { top: 0, left: 75, width: 25, height: 50 },
                { top: 50, left: 50, width: 25, height: 50 },
                { top: 50, left: 75, width: 25, height: 50 },
            ]
        },
    ],
    6: [
        {
            id: '6-3x2', name: '3×2 grid',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 50 },
                { top: 0, left: 33.33, width: 33.34, height: 50 },
                { top: 0, left: 66.67, width: 33.33, height: 50 },
                { top: 50, left: 0, width: 33.33, height: 50 },
                { top: 50, left: 33.33, width: 33.34, height: 50 },
                { top: 50, left: 66.67, width: 33.33, height: 50 },
            ]
        },
        {
            id: '6-2x3', name: '2×3 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 33.33 },
                { top: 0, left: 50, width: 50, height: 33.33 },
                { top: 33.33, left: 0, width: 50, height: 33.34 },
                { top: 33.33, left: 50, width: 50, height: 33.34 },
                { top: 66.67, left: 0, width: 50, height: 33.33 },
                { top: 66.67, left: 50, width: 50, height: 33.33 },
            ]
        },
        {
            id: '6-2large-4small', name: '2 top + 4 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 25, height: 50 },
                { top: 50, left: 25, width: 25, height: 50 },
                { top: 50, left: 50, width: 25, height: 50 },
                { top: 50, left: 75, width: 25, height: 50 },
            ]
        },
    ],
    7: [
        {
            id: '7-3top-4bottom', name: '3 top + 4 bottom',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 50 },
                { top: 0, left: 33.33, width: 33.34, height: 50 },
                { top: 0, left: 66.67, width: 33.33, height: 50 },
                { top: 50, left: 0, width: 25, height: 50 },
                { top: 50, left: 25, width: 25, height: 50 },
                { top: 50, left: 50, width: 25, height: 50 },
                { top: 50, left: 75, width: 25, height: 50 },
            ]
        },
        {
            id: '7-4top-3bottom', name: '4 top + 3 bottom',
            frames: [
                { top: 0, left: 0, width: 25, height: 50 },
                { top: 0, left: 25, width: 25, height: 50 },
                { top: 0, left: 50, width: 25, height: 50 },
                { top: 0, left: 75, width: 25, height: 50 },
                { top: 50, left: 0, width: 33.33, height: 50 },
                { top: 50, left: 33.33, width: 33.34, height: 50 },
                { top: 50, left: 66.67, width: 33.33, height: 50 },
            ]
        },
        {
            id: '7-1large-6small', name: '1 large + 6 small',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 16.67, height: 50 },
                { top: 0, left: 66.67, width: 16.67, height: 50 },
                { top: 0, left: 83.33, width: 16.67, height: 50 },
                { top: 50, left: 50, width: 16.67, height: 50 },
                { top: 50, left: 66.67, width: 16.67, height: 50 },
                { top: 50, left: 83.33, width: 16.67, height: 50 },
            ]
        },
    ],
    8: [
        {
            id: '8-4x2', name: '4×2 grid',
            frames: [
                { top: 0, left: 0, width: 25, height: 50 },
                { top: 0, left: 25, width: 25, height: 50 },
                { top: 0, left: 50, width: 25, height: 50 },
                { top: 0, left: 75, width: 25, height: 50 },
                { top: 50, left: 0, width: 25, height: 50 },
                { top: 50, left: 25, width: 25, height: 50 },
                { top: 50, left: 50, width: 25, height: 50 },
                { top: 50, left: 75, width: 25, height: 50 },
            ]
        },
        {
            id: '8-2x4', name: '2×4 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 25 },
                { top: 0, left: 50, width: 50, height: 25 },
                { top: 25, left: 0, width: 50, height: 25 },
                { top: 25, left: 50, width: 50, height: 25 },
                { top: 50, left: 0, width: 50, height: 25 },
                { top: 50, left: 50, width: 50, height: 25 },
                { top: 75, left: 0, width: 50, height: 25 },
                { top: 75, left: 50, width: 50, height: 25 },
            ]
        },
        {
            id: '8-2large-6small', name: '2 top + 6 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 50 },
                { top: 50, left: 16.67, width: 16.67, height: 50 },
                { top: 50, left: 33.33, width: 16.67, height: 50 },
                { top: 50, left: 50, width: 16.67, height: 50 },
                { top: 50, left: 66.67, width: 16.67, height: 50 },
                { top: 50, left: 83.33, width: 16.67, height: 50 },
            ]
        },
    ],
    9: [
        {
            id: '9-3x3', name: '3×3 grid',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 33.33 },
                { top: 0, left: 33.33, width: 33.34, height: 33.33 },
                { top: 0, left: 66.67, width: 33.33, height: 33.33 },
                { top: 33.33, left: 0, width: 33.33, height: 33.34 },
                { top: 33.33, left: 33.33, width: 33.34, height: 33.34 },
                { top: 33.33, left: 66.67, width: 33.33, height: 33.34 },
                { top: 66.67, left: 0, width: 33.33, height: 33.33 },
                { top: 66.67, left: 33.33, width: 33.34, height: 33.33 },
                { top: 66.67, left: 66.67, width: 33.33, height: 33.33 },
            ]
        },
        {
            id: '9-1large-8small', name: '1 large + 8 small',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 25, height: 50 },
                { top: 0, left: 75, width: 25, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 50 },
                { top: 50, left: 16.67, width: 16.67, height: 50 },
                { top: 50, left: 33.33, width: 16.67, height: 50 },
                { top: 50, left: 50, width: 16.67, height: 50 },
                { top: 50, left: 66.67, width: 16.67, height: 50 },
                { top: 50, left: 83.33, width: 16.67, height: 50 },
            ]
        },
    ],
    10: [
        {
            id: '10-5x2', name: '5×2 grid',
            frames: [
                { top: 0, left: 0, width: 20, height: 50 },
                { top: 0, left: 20, width: 20, height: 50 },
                { top: 0, left: 40, width: 20, height: 50 },
                { top: 0, left: 60, width: 20, height: 50 },
                { top: 0, left: 80, width: 20, height: 50 },
                { top: 50, left: 0, width: 20, height: 50 },
                { top: 50, left: 20, width: 20, height: 50 },
                { top: 50, left: 40, width: 20, height: 50 },
                { top: 50, left: 60, width: 20, height: 50 },
                { top: 50, left: 80, width: 20, height: 50 },
            ]
        },
        {
            id: '10-2x5', name: '2×5 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 20 },
                { top: 0, left: 50, width: 50, height: 20 },
                { top: 20, left: 0, width: 50, height: 20 },
                { top: 20, left: 50, width: 50, height: 20 },
                { top: 40, left: 0, width: 50, height: 20 },
                { top: 40, left: 50, width: 50, height: 20 },
                { top: 60, left: 0, width: 50, height: 20 },
                { top: 60, left: 50, width: 50, height: 20 },
                { top: 80, left: 0, width: 50, height: 20 },
                { top: 80, left: 50, width: 50, height: 20 },
            ]
        },
        {
            id: '10-4top-6bottom', name: '4 top + 6 bottom',
            frames: [
                { top: 0, left: 0, width: 25, height: 50 },
                { top: 0, left: 25, width: 25, height: 50 },
                { top: 0, left: 50, width: 25, height: 50 },
                { top: 0, left: 75, width: 25, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 50 },
                { top: 50, left: 16.67, width: 16.67, height: 50 },
                { top: 50, left: 33.33, width: 16.67, height: 50 },
                { top: 50, left: 50, width: 16.67, height: 50 },
                { top: 50, left: 66.67, width: 16.67, height: 50 },
                { top: 50, left: 83.33, width: 16.67, height: 50 },
            ]
        },
    ],
    11: [
        {
            id: '11-4-3-4', name: '4-3-4 rows',
            frames: [
                { top: 0, left: 0, width: 25, height: 33.33 },
                { top: 0, left: 25, width: 25, height: 33.33 },
                { top: 0, left: 50, width: 25, height: 33.33 },
                { top: 0, left: 75, width: 25, height: 33.33 },
                { top: 33.33, left: 0, width: 33.33, height: 33.34 },
                { top: 33.33, left: 33.33, width: 33.34, height: 33.34 },
                { top: 33.33, left: 66.67, width: 33.33, height: 33.34 },
                { top: 66.67, left: 0, width: 25, height: 33.33 },
                { top: 66.67, left: 25, width: 25, height: 33.33 },
                { top: 66.67, left: 50, width: 25, height: 33.33 },
                { top: 66.67, left: 75, width: 25, height: 33.33 },
            ]
        },
        {
            id: '11-1top-10bottom', name: '1 top + 10 bottom',
            frames: [
                { top: 0, left: 0, width: 100, height: 50 },
                { top: 50, left: 0, width: 20, height: 25 },
                { top: 50, left: 20, width: 20, height: 25 },
                { top: 50, left: 40, width: 20, height: 25 },
                { top: 50, left: 60, width: 20, height: 25 },
                { top: 50, left: 80, width: 20, height: 25 },
                { top: 75, left: 0, width: 20, height: 25 },
                { top: 75, left: 20, width: 20, height: 25 },
                { top: 75, left: 40, width: 20, height: 25 },
                { top: 75, left: 60, width: 20, height: 25 },
                { top: 75, left: 80, width: 20, height: 25 },
            ]
        },
        {
            id: '11-1large-10small', name: '1 large + 10 small',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 25, height: 20 },
                { top: 0, left: 75, width: 25, height: 20 },
                { top: 20, left: 50, width: 25, height: 20 },
                { top: 20, left: 75, width: 25, height: 20 },
                { top: 40, left: 50, width: 25, height: 20 },
                { top: 40, left: 75, width: 25, height: 20 },
                { top: 60, left: 50, width: 25, height: 20 },
                { top: 60, left: 75, width: 25, height: 20 },
                { top: 80, left: 50, width: 25, height: 20 },
                { top: 80, left: 75, width: 25, height: 20 },
            ]
        },
    ],
    12: [
        {
            id: '12-4x3', name: '4×3 grid',
            frames: [
                { top: 0, left: 0, width: 25, height: 33.33 },
                { top: 0, left: 25, width: 25, height: 33.33 },
                { top: 0, left: 50, width: 25, height: 33.33 },
                { top: 0, left: 75, width: 25, height: 33.33 },
                { top: 33.33, left: 0, width: 25, height: 33.34 },
                { top: 33.33, left: 25, width: 25, height: 33.34 },
                { top: 33.33, left: 50, width: 25, height: 33.34 },
                { top: 33.33, left: 75, width: 25, height: 33.34 },
                { top: 66.67, left: 0, width: 25, height: 33.33 },
                { top: 66.67, left: 25, width: 25, height: 33.33 },
                { top: 66.67, left: 50, width: 25, height: 33.33 },
                { top: 66.67, left: 75, width: 25, height: 33.33 },
            ]
        },
        {
            id: '12-3x4', name: '3×4 grid',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 25 },
                { top: 0, left: 33.33, width: 33.34, height: 25 },
                { top: 0, left: 66.67, width: 33.33, height: 25 },
                { top: 25, left: 0, width: 33.33, height: 25 },
                { top: 25, left: 33.33, width: 33.34, height: 25 },
                { top: 25, left: 66.67, width: 33.33, height: 25 },
                { top: 50, left: 0, width: 33.33, height: 25 },
                { top: 50, left: 33.33, width: 33.34, height: 25 },
                { top: 50, left: 66.67, width: 33.33, height: 25 },
                { top: 75, left: 0, width: 33.33, height: 25 },
                { top: 75, left: 33.33, width: 33.34, height: 25 },
                { top: 75, left: 66.67, width: 33.33, height: 25 },
            ]
        },
        {
            id: '12-6x2', name: '6×2 grid',
            frames: [
                { top: 0, left: 0, width: 16.67, height: 50 },
                { top: 0, left: 16.67, width: 16.66, height: 50 },
                { top: 0, left: 33.33, width: 16.67, height: 50 },
                { top: 0, left: 50, width: 16.67, height: 50 },
                { top: 0, left: 66.67, width: 16.66, height: 50 },
                { top: 0, left: 83.33, width: 16.67, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 50 },
                { top: 50, left: 16.67, width: 16.66, height: 50 },
                { top: 50, left: 33.33, width: 16.67, height: 50 },
                { top: 50, left: 50, width: 16.67, height: 50 },
                { top: 50, left: 66.67, width: 16.66, height: 50 },
                { top: 50, left: 83.33, width: 16.67, height: 50 },
            ]
        },
        {
            id: '12-2top-10bottom', name: '2 top + 10 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 20, height: 25 },
                { top: 50, left: 20, width: 20, height: 25 },
                { top: 50, left: 40, width: 20, height: 25 },
                { top: 50, left: 60, width: 20, height: 25 },
                { top: 50, left: 80, width: 20, height: 25 },
                { top: 75, left: 0, width: 20, height: 25 },
                { top: 75, left: 20, width: 20, height: 25 },
                { top: 75, left: 40, width: 20, height: 25 },
                { top: 75, left: 60, width: 20, height: 25 },
                { top: 75, left: 80, width: 20, height: 25 },
            ]
        },
    ],
    13: [
        {
            id: '13-4-5-4', name: '4-5-4 rows',
            frames: [
                { top: 0, left: 0, width: 25, height: 33.33 },
                { top: 0, left: 25, width: 25, height: 33.33 },
                { top: 0, left: 50, width: 25, height: 33.33 },
                { top: 0, left: 75, width: 25, height: 33.33 },
                { top: 33.33, left: 0, width: 20, height: 33.34 },
                { top: 33.33, left: 20, width: 20, height: 33.34 },
                { top: 33.33, left: 40, width: 20, height: 33.34 },
                { top: 33.33, left: 60, width: 20, height: 33.34 },
                { top: 33.33, left: 80, width: 20, height: 33.34 },
                { top: 66.67, left: 0, width: 25, height: 33.33 },
                { top: 66.67, left: 25, width: 25, height: 33.33 },
                { top: 66.67, left: 50, width: 25, height: 33.33 },
                { top: 66.67, left: 75, width: 25, height: 33.33 },
            ]
        },
        {
            id: '13-1center-12around', name: '1 centre + 12 around',
            frames: [
                { top: 0, left: 0, width: 25, height: 25 },
                { top: 0, left: 25, width: 25, height: 25 },
                { top: 0, left: 50, width: 25, height: 25 },
                { top: 0, left: 75, width: 25, height: 25 },
                { top: 25, left: 0, width: 25, height: 25 },
                { top: 25, left: 25, width: 50, height: 50 },
                { top: 25, left: 75, width: 25, height: 25 },
                { top: 50, left: 0, width: 25, height: 25 },
                { top: 50, left: 75, width: 25, height: 25 },
                { top: 75, left: 0, width: 25, height: 25 },
                { top: 75, left: 25, width: 25, height: 25 },
                { top: 75, left: 50, width: 25, height: 25 },
                { top: 75, left: 75, width: 25, height: 25 },
            ]
        },
        {
            id: '13-1top-12bottom', name: '1 top + 12 bottom',
            frames: [
                { top: 0, left: 0, width: 100, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 25 },
                { top: 50, left: 16.67, width: 16.66, height: 25 },
                { top: 50, left: 33.33, width: 16.67, height: 25 },
                { top: 50, left: 50, width: 16.67, height: 25 },
                { top: 50, left: 66.67, width: 16.66, height: 25 },
                { top: 50, left: 83.33, width: 16.67, height: 25 },
                { top: 75, left: 0, width: 16.67, height: 25 },
                { top: 75, left: 16.67, width: 16.66, height: 25 },
                { top: 75, left: 33.33, width: 16.67, height: 25 },
                { top: 75, left: 50, width: 16.67, height: 25 },
                { top: 75, left: 66.67, width: 16.66, height: 25 },
                { top: 75, left: 83.33, width: 16.67, height: 25 },
            ]
        },
    ],
    14: [
        {
            id: '14-7x2', name: '7×2 grid',
            frames: [
                { top: 0, left: 0, width: 14.29, height: 50 },
                { top: 0, left: 14.29, width: 14.28, height: 50 },
                { top: 0, left: 28.57, width: 14.29, height: 50 },
                { top: 0, left: 42.86, width: 14.28, height: 50 },
                { top: 0, left: 57.14, width: 14.29, height: 50 },
                { top: 0, left: 71.43, width: 14.28, height: 50 },
                { top: 0, left: 85.71, width: 14.29, height: 50 },
                { top: 50, left: 0, width: 14.29, height: 50 },
                { top: 50, left: 14.29, width: 14.28, height: 50 },
                { top: 50, left: 28.57, width: 14.29, height: 50 },
                { top: 50, left: 42.86, width: 14.28, height: 50 },
                { top: 50, left: 57.14, width: 14.29, height: 50 },
                { top: 50, left: 71.43, width: 14.28, height: 50 },
                { top: 50, left: 85.71, width: 14.29, height: 50 },
            ]
        },
        {
            id: '14-2x7', name: '2×7 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 14.29 },
                { top: 0, left: 50, width: 50, height: 14.29 },
                { top: 14.29, left: 0, width: 50, height: 14.28 },
                { top: 14.29, left: 50, width: 50, height: 14.28 },
                { top: 28.57, left: 0, width: 50, height: 14.29 },
                { top: 28.57, left: 50, width: 50, height: 14.29 },
                { top: 42.86, left: 0, width: 50, height: 14.28 },
                { top: 42.86, left: 50, width: 50, height: 14.28 },
                { top: 57.14, left: 0, width: 50, height: 14.29 },
                { top: 57.14, left: 50, width: 50, height: 14.29 },
                { top: 71.43, left: 0, width: 50, height: 14.28 },
                { top: 71.43, left: 50, width: 50, height: 14.28 },
                { top: 85.71, left: 0, width: 50, height: 14.29 },
                { top: 85.71, left: 50, width: 50, height: 14.29 },
            ]
        },
        {
            id: '14-5-4-5', name: '5-4-5 rows',
            frames: [
                { top: 0, left: 0, width: 20, height: 33.33 },
                { top: 0, left: 20, width: 20, height: 33.33 },
                { top: 0, left: 40, width: 20, height: 33.33 },
                { top: 0, left: 60, width: 20, height: 33.33 },
                { top: 0, left: 80, width: 20, height: 33.33 },
                { top: 33.33, left: 0, width: 25, height: 33.34 },
                { top: 33.33, left: 25, width: 25, height: 33.34 },
                { top: 33.33, left: 50, width: 25, height: 33.34 },
                { top: 33.33, left: 75, width: 25, height: 33.34 },
                { top: 66.67, left: 0, width: 20, height: 33.33 },
                { top: 66.67, left: 20, width: 20, height: 33.33 },
                { top: 66.67, left: 40, width: 20, height: 33.33 },
                { top: 66.67, left: 60, width: 20, height: 33.33 },
                { top: 66.67, left: 80, width: 20, height: 33.33 },
            ]
        },
        {
            id: '14-2top-12bottom', name: '2 top + 12 bottom',
            frames: [
                { top: 0, left: 0, width: 50, height: 50 },
                { top: 0, left: 50, width: 50, height: 50 },
                { top: 50, left: 0, width: 16.67, height: 25 },
                { top: 50, left: 16.67, width: 16.66, height: 25 },
                { top: 50, left: 33.33, width: 16.67, height: 25 },
                { top: 50, left: 50, width: 16.67, height: 25 },
                { top: 50, left: 66.67, width: 16.66, height: 25 },
                { top: 50, left: 83.33, width: 16.67, height: 25 },
                { top: 75, left: 0, width: 16.67, height: 25 },
                { top: 75, left: 16.67, width: 16.66, height: 25 },
                { top: 75, left: 33.33, width: 16.67, height: 25 },
                { top: 75, left: 50, width: 16.67, height: 25 },
                { top: 75, left: 66.67, width: 16.66, height: 25 },
                { top: 75, left: 83.33, width: 16.67, height: 25 },
            ]
        },
    ],
    15: [
        {
            id: '15-5x3', name: '5×3 grid',
            frames: [
                { top: 0, left: 0, width: 20, height: 33.33 },
                { top: 0, left: 20, width: 20, height: 33.33 },
                { top: 0, left: 40, width: 20, height: 33.33 },
                { top: 0, left: 60, width: 20, height: 33.33 },
                { top: 0, left: 80, width: 20, height: 33.33 },
                { top: 33.33, left: 0, width: 20, height: 33.34 },
                { top: 33.33, left: 20, width: 20, height: 33.34 },
                { top: 33.33, left: 40, width: 20, height: 33.34 },
                { top: 33.33, left: 60, width: 20, height: 33.34 },
                { top: 33.33, left: 80, width: 20, height: 33.34 },
                { top: 66.67, left: 0, width: 20, height: 33.33 },
                { top: 66.67, left: 20, width: 20, height: 33.33 },
                { top: 66.67, left: 40, width: 20, height: 33.33 },
                { top: 66.67, left: 60, width: 20, height: 33.33 },
                { top: 66.67, left: 80, width: 20, height: 33.33 },
            ]
        },
        {
            id: '15-3x5', name: '3×5 grid',
            frames: [
                { top: 0, left: 0, width: 33.33, height: 20 },
                { top: 0, left: 33.33, width: 33.34, height: 20 },
                { top: 0, left: 66.67, width: 33.33, height: 20 },
                { top: 20, left: 0, width: 33.33, height: 20 },
                { top: 20, left: 33.33, width: 33.34, height: 20 },
                { top: 20, left: 66.67, width: 33.33, height: 20 },
                { top: 40, left: 0, width: 33.33, height: 20 },
                { top: 40, left: 33.33, width: 33.34, height: 20 },
                { top: 40, left: 66.67, width: 33.33, height: 20 },
                { top: 60, left: 0, width: 33.33, height: 20 },
                { top: 60, left: 33.33, width: 33.34, height: 20 },
                { top: 60, left: 66.67, width: 33.33, height: 20 },
                { top: 80, left: 0, width: 33.33, height: 20 },
                { top: 80, left: 33.33, width: 33.34, height: 20 },
                { top: 80, left: 66.67, width: 33.33, height: 20 },
            ]
        },
        {
            id: '15-6-3-6', name: '6-3-6 rows',
            frames: [
                { top: 0, left: 0, width: 16.67, height: 33.33 },
                { top: 0, left: 16.67, width: 16.66, height: 33.33 },
                { top: 0, left: 33.33, width: 16.67, height: 33.33 },
                { top: 0, left: 50, width: 16.67, height: 33.33 },
                { top: 0, left: 66.67, width: 16.66, height: 33.33 },
                { top: 0, left: 83.33, width: 16.67, height: 33.33 },
                { top: 33.33, left: 0, width: 33.33, height: 33.34 },
                { top: 33.33, left: 33.33, width: 33.34, height: 33.34 },
                { top: 33.33, left: 66.67, width: 33.33, height: 33.34 },
                { top: 66.67, left: 0, width: 16.67, height: 33.33 },
                { top: 66.67, left: 16.67, width: 16.66, height: 33.33 },
                { top: 66.67, left: 33.33, width: 16.67, height: 33.33 },
                { top: 66.67, left: 50, width: 16.67, height: 33.33 },
                { top: 66.67, left: 66.67, width: 16.66, height: 33.33 },
                { top: 66.67, left: 83.33, width: 16.67, height: 33.33 },
            ]
        },
        {
            id: '15-1large-14small', name: '1 large + 14 small',
            frames: [
                { top: 0, left: 0, width: 50, height: 100 },
                { top: 0, left: 50, width: 25, height: 14.29 },
                { top: 0, left: 75, width: 25, height: 14.29 },
                { top: 14.29, left: 50, width: 25, height: 14.28 },
                { top: 14.29, left: 75, width: 25, height: 14.28 },
                { top: 28.57, left: 50, width: 25, height: 14.29 },
                { top: 28.57, left: 75, width: 25, height: 14.29 },
                { top: 42.86, left: 50, width: 25, height: 14.28 },
                { top: 42.86, left: 75, width: 25, height: 14.28 },
                { top: 57.14, left: 50, width: 25, height: 14.29 },
                { top: 57.14, left: 75, width: 25, height: 14.29 },
                { top: 71.43, left: 50, width: 25, height: 14.28 },
                { top: 71.43, left: 75, width: 25, height: 14.28 },
                { top: 85.71, left: 50, width: 25, height: 14.29 },
                { top: 85.71, left: 75, width: 25, height: 14.29 },
            ]
        },
    ],
    16: [
        {
            id: '16-4x4', name: '4×4 grid',
            frames: [
                { top: 0, left: 0, width: 25, height: 25 },
                { top: 0, left: 25, width: 25, height: 25 },
                { top: 0, left: 50, width: 25, height: 25 },
                { top: 0, left: 75, width: 25, height: 25 },
                { top: 25, left: 0, width: 25, height: 25 },
                { top: 25, left: 25, width: 25, height: 25 },
                { top: 25, left: 50, width: 25, height: 25 },
                { top: 25, left: 75, width: 25, height: 25 },
                { top: 50, left: 0, width: 25, height: 25 },
                { top: 50, left: 25, width: 25, height: 25 },
                { top: 50, left: 50, width: 25, height: 25 },
                { top: 50, left: 75, width: 25, height: 25 },
                { top: 75, left: 0, width: 25, height: 25 },
                { top: 75, left: 25, width: 25, height: 25 },
                { top: 75, left: 50, width: 25, height: 25 },
                { top: 75, left: 75, width: 25, height: 25 },
            ]
        },
        {
            id: '16-8x2', name: '8×2 grid',
            frames: [
                { top: 0, left: 0, width: 12.5, height: 50 },
                { top: 0, left: 12.5, width: 12.5, height: 50 },
                { top: 0, left: 25, width: 12.5, height: 50 },
                { top: 0, left: 37.5, width: 12.5, height: 50 },
                { top: 0, left: 50, width: 12.5, height: 50 },
                { top: 0, left: 62.5, width: 12.5, height: 50 },
                { top: 0, left: 75, width: 12.5, height: 50 },
                { top: 0, left: 87.5, width: 12.5, height: 50 },
                { top: 50, left: 0, width: 12.5, height: 50 },
                { top: 50, left: 12.5, width: 12.5, height: 50 },
                { top: 50, left: 25, width: 12.5, height: 50 },
                { top: 50, left: 37.5, width: 12.5, height: 50 },
                { top: 50, left: 50, width: 12.5, height: 50 },
                { top: 50, left: 62.5, width: 12.5, height: 50 },
                { top: 50, left: 75, width: 12.5, height: 50 },
                { top: 50, left: 87.5, width: 12.5, height: 50 },
            ]
        },
        {
            id: '16-2x8', name: '2×8 grid',
            frames: [
                { top: 0, left: 0, width: 50, height: 12.5 },
                { top: 0, left: 50, width: 50, height: 12.5 },
                { top: 12.5, left: 0, width: 50, height: 12.5 },
                { top: 12.5, left: 50, width: 50, height: 12.5 },
                { top: 25, left: 0, width: 50, height: 12.5 },
                { top: 25, left: 50, width: 50, height: 12.5 },
                { top: 37.5, left: 0, width: 50, height: 12.5 },
                { top: 37.5, left: 50, width: 50, height: 12.5 },
                { top: 50, left: 0, width: 50, height: 12.5 },
                { top: 50, left: 50, width: 50, height: 12.5 },
                { top: 62.5, left: 0, width: 50, height: 12.5 },
                { top: 62.5, left: 50, width: 50, height: 12.5 },
                { top: 75, left: 0, width: 50, height: 12.5 },
                { top: 75, left: 50, width: 50, height: 12.5 },
                { top: 87.5, left: 0, width: 50, height: 12.5 },
                { top: 87.5, left: 50, width: 50, height: 12.5 },
            ]
        },
        {
            id: '16-5-6-5', name: '5-6-5 rows',
            frames: [
                { top: 0, left: 0, width: 20, height: 33.33 },
                { top: 0, left: 20, width: 20, height: 33.33 },
                { top: 0, left: 40, width: 20, height: 33.33 },
                { top: 0, left: 60, width: 20, height: 33.33 },
                { top: 0, left: 80, width: 20, height: 33.33 },
                { top: 33.33, left: 0, width: 16.67, height: 33.34 },
                { top: 33.33, left: 16.67, width: 16.66, height: 33.34 },
                { top: 33.33, left: 33.33, width: 16.67, height: 33.34 },
                { top: 33.33, left: 50, width: 16.67, height: 33.34 },
                { top: 33.33, left: 66.67, width: 16.66, height: 33.34 },
                { top: 33.33, left: 83.33, width: 16.67, height: 33.34 },
                { top: 66.67, left: 0, width: 20, height: 33.33 },
                { top: 66.67, left: 20, width: 20, height: 33.33 },
                { top: 66.67, left: 40, width: 20, height: 33.33 },
                { top: 66.67, left: 60, width: 20, height: 33.33 },
                { top: 66.67, left: 80, width: 20, height: 33.33 },
            ]
        },
    ],
};
