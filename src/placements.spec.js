import { expect } from 'chai';
import { getPlacementStyle } from './placements';

describe('placements', () => {
  describe('getPlacementStyle', () => {
    let anchorElement = null;
    let element = null;

    beforeEach(() => {
      anchorElement = {
        getBoundingClientRect: () => (
          {
            width: 100,
            height: 100,
            top: 100,
            left: 100,
          }),
        offsetTop: 100,
        offsetLeft: 100,
      };
      element = {
        getBoundingClientRect: () => (
          {
            width: 50,
            height: 50,
          }),
      };
    });

    it('should be able to get anchored position', () => {
      let position = getPlacementStyle(
        { anchorElement, element, placement: 'right-middle' }
      );
      expect(position).to.deep.equal({ left: 200, top: 125 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'right-top' }
      );
      expect(position).to.deep.equal({ left: 200, top: 100 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'right-bottom' }
      );
      expect(position).to.deep.equal({ left: 200, top: 150 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'left-top' }
      );
      expect(position).to.deep.equal({ left: 50, top: 100 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'left-middle' }
      );
      expect(position).to.deep.equal({ left: 50, top: 125 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'left-bottom' }
      );
      expect(position).to.deep.equal({ left: 50, top: 150 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'up-left' }
      );
      expect(position).to.deep.equal({ left: 100, top: 50 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'up-center' }
      );
      expect(position).to.deep.equal({ left: 125, top: 50 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'up-right' }
      );
      expect(position).to.deep.equal({ left: 150, top: 50 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'down-left' }
      );
      expect(position).to.deep.equal({ left: 100, top: 200 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'down-center' }
      );
      expect(position).to.deep.equal({ left: 125, top: 200 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'down-right' }
      );
      expect(position).to.deep.equal({ left: 150, top: 200 });

      position = getPlacementStyle(
        { anchorElement, element, placement: 'foo' }
      );
      expect(position).to.deep.equal({ left: 125, top: 125 });
    });
  });
});
