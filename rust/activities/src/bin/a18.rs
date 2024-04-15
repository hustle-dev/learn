// Topic: Result
//
// Requirements:
// * Determine if a customer is able to make a restricted purchase
// * Restricted purchases require that the age of the customer
//   is at least 21
//
// Notes:
// * Use a struct to store at least the age of a customer
// * Use a function to determine if a customer can make a restricted purchase
// * Return a result from the function
// * The Err variant should detail the reason why they cannot make a purchase
#[derive(Debug)]
struct Customer {
    age: i32,
}

fn can_restricted_purchase(customer: &Customer) -> Result<String, String> {
    match customer.age >= 21 {
        true => Ok("can purchase".to_owned()),
        false => Err("cannot purchase because customer age under 21".to_owned()),
    }
}

fn main() {
    let customer = Customer { age: 26 };
    let purchased = can_restricted_purchase(&customer);
    println!("{:?}", purchased);
}
