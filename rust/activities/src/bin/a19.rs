// Topic: HashMap
//
// Requirements:
// * Print the name and number of items in stock for a furniture store
// * If the number of items is 0, print "out of stock" instead of 0
// * The store has:
//   * 5 Chairs
//   * 3 Beds
//   * 2 Tables
//   * 0 Couches
// * Print the total number of items in stock
//
// Notes:
// * Use a HashMap for the furniture store stock

use std::collections::HashMap;

fn main() {
    let mut furniture_store = HashMap::new();

    furniture_store.insert("Chair".to_owned(), 5);
    furniture_store.insert("Bed".to_owned(), 3);
    furniture_store.insert("Table".to_owned(), 2);
    furniture_store.insert("Couch".to_owned(), 0);

    let mut total_number = 0;

    for (furniture_name, count) in furniture_store.iter() {
        match count {
            0 => println!("name: {:?}, out of stock", furniture_name),
            _ => {
                println!("name: {:?}, count: {:?}", furniture_name, count);
                total_number = total_number + count;
            }
        }
    }
    println!("total number of items: {:?}", total_number);
}
