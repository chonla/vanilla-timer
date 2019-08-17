const PATHS = {
  'play': {'d': 'M3.9,18.9V5.1c0-1.6,1.7-2.6,3-1.8l12,6.9c1.4,0.8,1.4,2.9,0,3.7l-12,6.9C5.6,21.5,3.9,20.5,3.9,18.9z'}
};
const SVG_XMLNS = 'http://www.w3.org/2000/svg';

function createSvgButton() {
  const baseElement = $(this);
  const btnSvg = $(document.createElementNS(SVG_XMLNS, 'svg'));
  const iconSvg = $(document.createElementNS(SVG_XMLNS, 'path'));
  btnSvg.addClass(baseElement.attr('class'));
  btnSvg.attr('viewBox', `0 0 24 24`);
  setTimeout(() => {
    iconSvg.attr(PATHS['play']);
    btnSvg.append(iconSvg);
    baseElement.replaceWith(btnSvg);
  }, 0);
}

$(() => {
  $('span.svg-btn').each(createSvgButton);
});
