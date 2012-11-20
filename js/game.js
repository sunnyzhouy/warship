/**
 * 游戏进程控制
 * @constructor
 * @augments config
 * @param {Object} config
 * @param {Object} [config.controller] 游戏控制器对象
 */
function Game(config) {
	this.config = Util.merge({
		players : [{
			stage : 'stage_p1',
			role : 'robot',
			ships : ['ship_1', 'ship_2', 'ship_3', 'ship_4']
		}, {
			stage : 'stage_p2',
			role : 'player',
			ships : ['ship_1', 'ship_2', 'ship_3', 'ship_4']
		}],
		mode : 'pve'
	},config);
	this.config.controller = new Controller(this.config);
}

Game.prototype = {
	pve : function() {
		var c = this.config;
		c.controller.init(c.players,'pve');
	},
	pvp : function() {
		var c = this.config;
		c.controller.init(c.players,'pvp');
	},

	start : function() {
		var c = this.config;
		switch(c.mode) {
			case 'pve':
				this.pve();
				break;
			case 'pvp':
				this.pvp();
				break;
		}
	},	end : function() {

	}
}
