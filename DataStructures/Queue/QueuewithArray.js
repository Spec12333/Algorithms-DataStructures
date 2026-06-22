class Queue {
    #queue;
    #front;
    #back;
    #capacity
    #size;

    constructor(initialCapacity = 16) {
        if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
            throw new Error("The capacity must be an integer and non-negative number");
        }
        this.#capacity = initialCapacity;
        this.#queue = new Array(this.#capacity);
        this.#size = 0;
        this.#front = 0;
        this.#back = -1;

    }

    enqueue(value) {
        if (this.#size === this.#capacity - 1) {
            this.#ensureCapacity();
        }
        ++this.#back;
        this.#queue[this.#back] = value;
        ++this.#size;
    }

    dequeue() {
        if (this.isEmpty()) {
            throw new Error("The queue is empty");
        }
        let val = this.#queue[this.#front];
        this.#queue[this.#front] = undefined;
        ++this.#front;
        --this.#size;
        return val;
    }

    front() {
        return this.#queue[this.#front];
    }

    back() {
        return this.#queue[this.#back];
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#queue = new Array(this.#capacity);
        this.#size = 0;
        this.#front = 0;
        this.#back = -1;
        return this;
    }

    toArray() {
        const newArr = [];
        for (let i = this.#front; i <= this.#back; ++i) {
            newArr.push(this.#queue[i])
        }
        return newArr;
    }

    *[Symbol.iterator]() {
        for (let i = this.#front; i <= this.#back; ++i) {
            yield this.#queue[i];
        }
    }
    
    #ensureCapacity() {
        const oldCapacity = this.#capacity;
        const newCapacity = oldCapacity * 2;

        const newArr = new Array(newCapacity);

        let j = 0;
        for (let i = this.#front; i <= this.#back; i++) {
            newArr[j++] = this.#queue[i];
        }

        this.#queue = newArr;
        this.#capacity = newCapacity;

        this.#front = 0;
        this.#back = j - 1;
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