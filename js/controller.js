/**
 * 游戏控制器
 * @constructor
 * @augments config 配置项
 * @param {Object} config
 * @param {Object} [config.view] 战舰对象
 * @param {Object} [config.layer] 绘制层
 */
function Controller(config) {
	var instance = this;
	this.config = Util.merge({
	},config);
	this.players = [];
	Controller = function(){
		return instance;
	};
}

Controller.prototype = {
	init : function( players, mode ) {
		this.initPlayer( players, mode );
		this.initUI(this.players,mode);
		this.initEvent();
	},
	/**
	 * 玩家对象初始化
	 */
	initPlayer: function( players, mode ){
		for( var i = 0, l = players.length; i < l ; i ++ ){
			this.players[i] = new Player({
				role : players[i].role,
				stage : players[i].stage,
				ships : players[i].ships
			});
		}
	},
	/**
	 * UI初始化
	 */
	initUI : function(players,mode) {
		for( var i = 0, l = players.length; i < l ; i ++ ){
			(new View( {player:players[i], mode:mode} )).init();
		}
	},
	/**
	 * 初始化
	 */
	initEvent : function() {

	},
	/**
	 * 船只位置和状态控制
	 */
	updateShipState : function() {

	},
	/**
	 * 玩家状态和顺序控制
	 */
	updatePlayerState : function() {

	},
	/**
	 * 炸弹放置和状态控制
	 */
	updateBombState : function() {

	}
}

