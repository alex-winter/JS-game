export default class House {

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

    this.mask        = new Image()
    let that         = this
    let canvas       = document.getElementById('canvas')
    this.mask.onload = function () {
      canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height)
      canvas.getContext('2d').drawImage(that.mask, that.position.x, that.position.y, that.dimensions.width, that.dimensions.height)
    }
    this.mask.src    = '/JS-test/public/images/roof-tiles.jpg'
  }

  draw (Canvas) {
    Canvas.getContext('2d').clearRect(this.position.x, this.position.y, Canvas.width, Canvas.height)
    Canvas.getContext('2d').drawImage(this.mask, this.position.x, this.position.y, this.dimensions.width, this.dimensions.height)
  }
}
