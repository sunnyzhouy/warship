/**
 * 玩家对象模型 
 * @param {Object} config
 * @param {Object} config.stage 玩家所在的场
 */
function Player(config){
	this.config = Util.merge({
		role:'',
		stage:'',
		ships:['ship_1','ship_2','ship_3'],
		bomb:0,
		board:null
	},config);
	this.init();
}

Player.prototype = {
	init:function(){
		var c = this.config;
		this.setBoard( c.stage );
		this.setShips( c.ships );
	},
	setShips:function( ships ){
		var c = this.config;
		ships = ships || c.ships;
		for( var i = 0, l = ships.length; i < l; i++ ){
			ships[i] = new Ship({name:ships[i]});
		}
		return ships;
	},
	getShips:function(){
		return this.config.ships;
	},
	setBomb:function(){
		
	},
	getBomb:function(){
		return this.config.bomb;
	},
	setBoard:function(){
		var c = this.config;
		c.board = new Board({
			stage : this.config.stage
		}); 

	},
	getBoard:function(){
		return this.config.board;
	}
}
function Board(config) {
	this.config = Util.merge({
		stage:'board',
		width:520,
		height:280,
		line : {
			row : {
				width : 40,
				grid : 20
			},
			column : {
				width : 40,
				grid : 20
			},
			style:{
				width: 0.5,
				color:'#1e6ffa',
				dashArray: [2,1]
			}
		}
	},config);
	this.init();
}

Board.prototype = {
	init:function(){
		this.setStage(this.config.stage);
	},
	getLine : function(){
		if(this._line === undefined){
			this._line = this.config.line;
		}
		return this._line;
	},
	getRow : function(){
		return this.getLine().row;
	},
	getColumn : function(){
		return this.getLine().column;
	},
	getLineStyle : function(){
		return this.getLine().style;
	},
	setStage:function( stage ){
		var c = this.config;
		stage = stage || c.stage;
		c.stage = new Kinetic.Stage({
			container : stage,
			width : c.width,
			height : c.height
		})
		return c.stage;
	},
	getStage:function(){
		return this.config.stage;
	},
	getWidth:function(){
		return this.config.width;
	},
	getHeight:function(){
		return this.config.height;
	}
};

function Ship(config){
	this.config = Util.merge({
		assetDir : 'img/',
		imgType : 'png',
		name : '',
		board: null,
		width:'auto',
		height:'auto',
		pos:{
			random: false,
			left:0,
			top:0
		},
		draggable : true
	}, config);
}

Ship.prototype = {
	getSrc : function(){
		var c = this.config;
		return c.assetDir + c.name + '.' + c.imgType;
	},
	getName : function(){
		return this.config.name;
	},
	getWidth:function(){
		return this.config.width;
	},
	setWidth:function(width){
		this.config.width = width;
	},
	getHeight:function(){
		return this.config.height;
	},
	setHeight:function(height){
		this.config.height = height;
	},
	getPos : function(){
		return this.config.pos;
	},
	setPos: function(left,top){
		var c = this.config,
			boardWidth = c.board.getWidth(),
			boardHeight = c.board.getHeight(),
			boardRowWidth = c.board.getRow().width,
			boardCloumnWidth = c.board.getColumn().width,
			p = this.pos,
			randomPos;
		//若位置超出
		if (p.left < 0 || p.top < 0 || p.left + this.getWdith() > boardWidth || p.right + this.getHeight() > boardHeight) return p;
		
		if (p.random) {
			randomPos = getSuitRandom([boardWidth, boardHeight], [boardRowWidth, boardCloumnWidth]);
			left = randomPos.left;
			top = randomPos.top;
		}

		p.left = left;
		p.top = top;
		
		/**
		 * 获取船只的随即位置，该位置基于board的网格线，并始终小于等于board的宽高减去船只宽高的位置。
		 * @param {Array} limitNumArr 限制的最大位置：board的宽高减去船只的宽高得到的数组
		 * @param {Number} limitNum[0] 限制的最大横坐标
		 * @param {Number} limitNum[1] 限制的最大纵坐标
		 * @param {Array} radixArr 基数数组，board.line的列宽度和行高度
		 * @param {Number} radixArr[0] 基数，列宽度
		 * @param {Number} radixArr[1] 基数，行高度
		 * @return {Object} pos 随即位置对象
		 * @return {Number} pos.left 随即横坐标
		 * @return {Number} pos.top 随即纵坐标
		 */
		function getSuitRandom( limitNumArr, radixArr ){
			var p = [];
			for( var i = 0,l = limitNumArr.length ; i < l ;i ++ ){
				if( limitNumArr[i] % radixArr[i] !== 0 ) limitNumArr[i] -= limitNumArr[i] % radixArr[i];
			}
			for( i = 0; i < l ;i ++ ){
				p[i] = Math.floor(Math.random() * (limitNumArr[i] / radixArr[i])) * radixArr[i];
			}
			return {
				left: p[0],
				top: p[1]
			};
		}
		
	},
	setDraggable:function(draggable){
		this.config.draggable = draggable;
	},
	getDraggable:function(){
		return this.config.draggable;
	}
}

function Bomb(config){
	this.config = Util.merge({
		pos:{
			leftTop:[0,0],
			rightBottom:[0,0]
		}
	}, config);
}

Bomb.prototype = {
	getPos : function(){
		return this.config.pos
	}
}

function Message(){
	
}
Message.prototype = {
	
}
