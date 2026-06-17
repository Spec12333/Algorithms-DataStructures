class Node {
    constructor(value, next = null) {
        this.value = value;
        this.next = next;
    }
}

class SinglyLinkedList {
    #head;
    constructor(head) {
        this.#head = head === undefined ? null : new Node(head);
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
        if (this.#head.next === null) {
            return this.#head.value;
        }
        let current = this.#head;
        while (current.next) {
            current = current.next;
        }
        return current.value;
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
        let newNode = new Node(value);
        newNode.next = this.#head;
        this.#head = newNode;
    }

    pushBack(value) {
        if (this.empty()) {
            this.#head = new Node(value);
            return;
        }
        const newNode = new Node(value);
        let current = this.#head;
        while (current.next) {
            current = current.next;
        }
        current.next = newNode;
    }

    popFront() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        const delVal = this.#head.value;
        this.#head = this.#head.next;
        return delVal;
    }

    popBack() {
        if (this.empty()) {
            throw new Error("The list is empty");
        }
        if (this.#head.next === null) {
            const res = this.#head.value;
            this.#head = null;
            return res;
        }
        let current = this.#head;
        while (current.next.next) {
            current = current.next;
        }
        const res = current.next.value;
        current.next = null;
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
            this.pushFront(value);
            return;
        }
        let current = this.#head;
        while (index !== 1 && current) {
            current = current.next;
            --index;
        }
        const newNode = new Node(value);
        newNode.next = current.next;
        current.next = newNode;
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
        let current = this.#head;
        while (index !== 1 && current) {
            current = current.next;
            --index;
        }
        const res = current.next.value;
        current.next = current.next.next;
        return res;
    }

    find(value) {
        if (this.empty()) {
            return -1;
        }
        let index = 0;
        let current = this.#head;
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
        while(current) {
            newArr.push(current.value);
            current = current.next;
        }
        return newArr;
    }

    reverse() {
        let prev = null;
        let current = this.#head;
        while (current) {
            let next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.#head = prev;
    }

    *[Symbol.iterator]() {
        let current = this.#head;
        while (current) {
            yield current.value;
            current = current.next;
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

function testLinkedList() {
  console.log("🔍 Running SinglyLinkedList tests...\n");

  // 1. Constructor + push
  const list = new SinglyLinkedList();

  list.pushBack(1);
  list.pushBack(2);
  list.pushBack(3);

  console.log("Initial:", list.toArray()); // [1,2,3]

  // 2. pushFront
  list.pushFront(0);
  console.log("pushFront(0):", list.toArray()); // [0,1,2,3]

  // 3. popFront
  const pf = list.popFront();
  console.log("popFront:", pf, list.toArray()); // 0

  // 4. popBack
  const pb = list.popBack();
  console.log("popBack:", pb, list.toArray()); // 3

  // 5. insert
  list.insert(1, 99);
  console.log("insert(1,99):", list.toArray());

  // 6. erase
  const er = list.erase(1);
  console.log("erase(1):", er, list.toArray());

  // 7. reverse
  list.pushBack(10);
  list.pushBack(20);
  list.pushBack(30);

  console.log("Before reverse:", list.toArray());
  list.reverse();
  console.log("After reverse:", list.toArray());

  // 8. find / contains
  console.log("find(20):", list.find(20));
  console.log("contains(20):", list.contains(20));
  console.log("find(999):", list.find(999));

  // 9. iterator test
  const arr = [];
  for (const x of list) arr.push(x);
  console.log("Iterator:", arr);

  // 10. entries test
  for (const [i, v] of list.entries()) {
    console.log("entry:", i, v);
  }

  // 11. size / empty
  console.log("Size:", list.size());
  console.log("Empty:", list.empty());

  // 12. clear
  list.clear();
  console.log("After clear:", list.toArray(), list.empty());

  console.log("\n✅ Tests finished");
}

testLinkedList();