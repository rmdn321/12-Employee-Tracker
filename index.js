// TODO: Include packages needed for this application
const inquirer = require("inquirer");
const db = require("./db/connection");

const menu_questions = [
  {
    type: "list",
    name: "menu",
    message: "Select an option: ",
    choices: [
      "1. View all Departments",
      "2. View all Employees",
      "3. View all Roles",
      "4. Add a Department",
      "5. Add a Role",
      "6. Add an Employee",
      "7. Update an Employee Role",
      "8. Finish",
    ],
  },
];

const addDeptQuestions = [
  {
    type: "input",
    name: "department",
    message: "What is the name of the department you would like to add? ",
  },
];

const addRoleQuestions = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the Role you would like to add? ",
  },
  {
    type: "input",
    name: "salary",
    message: "What is the salary of this role? ",
  },
  {
    type: "input",
    name: "department",
    message: "Which department does this role fall under? ",
  },
];

const addEmployeeQuestions = [
  {
    type: "input",
    name: "firstName",
    message: "Enter First name of the employee: ",
  },
  {
    type: "input",
    name: "lastName",
    message: "Enter Last name of the employee: ",
  },
  {
    type: "input",
    name: "role",
    message: "What is the role of the employee? ",
  },
  {
    type: "input",
    name: "manager",
    message: "Who is the Manager of this person? ",
  },
];

const chooseEmployeeQuestions = [
  {
    type: "list",
    name: "employee",
    message: "Choose an Employee: ",
    choices: [],
  },
];

const updateEmployeeRoleQuestions = [
  {
    type: "input",
    name: "newRole",
    message: "What is the new Role of this employee? ",
  },
];

const getUserInputs = async (questions) => {
  return await inquirer
    .prompt(questions)
    .then((userAnswers) => {
      return userAnswers;
    })
    .catch((err) => {
      console.log(err);
    });
};

// Functions for menu options
async function viewAllDepts() {
  await db
    .promise()
    .query(
      `\n\n
  SELECT department.id AS 'Department ID', department.department_name AS 'Department Name'
  FROM department
  ORDER BY department.id;\n`
    )
    .then(([rows, fields]) => {
      // console.log(rows);
      console.table(rows);
    })
    .catch(console.log);
}

async function viewAllEmployees() {
  await db
    .promise()
    .query(
      `\n\n
  SELECT employee.id AS 'Employee ID', 
  employee.first_name AS 'First Name',
  employee.last_name AS 'Last Name',
  employee.role_id AS 'Role ID',
  employee.manager_id AS 'Manager ID'
  FROM employee
  ORDER BY employee.id;\n`
    )
    .then(([rows, fields]) => {
      // console.log(rows);
      console.table(rows);
    })
    .catch(console.log);
}

async function viewAllRoles() {
  await db
    .promise()
    .query(
      `\n\n
  SELECT role.id AS 'Role ID', 
  role.title AS 'Title',
  role.salary AS 'Salary',
  role.department_id AS 'Department ID'
  FROM role
  ORDER BY role.id;\n`
    )
    .then(([rows, fields]) => {
      // console.log(rows);
      console.table(rows);
    })
    .catch(console.log);
}

async function addDept() {
  response = await getUserInputs(addDeptQuestions);
  await db.promise().query(
    `\n\n
      INSERT INTO department (department_name) VALUES ("${response.department}");\n`
  );
}

async function addRole() {
  response = await getUserInputs(addRoleQuestions);
  department = await db
    .promise()
    .query(
      `SELECT department.id , department.department_name 
  FROM department WHERE department_name = "${response.department}"`
    )
    .then(([rows, fields]) => {
      return rows[0];
    })
    .catch(console.log);

  await db.promise().query(
    `\n\n
      INSERT INTO role (title, salary, department_id) VALUES ("${response.name}", "${response.salary}", "${department.id}");\n`
  );
}

async function addEmployee() {
  response = await getUserInputs(addEmployeeQuestions);
  roleId = await db.promise().query(
    `SELECT * FROM role WHERE title = "${response.role}"`
  ).then (async ([rows, fields]) => {
    return rows[0].id;
  })
  .catch(console.log);

  const name = response.manager.split(" ")
  managerId = await db.promise().query(
    `SELECT * FROM employee WHERE first_name = "${name[0]}" AND
    last_name = "${name[1]}"`
  ).then (async ([rows, fields]) => {
    return rows[0].id;
  })
  .catch(console.log);

  await db.promise().query(
    `\n\n
      INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.firstName}", "${response.lastName}", "${roleId}", "${managerId}");\n`
  );
}

async function updateRole(employeeName) {
  const name = employeeName.split(" ")
  employeeId = await db.promise().query(
    `SELECT * FROM employee WHERE first_name = "${name[0]}" AND
    last_name = "${name[1]}"`
  ).then (async ([rows, fields]) => {
    return rows[0].id;
  })
  .catch(console.log);

  response = await getUserInputs(updateEmployeeRoleQuestions);

  roleId = await db.promise().query(
    `SELECT * FROM role WHERE title = "${response.newRole}"`
  ).then (async ([rows, fields]) => {
    return rows[0].id;
  })
  .catch(console.log);
  
  await db.promise().query(
    `UPDATE employee SET role_id = "${roleId}" WHERE id = "${employeeId}"`
  );
}


async function chooseEmployee() {
  employeeIds = []
  chooseEmployeeQuestions[0].choices = await db.promise().query(
    `SELECT * FROM employee`
  ).then (async ([rows, fields]) => {
    return rows.map((row) => row.first_name + " " + row.last_name)
  })
  .catch(console.log);
  response = await getUserInputs(chooseEmployeeQuestions);
  updateRole(response.employee);
}


// TODO: Create a function to initialize app
async function init() {
  console.log(`\n WELCOME TO EMPLOYEE TRACKER! \n`);

  while (1) {
    // Menu with all the options
    response = await getUserInputs(menu_questions);

    // Based on user selection, ask corresponding questions
    if (response.menu === "1. View all Departments") {
      await viewAllDepts();
    } else if (response.menu === "2. View all Employees") {
      await viewAllEmployees();
    } else if (response.menu === "3. View all Roles") {
      await viewAllRoles();
    } else if (response.menu === "4. Add a Department") {
      await addDept();
    } else if (response.menu === "5. Add a Role") {
      await addRole();
    } else if (response.menu === "6. Add an Employee") {
      await addEmployee();
    } else if (response.menu === "7. Update an Employee Role") {
      await chooseEmployee();
    } else {
      console.log("Thank you!");
      break;
    }
  }
}

// Function call to initialize app
init();
