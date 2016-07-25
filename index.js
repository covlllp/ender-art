
var renderer = PIXI.autoDetectRenderer(400, 300);

document.body.appendChild(renderer.view);
// requestAnimationFrame(animate);

var stage = new PIXI.Container();
var graphics = new PIXI.Graphics();

graphics.lineStyle(5, 0xFF0000);
graphics.moveTo(10, 10);
graphics.lineTo(20, 30);

stage.addChild(graphics);

renderer.render(stage);
