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

const player = {
	name: 'USS Space America',
	hull: 20,
	firepower: 5,
	accuracy: 0.7,
	attack(){
		if(Math.random() < player.accuracy) {
			game.currentAlien.hull -= this.firepower
			console.log(`${player.name}'s ship has used Photon torpedoes! The alien ships hull is down to ${game.printAlienStats()}`)
		} else {
			return 'You missed!';
		}
	}
}
// player.attack();
// console.log(`${alien.hull} has been reduced from alien hull!`);
//-------------------ALIEN STUFF

// We need to come back to this to figure out why it is
// a string. parseFloat may help with this.
// let alienAccuracy = (Math.random() * (max - min) + min).toPrecision(1)
// let alienName = shipNames[Math.floor(Math.random() * shipNames.length)]
// let alienFirePower = Math.floor(Math.random() * 3) + 2
// let alienHull = Math.floor(Math.random() * 4) +3

class Alien {
	constructor(name,hull,firepower,accuracy){
		this.name = name;
		this.hull = hull;
		this.firepower = firepower;
		this.accuracy = accuracy;
	}
	fireLazer(firepower){
		console.log('pew pew')
		return game.currentAlien.firepower -= player.hull

	}
	isDead(){
		if(currentAlien.hull <= 0){
			return true;
		} else {
			return false;
		}
	}
}

// const alien = new Alien('Mothership', alienHull, alienFirePower, alienAccuracy)
const game = {
	currentAlien: null, 
	generateNewAlien(){
		const shipNames = ["Mothership", "Light Fighter", "Heavy Fighter"]
		const min = 0.6
		const max = 0.8
		const alienAccuracy = Math.floor(Math.random() * (max - min) + min).toPrecision(1)
		const alienName = shipNames[Math.floor(Math.random() * shipNames.length)]
		const alienFirePower = Math.floor(Math.random() * 3) + 2
		const alienHull = Math.floor(Math.random() * 4) +3
		const alien = new Alien(alienName, alienHull,alienFirePower,alienAccuracy);
		this.currentAlien = alien;
		// console.log("new alien spawned")
		// player.attack()
	},
	printAlienStats(){
		console.log(this.currentAlien.hull)
		return this.currentAlien.hull
	},
	gameOverMan(){
		if(player.isDead()){
			console.log()
			return true
		}
	}, 
	retreat(){
		console.log('Coward huh? Say goodbye to the planet I guess...')
		// return true
	},
	fightOrFlight(){
		if(this.currentAlien.isDead()){
			let option = prompt('Would you like to "fight" or "retreat"?')
			if(option.toLowerCase() == 'fight') {
				this.generateNewAlien();
			} else if (option.toLowerCase() == 'retreat') { 
				this.retreat()
			}
		}
	}
}
// game.generateNewAlien()
// game.printAlienStats();

// console.log(game.printAlienStats())
//build an array to capture dead aliens
game.generateNewAlien() 
player.attack();
console.log(game.currentAlien.hull)




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
