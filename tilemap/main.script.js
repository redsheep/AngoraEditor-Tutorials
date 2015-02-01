var currentLayer;
var delay=0;
var layergroup;
var canChange;
main.prototype.customLoad=function(){

}
main.prototype.customCreate=function(){
  currentLayer=this.objects.tilemap0.createLayer('layer1');
  currentLayer.resizeWorld();
  this.objects.tilemap0.setLayer(currentLayer);
  this.objects.tilemap0.setCollisionBetween(1,23);
  //this.objects.tilemap0.setCollisionBetween(17,18);
  game.camera.follow(this.objects.player);
  this.objects.layer2.add(this.objects.star3);
  this.objects.layer2.add(this.objects.star2);
  this.objects.layer2.add(this.objects.door);
  this.objects.layer2.add(this.objects.tunnel2);
  this.objects.layer1.add(this.objects.tunnel3);
  this.objects.layer1.add(this.objects.tunnel4);
  this.objects.layer1.add(this.objects.star1);
  layergroup=this.objects.layer1;
  this.objects.layer2.visible=false;
}
main.prototype.customUpdate=function(){
  canChange=false;
  game.physics.arcade.collide(this.objects.player,currentLayer);
  game.physics.arcade.overlap(this.objects.player,layergroup,this.collision,null,this);
  this.objects.player.body.velocity.x=0;
  if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    this.objects.player.body.velocity.x=-100;
  else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    this.objects.player.body.velocity.x=100;
  if(this.objects.player.body.onFloor() && game.input.keyboard.isDown(Phaser.Keyboard.UP))
    this.objects.player.body.velocity.y = -400;
  if(canChange && game.input.keyboard.isDown(Phaser.Keyboard.E) && delay>50){
    var layername=currentLayer.layer.name;
    currentLayer.destroy();
    layergroup.visible=false;
    if(layername=='layer1'){
      currentLayer=this.objects.tilemap0.createLayer('layer2');
      layergroup=this.objects.layer2;
    }else{
      currentLayer=this.objects.tilemap0.createLayer('layer1');
      layergroup=this.objects.layer1;
    }
    layergroup.visible=true;
    this.objects.tilemap0.setLayer(currentLayer);
    currentLayer.resizeWorld();
    this.objects.tilemap0.setCollisionBetween(1,23);
    delay=0;
  }
  delay++;
}
main.prototype.collision=function(player, g){
  if(g.key=='tunnel')
  	canChange=true;
  else if(g.key=='star')
    g.kill();
  else if(g.key=='door')
    game.state.start('mainmenu');
}


