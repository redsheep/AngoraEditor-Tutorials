var game;
function parseBoolean(str){
	return String(str)=='true';
}
window.onload = function() {

	game = new Phaser.Game(800, 600, Phaser.AUTO, '');
	game.state.add('preload',preload);game.state.add('main',main);game.state.add('mainmenu',mainmenu);game.state.start('preload');
};