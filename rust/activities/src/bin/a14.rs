// Topic: Strings
//
// Requirements:
// * Print out the name and favorite colors of people aged 10 and under
//
// Notes:
// * Use a struct for a persons age, name, and favorite color
// * The color and name should be stored as a String
// * Create and store at least 3 people in a vector
// * Iterate through the vector using a for..in loop
// * Use an if expression to determine which person's info should be printed
// * The name and colors should be printed using a function

struct Person {
    age: i32,
    name: String,
    favorite_color: String,
}

fn print_name_color(name: &str, color: &str) {
    println!("name: {:?}, favorite color: {:?}", name, color);
}

fn main() {
    let people = vec![
        Person {
            age: 14,
            name: String::from("AAA"),
            favorite_color: String::from("Black"),
        },
        Person {
            age: 31,
            name: String::from("BBB"),
            favorite_color: String::from("Blue"),
        },
        Person {
            age: 65,
            name: String::from("CCC"),
            favorite_color: String::from("Purple"),
        },
    ];

    for person in people {
        if person.age < 35 {
            print_name_color(&person.name, &person.favorite_color);
            println!("age: {:?}", person.age);
        }
    }
}
