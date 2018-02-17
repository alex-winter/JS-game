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

var _StreetBuilder = __webpack_require__(5);

var _StreetBuilder2 = _interopRequireDefault(_StreetBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var draw = void 0;

new Promise(function (resolve, reject) {
  var Game = self.Game = {};

  var street = new _StreetBuilder2.default(100, 200);

  street.make();

  Game.Canvas = document.getElementById("canvas");
  Game.viewPortPadding = 20;
  Game.Keyboard = new _Keyboard2.default();
  Game.Player = new _Player2.default(Game.Canvas);
  Game.World = new _World2.default();
  Game.Collision = new _Collision2.default(Game.Player, Game.World);

  Game.World.loadObjects(street.objects);

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

  window.onresize = function () {
    Game.Player.centerPosition();
  };

  draw = function draw() {

    var ctx = Game.Canvas.getContext('2d');
    ctx.rect(0, 0, Game.Canvas.width, Game.Canvas.height);
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

    // window.requestAnimationFrame(draw)
  };

  resolve('done');
}).then(function () {
  setInterval(function () {
    draw();
  }, 15);
});

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
      var _walls;

      var topWall = Math.abs(this.player.position.y - this.player.collidedWith.position.y);
      var rightWall = Math.abs(this.player.position.x - (this.player.collidedWith.position.x + this.player.collidedWith.dimensions.width));
      var leftWall = Math.abs(this.player.position.x - this.player.collidedWith.position.x);
      var bottomWall = Math.abs(this.player.position.y - (this.player.collidedWith.position.y + this.player.collidedWith.dimensions.height));

      var walls = (_walls = {}, _defineProperty(_walls, topWall, 'top'), _defineProperty(_walls, rightWall, 'right'), _defineProperty(_walls, leftWall, 'left'), _defineProperty(_walls, bottomWall, 'bottom'), _walls);

      var closestToWall = walls[Math.min(topWall, rightWall, leftWall, bottomWall)];

      switch (closestToWall) {
        case 'top':
          this.world.getObjects().forEach(function (object) {
            return object.position.y += 0.99999999;
          });
          break;

        case 'right':
          this.world.getObjects().forEach(function (object) {
            return object.position.x -= 0.99999999;
          });
          break;

        case 'left':
          this.world.getObjects().forEach(function (object) {
            return object.position.x += 0.99999999;
          });
          break;

        case 'bottom':
          this.world.getObjects().forEach(function (object) {
            return object.position.y -= 0.99999999;
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
  function World() {
    _classCallCheck(this, World);
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
    key: "loadObjects",
    value: function loadObjects(objects) {
      this.objects = objects;
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

    this.moveSpeed = 7;

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

var _House = __webpack_require__(6);

var _House2 = _interopRequireDefault(_House);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var StreetBuilder = function () {
  function StreetBuilder(x, y) {
    _classCallCheck(this, StreetBuilder);

    this.objects = [];
    this.housePadding = 21;
    this.width = 0;
    this.x = x;
    this.y = y;
  }

  _createClass(StreetBuilder, [{
    key: 'make',
    value: function make() {
      for (var i = 0; i <= 5; i++) {
        var house = new _House2.default(this.x + this.width + this.housePadding, this.y);
        this.width += house.dimensions.width + this.housePadding;
        this.objects.push(house);
      }
    }
  }]);

  return StreetBuilder;
}();

exports.default = StreetBuilder;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var House = function () {
  function House(x, y) {
    _classCallCheck(this, House);

    this.position = {
      x: x,
      y: y
    };

    this.dimensions = {
      width: 300,
      height: 150
    };

    this.isSolid = true;

    this.mask = new Image();
    var that = this;
    var canvas = document.getElementById('canvas');
    this.mask.onload = function () {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      canvas.getContext('2d').drawImage(that.mask, that.position.x, that.position.y, that.dimensions.width, that.dimensions.height);
    };
    this.mask.src = '/JS-test/public/images/roof-tiles.jpg';
  }

  _createClass(House, [{
    key: 'draw',
    value: function draw(Canvas) {
      Canvas.getContext('2d').clearRect(this.position.x, this.position.y, Canvas.width, Canvas.height);
      Canvas.getContext('2d').drawImage(this.mask, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }
  }]);

  return House;
}();

exports.default = House;

/***/ })
/******/ ]);