const NS = 'http://www.w3.org/2000/svg';

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
});

export function renderChart(container, totalsByCategory) {
  container.innerHTML = '';

  const entries = Object.entries(totalsByCategory);
  if (entries.length === 0) {
    const empty = document.createElement('p');
    empty.className = 'empty-state';
    empty.textContent = 'Sin datos este mes.';
    container.appendChild(empty);
    return;
  }

  const width = 600;
  const height = 300;
  const padding = { top: 20, right: 20, bottom: 60, left: 70 };
  const usableWidth = width - padding.left - padding.right;
  const usableHeight = height - padding.top - padding.bottom;

  const maxValue = Math.max(...entries.map(([, v]) => v));
  const barWidth = usableWidth / entries.length;

  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('width', '100%');
  svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');

  entries.forEach(([category, value], i) => {
    const barHeight = (value / maxValue) * usableHeight;
    const x = padding.left + i * barWidth + barWidth * 0.15;
    const y = padding.top + (usableHeight - barHeight);
    const w = barWidth * 0.7;

    const rect = document.createElementNS(NS, 'rect');
    rect.setAttribute('x', x);
    rect.setAttribute('y', y);
    rect.setAttribute('width', w);
    rect.setAttribute('height', barHeight);
    rect.setAttribute('fill', '#4b6bf5');
    rect.setAttribute('rx', '4');
    svg.appendChild(rect);

    const labelCat = document.createElementNS(NS, 'text');
    labelCat.setAttribute('x', x + w / 2);
    labelCat.setAttribute('y', height - padding.bottom + 18);
    labelCat.setAttribute('text-anchor', 'middle');
    labelCat.setAttribute('font-size', '12');
    labelCat.textContent = category;
    svg.appendChild(labelCat);

    const labelValue = document.createElementNS(NS, 'text');
    labelValue.setAttribute('x', x + w / 2);
    labelValue.setAttribute('y', y - 4);
    labelValue.setAttribute('text-anchor', 'middle');
    labelValue.setAttribute('font-size', '11');
    labelValue.setAttribute('fill', '#555');
    labelValue.textContent = currencyFormatter.format(value);
    svg.appendChild(labelValue);
  });

  container.appendChild(svg);
}
