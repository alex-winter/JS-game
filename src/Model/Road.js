export default class Road {
  constructor (x, y) {
    this.position = {x, y}

    this.dimensions = {width: 100, height: 100}

    this.isSolid = false
  }

  draw (Canvas) {
    let ctx = Canvas.getContext("2d")
    ctx.beginPath()
    ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    ctx.fillStyle = '#616161'
    ctx.fill()
    ctx.closePath()
  }
}
