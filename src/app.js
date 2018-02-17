import Keyboard from './Keyboard'
import Collision from "./Collision"
import World from './World'
import Player from './Model/Player'
import StreetBuilder from './World/StreetBuilder'

let draw

new Promise(function (resolve, reject) {
  let Game = self.Game = {};

  let street = new StreetBuilder(100, 200)

  street.make()

  Game.Canvas          = document.getElementById("canvas")
  Game.viewPortPadding = 20
  Game.Keyboard        = new Keyboard()
  Game.Player          = new Player(Game.Canvas)
  Game.World           = new World()
  Game.Collision       = new Collision(Game.Player, Game.World)

  Game.World.loadObjects(street.objects)

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

  window.onresize = function () {
    Game.Player.centerPosition()
  }


  draw = function draw () {

    let ctx = Game.Canvas.getContext('2d')
    ctx.rect(0, 0, Game.Canvas.width, Game.Canvas.height)
    ctx.canvas.width  = window.innerWidth
    ctx.canvas.height = window.innerHeight

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

    // window.requestAnimationFrame(draw)
  }

  resolve('done')
}).then(function () {
  setInterval(function () {
    draw()
  }, 15)
})

