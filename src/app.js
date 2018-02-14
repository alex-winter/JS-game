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

document.addEventListener('keydown', Game.Collision.keyDownHandler, false)
document.addEventListener('keyup', Game.Collision.keyUpHandler, false)

function draw () {
  let ctx = Game.Canvas.getContext('2d')
  ctx.clearRect(0, 0, Game.Canvas.width, Game.Canvas.height)

  Game.World.draw(Game.Canvas)
  Game.Player.draw(Game.Canvas)

  if (Game.Collision.detected()) {
    Game.Collision.bounceBack()
  } else {
    if (Game.Collision.right && (Game.Player.position.x + Game.Player.dimensions.width) < Game.Canvas.width - Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.x -= Game.Player.moveSpeed)
    }

    if (Game.Collision.left && Game.Player.position.x > Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.x += Game.Player.moveSpeed)
    }

    if (Game.Collision.down && (Game.Player.position.y + Game.Player.dimensions.height) < Game.Canvas.height - Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.y -= Game.Player.moveSpeed)
    }

    if (Game.Collision.up && Game.Player.position.y > Game.viewPortPadding) {
      Game.World.getObjects().forEach(object => object.position.y += Game.Player.moveSpeed)
    }
  }

  window.requestAnimationFrame(draw)
}

window.requestAnimationFrame(draw);
