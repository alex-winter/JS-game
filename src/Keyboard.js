export default class Keyboard {

  constructor () {
    this.up    = false
    this.down  = false
    this.right = false
    this.left  = false
  }

  keyDownHandler (e) {
    if (e.keyCode === 38) this.up = true
    if (e.keyCode === 39) this.right = true
    if (e.keyCode === 37) this.left = true
    if (e.keyCode === 40) this.down = true
  }

  keyUpHandler (e) {
    if (e.keyCode === 38) this.up = false
    if (e.keyCode === 39) this.right = false
    if (e.keyCode === 37) this.left = false
    if (e.keyCode === 40) this.down = false
  }
}
