var assert = require('assert')
  , type = require('type')

Properties = function(_data)
{
	var self = this
	  , data = _data

	if (typeof _data == 'object' && Object.keys)
	{
		Object.keys(_data).forEach(function(_key){
			self[_key] = _data[_key];
		});
	}
}

describe('sanitize arguments', function(){

	it('should check that correctly typed paramaters are simply returned', function(_done){

		var myFunction = function(){console.log('bam')}
		  , myDate = new Date()
		  , myRegExp = /.+/
		  , myArray = [1,2,3]
		  , myString = 'lorem'
		  , myObject = {a: 'a'}

		;(function(){

			var args = sanitizeArguments(arguments, {myFunction:Function,myDate:Date,myRegExp:RegExp,myArray:Array,myString:String,myObject:Object})

			assert(args.myFunction === myFunction);
			assert(args.myDate === myDate);
			assert(args.myRegExp === myRegExp);
			assert(args.myArray === myArray);
			assert(args.myString === myString);
			assert(args.myObject === myObject);

			_done();

		})(myFunction,myDate,myRegExp,myArray,myString,myObject);

	});

	it('should check that paramaters are correctly typed when some are missing', function(_done){

		var myFunction = function(){console.log('bam')}
		  , myDate = new Date()
		  , myRegExp = /.+$/
		  , myArray = [1,2,3]
		  , myString = 'lorem'
		  , myObject = {a: 'a'}

		;(function(){

			var args = sanitizeArguments(arguments, {myFunction:Function,myDate:Date,myRegExp:RegExp,myArray:Array,myString:String,myObject:Object})

			assert(args.myFunction === myFunction);
			assert(args.myDate === undefined);
			assert(args.myRegExp === myRegExp);
			assert(args.myArray === undefined);
			assert(args.myString === undefined);
			assert(args.myObject === myObject);

			_done();

		})(myFunction,myRegExp,myObject);

	});

	it('should check that custom paramaters are correctly typed with missing paramaters', function(_done){

		var myOptionsType = function(){ this.name = 'myOptionsType' }
		  , myParamatersType = function(){ this.name = 'myParamatersType' }
		  , myOptions = new myOptionsType()
		  , myParamaters = new myParamatersType()
		  , myObject = {a: 'a'}

		;(function(){

			var args = sanitizeArguments(arguments, {myOptions:myOptionsType,myArray:Array,myParamaters:myParamatersType,myString:String,myObject:Object})

			assert(args.myOptions === myOptions);
			assert(args.myArray === undefined);
			assert(args.myParamaters === myParamaters);
			assert(args.myString === undefined);
			assert(args.myObject === myObject);

			_done();

		})(myOptions,myParamaters,myObject);

	});

	it('should check that incorrectly typed paramaters are returned as null with missing paramaters', function(_done){

		var myOptionsType = function(){ this.name = 'myOptionsType' }
		  , myFunction = function(_res){}

		;(function(){

			var args = sanitizeArguments(arguments, {myOptions:myOptionsType,myObject:Object,myFunction:Function})

			assert(args.myOptions === null);
			assert(args.myObject === undefined);
			assert(args.myFunction === myFunction);

			_done();

		})('bad value',null,myFunction);

	});

	it('should check that incorrectly typed paramaters and an incorrect arguments length are returned as null with missing paramaters', function(_done){

		var myOptionsType = function(){ this.name = 'myOptionsType' }
		  , myFunction = function(_res){}

		;(function(){

			var args = sanitizeArguments(arguments, {myOptions:myOptionsType,myString:String,myNumber:Number,myObject:Object,myFunction:Function})
			
			assert(args.myOptions === null, 'myOptions');
			assert(args.myString === 'bam', 'myString');
			assert(args.myNumber === 13, 'myNumber');
			assert(args.myObject === undefined, 'myObject');
			assert(args.myFunction === myFunction, 'myFunction');

			_done();

		})(undefined,null,'bam',undefined,13,myFunction);

	});

	it('should check a string and a callback', function(_done){

		;(function(){

			var args = sanitizeArguments(arguments, {string: String, callback: Function});
			
			assert(type(args['string']) === 'string');
			assert(type(args['callback']) === 'function');

			_done();

		})('string', function(){});

	});

	it('should check a string and a callback but only the string is passed', function(_done){

		;(function(){

			var args = sanitizeArguments(arguments, {string: String, callback: Function});
			
			assert(type(args['string']) === 'string');
			assert(type(args['callback']) === 'undefined');

			_done();

		})('string');

	});

	it('should check a string and a callback but only the function is passed', function(_done){

		;(function(){

			var args = sanitizeArguments(arguments, {string: String, callback: Function});
			
			assert(type(args['string']) === 'undefined');
			assert(type(args['callback']) === 'function');

			_done();

		})(function(){});

	});

});