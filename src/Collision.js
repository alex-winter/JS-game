export default class Collision {

  constructor (player, world) {
    this.player = player
    this.world  = world
  }

  detected () {
    let that = this;
    this.player.collidedWith = this.world.getSolidObjects().filter(function (object) {
      let topWall    = (that.player.position.y + that.player.dimensions.height) > object.position.y
      let rightWall  = that.player.position.x < (object.position.x + object.dimensions.width)
      let leftWall   = (that.player.position.x + that.player.dimensions.width) > object.position.x
      let bottomWall = that.player.position.y < (object.position.y + object.dimensions.height)

      return topWall && rightWall && leftWall && bottomWall
    })[0]

    return Boolean(this.player.collidedWith)
  }

  bounceBack () {
    let topWall    = Math.abs(this.player.position.y - this.player.collidedWith.position.y)
    let rightWall  = Math.abs(this.player.position.x - (this.player.collidedWith.position.x + this.player.collidedWith.dimensions.width))
    let leftWall   = Math.abs(this.player.position.x - this.player.collidedWith.position.x)
    let bottomWall = Math.abs(this.player.position.y - (this.player.collidedWith.position.y + this.player.collidedWith.dimensions.height))

    let walls = {
      [topWall]: 'top',
      [rightWall]: 'right',
      [leftWall]: 'left',
      [bottomWall]: 'bottom',
    }

    let closestToWall = walls[Math.min(topWall, rightWall, leftWall, bottomWall)]

    switch (closestToWall) {
      case 'top':
        this.world.getObjects().forEach(object => object.position.y += this.player.moveSpeed + 2)
        break;

      case 'right':
        this.world.getObjects().forEach(object => object.position.x -= this.player.moveSpeed + 2)
        break;

      case 'left':
        this.world.getObjects().forEach(object => object.position.x += this.player.moveSpeed + 2)
        break;

      case 'bottom':
        this.world.getObjects().forEach(object => object.position.y -= this.player.moveSpeed + 2)
        break;
    }
  }
}
