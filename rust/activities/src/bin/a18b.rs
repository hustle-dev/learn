// Topic: Result & the question mark operator
//
// Requirements:
// * Determine if an employee can access a building using a digital keycard
// * Employees that can access the building are:
//   * Maintenance crews
//   * Marketing department employees
//   * Managers
// * Other employees that work at the company are:
//   * Line supervisors
//   * Kitchen staff
//   * Assembly technicians
// * Ensure that terminated employees cannot access the building
//   regardless of their position
//
// Notes:
// * Use an enum to represent all types of employees
// * Use a struct to store the employee type and whether they are
//   still employed
// * Use a function that returns a Result to determine if the employee
//   may enter the building
// * Print whether the employee may access the building
//   * Must use a function that utilizes the question mark operator to do this
#[derive(Debug)]
enum Position {
    Maintenance,
    Marketing,
    Managers,
    LineSupervisor,
    KitchenStaff,
    AssemblyTechnician,
}

enum Status {
    Active,
    Terminated,
}

struct Employee {
    position: Position,
    status: Status,
}

fn can_enter_building(employee: &Employee) -> Result<Position, String> {
    match employee.status {
        Status::Terminated => return Err("terminated".to_owned()),
        _ => (),
    };

    match employee.position {
        Position::Maintenance => Ok(Position::Maintenance),
        Position::Marketing => Ok(Position::Marketing),
        Position::Managers => Ok(Position::Managers),
        _ => Err("invalid position".to_owned()),
    }
}

fn enter_building(employee: &Employee) -> Result<(), String> {
    can_enter_building(employee)?;
    println!("can access");
    Ok(())
}

fn main() {
    let employee = Employee {
        position: Position::LineSupervisor,
        status: Status::Active,
    };
    match enter_building(&employee) {
        Err(e) => println!("access denied: {:?}", e),
        _ => (),
    }
}
