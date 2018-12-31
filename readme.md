<a name="PromiseAllStep"></a>

## PromiseAllStep(coll, iteratee, step, thisArg) ⇒ <code>Promise</code>
Applies the function iteratee to each item in coll after a timeout, which's increased by a step.

**Returns**: <code>Promise</code> - Like the result of Promise.all()  

| Param | Type | Description |
| --- | --- | --- |
| coll | <code>array</code> | A collection to iterate over |
| iteratee | <code>function</code> | An async function to apply to each item in coll. Apply with (thisArg, item, index) |
| step | <code>number</code> | Amount of ms that timeout increases after each item |
| thisArg | <code>object</code> | The iteratee context |

**Example**  
```js
let words = ['Promise', 'all', 'step'];

PromiseAllStep(words, async (word, index) => {
  let uppercase_word = word.toUpperCase();
  console.log(`${word} => ${uppercase_word}`);
  return uppercase_word;
}, 1000)
.then(uppercase_words => console.log('All upper case words : ', uppercase_words.join(', ')))
.catch(err => console.log(err));

// Will print : 
Promise => PROMISE                         // at 0ms
all => ALL                                 // at 1000ms
step => STEP                               // at 2000ms
All upper case words :  PROMISE, ALL, STEP // at 2000ms
```
