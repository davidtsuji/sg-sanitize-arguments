var contains = require('contains')
  , map = require('map')

module.exports = function(_arguments, _params){

	var args = Array.prototype.slice.call(_arguments)
	  , params = typeof _params === 'object' ? _params : {}
	  , result = {}
	  , paramKeys = Object.keys(params)
	  , paramsArray = map(paramKeys, function(_key){ return params[_key] })

	paramKeys.forEach(function(_key){

		var shiftArg
		  , argConstructor
		  , paramResult
		  , tryArg

		tryArg = function() {

			try {

				argConstructor = args[0].constructor;

			} catch(e){}

			paramResult = argConstructor === params[_key] ? args.shift() : args[0] === null ? args.shift() : undefined;
			
			if (! contains(paramsArray, argConstructor) && paramResult !== null) {
				args.shift();
				tryArg();
			}

		}

		tryArg();

		result[_key] = paramResult;

	});

	return result;

}