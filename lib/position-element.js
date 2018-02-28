(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("position-element", [], factory);
	else if(typeof exports === 'object')
		exports["position-element"] = factory();
	else
		root["position-element"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _positionElement = __webpack_require__(1);

Object.defineProperty(exports, 'default', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_positionElement).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = positionElement;

var _placements = __webpack_require__(2);

var _styleElement = __webpack_require__(3);

var _styleElement2 = _interopRequireDefault(_styleElement);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isElementVisibleInViewport = function isElementVisibleInViewport(el) {
  var rect = el.getBoundingClientRect();

  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};

function positionElement(config) {
  var element = config.element,
      anchorElement = config.anchorElement,
      preferredPlacement = config.preferredPlacement,
      distance = config.distance,
      alignmentOffset = config.alignmentOffset,
      autoReposition = config.autoReposition;


  if (autoReposition === false) {
    var placementStyle = (0, _placements.getPlacementStyle)({ placement: preferredPlacement, element: element, anchorElement: anchorElement, distance: distance, alignmentOffset: alignmentOffset });
    (0, _styleElement2.default)(element, placementStyle);

    return preferredPlacement;
  }

  var placements = (0, _placements.getPlacementCandidates)(preferredPlacement);
  var found = [].concat(_toConsumableArray(placements), [preferredPlacement]).find(function (placement) {
    var placementStyle = (0, _placements.getPlacementStyle)({ placement: placement, element: element, anchorElement: anchorElement, distance: distance, alignmentOffset: alignmentOffset });

    (0, _styleElement2.default)(element, placementStyle);
    return isElementVisibleInViewport(element);
  });

  return found || preferredPlacement;
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPlacementInfo = getPlacementInfo;
exports.getPlacementStyle = getPlacementStyle;
exports.getPlacementCandidates = getPlacementCandidates;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/*
 Placement coordinates are part of the algorithm in deciding the
 closest next location for consideration if a preferred location does not
 satisfy display requirements (e.g. visible in viewport).
 */
var placementSettings = {
  'up-left': {
    direction: 'up',
    alignment: 'left',
    coordinate: [-2, 3]
  },
  'up-center': {
    direction: 'up',
    alignment: 'center',
    coordinate: [0, 1]
  },
  'up-right': {
    direction: 'up',
    alignment: 'right',
    coordinate: [2, 3]
  },
  'down-left': {
    direction: 'down',
    alignment: 'left',
    coordinate: [-2, -3]
  },
  'down-center': {
    direction: 'down',
    alignment: 'center',
    coordinate: [0, -1]
  },
  'down-right': {
    direction: 'down',
    alignment: 'right',
    coordinate: [2, -3]
  },
  'left-top': {
    direction: 'left',
    alignment: 'top',
    coordinate: [-4, 1]
  },
  'left-middle': {
    direction: 'left',
    alignment: 'middle',
    coordinate: [-2.5, 0]
  },
  'left-bottom': {
    direction: 'left',
    alignment: 'bottom',
    coordinate: [-4, -1]
  },
  'right-top': {
    direction: 'right',
    alignment: 'top',
    coordinate: [4, 1]
  },
  'right-middle': {
    direction: 'right',
    alignment: 'middle',
    coordinate: [2.5, 0]
  },
  'right-bottom': {
    direction: 'right',
    alignment: 'bottom',
    coordinate: [4, -1]
  }
};

var getPlacementVariance = function getPlacementVariance(placementA, placementB) {
  var placementInfoA = getPlacementInfo(placementA);
  var placementInfoB = getPlacementInfo(placementB);
  var coordinateA = placementInfoA.coordinate || [0, 0];
  var coordinateB = placementInfoB.coordinate || [0, 0];

  return Math.pow(coordinateA[0] - coordinateB[0], 2) + Math.pow(coordinateA[1] - coordinateB[1], 2);
};

function getPlacementInfo(placement) {
  return placementSettings[placement] || {};
}

function getPlacementStyle(_ref) {
  var placement = _ref.placement,
      element = _ref.element,
      anchorElement = _ref.anchorElement,
      _ref$distance = _ref.distance,
      distance = _ref$distance === undefined ? 0 : _ref$distance,
      _ref$alignmentOffset = _ref.alignmentOffset,
      alignmentOffset = _ref$alignmentOffset === undefined ? 0 : _ref$alignmentOffset;

  var placementInfo = getPlacementInfo(placement);
  var anchorRect = anchorElement.getBoundingClientRect();
  var elemRect = element.getBoundingClientRect();

  // default position center within anchor
  var placementStyle = {
    left: anchorElement.offsetLeft + (anchorRect.width - elemRect.width) / 2,
    top: anchorElement.offsetTop + (anchorRect.height - elemRect.height) / 2
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
      placementStyle.left = anchorElement.offsetLeft + anchorRect.width - elemRect.width - alignmentOffset;
      break;
    case 'top':
      placementStyle.top = anchorElement.offsetTop + alignmentOffset;
      break;
    case 'middle':
      placementStyle.top = anchorElement.offsetTop + (anchorRect.height - elemRect.height) / 2;
      break;
    case 'bottom':
      placementStyle.top = anchorElement.offsetTop + (anchorRect.height - elemRect.height) - alignmentOffset;
      break;
    default:
      break;
  }

  return placementStyle;
};

function getPlacementCandidates(preferredPlacement) {
  var sortFunc = function sortFunc(placementA, placementB) {
    return getPlacementVariance(placementA, preferredPlacement) - getPlacementVariance(placementB, preferredPlacement);
  };

  var sortedPlacements = Object.keys(placementSettings).sort(sortFunc);

  return sortedPlacements.includes(preferredPlacement) ? sortedPlacements : [preferredPlacement].concat(_toConsumableArray(sortedPlacements));
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (el, style) {
  var animationDuration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (el) {
    var newStyle = _extends({}, style);

    Object.keys(newStyle).forEach(function (prop) {
      var value = newStyle[prop];
      if (Number.isFinite(value) && !['opacity', 'zIndex'].includes(prop)) {
        newStyle[prop] = value + 'px';
      }
    });

    if (animationDuration) {
      Object.assign(el.style, {
        transition: 'all ' + animationDuration + 's'
      });
    }
    Object.assign(el.style, newStyle);
  }
};

/***/ })
/******/ ]);
});
//# sourceMappingURL=position-element.js.map