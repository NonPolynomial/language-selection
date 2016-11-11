export const compose = (...fns) => (initial) => fns.reduce((carry, fn) => fn(carry), initial);
export const currify = (fn, ...setup) => (...args) => {
    if (args.length > 1) {
        throw SyntaxError(`Expect to get one parameter, but got ${args.length} parameters.`);
    }
    return fn.apply(null, setup.concat(args));
};

export const map = (fn) => (arr) => arr.map(fn);
export const filter = (fn) => (arr) => arr.filter(fn);
export const forEach = (fn) => (arr) => arr.forEach(fn);
export const reduce = (fn) => (arr) => arr.reduce(fn, null);