/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _globals = __webpack_require__(1);

	var _globals2 = _interopRequireDefault(_globals);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _stageContainer = __webpack_require__(3);

	var _stageContainer2 = _interopRequireDefault(_stageContainer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function animate() {
	  requestAnimationFrame(animate);
	  _globals2.default.colorStep++ % _constants2.default.COLOR_STEPS;
	  _globals2.default.promiscuityLevel += _globals2.default.isGrowing ? _constants2.default.GROWTH_RATE : -_constants2.default.GROWTH_RATE;
	  if (_globals2.default.isGrowing && _globals2.default.promiscuityLevel >= _constants2.default.PROMISCUITY_MAX) {
	    _globals2.default.isGrowing = false;
	  } else if (!_globals2.default.isGrowing && _globals2.default.promiscuityLevel < 0) {
	    _globals2.default.isGrowing = true;
	  }
	  _stageContainer2.default.tick();
	}

	animate();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  colorStep: 0,
	  promiscuityLevel: 0,
	  isGrowing: true
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  LINE_WIDTH: 1,
	  LINE_LENGTH: 50,
	  LINE_LENGTH_NOISE: 30,
	  LINE_COLOR: 8355711,
	  LINE_SPEED: 0.001,
	  LINE_SPEED_NOISE: 0.005,
	  LINE_ANGLE_NOISE: 30,
	  LINE_MAX: 5000,
	  LINE_MIN: 5,
	  CIRCLE_RADIUS: 3,
	  COLOR_STEPS: 500,
	  COLOR_NOISE: 100,
	  PROMISCUITY_MAX: 3,
	  GROWTH_RATE: 0.00001,
	  GROWTH_NOISE: 1
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _line = __webpack_require__(4);

	var _line2 = _interopRequireDefault(_line);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _mathUtils = __webpack_require__(6);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StageContainer = function () {
	  function StageContainer(renderer) {
	    _classCallCheck(this, StageContainer);

	    this.stage = new PIXI.Container();
	    this.renderer = renderer;
	    this.lines = [];
	  }

	  _createClass(StageContainer, [{
	    key: 'addToStage',
	    value: function addToStage(element) {
	      this.stage.addChild(element);
	    }
	  }, {
	    key: 'removeFromStage',
	    value: function removeFromStage(element) {
	      this.stage.removeChild(element);
	    }
	  }, {
	    key: 'addLine',
	    value: function addLine(line) {
	      if (!line.isInWindow || this.lines.length > _constants2.default.LINE_MAX) return;
	      this.lines.push(line);
	      this.addToStage(line.circle);
	    }
	  }, {
	    key: 'tick',
	    value: function tick() {
	      var _this = this;

	      var newLines = [];
	      this.lines = this.lines.filter(function (line) {
	        line.nextFrame();

	        if (!line.isGrowing) {
	          _this.removeFromStage(line.circle);
	          if (!line.hasHadChildren) {
	            var childLines = line.getChildLines((0, _mathUtils.getGrowthRate)());
	            childLines.forEach(function (childLine) {
	              newLines.push(childLine);
	            });
	          }
	          return false;
	        }
	        return true;
	      });

	      newLines.forEach(function (line) {
	        _this.addLine(line);
	      });

	      while (this.lines.length < _constants2.default.LINE_MIN) {
	        this.addLine(_line2.default.generateRandomLine());
	      }

	      this.renderStage();
	    }
	  }, {
	    key: 'renderStage',
	    value: function renderStage() {
	      this.renderer.render(this.stage);
	    }
	  }]);

	  return StageContainer;
	}();

	var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.view);

	exports.default = new StageContainer(renderer);

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _point = __webpack_require__(5);

	var _point2 = _interopRequireDefault(_point);

	var _mathUtils = __webpack_require__(6);

	var _lineUtils = __webpack_require__(7);

	var _colorUtils = __webpack_require__(8);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Line = function () {
	  function Line(startPoint, angle, length, color, speed) {
	    _classCallCheck(this, Line);

	    this.startPoint = startPoint;
	    this.targetPoint = (0, _mathUtils.getEndPoint)(startPoint, angle, length);
	    this.angle = angle;
	    this.length = length;
	    this.color = color;
	    this.speed = speed;

	    this.percentage = 0;

	    var texture = PIXI.Texture.fromImage('src/assets/circle.png');
	    var circle = new PIXI.Sprite(texture);
	    circle.width = circle.height = _constants2.default.CIRCLE_RADIUS * 2;
	    circle.tint = color;
	    circle.alpha = 0.8;
	    circle.anchor = {
	      x: 0.5,
	      y: 0.5
	    };
	    this.circle = circle;

	    this.moveCircle(startPoint);
	  }

	  _createClass(Line, [{
	    key: 'moveCircle',
	    value: function moveCircle(point) {
	      this.circle.position.x = point.x;
	      this.circle.position.y = point.y;
	    }
	  }, {
	    key: 'getCurrentPosition',
	    value: function getCurrentPosition() {
	      return (0, _mathUtils.getEndPoint)(this.startPoint, this.angle, this.length * this.percentage);
	    }
	  }, {
	    key: 'nextFrame',
	    value: function nextFrame() {
	      this.percentage += this.speed;
	      this.moveCircle(this.getCurrentPosition());
	    }
	  }, {
	    key: 'getChildLines',
	    value: function getChildLines(numChildren) {
	      var _this = this;

	      this.hasHadChildren = true;
	      var newAngles = (0, _lineUtils.getNoisyAngles)(this.angle, numChildren);
	      return newAngles.map(function (angle) {
	        return new Line(_this.targetPoint, angle, (0, _lineUtils.getNoisyLength)(), (0, _colorUtils.getNoisyColor)(), (0, _lineUtils.getNoisySpeed)());
	      });
	    }
	  }, {
	    key: 'shouldBeDrawn',
	    get: function get() {
	      return this.percentage < 1;
	    }
	  }, {
	    key: 'isInWindow',
	    get: function get() {
	      var targetPoint = this.targetPoint;

	      return targetPoint.x > 0 && targetPoint.y > 0 && targetPoint.x < window.innerWidth && targetPoint.y < window.innerHeight;
	    }
	  }], [{
	    key: 'generateRandomLine',
	    value: function generateRandomLine() {
	      var randomPoint = new _point2.default(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
	      var randomAngle = Math.random() * 360;
	      return new Line(randomPoint, randomAngle, (0, _lineUtils.getNoisyLength)(), (0, _colorUtils.getNoisyColor)(), (0, _lineUtils.getNoisySpeed)());
	    }
	  }]);

	  return Line;
	}();

	exports.default = Line;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Point = function Point(x, y) {
	  _classCallCheck(this, Point);

	  this.x = x;
	  this.y = y;
	};

	exports.default = Point;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getEndPoint = exports.degToRad = undefined;
	exports.getGrowthRate = getGrowthRate;

	var _point = __webpack_require__(5);

	var _point2 = _interopRequireDefault(_point);

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _globals = __webpack_require__(1);

	var _globals2 = _interopRequireDefault(_globals);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var degToRad = exports.degToRad = function degToRad(degree) {
	  return degree * Math.PI / 180;
	};

	var getEndPoint = exports.getEndPoint = function getEndPoint(startPoint, angle, length) {
	  var angleRads = degToRad(angle);
	  var y = startPoint.y - Math.sin(angleRads) * length;
	  var x = Math.cos(angleRads) * length + startPoint.x;
	  return new _point2.default(x, y);
	};

	function getGrowthRate() {
	  return Math.round(_globals2.default.promiscuityLevel + (Math.random() - 0.5) * _constants2.default.GROWTH_NOISE);
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getNoisySpeed = getNoisySpeed;
	exports.getNoisyLength = getNoisyLength;
	exports.getNoisyAngles = getNoisyAngles;

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function getNoisySpeed() {
	  return _constants2.default.LINE_SPEED + (Math.random() - 0.5) * _constants2.default.LINE_SPEED_NOISE;
	}

	function getNoisyLength() {
	  return _constants2.default.LINE_LENGTH + (Math.random() - 0.5) * _constants2.default.LINE_LENGTH_NOISE;
	}

	function getNoisyAngles(currentAngle, numAngles) {
	  var topBound = currentAngle + 90;
	  var bottomBound = currentAngle - 90;
	  var angleRange = (topBound - bottomBound) / numAngles;

	  var newAngles = [];
	  var bottomAngleBound = bottomBound;

	  for (var i = 0; i < numAngles; i++) {
	    var angle = bottomAngleBound + angleRange / 2;
	    angle += (Math.random() - 0.5) * _constants2.default.LINE_ANGLE_NOISE;
	    newAngles.push(angle % 360);
	    bottomAngleBound += angleRange;
	  }
	  return newAngles;
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.rgb2Color = undefined;
	exports.rainbow = rainbow;
	exports.getNoisyColor = getNoisyColor;

	var _constants = __webpack_require__(2);

	var _constants2 = _interopRequireDefault(_constants);

	var _globals = __webpack_require__(1);

	var _globals2 = _interopRequireDefault(_globals);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rgb2Color = exports.rgb2Color = function rgb2Color(red, green, blue) {
	  return red * Math.pow(16, 4) + green * Math.pow(16, 2) + blue;
	};

	/**
	 * Converts an HSL color value to RGB. Conversion formula
	 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
	 * Assumes h, s, and l are contained in the set [0, 1] and
	 * returns r, g, and b in the set [0, 255].
	 *
	 * @param   {number}  h       The hue
	 * @param   {number}  s       The saturation
	 * @param   {number}  l       The lightness
	 * @return  {Array}           The RGB representation
	 */
	function hslToRgb(h, s, l) {
	  var r = void 0;
	  var g = void 0;
	  var b = void 0;

	  if (s === 0) {
	    r = g = b = l; // achromatic
	  } else {
	    var hue2rgb = function hue2rgb(p, q, t) {
	      var u = t;
	      if (t < 0) u += 1;
	      if (t > 1) u -= 1;
	      if (u < 1 / 6) return p + (q - p) * 6 * u;
	      if (u < 1 / 2) return q;
	      if (u < 2 / 3) return p + (q - p) * (2 / 3 - u) * 6;
	      return p;
	    };

	    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	    var p = 2 * l - q;
	    r = hue2rgb(p, q, h + 1 / 3);
	    g = hue2rgb(p, q, h);
	    b = hue2rgb(p, q, h - 1 / 3);
	  }

	  return {
	    red: Math.round(r * 255),
	    green: Math.round(g * 255),
	    blue: Math.round(b * 255)
	  };
	}

	function rainbow(n) {
	  var h = n % _constants2.default.COLOR_STEPS / _constants2.default.COLOR_STEPS;

	  var _hslToRgb = hslToRgb(h, 1, 0.5);

	  var red = _hslToRgb.red;
	  var green = _hslToRgb.green;
	  var blue = _hslToRgb.blue;

	  return rgb2Color(red, green, blue);
	}

	function getNoisyColor() {
	  var noiseLevel = _constants2.default.COLOR_NOISE;
	  return rainbow(_globals2.default.colorStep + (Math.random() * noiseLevel - noiseLevel / 2));
	}

/***/ }
/******/ ]);