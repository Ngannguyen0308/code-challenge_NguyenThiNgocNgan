// way 1: Use loop for
var sum_to_n_a = function(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

// way 2: Use math 
var sum_to_n_b = function(n) {
    return (n * (n + 1)) / 2;
};

// way 3: Use recursion
var sum_to_n_c = function(n) {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
};

// check result
console.log(sum_to_n_a(5)); 
console.log(sum_to_n_b(5)); 
console.log(sum_to_n_c(5));
