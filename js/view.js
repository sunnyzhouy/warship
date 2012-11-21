/**
 * 游戏部件的绘制
 * @constructor
 * @augments config
 * @param {Object} config
 * @param {Object} [config.players] 包含所有玩家对象
 * @param {String} [config.stage.containerId] 包含舞台(canvas)的层(div)的ID
 * @param {Object} [config.ship] module 战舰对象
 * @param {String} [config.board] module 面板对象
 */
function View(config) {
	this.config = Util.merge({}, config);
	this.player = this.config.player;
	this.board = this.player.getBoard();
	this.stage = this.board.getStage();
	this.ships = this.player.getShips();
}

View.prototype = {
	init:function(){
		var p = this.player;
		this.drawBoard( p );
		this.drawShip( p );
	},
	
	/**
	 * 绘制游戏板面 
	 */
	drawBoard : function( player ) {
		var c = this.config,
			board = this.board,
			stage = this.stage,			layer = new Kinetic.Layer(),
			row = board.getRow(),
			column = board.getColumn(),
			lineStyle = board.getLineStyle(),
			drawCount = 0,
			line;
		/**
		 * draw rows
		 */
		for (var i = 1; i <= row.grid; i++) {
				line = new Kinetic.Line({
				points : [row.width * i, 0, row.width * i, row.width * row.grid],
				stroke : lineStyle.color,
				strokeWidth : lineStyle.width,
				dashArray: lineStyle.dashArray
			});
			this._saveShape(line,layer);
		}
		/**
		 * draw columns
		 */
		for ( i = 1; i <= row.grid; i++) {
			line = new Kinetic.Line({
				points : [0, row.width * i, row.width * row.grid, row.width * i],
				stroke : lineStyle.color,
				strokeWidth : lineStyle.width,
				dashArray: lineStyle.dashArray
			}); 
			this._saveShape(line,layer);
		}
		this._saveStage(layer,stage);
	},
	
	/**
	 * 
	 */
	drawShip : function( player ) {
		var c = this.config,
			viewInstance = this,
			stage = this.stage,
			layer = new Kinetic.Layer(),
			ships = this.ships,
			ship,
			shipImg,
			src, 
			pos,
			imgObj;
		for( var i = 0, l = ships.length; i < l; i ++ ){
			ship = ships[i];
			src = ship.getSrc(),
			pos = ship.getPos(),
			draggable = ship.getDraggable();
			imgObj = new Image();
			imgObj.onload = function(){
				shipImg = new Kinetic.Image({
					image: src,
					x: pos.left,
					y: pos.top,
					draggable: draggable
				});
				viewInstance._saveShape(shipImg,layer);
				viewInstance._saveStage(layer,stage);
			}
			imgObj.src = src;
		}
	},
	 
	/**
	 * 绘制炸弹 
	 */
	drawBomb : function( bomb, stage) {
		
	},
	/**
	 * 显示提示信息 
	 */
	showMsg:function( msg, containerElement ){
		
	},
	/*
	 * 将绘制的元素保存在层(layer)上
	 */
	_saveShape : function( shape, layer ){
		layer.add( shape );
	},
	/*
	 * 将绘制的层(layer)保存在舞台(stage)上
	 */
	_saveStage : function( layer, stage ){
		stage.add( layer );
	}
}
