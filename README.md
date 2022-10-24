# Module 12 Challenge - Employee Tracker

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Video](#video)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learnt](#what-i-learnt)
 
## Overview

### The challenge

Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). Your assignment this week is to build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

### User Story

```
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

### Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database
```

### Video
[Demo Video](https://drive.google.com/file/d/1swiw2EY5LvD2DmgtRHen0yIuHQcPv9ha/view?usp=sharing)

### Links

- [Github Repository](https://github.com/rmdn321/12-Employee-Tracker)

## My process

### Built with

- Inquirer
- Node.js
- MySQL
- Console.table

### What I learnt

- Use MySQL Shell to execute commands.

- Create a database schema.

- Seed a database for use in application development.

- Perform CRUD functions using MySQL commands.

- Specify the relationship between tables using primary and foreign keys.

- Write a SQL query that joins two tables together.

- Implement ? prepared statements in conjunction with INSERT, UPDATE, and DELETE

- Perform a calculation on a set of values using aggregate functions.