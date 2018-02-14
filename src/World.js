export default class World {

  constructor (objects) {
    this.objects = objects
  }

  getObjects () {
    return this.objects
  }

  getSolidObjects () {
    return this.objects.filter(object => object.isSolid)
  }

  draw (Canvas) {
    this.objects.forEach(object => object.draw(Canvas))
  }
}
