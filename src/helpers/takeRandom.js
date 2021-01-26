Array.prototype.takeRandom = function(){
  return this[Math.floor(Math.random()*this.length)];
}