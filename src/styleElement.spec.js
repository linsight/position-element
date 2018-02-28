import { expect } from 'chai';
import styleElement from './styleElement';

describe('[styleElement]', () => {
  it('should be able to apply styles to element', () => {
    const element = { style: {} };
    const style = {
      width: 10,
      position: 'absolute',
      opacity: 10,
      zIndex: 10,
      top: '14px',
    };
    styleElement(element, style);

    expect(element.style.width).to.equal('10px');
    expect(element.style.position).to.equal('absolute');
    expect(element.style.opacity).to.equal(10);
    expect(element.style.zIndex).to.equal(10);
    expect(element.style.top).to.equal('14px');
    expect(element.style.left).to.be.undefined;
  });
});
