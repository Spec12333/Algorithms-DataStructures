class Node {
    constructor(value, prev = null, next = null){
        this.value = value;
        this.prev = prev;
        this.next = next;
    }
}

class DoublyLinkedList {
    #head;
    #tail;
    constructor(value) {
        if (value === undefined) {
            this.#head = null;
            this.#tail = null;
        } else {
            const node = new Node(value);
            this.#head = node;
            this.#tail = node;
        }
    }

    empty() { 
        return this.#head === null;
    }

    size() {
        if (this.empty()) {
            return 0;
        }
        if (this.#head.next === null) {
            return 1;
        }
        let length = 0;
        let current = this.#head;
        while (current) {
            ++length;
            current = current.next;
        }
        return length;
    }

    clear() {
        this.#head = null;
        this.#tail = null; 
    }

    front() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        return this.#head.value;
    }

    back() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        return this.#tail.value;
    }

    at(index) {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        if (!Number.isInteger(index)) {
            throw new Error("Index must be an integer");
        }
        if (index < 0) {
            throw new Error("Index must be a non-negative integer");
        }
        if (index >= this.size()) {
            throw new Error("The index must be in the bound of List");
        }
        let current = this.#head;
        while (index) {
            --index;
            current = current.next;
        }
        return current.value;
    }

    pushFront(value) {
        if (this.empty()) {
            let newNode = new Node(value);
            this.#head = newNode;
            this.#tail = newNode;
            return;
        }
        const newNode = new Node(value);
        newNode.next = this.#head;
        this.#head.prev = newNode;
        this.#head = newNode;
    }

    pushBack(value) {
        if (this.empty()) {
            let newNode = new Node(value);
            this.#head = newNode;
            this.#tail = newNode;
            return;
        }
        const newNode = new Node(value);
        newNode.prev = this.#tail;
        this.#tail.next = newNode;
        this.#tail = newNode;
    }

    popFront() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        if (this.#head.next === null) {
            const res = this.#head.value;
            this.#head = null;
            this.#tail = null;
            return;
        }
        const res = this.#head.value;
        this.#head = this.#head.next;
        this.#head.prev = null;
        return res;
    }

    popBack() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        if (this.#head.next === null) {
            const res = this.#head.value;
            this.#head = null;
            this.#tail = null;
            return;
        }
        const res = this.#tail.value;
        this.#tail = this.#tail.prev;
        this.#tail.next = null;
        return res;
    }

    insert(index, value) {
        if (!Number.isInteger(index)) {
            throw new Error("Index must be an integer");
        }
        if (index < 0) {
            throw new Error("Index must be a non-negative integer");
        }
        if (index > this.size()) {
            throw new Error("The index must be in the bound of List");
        }
        if (index === 0) {
            return this.pushFront(value);
        }
        if (index === this.size()) {
            return this.pushBack(value);
        }
        let current = this.#head;
        while (index !== 1 && current) {
            current = current.next;
            --index;
        }
        const newNode = new Node(value);
        const nextNode = current.next;
        newNode.next = nextNode;
        newNode.prev = current;
        current.next = newNode;
        nextNode.prev = newNode;
    }

    erase(index) {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        if (!Number.isInteger(index)) {
            throw new Error("Index must be an integer");
        }
        if (index < 0) {
            throw new Error("Index must be a non-negative integer");
        }
        if (index >= this.size()) {
            throw new Error("The index must be in the bound of List");
        }
        if (index === 0) {
            return this.popFront();
        }
        if (index === this.size() - 1) {
            return this.popBack()
        }
        let current = this.#head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        let res = current.next.value;
        let prev = current;
        let next = current.next.next;
        prev.next = next;
        next.prev = prev;
        return res;
    }

    find(value) {
        if (this.empty()) {
            return -1;
        }
        let current = this.#head;
        let index = 0;
        while (current) {
            if (current.value === value) {
                return index;
            }
            ++index;
            current = current.next;
        }
        return -1;
    }

    contains(value) {
        if (this.empty()) {
            return false;
        }
        let current = this.#head;
        while (current) {
            if (current.value === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    toArray() {
        const newArr = new Array();
        let current = this.#head;
        while (current) {
            newArr.push(current.value);
            current = current.next;
        }
        return newArr;
    }

    reverse() {
        let current = this.#head;

        while (current) {
            let temp = current.next;

            current.next = current.prev;
            current.prev = temp;

            current = current.prev;
        }

        let temp = this.#head;
        this.#head = this.#tail;
        this.#tail = temp;
    }

    *[Symbol.iterator]() {
        let current = this.#head;
        while (current) {
            yield current.value;
            current = current.next;
        }
    }

    *reverseIterator() {
        let current = this.#tail;
        while (current) {
            yield current.value;
            current = current.prev;
        }
    }

    *entries() {
        let current = this.#head;
        let index = 0;
        while (current) {
            yield [index, current.value];
            current = current.next;
            ++index;
        }
    }
}

function testDoublyLinkedList() {
  console.log("🔍 Running DoublyLinkedList tests...\n");

  // 1. Constructor + push
  const list = new DoublyLinkedList();

  list.pushBack(1);
  list.pushBack(2);
  list.pushBack(3);

  console.log("Initial:", list.toArray()); // [1,2,3]

  // 2. pushFront
  list.pushFront(0);
  console.log("pushFront(0):", list.toArray()); // [0,1,2,3]

  // 3. popFront
  const pf = list.popFront();
  console.log("popFront:", pf, list.toArray()); // 0, [1,2,3]

  // 4. popBack
  const pb = list.popBack();
  console.log("popBack:", pb, list.toArray()); // 3, [1,2]

  // 5. insert
  list.insert(1, 99);
  console.log("insert(1,99):", list.toArray()); // [1,99,2]

  // 6. erase
  const er = list.erase(1);
  console.log("erase(1):", er, list.toArray()); // 99, [1,2]

  // 7. reverse
  list.pushBack(10);
  list.pushBack(20);
  list.pushBack(30);

  console.log("Before reverse:", list.toArray()); // [1,2,10,20,30]
  list.reverse();
  console.log("After reverse:", list.toArray()); // [30,20,10,2,1]

  // 8. find / contains
  console.log("find(20):", list.find(20));
  console.log("contains(20):", list.contains(20));
  console.log("find(999):", list.find(999));

  // 9. front / back
  console.log("front:", list.front());
  console.log("back:", list.back());

  // 10. at
  console.log("at(0):", list.at(0));
  console.log("at(2):", list.at(2));

  // 11. iterator test (forward)
  const arr = [];
  for (const x of list) arr.push(x);
  console.log("Iterator (forward):", arr);

  // 12. reverseIterator test
  const revArr = [];
  for (const x of list.reverseIterator()) revArr.push(x);
  console.log("Iterator (reverse):", revArr);

  // 13. entries test
  for (const [i, v] of list.entries()) {
    console.log("entry:", i, v);
  }

  // 14. size / empty
  console.log("Size:", list.size());
  console.log("Empty:", list.empty());

  // 15. constructor with initial value
  const single = new DoublyLinkedList(42);
  console.log("new DoublyLinkedList(42):", single.toArray(), "size:", single.size());

  // 16. clear
  list.clear();
  console.log("After clear:", list.toArray(), list.empty());

  console.log("\n✅ Tests finished");
}

testDoublyLinkedList();