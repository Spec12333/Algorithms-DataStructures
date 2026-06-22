import { BucketedDeque } from "../Deque/Deque.js"

class Stack {
    #data;
    #size = 0;

    constructor(initialCapacity = 8) {
        if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
            throw new Error("Capacity must be an integer and non negitve integer");
        }
        this.#data = new BucketedDeque();
    }

    push(value) {
        this.#data.push_back(value);
        ++this.#size;
    }

    pop() {
        --this.#size;
        return this.#data.pop_back();
    }

    peek() {
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

function testStack() {
    console.log("🔍 Running Stack tests...\n");

    // 1. Constructor
    const stack = new Stack();

    console.log("Empty:", stack.isEmpty());
    console.log("Size:", stack.size());

    // 2. push
    stack.push(10);
    stack.push(20);
    stack.push(30);

    console.log("After push:", stack.toArray());

    // 3. peek
    console.log("peek():", stack.peek());

    // 4. size
    console.log("size():", stack.size());

    // 5. iterator
    const iterated = [];

    for (const value of stack) {
        iterated.push(value);
    }

    console.log("Iterator:", iterated);

    // 6. pop
    console.log("pop():", stack.pop());
    console.log("After pop:", stack.toArray());

    // 7. automatic resize
    const smallStack = new Stack(2);

    smallStack.push(1);
    smallStack.push(2);
    smallStack.push(3);
    smallStack.push(4);
    smallStack.push(5);

    console.log("Resize test:", smallStack.toArray());
    console.log("Resize size:", smallStack.size());

    // 8. LIFO test
    console.log("\nLIFO order:");

    while (!smallStack.isEmpty()) {
        console.log(smallStack.pop());
    }

    // 9. clear
    stack.clear();

    console.log("\nAfter clear:");
    console.log("Empty:", stack.isEmpty());
    console.log("Size:", stack.size());
    console.log("Array:", stack.toArray());

    // 10. Error handling
    try {
        stack.pop();
    } catch (err) {
        console.log("\npop() on empty stack:", err.message);
    }

    console.log("\n✅ Tests finished");
}

testStack();