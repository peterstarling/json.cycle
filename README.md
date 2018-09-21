# json.cycle

## Usage

Library enables stringifying cyclic structures such as:

```javascript
const a = { property1: 'value' };
a.property2 = a;

JSON.stringify(a);
```

..which would normally throw exception `Uncaught TypeError: Converting circular structure to JSON`.

To encode circular structure with conversion of cyclic elements to JSON.path do:

```javascript
import '../src/json-encode-cycles';

(...)

const output = JSON.encodeCycles(a);
```

See tests for more details

## Tests

Run `npm test`
