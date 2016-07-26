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

	var _stageContainer = __webpack_require__(1);

	var _stageContainer2 = _interopRequireDefault(_stageContainer);

	var _line = __webpack_require__(2);

	var _line2 = _interopRequireDefault(_line);

	var _point = __webpack_require__(3);

	var _point2 = _interopRequireDefault(_point);

	var _mathUtils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var graphics = new PIXI.Graphics();

	_stageContainer2.default.addLine(new _line2.default(new _point2.default(100, 10), (0, _mathUtils.degToRad)(-45), 300, 3093151));

	animate();

	function animate() {
	  requestAnimationFrame(animate);
	  _stageContainer2.default.tick();
	}

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var StageContainer = function () {
	  function StageContainer(renderer) {
	    _classCallCheck(this, StageContainer);

	    this.stage = new PIXI.Container();
	    this.renderer = renderer;
	    this.lines = [];
	  }

	  _createClass(StageContainer, [{
	    key: "addToStage",
	    value: function addToStage(element) {
	      this.stage.addChild(element);
	    }
	  }, {
	    key: "removeFromStage",
	    value: function removeFromStage(element) {
	      this.stage.removeChild(element);
	    }
	  }, {
	    key: "addLine",
	    value: function addLine(line) {
	      this.lines.push(line);
	      this.addToStage(line.lineGraphic);
	      this.addToStage(line.circleGraphic);
	    }
	  }, {
	    key: "tick",
	    value: function tick() {
	      var _this = this;

	      this.lines.forEach(function (line) {
	        if (!line.isGrowing) {
	          _this.removeFromStage(line.circleGraphic);
	          line.removeCircle();
	        }
	        line.nextFrame();
	      });
	      this.renderStage();
	    }
	  }, {
	    key: "renderStage",
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _point = __webpack_require__(3);

	var _point2 = _interopRequireDefault(_point);

	var _mathUtils = __webpack_require__(4);

	var MathUtils = _interopRequireWildcard(_mathUtils);

	var _constants = __webpack_require__(5);

	var _constants2 = _interopRequireDefault(_constants);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Line = function () {
	  function Line(startPoint, angle, length, color) {
	    _classCallCheck(this, Line);

	    this.startPoint = startPoint;
	    this.angle = angle;
	    this.length = length;
	    this.color = color;

	    this.percentage = 0;
	    this.isGrowing = true;

	    this.lineGraphic = new PIXI.Graphics();
	    this.circleGraphic = new PIXI.Graphics();
	    this.drawCircle(startPoint);
	  }

	  _createClass(Line, [{
	    key: 'drawLine',
	    value: function drawLine(startPoint, endPoint) {
	      this.lineGraphic.clear();
	      this.lineGraphic.lineStyle(_constants2.default.LINE_WIDTH, _constants2.default.LINE_COLOR);
	      this.lineGraphic.moveTo(startPoint.x, startPoint.y);
	      this.lineGraphic.lineTo(endPoint.x, endPoint.y);
	    }
	  }, {
	    key: 'drawCircle',
	    value: function drawCircle(point) {
	      this.circleGraphic.clear();
	      this.circleGraphic.beginFill(this.color);
	      this.circleGraphic.drawCircle(point.x, point.y, _constants2.default.CIRCLE_RADIUS);
	    }
	  }, {
	    key: 'removeLine',
	    value: function removeLine() {
	      if (this.lineGraphic) {
	        this.lineGraphic.destroy();
	        delete this.lineGraphic;
	      }
	    }
	  }, {
	    key: 'removeCircle',
	    value: function removeCircle() {
	      if (this.circleGraphic) {
	        this.circleGraphic.destroy();
	        delete this.circleGraphic;
	      }
	    }
	  }, {
	    key: 'cleanUpLine',
	    value: function cleanUpLine() {
	      this.removeLine();
	      this.removeCircle();
	    }
	  }, {
	    key: 'nextFrame',
	    value: function nextFrame() {
	      if (this.isGrowing) {
	        this.percentage += 0.1;
	      } else {
	        this.percentage -= 0.1;
	      }

	      if (this.percentage >= 1 && this.isGrowing) {
	        this.isGrowing = false;
	      }
	      var startPoint = void 0,
	          endPoint = void 0;
	      if (this.isGrowing) {
	        startPoint = this.startPoint;
	        endPoint = MathUtils.getEndPoint(this.startPoint, this.angle, this.length * this.percentage);
	      } else {
	        startPoint = MathUtils.getEndPoint(this.startPoint, this.angle, this.length * (1 - this.percentage));
	        endPoint = MathUtils.getEndPoint(this.startPoint, this.angle, this.length);
	      }

	      this.drawLine(startPoint, endPoint);
	      if (this.isGrowing) this.drawCircle(endPoint);
	    }
	  }, {
	    key: 'shouldBeDrawn',
	    get: function get() {
	      return this.isGrowing || this.percentage;
	    }
	  }]);

	  return Line;
	}();

	exports.default = Line;

/***/ },
/* 3 */
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.degToRad = exports.getEndPoint = undefined;

	var _point = __webpack_require__(3);

	var _point2 = _interopRequireDefault(_point);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var getEndPoint = exports.getEndPoint = function getEndPoint(startPoint, angle, length) {
	  var y = startPoint.y - Math.sin(angle) * length;
	  var x = Math.cos(angle) * length + startPoint.x;
	  return new _point2.default(x, y);
	};

	var degToRad = exports.degToRad = function degToRad(degree) {
	  return degree * Math.PI / 180;
	};

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = {
	  LINE_WIDTH: 1,
	  LINE_COLOR: 8355711,
	  CIRCLE_RADIUS: 4
	};

/***/ }
/******/ ]);