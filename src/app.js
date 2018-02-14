import Keyboard from './Keyboard'
import Collision from "./Collision"
import World from './World'
import Player from './Model/Player'
import House from './Model/House'
import Road from './Model/Road'

let Game = self.Game = {};

Game.Canvas          = document.getElementById("canvas")
Game.viewPortPadding = 20
Game.Keyboard        = new Keyboard()
Game.Player          = new Player(Game.Canvas)
Game.World           = new World([
  new House(100, 100),
  new House(440, 100),
  new Road(100, 250),
])
Game.Collision       = new Collision(Game.Player, Game.World)

let upPressed    = false
let rightPressed = false
let leftPressed  = false
let downPressed  = false

document.addEventListener('keydown', keyDownHandler, false)
document.addEventListener('keyup', keyUpHandler, false)

function keyDownHandler (e) {
  if (e.keyCode === 38) {
    upPressed = true
  }
  if (e.keyCode === 39) {
    rightPressed = true
  }
  if (e.keyCode === 37) {
    leftPressed = true
  }
  if (e.keyCode === 40) {
    downPressed = true
  }
}

function keyUpHandler (e) {
  if (e.keyCode === 38) {
    upPressed = false
  }
  if (e.keyCode === 39) {
    rightPressed = false
  }
  if (e.keyCode === 37) {
    leftPressed = false
  }
  if (e.keyCode === 40) {
    downPressed = false
  }
}

function draw () {
  let ctx = Game.Canvas.getContext('2d')
  ctx.clearRect(0, 0, Game.Canvas.width, Game.Canvas.height)

  Game.World.draw(Game.Canvas)
  Game.Player.draw(Game.Canvas)

  if (Game.Collision.detected()) {
    Game.Collision.bounceBack()
  } else {
    if (rightPressed && (Game.Player.position.x + Game.Player.dimensions.width) < Game.Canvas.width - Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.x -= Game.Player.moveSpeed)
    }

    if (leftPressed && Game.Player.position.x > Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.x += Game.Player.moveSpeed)
    }

    if (downPressed && (Game.Player.position.y + Game.Player.dimensions.height) < Game.Canvas.height - Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.y -= Game.Player.moveSpeed)
    }

    if (upPressed && Game.Player.position.y > Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.y += Game.Player.moveSpeed)
    }
  }

  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw);
