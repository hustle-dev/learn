// Topic: Implementing functionality with the impl keyword
//
// Requirements:
// * Print the characteristics of a shipping box
// * Must include dimensions, weight, and color
//
// Notes:
// * Use a struct to encapsulate the box characteristics
// * Use an enum for the box color
// * Implement functionality on the box struct to create a new box
// * Implement functionality on the box struct to print the characteristics

struct Dimensions {
    width: f64,
    height: f64,
    depth: f64,
}

impl Dimensions {
    fn print(&self) {
        println!("width: {:?}, height: {:?}, depth: {:?}", self.width, self.height, self.depth);
    }
}

enum Color {
    Red,
    Green,
    Blue,
}

impl Color  {
    fn print(&self) {
        match self {
            Color::Red => println!("color: red"),
            Color::Green => println!("color: green"),
            Color::Blue => println!("color: blue"),
        }
    }
}

struct ShippingBox {
    dimensions: Dimensions,
    weight: f64,
    color: Color
}

impl ShippingBox {
    fn create_shipping_box(dimensions: Dimensions, weight: f64, color: Color) -> Self {
        Self {
            dimensions,
            weight,
            color,
        }
    }

    fn print(&self) {
        self.dimensions.print();
        self.color.print();
        println!("weight: {:?}", self.weight);
    }
}

fn main() {
    let custom_dimension = Dimensions {
        width: 5.4,
        height: 7.5,
        depth: 3.2,
    };
    let custom_shipping_box = ShippingBox::create_shipping_box(custom_dimension, 5.0, Color::Red);
    custom_shipping_box.print();

}
