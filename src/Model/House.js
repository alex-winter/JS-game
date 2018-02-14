export default class Home {

  constructor (x, y) {
    this.position = {
      x: x,
      y: y,
    }

    this.dimensions = {
      width: 300,
      height: 150,
    }

    this.isSolid = true
  }

  draw (Canvas) {
    let ctx = Canvas.getContext("2d")
    ctx.beginPath()
    ctx.fillStyle = '#ff8a1f'
    ctx.rect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
    ctx.fill()
    ctx.closePath()
  }
}
