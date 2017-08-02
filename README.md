# Prendre
Test invariants for peace of mind. Encourages programming with assertions by skip them in production. Inspired by unassert project.

See: "[unassert - encourage reliable programming by writing assertions in production](http://www.slideshare.net/t_wada/unassert)" -- talk at NodeFest 2015, and "One more thing..." in talk at NodeFest 2016, titled "[From Library to Tool - power-assert as a General Purpose Assertion Enhancement Tool](https://speakerdeck.com/twada/from-library-to-tool-power-assert-as-a-general-purpose-assertion-enhancement-tool)"

# API
```js
// inject global assume function which do nothing in production.
require('prendre');

// throw exception but do nothing in production. 
assume(1, 'is', 2);
```
# Benchmark
Suites
```js
require("../index");
function add(a, b) {
	return a + b;
}

function add_assume(a, b) {
	assume(a, "is", 1);
	assume(b, "is", 2);
	return a + b;
}

module.exports = {
	"without prendre": function() {
		add(1, 2);
	},
	"with prendre": {
		onError() {},
		fn: function() {
			add_assume(1, 2);
		}
	}
};
```
Run without NODE_ENV=production
```s
node benchmark/index.js
without prendre x 76,860,933 ops/sec ±1.31% (87 runs sampled)
with prendre x 29,922,554 ops/sec ±0.96% (83 runs sampled)
Fastest is without prendre
```
Run with NODE_ENV=production
```s
NODE_ENV=production node benchmark/index.js
without prendre x 74,486,295 ops/sec ±1.71% (87 runs sampled)
with prendre x 73,800,204 ops/sec ±1.67% (81 runs sampled)
Fastest is without prendre,with prendre
```
