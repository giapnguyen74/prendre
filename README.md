# Prendre
Test invariants in development enviroment for peace of mind. Encourages programming with assertions by skip them when run in productiom.

# API
```js
// inject global assume function which do nothing in production.
require('prendre');

// throw exception but do nothing in production. 
assume(1, 'is', 2);
```