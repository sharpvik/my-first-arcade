// Draw both enemy and player on screen
Object.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Reset player
Object.prototype.reset = function() {
  this.x = 200;
  this.y = 375;
};

// Enemies our player must avoid
var Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = Math.floor((Math.random() * 200) + 50);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Reset bug's position in case he reached the egde or keep him up and running
    if (this.x <= 550) {
        this.x += this.speed * dt;
    } else {
        this.x = -2;
    }

    // Reset player's position when he hits the Enemy bug
    // Tried a new algorythm of detecting collitions
    var dx = Math.abs(player.x - this.x),
        dy = Math.abs(player.y - this.y),
        sqr_dx = dx * dx,
        sqr_dy = dy * dy;
     
    if ( sqr_dx + sqr_dy <= 2500 ) {
        player.reset();
    }
}; 

var Player = function(){
    this.x = 200;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
}

// Update player's position
Player.prototype.update = function(){
    // when LEFT key pressed && player didn't hit the edge --> decrease x value
    if ((this.ctlKey === 'left') && (this.x > 50)) { 
        this.x = this.x - 100;

    // when UP key pressed --> increase y value
    } else if (this.ctlKey === 'up') {
        this.y = this.y - 80;

    // when RIGHT key pressed && player didn't hit the edge --> increase x value 
    } else if ((this.ctlKey === 'right') && (this.x < 350)) {
        this.x = this.x + 100;
    
    // when DOWN key pressed && player didn't hit the edge --> decrease y value
    } else if ((this.ctlKey === 'down') && (this.y < 350)) {
        this.y = this.y + 80;
    }

    this.ctlKey = null;
    
    // Reset player's position when reached water
    if (this.y < 25) {
        this.reset();
    }
}

Player.prototype.handleInput = function(e){
    this.ctlKey = e;    
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

(function setEnemies(){
    allEnemies.push(new Enemy(-2, 60));
    allEnemies.push(new Enemy(-2, 100));
    allEnemies.push(new Enemy(-2, 150));
    allEnemies.push(new Enemy(-2, 220));
}());

var player = new Player(); 

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
