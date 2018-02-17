import House from '../Model/House'

export default class StreetBuilder {

  constructor (x, y) {
    this.objects      = []
    this.housePadding = 21
    this.width        = 0
    this.x            = x
    this.y            = y
  }

  make () {
    for (let i = 0; i <= 5; i++) {
      let house    = new House(this.x + this.width + this.housePadding, this.y)
      this.width += house.dimensions.width + this.housePadding
      this.objects.push(house)
    }
  }

}
