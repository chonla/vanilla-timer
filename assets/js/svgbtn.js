const PATHS = {
  'play': {'d': 'M 80,50 20,90 20,10 z'}
};
const SVG_XMLNS = 'http://www.w3.org/2000/svg';

function createSvgButton() {
  const baseElement = $(this);
  const btnSvg = $(document.createElementNS(SVG_XMLNS, 'svg'));
  const iconSvg = $(document.createElementNS(SVG_XMLNS, 'path'));
  btnSvg.addClass(baseElement.attr('class') + ' svg-btn-small');
  btnSvg.attr('viewBox', '0 0 100 100');
  setTimeout(() => {
    iconSvg.attr(PATHS['play']);
    btnSvg.append(iconSvg);
    baseElement.replaceWith(btnSvg);
  }, 0);
}

$(() => {
  $('span.svg-btn').each(createSvgButton);
});
