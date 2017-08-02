require("../index");

test("a is b", function() {
	expect(() => {
		assume(1, "is", 2);
	}).toThrow("1 should be 2");

	expect(() => {
		assume(1, "is", 1);
	}).not.toThrow();
});

test("a is undefined", function() {
	expect(() => {
		assume(1, "is undefined");
	}).toThrow("1 should undefined");

	expect(() => {
		assume(undefined, "is undefined");
	}).not.toThrow();
});

test("a is defined", function() {
	expect(() => {
		assume(undefined, "is defined");
	}).toThrow("undefined should be defined");

	expect(() => {
		assume(1, "is defined");
	}).not.toThrow();
});

test("a is false", function() {
	expect(() => {
		assume(1, "is false");
	}).toThrow("1 should be false");

	expect(() => {
		assume(0, "is false");
	}).not.toThrow();
});

test("a is true", function() {
	expect(() => {
		assume(0, "is true");
	}).toThrow("0 should be true");

	expect(() => {
		assume(1, "is true");
	}).not.toThrow();
});

test("a >= b", function() {
	expect(() => {
		assume(0, ">=", 1);
	}).toThrow("0 should be greater or equal 1");

	expect(() => {
		assume(1, ">=", 0);
	}).not.toThrow();
});

test("a > b", function() {
	expect(() => {
		assume(0, ">", 1);
	}).toThrow("0 should be greater 1");

	expect(() => {
		assume(1, ">", 0);
	}).not.toThrow();
});

test("a <= b", function() {
	expect(() => {
		assume(1, "<=", 0);
	}).toThrow("1 should be lesser or equal 0");

	expect(() => {
		assume(0, "<=", 1);
	}).not.toThrow();
});

test("a < b", function() {
	expect(() => {
		assume(1, "<", 0);
	}).toThrow("1 should be lesser 0");

	expect(() => {
		assume(0, "<", 1);
	}).not.toThrow();
});

test("a instance of b", function() {
	expect(() => {
		assume({}, "is instance of", Error);
	}).toThrow("object should be instance of function");

	expect(() => {
		assume({}, "is instance of", Object);
	}).not.toThrow();
});

test("a is contain b", function() {
	expect(() => {
		assume([2, 3], "is contain", 1);
	}).toThrow("2,3 should be contain 1");

	expect(() => {
		assume([2, 3], "is contain", 2);
	}).not.toThrow();
});

test("a is equal b", function() {
	expect(() => {
		assume({ a: 1 }, "is equal", { a: 3 });
	}).toThrow('{"a":1} should be equal {"a":3}');

	expect(() => {
		assume({ a: 1 }, "is equal", { a: 1 });
	}).not.toThrow();
});

test("a has path b", function() {
	expect(() => {
		assume({ a: { x: 1 } }, "has path", "a.y");
	}).toThrow('{"a":{"x":1}} should be have property a.y');

	expect(() => {
		assume({ a: { x: 1 } }, "has path", "a.x");
	}).not.toThrow();
});

test("a match paths b", function() {
	expect(() => {
		assume({ a: { x: 1 } }, "match paths", { "a.y": 1 });
	}).toThrow('{"a":{"x":1}} should have property a.y:1');

	expect(() => {
		assume({ a: { x: 1 } }, "match paths", { "a.x": 1 });
	}).not.toThrow();
});

test("no matcher", function() {
	expect(() => {
		assume(1, "not validate match", 2);
	}).toThrow("no matcher: not validate match");
});
