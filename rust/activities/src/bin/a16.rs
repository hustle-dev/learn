// Topic: Option
//
// Requirements:
// * Print out the details of a student's locker assignment
// * Lockers use numbers and are optional for students
//
// Notes:
// * Use a struct containing the student's name and locker assignment
// * The locker assignment should use an Option<i32>

// * Use a struct containing the student's name and locker assignment
// * The locker assignment should use an Option<i32>

struct LockerInfo {
    name: String,
    locker: Option<i32>,
}

fn main() {
    let locker1 = LockerInfo {
        name: "AAA".to_owned(),
        locker: Some(2),
    };
    let locker2 = LockerInfo {
        name: "BBB".to_owned(),
        locker: Some(6),
    };
    let locker3 = LockerInfo {
        name: "CCC".to_owned(),
        locker: None,
    };

    let lockers = [locker1, locker2, locker3];

    for locker in lockers {
        match locker.locker {
            Some(locker_number) => println!("locker number: {:?}", locker_number),
            None => println!("name of no locker assignment: {:?}", locker.name),
        }
    }
}
