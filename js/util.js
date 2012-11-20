var Util = {
	$: function() {
		var elements = [],
			element;
		if(arguments.length === 1) {
			return document.getElementById(arguments[0]);
		}
		for(var i = 0; i < arguments.length; i++) {
			element = arguments[i];
			if(typeof element === 'string') {
				element = document.getElementById(element);
			}
			elements.push(element);
		}
		return elements;
	},
	merge: function(config, userConfig) {
		if(!config) config = {};
		for(var c in userConfig) {
			config[c] = userConfig[c];
		}
		return config;
	},
	addEvent: function(type, fn) {
		var add = function(el) {
				if(window.addEventListener) {
					el.addEventListener(type, fn, false);
				} else if(window.attachEvent) {
					el.attachEvent('on' + type, fn);
				}
			};
		this.each(function(el) {
			add(el);
		});
		return this;
	},

	// dragable: function(el){
		// //todo
	// },	onDOMReady: (function() {
		var ie = !! (window.attachEvent && !window.opera);
		var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
		var fn = [];
		var run = function() {
				for(var i = 0; i < fn.length; i++) fn[i]();
			};
		var d = document;
		return function(f) {
			if(!ie && !wk && d.addEventListener) return d.addEventListener('DOMContentLoaded', f, false);
			if(fn.push(f) > 1) return;
			if(ie)
			(function() {
				try {
					d.documentElement.doScroll('left');
					run();
				} catch(err) {
					setTimeout(arguments.callee, 0);
				}
			})();
			else if(wk) var t = setInterval(function() {
				if(/^(loaded|complete)$/.test(d.readyState)) clearInterval(t), run();
			}, 0);
		};
	})(),
	
	createSingleInstance:function(){
		
	}
};


