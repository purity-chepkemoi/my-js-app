const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
Step 4: Add test folder and example test
Create a folder:
mkdir __tests__
Create example.test.js inside __tests__/:
test('simple addition', () => {
  expect(2 + 2).toBe(4);
});
