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
			stage = this.stage,
			ships = this.ships;
		for( var i = 0, l = ships.length; i < l; i ++ ){
			this._loadImg(ships[i],stage,this);
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
	/**
	 * 根据提供的图片路径加载图片
	 */
	_loadImg : function( ship, stage, view ){
			var pos = ship.getPos(),
			src = ship.getSrc(),
			draggable = ship.getDraggable();
			imgObj = new Image();
		
		imgObj.src = src;
		imgObj.onload = function(){
			var layer = new Kinetic.Layer(),
			shipImg = new Kinetic.Image({
				image: src,
				x: pos.left,
				y: pos.top,
				width:100,
				height:100,
				name:'image',
				draggable: draggable
			});
			view._saveShape(shipImg,layer);
			view._saveStage(layer,stage);
		}
		
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
	/**
	 *github commit test 
	 */
	/**
	 *github commit test 2
	 */
}
