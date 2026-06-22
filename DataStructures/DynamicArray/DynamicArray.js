class DArray {
    #size = 0;
    #capacity;
    #arr = null;
    CAP_EXPONENT = 2;

    constructor(initialCapacity = 8) {
        if (!Number.isInteger(initialCapacity)) {
            throw new Error("Capacity must be an integer");
        }
        if (initialCapacity <= 0) {
            throw new Error("Capacity must be positive integer");
        }
        this.#capacity = initialCapacity;
        this.#arr = new Array(this.#capacity);
    }

    resize(newCapacity, fill = 0) {
        if (!Number.isInteger(newCapacity)) {
            throw new Error("Capacity must be an integer");
        }
        if (newCapacity < 0) {
            throw new Error("Capacity must be positive number");
        }
        if (newCapacity < this.#size) {
            this.#size = newCapacity;
        }
        const newArr = new Int32Array(newCapacity).fill(fill);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#arr[i];
        }
        this.#capacity = newCapacity;
        this.#arr = newArr;
    }

    push_back(elem) {
        if (!Number.isInteger(elem)) {
            throw new Error("The element must be an integer");
        }
        if (this.#size === this.#capacity) {
            let newCapacity = this.#capacity * this.CAP_EXPONENT;
            this.resize(newCapacity);
        }
        this.#arr[this.#size] = elem;
        this.#size++;
    }

    pop_back() {
        if (this.empty()) {
            return;
        }
        const res = this.#arr[this.#size - 1];
        --this.#size;
        return res;
    }

    erase(index) {
        if (!Number.isInteger(index)) {
            throw new Error("Index must be a number");
        }
        if (index < 0) {
            throw new Error("The index must be a positive number");
        }
        if (index >= this.#size) {
            throw new Error("The index is out of bounds of array");
        }
        for (let i = index; i < this.#size - 1; ++i) {
            this.#arr[i] = this.#arr[i + 1];
        }
        --this.#size;
    }

    at(index) {
        if (!Number.isInteger(index)) {
            throw new Error("Index must be a number");
        }
        if (index < 0) {
            throw new Error("The index must be a positive number");
        }
        if (index >= this.#size) {
            throw new Error("The index is out of bounds of array");
        }
        return this.#arr[index];
    }

    empty() {
        if (this.#size === 0) {
            return true;
        }
        return false;
    }

    clear() {
        this.#size = 0;
    }

    setValue(i, value) {
        if (!Number.isInteger(i)) {
            throw new Error("index must be a number");
        }
        if (!Number.isInteger(value)) {
            throw new Error("value must be a number");
        }
        if (i < 0 || i >= this.#size) {
            throw new Error("index must be in the bound of array and be positive number");
        }
        this.#arr[i] = value;
    }

    front() {
        if (this.empty()) {
            return;
        }
        return this.#arr[0];
    }

    back() {
        if (this.empty()) {
            return;
        }
        return this.#arr[this.#size - 1];
    }

    capacity() {
        return this.#capacity;
    }

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.#size) {
                    return {
                        value: this.#arr[index++],
                        done: false
                    };
                }

                return {
                    value: undefined,
                    done: true
                };
            }
        };
    }

    reserve(n) {
        if (!Number.isInteger(n) || n < 0) {
            throw new Error("reserve must be a non-negative integer");
        }
        if (n > this.#capacity) {
            this.resize(n);
        }
    }

    shrinkToFit() {
        this.resize(this.#size);
    }

    toArray() {
        let newArr = new Array(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#arr[i];
        }
        return newArr;
    }

    insert(pos, value) {
        if (!Number.isInteger(pos)) {
            throw new Error("index must be number");
        }
        if (!Number.isInteger(value)) {
            throw new Error("Value Must be integer");
        }
        if (pos < 0 || pos > this.#size) {
            throw new Error("index must be positive number and must be in the bound of array");
        }
        if (this.#size === this.#capacity) {
            const newCapacity = this.#capacity * this.CAP_EXPONENT;
            this.resize(newCapacity);
        }
        for (let i = this.#size; i > pos; --i) {
            this.#arr[i] = this.#arr[i - 1]
        }
        this.#arr[pos] = value;
        this.#size++;
    }

    swap(i, j) {
        if (!Number.isInteger(i) || !Number.isInteger(j)) {
            throw new Error("Indexes must be number");
        }
        if (i < 0 || i >= this.#size || j < 0 || j >= this.#size) {
            throw new Error("The indexes must be positive and be in the bound of array");
        }
        [this.#arr[i], this.#arr[j]] = [this.#arr[j], this.#arr[i]];
    }

    *values() {
        for (let i = 0; i < this.#size; ++i) {
            yield this.#arr[i];
        }
    }

    *keys() {
        for (let i = 0; i < this.#size; ++i) {
            yield i;
        }
    }

    *entries() {
        for (let i = 0; i < this.#size; ++i) {
            yield [i, this.#arr[i]];
        }
    }

    forEach(callBack, thisArg) {
        if (typeof callBack !== "function") {
            throw new TypeError("CallBack must be a function");
        }
        for (let i = 0; i < this.#size; ++i) {
            callBack.call(thisArg, this.#arr[i], i, this);
        }
    }

    map(callBack, thisArg) {
        let newArr = new DArray(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            newArr.push_back(callBack.call(thisArg, this.#arr[i], i, this));
        }
        return newArr;
    }

    filter(callBack, thisArg) {
        let newArr = new DArray(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            if (callBack.call(thisArg, this.#arr[i], i, this)) {
                newArr.push_back(this.#arr[i]);
            }
        }
        return newArr;
    }

    reduce(callback, initialValue) {
        if (typeof callback !== "function") {
            throw new TypeError("Callback must be a function");
        }

        if (this.#size === 0 && initialValue === undefined) {
            throw new TypeError("Reduce of empty DArray with no initial value");
        }

        let i = 0;
        let acc;

        if (initialValue !== undefined) {
            acc = initialValue;
        } else {
            acc = this.#arr[0];
            i = 1;
        }

        for (; i < this.#size; i++) {
            acc = callback(acc, this.#arr[i], i, this);
        }

        return acc;
    }

    some(callBack, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callBack.call(thisArg, this.#arr[i], i, this)) {
                return true;
            }
        }
        return false;
    }

    every(callBack, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (!callBack.call(thisArg, this.#arr[i], i, this)) {
                return false;
            }
        }
        return true;
    }

    find(callBack, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callBack.call(thisArg, this.#arr[i], i, this)) {
                return this.#arr[i];
            }
        }
        return undefined;
    }

    
    findIndex(callBack, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callBack.call(thisArg, this.#arr[i], i, this)) {
                return i;
            }
        }
        return -1;
    }

    includes(value) {
        for (let i = 0; i < this.#size; ++i) {
            if (this.#arr[i] === value) {
                return true;
            }
        }
        return false;
    }   
}

let da = new DArray(2)

da.push_back(10);
da.push_back(20);
da.push_back(30);

da.insert(1, 99); // [10, 99, 20, 30]
console.log(da.toArray());

da.erase(2); // [10, 99, 30]
console.log([...da]); // [10, 99, 30]

const squares = da.map(x => x * x);
console.log(squares.toArray()); // [100, 9801, 900]

const sum = da.reduce((acc, x) => acc + x, 0);
console.log(sum); // 139