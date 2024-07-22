## 1. FizzBuzz

Use a for loop to iterate from 1 to N (inclusive).

For each number, check if it's a power of 2 using the `isPowerOfTwo` helper function.

If the number is a power of 2, we print "POWER". Otherwise, we print the number itself.

We also check that the number is not 0, as 0 is not considered a power of 2 in this context.

```JS
function solution(N) {
    for (let i = 1; i <= N; i++) {
        if (isPowerOfTwo(i)) {
            process.stdout.write('POWER\n');
        } else {
            process.stdout.write(i + '\n');
        }
    }
}

function isPowerOfTwo(n) {
    return (n & (n - 1)) === 0 && n !== 0;
}
```

## 2. CSS Content Position

```CSS
.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row;
}

.outer-centered {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
}

.outer-centered .inner {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container .outer-left {
    display: flex;
    align-items: flex-end;
    justify-content: flex-start;
}

.outer-left .inner {
    display: flex;
    align-items: flex-end;
    text-align: left;
}

.container .outer-right {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
}

.outer-right .inner {
    display: flex;
    align-items: flex-end;
    text-align: left;
}

```

## 3. Cheap Letter Deletion

* Initialize totalCost to keep track of the deletion cost.
* Start with the first character as prevChar and its cost as prevCost.
* Iterate through the string starting from the second character:
    * If the current character is the same as prevChar, we need to delete one of them:
    * If the current cost is higher, we delete the previous character `(add prevCost to totalCost)` and update prevCost
      to the current cost.
    * Otherwise, we delete the current character `(add current cost to totalCost).`
    * If the current character is different from prevChar, we update prevChar and prevCost.
    * Finally, we return the totalCost.

```JS
function solution(S, C) {
    let totalCost = 0;
    let prevChar = S[0];
    let prevCost = C[0];

    for (let i = 1; i < S.length; i++) {
        if (S[i] === prevChar) {
            // If current char is same as previous, delete the cheaper one
            if (C[i] > prevCost) {
                totalCost += prevCost;
                prevCost = C[i];
            } else {
                totalCost += C[i];
            }
        } else {
            // If different, update prevChar and prevCost
            prevChar = S[i];
            prevCost = C[i];
        }
    }

    return totalCost;
}
```

## 4. Fib Digits

Start with the base cases: if `N is 0 or 1`, we `return 0 or 1` respectively.
For `N >= 2`, Create two variables prev and current to keep track of the previous two elements in the sequence.
Iterate from 2 to N, calculating each next element in the sequence.

The sumDigits function is used to calculate the sum of digits of a number.

In each iteration, calculate the next element by summing the digits of the previous two elements.

Only keep the last digit of the result `(modulo 10)` because the sum of digits will never exceed `9 + 9 = 18` for any
two single-digit numbers.

Update prev and current for the next iteration.

After N iterations, current will hold the Nth element of the sequence.

This solution has a time complexity of `O(N)`, which is efficient even for large values of N. The space complexity
is `O(1)` as we only use a constant amount of extra space.

```JS
function solution(N) {
    if (N === 0) return 0;
    if (N === 1) return 1;

    let prev2 = 0;
    let prev1 = 1;

    for (let i = 2; i <= N; i++) {
        let sum = prev2 + prev1;
        let current = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        prev2 = prev1;
        prev1 = current;
    }

    return prev1;
}

function solution(N) {
    if (N === 0) return 0;
    if (N === 1) return 1;

    let prev = 0;
    let current = 1;

    for (let i = 2; i <= N; i++) {
        let next = sumDigits(prev) + sumDigits(current);
        prev = current;
        current = next % 10; // We only need to keep the last digit
    }

    return current;
}

function sumDigits(num) {
    let sum = 0;
    while (num > 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

```