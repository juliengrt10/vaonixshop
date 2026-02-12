export type Point = { x: number; y: number };

function adj(m: number[]): number[] {
    return [
        m[4] * m[8] - m[5] * m[7],
        m[2] * m[7] - m[1] * m[8],
        m[1] * m[5] - m[2] * m[4],
        m[5] * m[6] - m[3] * m[8],
        m[0] * m[8] - m[2] * m[6],
        m[2] * m[3] - m[0] * m[5],
        m[3] * m[7] - m[4] * m[6],
        m[1] * m[6] - m[0] * m[7],
        m[0] * m[4] - m[1] * m[3],
    ];
}

function multmm(a: number[], b: number[]): number[] {
    const c = new Array(9);
    for (let i = 0; i < 3; ++i) {
        for (let j = 0; j < 3; ++j) {
            let sum = 0;
            for (let k = 0; k < 3; ++k) {
                sum += a[3 * i + k] * b[3 * k + j];
            }
            c[3 * i + j] = sum;
        }
    }
    return c;
}

function multmv(m: number[], v: number[]): number[] {
    return [
        m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
        m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
        m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
    ];
}

function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number): number[] {
    const m = [
        x1, x2, x3,
        y1, y2, y3,
        1, 1, 1,
    ];
    const v = multmv(adj(m), [x4, y4, 1]);
    return multmm(m, [
        v[0], 0, 0,
        0, v[1], 0,
        0, 0, v[2],
    ]);
}

function general2DProjection(
    x1s: number, y1s: number, x1d: number, y1d: number,
    x2s: number, y2s: number, x2d: number, y2d: number,
    x3s: number, y3s: number, x3d: number, y3d: number,
    x4s: number, y4s: number, x4d: number, y4d: number
): number[] {
    const s = basisToPoints(x1s, y1s, x2s, y2s, x3s, y3s, x4s, y4s);
    const d = basisToPoints(x1d, y1d, x2d, y2d, x3d, y3d, x4d, y4d);
    return multmm(d, adj(s));
}

function project(m: number[], x: number, y: number): Point {
    const v = multmv(m, [x, y, 1]);
    return { x: v[0] / v[2], y: v[1] / v[2] };
}

export function getPerspectiveTransform(
    src: [Point, Point, Point, Point],
    dst: [Point, Point, Point, Point]
): string {
    const m = general2DProjection(
        src[0].x, src[0].y, dst[0].x, dst[0].y,
        src[1].x, src[1].y, dst[1].x, dst[1].y,
        src[2].x, src[2].y, dst[2].x, dst[2].y,
        src[3].x, src[3].y, dst[3].x, dst[3].y
    );

    // CSS matrix3d is column-major 4x4
    // The 3x3 homography matrix M = [a b c; d e f; g h i]
    // maps to CSS matrix3d(a, d, 0, g, b, e, 0, h, 0, 0, 1, 0, c, f, 0, i)
    // Wait, CSS transforms are typically:
    // x' = (a*x + c*y + tx) / (p*x + q*y + w)
    // y' = (b*x + d*y + ty) / (p*x + q*y + w)
    //
    // Our matrix m is [m0 m1 m2; m3 m4 m5; m6 m7 m8]
    // representing:
    // x' = (m0*x + m1*y + m2) / (m6*x + m7*y + m8)
    // y' = (m3*x + m4*y + m5) / (m6*x + m7*y + m8)
    //
    // CSS matrix3d values are:
    // m11 m12 m13 m14
    // m21 m22 m23 m24
    // m31 m32 m33 m34
    // m41 m42 m43 m44
    //
    // In CSS syntax: matrix3d(m11, m12, m13, m14, m21, ...)
    // which corresponds to:
    // matrix3d(
    //   a, b, 0, 0,
    //   c, d, 0, 0,
    //   0, 0, 1, 0,
    //   tx, ty, 0, 1
    // ) for affine.
    //
    // For projective 3d:
    // matrix3d(
    //   m0, m3, 0, m6,
    //   m1, m4, 0, m7,
    //   0,   0, 1,  0,
    //   m2, m5, 0, m8
    // )

    // Normalize so m8 is 1 for numerical stability in CSS
    const n = m.map(v => v / m[8]);

    // Note: The order in matrix3d(...) is column-major.
    // m[0] m[3] 0 m[6]
    // m[1] m[4] 0 m[7]
    // 0    0    1 0
    // m[2] m[5] 0 m[8]

    return `matrix3d(
        ${n[0]}, ${n[3]}, 0, ${n[6]},
        ${n[1]}, ${n[4]}, 0, ${n[7]},
        0, 0, 1, 0,
        ${n[2]}, ${n[5]}, 0, ${n[8]}
    )`;
}
