// Topic: Basic arithmetic
//
// Program requirements:
// * Displays the result of the sum of two numbers
//
// Notes:
// * Use a function to add two numbers together
// * Use a function to display the result
// * Use the "{:?}" token in the println macro to display the result

fn sum(n: i32, m: i32) -> i32 {
    n + m
}

fn display_result(result: i32) {
    println!("{:?}", result);
}

fn main() {
    let result = sum(6, 1);
    display_result(result);
}
