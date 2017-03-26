// JavaScript Document
function Hashtable() {
	this._hash = {};
	
	this.add = function(key, value) {
		if("undefined" != typeof(key)) {
			if(this.contains(key) == false) {
				this._hash[key] = typeof(value) == "undefined" ? null : value; 
				return true; 
			} else {
				return false; 
			} 
		} else {
			return false; 
		} 
	};
	
	this.remove = function(key) {
		delete this._hash[key];
	};
	
	this.count = function() {
		var i=0;
		for(var k in this._hash) {
			i++;
		}
		return i;
	};
	
	this.items = function(key) {
		return this._hash[key];
	};
	
	this.contains = function(key) {
		return typeof(this._hash[key]) != "undefined";
	};
	
	this.clear = function() {
		for(var k in this._hash) {
			delete this._hash[k];
		}
	} 
} 
