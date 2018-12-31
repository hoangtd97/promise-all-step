'use strict';

module.exports = PromiseAllStep;

/**
 * Applies the function iteratee to each item in coll after a timeout, which's increased by a step.
 * @param {array}     coll      A collection to iterate over
 * @param {function}  iteratee  An async function to apply to each item in coll. Apply with (thisArg, item, index)
 * @param {number}    step      Amount of ms that timeout increases after each item
 * @param {object}    thisArg   The iteratee context
 * @return {Promise}  Like the result of Promise.all()
 * 
 * @example
 * let words = ['Promise', 'all', 'step'];
 * 
 * PromiseAllStep(words, async (word, index) => {
 *   let uppercase_word = word.toUpperCase();
 *   console.log(`${word} => ${uppercase_word}`);
 *   return uppercase_word;
 * }, 1000)
 * .then(uppercase_words => console.log('All upper case words : ', uppercase_words.join(', ')))
 * .catch(err => console.log(err));
 * 
 * // Will print : 
 * Promise => PROMISE                         // at 0ms
 * all => ALL                                 // at 1000ms
 * step => STEP                               // at 2000ms
 * All upper case words :  PROMISE, ALL, STEP // at 2000ms
 */
function PromiseAllStep(coll, iteratee, step, thisArg) {
  return new Promise((resolve, reject) => {
    Promise
      .all(coll.map((item, index) => {
        return setTimeoutPromise(iteratee, step * index, thisArg, item, index);
      }, thisArg))
      .then(resolved_items => resolve(resolved_items))
      .catch(rejected_items => reject(rejected_items));
  });
}

function setTimeoutPromise(callback, timeout, thisArg, ...args) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let result = undefined;
      if (typeof callback === 'function') {
        result = callback.apply(thisArg, args);
      }
      resolve(result);
    }, timeout);
  });
}