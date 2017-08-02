const ENV = process.env.NODE_ENV;
const isequal = require("lodash.isequal");
const get = require("lodash.get");

function AssumeError(message) {
	Error.captureStackTrace(this, this.constructor);
	this.name = this.constructor.name;
	this.message = message;
	const stacks = this.stack.split("\n");
	stacks.splice(1, 2);
	this.stack = stacks.join("\n");
}

require("util").inherits(AssumeError, Error);

const matchers = {
	is: function(source, value) {
		if (source === value) {
			return;
		}
		throw new AssumeError(`${source} should be ${value}`);
	},
	"is undefined": function(source) {
		if (source == undefined) {
			return;
		}
		throw new AssumeError(`${source} should undefined`);
	},
	"is defined": function(source) {
		if (source != undefined) {
			return;
		}
		throw new AssumeError(`${source} should be defined`);
	},
	"is false": function(source) {
		if (!source) {
			return;
		}
		throw new AssumeError(`${source} should be false`);
	},
	"is true": function(source) {
		if (source) {
			return;
		}
		throw new AssumeError(`${source} should be true`);
	},
	">=": function(source, value) {
		if (source >= value) {
			return;
		}
		throw new AssumeError(`${source} should be greater or equal ${value}`);
	},
	">": function(source, value) {
		if (source > value) {
			return;
		}
		throw new AssumeError(`${source} should be greater ${value}`);
	},
	"<=": function(source, value) {
		if (source <= value) {
			return;
		}
		throw new AssumeError(`${source} should be lesser or equal ${value}`);
	},
	"<": function(source, value) {
		if (source < value) {
			return;
		}
		throw new AssumeError(`${source} should be lesser ${value}`);
	},
	"is instance of": function(source, value) {
		if (source instanceof value) {
			return;
		}
		throw new AssumeError(
			`${typeof source} should be instance of ${typeof value}`
		);
	},
	"is contain": function(source, value) {
		if (Array.prototype.indexOf.apply(source, [value]) >= 0) {
			return;
		}
		throw new AssumeError(`${source} should be contain ${value}`);
	},
	"is equal": function(source, value) {
		if (isequal(source, value)) {
			return;
		}
		throw new AssumeError(
			`${JSON.stringify(source)} should be equal ${JSON.stringify(value)}`
		);
	},
	"has path": function(source, value) {
		if (get(source, value) != undefined) {
			return;
		}
		throw new AssumeError(
			`${JSON.stringify(source)} should be have property ${value}`
		);
	},
	"match paths": function(source, value) {
		Object.keys(value).forEach(path => {
			if (get(source, path) == value[path]) {
				return;
			}
			throw new AssumeError(
				`${JSON.stringify(source)} should have property ${path}:${value[
					path
				]}`
			);
		});
	}
};

if (ENV == "production") {
	global.assume = function() {};
} else {
	global.assume = function(source, matcher, value) {
		if (!matchers[matcher]) {
			throw new Error("no matcher: " + matcher);
		}
		matchers[matcher](source, value);
	};
}

module.exports = matchers;
