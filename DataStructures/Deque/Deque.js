export class BucketedDeque {
    #everyBucketsLength = 8;
    #bucketSize = 4;
    #buckets;
    #frontBucket;
    #backBucket;
    #frontIndex;
    #backIndex;
    #size = 0;

    constructor(everyBucketsLength) {
        if (Number.isSafeInteger(everyBucketsLength) && everyBucketsLength > 4) {
            if (everyBucketsLength % 2) {
                this.#init(everyBucketsLength + 1);
            } else {
                this.#init(everyBucketsLength);
            }
        } else {
            this.#init();
        }
    }

    #init(bucketSize = this.#bucketSize) {
        this.#bucketSize = bucketSize;
        this.#size = 0;
        this.#buckets = new Array(bucketSize);
        for (let i = 0; i < bucketSize; ++i) {
            this.#buckets[i] = new Array(this.#everyBucketsLength);
        }
        this.#frontIndex = this.#everyBucketsLength - 1;
        this.#backIndex = 0;
        let mid = bucketSize / 2;
        this.#frontBucket = mid - 1;
        this.#backBucket = mid;
    }

    push_front(value) {
        if (this.#frontIndex < 0) {
            this.#frontIndex = this.#everyBucketsLength - 1;
            --this.#frontBucket;
            if (this.#frontBucket < 0) {
                this.#ensureBucket();
            }
        }
        this.#buckets[this.#frontBucket][this.#frontIndex] = value;
        --this.#frontIndex;
        ++this.#size;
    }

    push_back(value) {
        if (this.#backIndex >= this.#everyBucketsLength) {
            ++this.#backBucket;
            this.#backIndex = 0;
            if (this.#backBucket >= this.#bucketSize) {
            this.#ensureBucket();
            }
        }
        this.#buckets[this.#backBucket][this.#backIndex] = value;
        ++this.#backIndex;
        ++this.#size;
    }

    pop_front() {
        if (this.isEmpty()) {
            throw new Error("Deque is Empty");
        }

        ++this.#frontIndex;
        if (this.#frontIndex >= this.#everyBucketsLength) {
            this.#frontIndex = 0;
            ++this.#frontBucket;
        }

        const res = this.#buckets[this.#frontBucket][this.#frontIndex];
        --this.#size;
        return res;
    }

    pop_back() {
        if (this.isEmpty()) {
            throw new Error("Deque is empty");
        }
        --this.#backIndex;
        if (this.#backIndex < 0) {
            this.#backIndex = this.#everyBucketsLength - 1;
            --this.#backBucket;
        }
        let res = this.#buckets[this.#backBucket][this.#backIndex]; 
        --this.#size;
        return res;
    }

    front() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.at(0);
    }

    back() {
        if (this.isEmpty()) {
            return undefined;
        }
        return this.at(this.#size - 1);
    }

    clear() {
        this.#init(this.#bucketSize);
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    toArray() {
        let newArray = [];
        for (let i = 0; i < this.#size; ++i) {
            newArray.push(this.at(i));
        }
        return newArray;
    }

    at(globalIndex) {
        let res = this.#bucketIndex(globalIndex);
        if (res === undefined) {
            return undefined;
        }
        let {localIndex, bucketIndex} = res;
        return this.#buckets[bucketIndex][localIndex];
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; ++i) {
            yield this.at(i);
        }
    }

    #ensureBucket() {
        let newBucketsize = this.#bucketSize * 2;
        let newBuckets = new Array(newBucketsize);
        
        let i = 0;
        let j = newBucketsize - 1;
        while (i < this.#bucketSize / 2) {
            newBuckets[i] = new Array(this.#everyBucketsLength);
            newBuckets[j] = new Array(this.#everyBucketsLength);
            ++i;
            --j;
        }
        j = 0;

        while (j < this.#bucketSize) {
            newBuckets[i] = this.#buckets[j];
            ++i;
            ++j;
        }
        this.#frontBucket = (this.#bucketSize / 2) + this.#frontBucket;
        this.#backBucket = (this.#bucketSize / 2) + this.#backBucket;
        this.#bucketSize = newBucketsize;
        this.#buckets = newBuckets;
    }

    #bucketIndex(globalIndex) {
        if (!Number.isInteger(globalIndex) || globalIndex < 0 || globalIndex >= this.#size) {
            return undefined;
        }
        const absIndex = this.#frontIndex + globalIndex + 1; 
        const localIndex = absIndex % this.#everyBucketsLength;
        const bucketIndex = this.#frontBucket + Math.floor(absIndex / this.#everyBucketsLength);
        return {localIndex, bucketIndex};
    }
}

function testBucketedDeque() {
  console.log("🔍 Running BucketedDeque tests...\n");

  // 1. Default constructor
  const deque = new BucketedDeque();
  console.log("Empty:", deque.isEmpty());          // true
  console.log("Size:", deque.size());               // 0

  // 2. Constructor with valid even argument
  const deque2 = new BucketedDeque(6);
  console.log("Custom size deque isEmpty:", deque2.isEmpty()); // true

  // 3. Constructor with valid odd argument (should round up to 8)
  const deque3 = new BucketedDeque(7);
  console.log("Odd arg deque isEmpty:", deque3.isEmpty()); // true

  // 4. Constructor with invalid argument (should fall back to default)
  const deque4 = new BucketedDeque("abc");
  console.log("Invalid arg deque isEmpty:", deque4.isEmpty()); // true

  // 5. push_back
  deque.push_back(1);
  deque.push_back(2);
  deque.push_back(3);
  console.log("After push_back 1,2,3:", deque.toArray()); // [1,2,3]

  // 6. push_front
  deque.push_front(0);
  deque.push_front(-1);
  console.log("After push_front 0,-1:", deque.toArray()); // [-1,0,1,2,3]

  // 7. front / back
  console.log("front:", deque.front()); // -1
  console.log("back:", deque.back());   // 3

  // 8. at — valid indices
  console.log("at(0):", deque.at(0));   // -1
  console.log("at(2):", deque.at(2));   // 1
  console.log("at(4):", deque.at(4));   // 3

//   9. at — invalid indices
  console.log("at(-1):", deque.at(-1));   // undefined
  console.log("at(999):", deque.at(999)); // undefined
  console.log("at('x'):", deque.at('x')); // undefined

  // 10. pop_front
  const pf = deque.pop_front();
  console.log("pop_front:", pf, deque.toArray()); // -1, [0,1,2,3]

  // 11. pop_back
  const pb = deque.pop_back();
  console.log("pop_back:", pb, deque.toArray()); // 3, [0,1,2]

  // 12. iterator
  const arr = [];
  for (const x of deque) arr.push(x);
  console.log("Iterator:", arr); // [0,1,2]

  // 13. toArray
  console.log("toArray:", deque.toArray()); // [0,1,2]

  // 14. size / isEmpty
  console.log("Size:", deque.size());    // 3
  console.log("Empty:", deque.isEmpty()); // false

  // 15. Pop until empty
  deque.pop_front();
  deque.pop_front();
  deque.pop_front();
  console.log("After popping all, isEmpty:", deque.isEmpty()); // true
  console.log("front on empty:", deque.front()); // undefined
  console.log("back on empty:", deque.back());   // undefined

  // 16. Pop on empty deque — should throw
  try {
    deque.pop_front();
  } catch (e) {
    console.log("pop_front on empty throws:", e.message);
  }
  try {
    deque.pop_back();
  } catch (e) {
    console.log("pop_back on empty throws:", e.message);
  }

  // 17. clear
  deque.push_back(42);
  deque.clear();
  console.log("After clear isEmpty:", deque.isEmpty()); // true
  console.log("After clear size:", deque.size());       // 0

  // 18. Push after clear — should work normally
  deque.push_back(7);
  deque.push_front(3);
  console.log("After clear + push:", deque.toArray()); // [3,7]

  console.log("\n✅ Tests finished");
}

testBucketedDeque();