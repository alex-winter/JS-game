export default class World {

  getObjects () {
    return this.objects
  }

  getSolidObjects () {
    return this.objects.filter(object => object.isSolid)
  }

  loadObjects (objects) {
    this.objects = objects
  }

  draw (Canvas) {
    this.objects.forEach(object => object.draw(Canvas))
  }
}
