/*
 Placement coordinates are part of the algorithm in deciding the
 closest next location for consideration if a preferred location does not
 satisfy display requirements (e.g. visible in viewport).
 */
const placementSettings = {
  'up-left': {
    direction: 'up',
    alignment: 'left',
    coordinate: [-2, 3],
  },
  'up-center': {
    direction: 'up',
    alignment: 'center',
    coordinate: [0, 1],
  },
  'up-right': {
    direction: 'up',
    alignment: 'right',
    coordinate: [2, 3],
  },
  'down-left': {
    direction: 'down',
    alignment: 'left',
    coordinate: [-2, -3],
  },
  'down-center': {
    direction: 'down',
    alignment: 'center',
    coordinate: [0, -1],
  },
  'down-right': {
    direction: 'down',
    alignment: 'right',
    coordinate: [2, -3],
  },
  'left-top': {
    direction: 'left',
    alignment: 'top',
    coordinate: [-4, 1],
  },
  'left-middle': {
    direction: 'left',
    alignment: 'middle',
    coordinate: [-2.5, 0],
  },
  'left-bottom': {
    direction: 'left',
    alignment: 'bottom',
    coordinate: [-4, -1],
  },
  'right-top': {
    direction: 'right',
    alignment: 'top',
    coordinate: [4, 1],
  },
  'right-middle': {
    direction: 'right',
    alignment: 'middle',
    coordinate: [2.5, 0],
  },
  'right-bottom': {
    direction: 'right',
    alignment: 'bottom',
    coordinate: [4, -1],
  },
};

const getPlacementVariance = (placementA, placementB) => {
  const placementInfoA = getPlacementInfo(placementA);
  const placementInfoB = getPlacementInfo(placementB);
  const coordinateA = placementInfoA.coordinate || [0, 0];
  const coordinateB = placementInfoB.coordinate || [0, 0];

  return Math.pow(coordinateA[0] - coordinateB[0], 2) +
    Math.pow(coordinateA[1] - coordinateB[1], 2);
};

export function getPlacementInfo(placement) {
  return placementSettings[placement] || {};
}

export function getPlacementStyle(
  { placement, element, anchorElement, distance = 0, alignmentOffset = 0 }
) {
  const placementInfo = getPlacementInfo(placement);
  const anchorRect = anchorElement.getBoundingClientRect();
  const elemRect = element.getBoundingClientRect();

  // default position center within anchor
  const placementStyle = {
    left: anchorElement.offsetLeft + (anchorRect.width - elemRect.width) / 2,
    top: anchorElement.offsetTop + (anchorRect.height - elemRect.height) / 2,
  };

  switch (placementInfo.direction) {
    case 'up':
      placementStyle.top = anchorElement.offsetTop - distance - elemRect.height;
      break;
    case 'down':
      placementStyle.top = anchorElement.offsetTop + distance + anchorRect.height;
      break;
    case 'left':
      placementStyle.left = anchorElement.offsetLeft - distance - elemRect.width;
      break;
    case 'right':
      placementStyle.left = anchorElement.offsetLeft + distance + anchorRect.width;
      break;
    default:
      break;
  }

  switch (placementInfo.alignment) {
    case 'left':
      placementStyle.left = anchorElement.offsetLeft + alignmentOffset;
      break;
    case 'center':
      placementStyle.left = anchorElement.offsetLeft + (anchorRect.width - elemRect.width) / 2;
      break;
    case 'right':
      placementStyle.left = anchorElement.offsetLeft +
        anchorRect.width - elemRect.width - alignmentOffset;
      break;
    case 'top':
      placementStyle.top = anchorElement.offsetTop + alignmentOffset;
      break;
    case 'middle':
      placementStyle.top = anchorElement.offsetTop + (anchorRect.height - elemRect.height) / 2;
      break;
    case 'bottom':
      placementStyle.top = anchorElement.offsetTop +
        (anchorRect.height - elemRect.height) - alignmentOffset;
      break;
    default:
      break;
  }

  return placementStyle;
};


export function getPlacementCandidates(preferredPlacement){
  const sortFunc = (placementA, placementB) =>
  getPlacementVariance(placementA, preferredPlacement) - getPlacementVariance(placementB, preferredPlacement);

  const sortedPlacements = Object.keys(placementSettings).sort(sortFunc);

  return sortedPlacements.includes(preferredPlacement) ?
    sortedPlacements : [preferredPlacement, ...sortedPlacements];
};
