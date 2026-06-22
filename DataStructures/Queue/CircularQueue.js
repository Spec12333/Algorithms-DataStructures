// class CircularQueue {
//     #data;
//     #front;
//     #back;

//     constructor(capacity = 8, fill = 0) {
//         if (!Number.isInteger(capacity)) {
//             throw new Error("Capacity must be an integer");
//         }
//         if (capacity <= 0) {
//             throw new Error("Capacity must be non-negative number");
//         }
//         this.#data = new DArray(capacity, fill);
//         this.#front = 0;
//         this.#back = -1;
//     }

//     size() {
//         return this.#data.size;
//     }

//     capacity() {
//         return this.#data.capacity;
//     }

//     isEmpty() {
//         return this.#data.isEmpty();
//     }

//     clear() {
//         this.#data = new DArray();
//         this.#data.size = 0;
//     }

//     enqueue(value) {
//         if (this.#data.size === this.#data.capacity) {
//             this.#grow();
//         }
//         let back = (this.#data.size + this.#front) % this.#data.capacity;
//         this.#data[back] = value;
//         ++this.#data.size;
//     }

//     dequeue() {
//         let val = this.#data[this.#front];
//         this.#data[this.#front] = 0;
//         this.#front = (this.#front + 1) % this.#data.capacity;
//         --this.#data.size;
//         return val;
//     }

//     front() {
//         if (this.isEmpty()) {
//             throw new Error("The Queue is empty");
//         }
//         return this.#data[this.#front];
//     }

//     back() {
//         if (this.isEmpty()) {
//             throw new Error("The Queue is empty");
//         }
//         let back = (this.#data.size + this.#front - 1) % this.#data.capacity;
//         return this.#data[back];
//     }

//     #grow() {
//         let newCapacity = this.#data.capacity * 2;
//         let newArr = new DArray(newCapacity);
//         for (let i = 0; i < this.#data.size; ++i) {
//             let rare = (this.#front + i) % this.#data.capacity;
//             newArr[i] = this.#data[rare];
//         }
//         this.#data = newArr;
//         this.#front = 0;
//     }

//     toArray() {
//         let newArr = new Array();
//         let j = 0;
//         for (let i = this.#front; i < this.#front + this.#data.size; ++i, ++j) {
//             newArr[j] = this.#data[i];
//         }
//         return newArr;
//     }

//     toString() {
//         return this.#data.toArray().toString();
//     }

//     [Symbol.iterator]() {
//         for (let i = 0; i < this.#data.size; ++i) {
//             let elm = (this.#front + i) % this.#data.capacity;
//             yield this.#data[elm];
//         }
//     }
// }

// let q1 = new CircularQueue();
// q1.enqueue(15);
// console.log(q1.toArray());