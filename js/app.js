console.log('space battle');
//-----------PLAYER
//we are going to need a player with properties
//the player must have
//hull
//firepower
//accuracy
//ACTIONS
//fire lazer
//
//-----------ENEMY
//alien ship class will consist of
//hull between 3 and 6
//firepower between 2 and 4
//accuracy between .6 and .8
//Game logic, player must attack first
//if alien survives
//alien attacks
//if player survives
//player attacks
//if player destroys ship either attack next OR retreat
//(prompt)!!!
//if you retreat then GAME OVER
//if you attack again NEW enemy generates
//or if you are destroyed GAME OVER
//PLAYER OBJECT BUILD
// const alien = {
// 	name: '',
// 	hull: Math.floor(Math.random()),
// 	firepower: 5,
// 	accuracy: 0.7,
// 	attack: function(){
// 		if(Math.random() < alien.accuracy) {
// 			console.log("you've been hit")
// 			return player.hull -= this.firepower
// 		}
// 	}
// }
// player.attack();
// console.log(`${alien.hull} has been reduced from alien hull!`);
//-------------------ALIEN STUFF
// We need to come back to this to figure out why it is
// a string. parseFloat may help with this.
// let alienAccuracy = (Math.random() * (max - min) + min).toPrecision(1)
// let alienName = shipNames[Math.floor(Math.random() * shipNames.length)]
// let alienFirePower = Math.floor(Math.random() * 3) + 2
// let alienHull = Math.floor(Math.random() * 4) +3
// a player is an instance of a ship. So instead of an alien class, we do a ship class. 



//6 aliens in this game.

class Ship {
	constructor(name, hull, firepower, accuracy) {
		this.name = name;
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy;
	}
	//took firepower out of parameter because it's redundant. we;re firing a lazer with the firepower of the ship, so we're referencing the ships property which we set in the constructor. 
	//ADDED target, because it can be either for alien OR player. Makes it modular. 
	fireLazer(target) {
		console.log('pew pew')
		//Incorporate accuracy into the fire laser method. 
		// stop harcoding specific object in class method, FIX
		if (Math.random() < this.accuracy) {
			target.hull -= this.firepower;
			console.log(`${target.name} took ${this.firepower} damage. Owie?`);
			return true;
		} else {
			console.log('Missed!');
			return false;
		}
		// Trying to use the ship's accuracy property to determine if the laser hits the target. If it does, then we subtract firepower from the target's hull. If not then we cl "missed!", then return
		// reversed this, applying the ships firepower to the target's defenses. firepower of the ship that's firing is beind deducted frrom the hull strength of the defender, which is target. "this" (<--- it's anonymous!) is the shooter, target, victim
		// this is mutating function! When we call it, it just changes, does not return. The idea is that you call something to gather data and then evaluate. This is not those, it's just an action, thus it does not need a return. Return is just giving back data, so if there is no data to give, no return. return; <--- will exit the function, technically it returns undefined. 
	}
	isDead() {
		// replace target with this, because we want to know if THIS PARTICULAR SHIP is being targetted. 
		//this class needs to not care about whether it's a player or an alien. 
		if (this.hull <= 0) {
			return true;
		} else {
			return false;
		}
	}
}
// const alien = new Alien('Mothership', alienHull, alienFirePower, alienAccuracy)
class Game {
	constructor(aliensNumber) {
		this.aliens = [];
		this.player = this.generatePlayer();
		for (let i = 0; i < aliensNumber; i++) {
			this.aliens.push(this.generateNewAlien());
			//NOW, we have an array of aliens, that we will lo00ooo000oop through later!!!!!1
		}
	}
	//this function creates an alien and then returns it
	generateNewAlien() {
		const shipNames = ["Mothership", "Light Fighter", "Heavy Fighter"]
		const alienAccuracy = Math.floor(Math.random() * (8 - 6) + 6) / 10
		const alienName = shipNames[Math.floor(Math.random() * shipNames.length)]
		const alienFirePower = Math.floor(Math.random() * 3) + 2
		const alienHull = Math.floor(Math.random() * 4) + 3
		const alien = new Ship(alienName, alienHull, alienFirePower, alienAccuracy);
		return alien;
		// console.log("new alien spawned")
		// player.attack()
	}
	generatePlayer() {
		//hull firepower, accuracy, name passing in arguments that the spec defined.
		const name = 'USS Space America';
		const hull = 20;
		const firepower = 5;
		const accuracy = .7;
		//these things above, just got passed into the new player, that has a class of Ship!!!!!1
		let player = new Ship(name, hull, firepower, accuracy);
		return player;
	}
	//call initialize player, call intialize alien, player attacks, shit happens to alien, alien attacks, shit happens to player, the prompt pops up, takes input, moves on in the loop based on that, once alien or player isDead calls gameOverMan
	//we need to return outcome of the battle. 
	doBattle(player, alien) {
		//call the prompt, decide to retreat or stay
		while (true) {
			//while will run continuously until it reaches an end state, which is one of three types of losses. 
			this.printStats(player);
			this.printStats(alien);
			//this crap is here, because it's always printed out before the battle loop. Always. Forever. Infinite. Until someone dies.
			if (this.getPlayerInput() == 'fight') {
				//player attacks alien - needs to return damage, fire laser. It just targets alien, because the firelaser parameter passes in a ship. So we don't need to add hull, or anything like that, because it's already effing there. 
				player.fireLazer(alien);
				//player is firing laser at alien, that's what this means, omg. I can't even. Did you know that? I kinda did. Now I think I might know. I have to think of stuff doing stuff to stuff by hugging it. 
				if (alien.isDead()) {
					//player won that round. Just the battle that's over. 
					console.log(`You killed the ${alien.name}, you mean old space-biddy`);
					return "shits (alien) dead yo";
				}
				//if alien is alive
				alien.fireLazer(player);
				//what's the outcome of this shit? Who fuckin' knows? 
				if (player.isDead()) {
					console.log("u ded.");
					return "u ded";
				}
			} else {
				return "retreated";
				//this is not a message to the player, it's a message to the computer. Even though it means nothing to the computer. Helps me know what this return value symbolizes. Could return whatever the heckin' heck I want, but this makes sense later when looking over the code. 
				//three outcomes, alien dead, player dead or player retreated. 
			}
		}
	}
	gameLoop() {
		//pick out the alien for the player to fight
		for (let i = 0; i < this.aliens.length; i++) {
			let outcome = this.doBattle(this.player, this.aliens[i]);
			//save the results of the first call to do battle taking the return value and saving to a variable 
			// Leaving this blank because nothing needs to happen. 
			if (outcome == "shits (alien) dead yo") {
				//check to see if there are more aliens alive
			} else if (outcome == "u ded") {
				return this.gameOverMan();
			} else {
				return this.retreat();
			}
			//the method took two arguments, and here they are. Now I deal with three different possible outcomes.  
		} // if the player killed the first alien, we need to not call game over. 
		//the alien outcome is different, because there could be more than one alien ship
		return this.youIsWinner();
	}
	youIsWinner() {
		console.log("Congrats! You have killed all the aliens!!!");
		return true;
	}
	printStats(ship) {
		console.log(`The ${ship.name} hull is ${ship.hull}`);
	}
	gameOverMan() {
		console.log(`Game over`)
		return true;
	}
	retreat() {
		console.log('Coward huh? Say goodbye to the planet I guess...');
		return true;
		//if (fightOrFlight 
		// return true
	}
	getPlayerInput() {
		let option = prompt('Would you like to "fight" or "retreat"?')
		if (option.toLowerCase() == 'fight' || option.toLowerCase() == 'retreat') {
			return option;
		} else {
			return this.getPlayerInput();
		}
	}
}

// CALL THE GAME
let game = new Game(6);
game.gameLoop();
//The game is running the game loop, passing 6 times for 6 aliens. aliensNumber. 


// let currentAlien;
// write a function that that will generate a new alien
// use that function in the logic if the alien dies so
// you will generate a new alien. We can use a for loop
// to do this a maximum of 6 times.
// generateNewAlien();
// console.log(currentAlien)
// console.log(alienHull)
// console.log(alienFirePower)
// console.log(alienAccuracy)
// console.log(game.currentAlien)