/******/ (function(modules) { // webpackBootstrap
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


var _Keyboard = __webpack_require__(1);

var _Keyboard2 = _interopRequireDefault(_Keyboard);

var _Collision = __webpack_require__(2);

var _Collision2 = _interopRequireDefault(_Collision);

var _World = __webpack_require__(3);

var _World2 = _interopRequireDefault(_World);

var _Player = __webpack_require__(4);

var _Player2 = _interopRequireDefault(_Player);

var _House = __webpack_require__(5);

var _House2 = _interopRequireDefault(_House);

var _Road = __webpack_require__(6);

var _Road2 = _interopRequireDefault(_Road);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Game = self.Game = {};

Game.Canvas = document.getElementById("canvas");
Game.viewPortPadding = 20;
Game.Keyboard = new _Keyboard2.default();
Game.Player = new _Player2.default(Game.Canvas);
Game.World = new _World2.default([new _House2.default(100, 100), new _House2.default(440, 100), new _Road2.default(100, 250)]);
Game.Collision = new _Collision2.default(Game.Player, Game.World);

var upPressed = false;
var rightPressed = false;
var leftPressed = false;
var downPressed = false;

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e) {
  if (e.keyCode === 38) {
    upPressed = true;
  }
  if (e.keyCode === 39) {
    rightPressed = true;
  }
  if (e.keyCode === 37) {
    leftPressed = true;
  }
  if (e.keyCode === 40) {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode === 38) {
    upPressed = false;
  }
  if (e.keyCode === 39) {
    rightPressed = false;
  }
  if (e.keyCode === 37) {
    leftPressed = false;
  }
  if (e.keyCode === 40) {
    downPressed = false;
  }
}

window.onresize = function (event) {
  Game.Player.centerPosition();
};

function draw() {
  var ctx = Game.Canvas.getContext('2d');
  ctx.clearRect(0, 0, Game.Canvas.width, Game.Canvas.height);
  ctx.canvas.width = window.innerWidth;
  ctx.canvas.height = window.innerHeight;

  Game.World.draw(Game.Canvas);
  Game.Player.draw(Game.Canvas);

  if (Game.Collision.detected()) {
    Game.Collision.bounceBack();
  } else {
    if (rightPressed && Game.Player.position.x + Game.Player.dimensions.width < Game.Canvas.width - Game.viewPortPadding) {
      Game.World.getObjects().forEach(function (object) {
        return object.position.x -= Game.Player.moveSpeed;
      });
    }

    if (leftPressed && Game.Player.position.x > Game.viewPortPadding) {
      Game.World.getObjects().forEach(function (object) {
        return object.position.x += Game.Player.moveSpeed;
      });
    }

    if (downPressed && Game.Player.position.y + Game.Player.dimensions.height < Game.Canvas.height - Game.viewPortPadding) {
      Game.World.getObjects().forEach(function (object) {
        return object.position.y -= Game.Player.moveSpeed;
      });
    }

    if (upPressed && Game.Player.position.y > Game.viewPortPadding) {
      Game.World.getObjects().forEach(function (object) {
        return object.position.y += Game.Player.moveSpeed;
      });
    }
  }

  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Keyboard = function () {
  function Keyboard() {
    _classCallCheck(this, Keyboard);

    this.up = false;
    this.down = false;
    this.right = false;
    this.left = false;
  }

  _createClass(Keyboard, [{
    key: "keyDownHandler",
    value: function keyDownHandler(e) {
      if (e.keyCode === 38) this.up = true;
      if (e.keyCode === 39) this.right = true;
      if (e.keyCode === 37) this.left = true;
      if (e.keyCode === 40) this.down = true;
    }
  }, {
    key: "keyUpHandler",
    value: function keyUpHandler(e) {
      if (e.keyCode === 38) this.up = false;
      if (e.keyCode === 39) this.right = false;
      if (e.keyCode === 37) this.left = false;
      if (e.keyCode === 40) this.down = false;
    }
  }]);

  return Keyboard;
}();

exports.default = Keyboard;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collision = function () {
  function Collision(player, world) {
    _classCallCheck(this, Collision);

    this.player = player;
    this.world = world;
  }

  _createClass(Collision, [{
    key: 'detected',
    value: function detected() {
      var that = this;
      this.player.collidedWith = this.world.getSolidObjects().filter(function (object) {
        var topWall = that.player.position.y + that.player.dimensions.height > object.position.y;
        var rightWall = that.player.position.x < object.position.x + object.dimensions.width;
        var leftWall = that.player.position.x + that.player.dimensions.width > object.position.x;
        var bottomWall = that.player.position.y < object.position.y + object.dimensions.height;

        return topWall && rightWall && leftWall && bottomWall;
      })[0];

      return Boolean(this.player.collidedWith);
    }
  }, {
    key: 'bounceBack',
    value: function bounceBack() {
      var _walls,
          _this = this;

      var topWall = Math.abs(this.player.position.y - this.player.collidedWith.position.y);
      var rightWall = Math.abs(this.player.position.x - (this.player.collidedWith.position.x + this.player.collidedWith.dimensions.width));
      var leftWall = Math.abs(this.player.position.x - this.player.collidedWith.position.x);
      var bottomWall = Math.abs(this.player.position.y - (this.player.collidedWith.position.y + this.player.collidedWith.dimensions.height));

      var walls = (_walls = {}, _defineProperty(_walls, topWall, 'top'), _defineProperty(_walls, rightWall, 'right'), _defineProperty(_walls, leftWall, 'left'), _defineProperty(_walls, bottomWall, 'bottom'), _walls);

      var closestToWall = walls[Math.min(topWall, rightWall, leftWall, bottomWall)];

      switch (closestToWall) {
        case 'top':
          this.world.getObjects().forEach(function (object) {
            return object.position.y += _this.player.moveSpeed + 2;
          });
          break;

        case 'right':
          this.world.getObjects().forEach(function (object) {
            return object.position.x -= _this.player.moveSpeed + 2;
          });
          break;

        case 'left':
          this.world.getObjects().forEach(function (object) {
            return object.position.x += _this.player.moveSpeed + 2;
          });
          break;

        case 'bottom':
          this.world.getObjects().forEach(function (object) {
            return object.position.y -= _this.player.moveSpeed + 2;
          });
          break;
      }
    }
  }]);

  return Collision;
}();

exports.default = Collision;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var World = function () {
  function World(objects) {
    _classCallCheck(this, World);

    this.objects = objects;
  }

  _createClass(World, [{
    key: "getObjects",
    value: function getObjects() {
      return this.objects;
    }
  }, {
    key: "getSolidObjects",
    value: function getSolidObjects() {
      return this.objects.filter(function (object) {
        return object.isSolid;
      });
    }
  }, {
    key: "draw",
    value: function draw(Canvas) {
      this.objects.forEach(function (object) {
        return object.draw(Canvas);
      });
    }
  }]);

  return World;
}();

exports.default = World;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
  function Player(Canvas) {
    _classCallCheck(this, Player);

    this.moveSpeed = 8;

    this.dimensions = { width: 20, height: 20 };

    this.centerPosition();

    this.collidedWith = false;
  }

  _createClass(Player, [{
    key: "centerPosition",
    value: function centerPosition() {
      this.position = {
        x: window.innerWidth / 2 - this.dimensions.width / 2,
        y: window.innerHeight / 2 - this.dimensions.height / 2
      };
    }
  }, {
    key: "draw",
    value: function draw(Canvas) {
      var ctx = Canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Home = function () {
  function Home(x, y) {
    _classCallCheck(this, Home);

    this.position = {
      x: x,
      y: y
    };

    this.dimensions = {
      width: 300,
      height: 150
    };

    this.isSolid = true;
  }

  _createClass(Home, [{
    key: "draw",
    value: function draw(Canvas) {
      var ctx = Canvas.getContext("2d");
      ctx.beginPath();
      ctx.fillStyle = '#ff8a1f';
      ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Home;
}();

exports.default = Home;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Road = function () {
  function Road(x, y) {
    _classCallCheck(this, Road);

    this.position = { x: x, y: y };

    this.dimensions = { width: 100, height: 100 };

    this.isSolid = false;
  }

  _createClass(Road, [{
    key: "draw",
    value: function draw(Canvas) {
      var ctx = Canvas.getContext("2d");
      ctx.beginPath();
      ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
      ctx.fillStyle = '#616161';
      ctx.fill();
      ctx.closePath();
    }
  }]);

  return Road;
}();

exports.default = Road;

/***/ })
/******/ ]);