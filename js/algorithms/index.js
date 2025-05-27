
function summation(){
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
        sum += i;
    }
    return sum;
}

function factorial(n) {
    if (n < 0) {
        return "Factorial is not defined for negative numbers";
    }
    if (n === 0 || n === 1) {
        return 1;
    }
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}




class sagaPattern {
    constructor() {
        this.state = {};
    }

    *runSaga(saga) {
        const iterator = saga();
        let result = iterator.next();
        while (!result.done) {
            this.state = { ...this.state, ...result.value };
            result = iterator.next(this.state);
        }
        return this.state;
    }
}


class ComplicatedSagaPatternWithNetworkCalls extends sagaPattern {
    constructor() {
        super();
        this.networkCalls = [];
    }

    *runSaga(saga) {
        const iterator = saga();
        let result = iterator.next();
        while (!result.done) {
            if (result.value && typeof result.value === 'object' && result.value.networkCall) {
                this.networkCalls.push(result.value.networkCall);
            }
            this.state = { ...this.state, ...result.value };
            result = iterator.next(this.state);
        }
        return { state: this.state, networkCalls: this.networkCalls };
    }
}


class ComplicatedSagaPatternWithFluentApi{
    constructor() {
        this.state = {};
        this.networkCalls = [];
    }

    withState(state) {
        this.state = { ...this.state, ...state };
        return this;
    }

    withNetworkCall(networkCall) {
        this.networkCalls.push(networkCall);
        return this;
    }

    runSaga(saga) {
        const iterator = saga();
        let result = iterator.next();
        while (!result.done) {
            if (result.value && typeof result.value === 'object' && result.value.networkCall) {
                this.networkCalls.push(result.value.networkCall);
            }
            this.state = { ...this.state, ...result.value };
            result = iterator.next(this.state);
        }
        return { state: this.state, networkCalls: this.networkCalls };
    }
}


class SagaPatternWithFluentApi {
    constructor() {
        this.state = {};
        this.networkCalls = [];
        this._saga = null;
    }

    withInitialState(initialState = {}) {
        this.state = { ...initialState };
        return this;
    }

    withSaga(saga) {
        this._saga = saga;
        return this;
    }

    run() {
        if (!this._saga) {
            throw new Error("No saga provided. Use withSaga() to set a saga.");
        }
        const iterator = this._saga();
        let result = iterator.next();
        while (!result.done) {
            if (result.value && typeof result.value === 'object' && result.value.networkCall) {
                this.networkCalls.push(result.value.networkCall);
            }
            this.state = { ...this.state, ...result.value };
            result = iterator.next(this.state);
        }
        return { state: this.state, networkCalls: this.networkCalls };
    }

    reset() {
        this.state = {};
        this.networkCalls = [];
        this._saga = null;
        return this;
    }
}
function* mySagaGenerator() {
    yield { user: { name: "Alice" } };
    yield { networkCall: "fetchUserData" };
    yield { data: [1, 2, 3] };
    return { done: true };
}


const sagaInstance = new ComplicatedSagaPatternWithFluentApi()
    .withInitialState({ user: null })
    .withSaga(mySagaGenerator)
    .run();



function fibonacci(n) {
    const fib = [0,1]
    for (let i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}

function fibonacciRecursive(n) {
    if (n <= 1) return n;
    return fibonacciRecursive(n - 1) + fibonacciRecursive(n - 2);
}

function fibonacciMemoization(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    memo[n] = fibonacciMemoization(n - 1, memo) + fibonacciMemoization(n - 2, memo);
    return memo[n];
}



// Public Key:
// BKNbFZij6XgGCsoqenEHK87QSFu84ZBf6ZscJWMcHm3lOEU5gixg3_Nj6viE-5BglCN5kYDXj6Xs178peYrAU58

// Private Key:
// N6eIEon4ta9jTR9o-9xo7akr5Svf8uieMuJZ-G0UvW8