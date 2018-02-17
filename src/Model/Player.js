export default class Player {

  constructor (Canvas) {
    this.moveSpeed = 7

    this.dimensions = {width: 20, height: 20}

    this.centerPosition()

    this.collidedWith = false
  }

  centerPosition () {
    this.position = {
      x: (window.innerWidth / 2) - (this.dimensions.width / 2),
      y: (window.innerHeight / 2) - (this.dimensions.height / 2)
    }
  }

  draw (Canvas) {
    let ctx = Canvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    ctx.fillStyle = '#ff0000'
    ctx.fill()
    ctx.closePath()
  }
}
