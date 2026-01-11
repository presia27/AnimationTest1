const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

const CAT_SPRITE_LOCATION = "img/CatSpriteFromPinterest.png";

ASSET_MANAGER.queueDownload(CAT_SPRITE_LOCATION);

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.init(ctx);

	gameEngine.addEntity(new Cat(gameEngine, 0, 0))

	gameEngine.start();
});

function toggleDebug() {
	gameEngine.options.debugging = !gameEngine.options.debugging;
}
