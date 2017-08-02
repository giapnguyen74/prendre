require("../index");
function add(a, b) {
	return a + b;
}

function add_assume(a, b) {
	assume(a, "to be", 1);
	assume(b, "to be", 2);
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
