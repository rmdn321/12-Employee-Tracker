INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Doel', 1, null),
       ('John', 'Doe', 5, 2),
       ('Ben', 'Smith', 2, 1),
       ('Tyler', 'Lane', 4, 2),
       ('Connor', 'Mike', 3, 1);



INSERT INTO department (department_name)
VALUES ('Management'),
       ('Front Desk'),
       ('Sales'),
       ('Human Resources'),
       ('Legal'),
       ('Tax'),
       ('Accounting');


INSERT INTO role (title, salary, department_id)
VALUES ('General Manager', 150000, 1),
       ('Assistant Manager', 130000, 1),
       ('Salesman', 75000, 3),
       ('Accountant', 95000, 7),
       ('Receptionist', 30000, 2),
       ('Human Resource', 75000, 4),
       ('CEO', 200000, null);