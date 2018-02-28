export default function (el, style, animationDuration = 0) {
  if (el) {
    const newStyle = { ...style };

    Object.keys(newStyle).forEach(prop => {
      const value = newStyle[prop];
      if (Number.isFinite(value) && !['opacity', 'zIndex'].includes(prop)) {
        newStyle[prop] = `${value}px`;
      }
    });

    if (animationDuration) {
      Object.assign(el.style, {
        transition: `all ${animationDuration}s`,
      });
    }
    Object.assign(el.style, newStyle);
  }
}
