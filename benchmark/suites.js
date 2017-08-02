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
