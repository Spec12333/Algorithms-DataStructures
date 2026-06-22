import { BucketedDeque } from "../Deque/Deque.js"

class Queue {
    #data;
    #size = 0;

    constructor() {
        this.#data = new BucketedDeque();
    }

    enqueue(value) {
        this.#data.push_back(value);
        ++this.#size;
    }

    dequeue() {
        let val = this.#data.pop_front();
        --this.#size;
        return val;
    }

    front() {
        return this.#data.front();
    }

    back() {
        return this.#data.back();
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#data.isEmpty();
    }

    clear() {
        this.#data.clear();
        this.#size = 0;
        return this;
    }

    toArray() {
        return this.#data.toArray();
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; ++i) {
            yield this.#data.at(i);
        }
    }
}

function testQueue() {
    console.log("🔍 Running Queue tests...\n");

    // 1. Constructor
    const queue = new Queue();

    console.log("Empty:", queue.isEmpty());
    console.log("Size:", queue.size());

    // 2. enqueue
    queue.enqueue(10);
    queue.enqueue(20);
    queue.enqueue(30);

    console.log("After enqueue:", queue.toArray());

    // 3. front / back
    console.log("front():", queue.front());
    console.log("back():", queue.back());

    // 4. size
    console.log("size():", queue.size());

    // 5. iterator
    const iterated = [];

    for (const value of queue) {
        iterated.push(value);
    }

    console.log("Iterator:", iterated);

    // 6. dequeue
    console.log("dequeue():", queue.dequeue());
    console.log("After dequeue:", queue.toArray());

    // 7. FIFO test
    const q = new Queue();

    q.enqueue(1);
    q.enqueue(2);
    q.enqueue(3);
    q.enqueue(4);
    q.enqueue(5);

    console.log("\nFIFO order:");

    while (!q.isEmpty()) {
        console.log(q.dequeue());
    }

    // 8. clear
    queue.clear();

    console.log("\nAfter clear:");
    console.log("Empty:", queue.isEmpty());
    console.log("Size:", queue.size());
    console.log("Array:", queue.toArray());

    // 9. Error handling
    try {
        queue.dequeue();
    } catch (err) {
        console.log("\ndequeue() on empty queue:", err.message);
    }

    console.log("\n✅ Tests finished");
}

testQueue();