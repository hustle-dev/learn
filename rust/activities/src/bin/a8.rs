// Topic: Organizing similar data using structs
//
// Requirements:
// * Print the flavor of a drink and it's fluid ounces
//
// Notes:
// * Use an enum to create different flavors of drinks
// * Use a struct to store drink flavor and fluid ounce information
// * Use a function to print out the drink flavor and ounces
// * Use a match expression to print the drink flavor

enum Flavor {
    Sweet,
    Sour,
    Salty,
}

struct Drink {
    flavor: Flavor,
    fluid_oz: f64,
}

fn print_flavor_ounce(drink: Drink) {
    match drink.flavor {
        Flavor::Sweet => println!("Sweet"),
        Flavor::Sour => println!("Sour"),
        Flavor::Salty => println!("Salty"),
    }
    println!("oz: {:?}", drink.fluid_oz);
}

fn main() {
    let drink = Drink {
        flavor: Flavor::Sweet,
        fluid_oz: 5.4
    };
    print_flavor_ounce(drink);
}
