function checkCards(rows, lt, x = 80, w = 960, h = 140, gap = 170, top = 110, col = C.green) {
  return rows.map(([hd, sub], i) => {
    const y = top + i * gap, p = seg(lt, 0.3 + i * 0.6, 0.8 + i * 0.6), tk = seg(lt, 0.9 + i * 0.6, 1.2 + i * 0.6);
    return `<g opacity="${p}" transform="translate(${x + (1 - p) * 30} ${y})"><rect width="${w}" height="${h}" rx="20" fill="${col === C.red ? C.redSoft : C.bg}"/>${T(150, sub ? 62 : h / 2 + 13, hd, { size: 36, w: 800 })}${sub ? T(150, 104, sub, { size: 27, fill: C.muted }) : ""}${col === C.red ? cross(70, h / 2, 22, tk) : tick(70, h / 2, 0.6 + 0.6 * tk, tk)}</g>`;
  }).join("");
}
