class Stack {
    #stack;
    #size;
    #capacity;

    constructor(initialCapacity = 16) {
        if (!Number.isInteger(initialCapacity) || initialCapacity <= 0) {
            throw new Error("Capacity must be an integer and non-negative number");
        }
        this.#capacity = initialCapacity;
        this.#size = 0;
        this.#stack = new Array(this.#capacity);
    }

    push(value) {
        if (this.#capacity === this.#size) {
            this.#ensureCapacity();
        }
        this.#stack[this.#size] = value;
        ++this.#size;
    }

    pop() {
        if (this.isEmpty()) {
            throw new Error("There is no elements in Stack");
        }
        let val = this.#stack[this.#size - 1];
        this.#stack[this.#size - 1] = undefined;
        --this.#size;
        return val;
    }

    peek() {
        if (this.isEmpty()) {
            throw new Error("There is no elements in Stack");
        }
        let val = this.#stack[this.#size - 1];
        return val;
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#stack = new Array(this.#capacity);
        this.#size = 0;
        return this;
    }

    toArray() {
        let newArr = new Array(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#stack[i]
        }
        return newArr;
    }

    *[Symbol.iterator]() {
        for (let i = 0; i < this.#size; ++i) {
            yield this.#stack[i];
        }
    }

    #ensureCapacity() {
        this.#capacity = this.#capacity * 2;
        const newArr = new Array(this.#capacity);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#stack[i];
        }
        this.#stack = newArr;
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

    try {
        stack.peek();
    } catch (err) {
        console.log("peek() on empty stack:", err.message);
    }

    console.log("\n✅ Tests finished");
}

testStack();