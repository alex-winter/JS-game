export default class Player {

  constructor (Canvas) {
    this.moveSpeed = 8

    this.dimensions = {width: 20, height: 20}

    this.position = {
      x: (Canvas.width / 2) - (this.dimensions.width / 2),
      y: (Canvas.height / 2) - (this.dimensions.height / 2)
    }

    this.collidedWith = false
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
