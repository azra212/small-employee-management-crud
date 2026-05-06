export const createRoleQuery = `
    DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_type') THEN
            CREATE TYPE role_type AS ENUM ('Manager', 'Developer', 'HR', 'Sales', 'Intern');
        END IF;
    END $$;
`;

export const createEmployeeTableQuery = `
    CREATE TABLE IF NOT EXISTS employee_details (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(50) UNIQUE NOT NULL,
        age SMALLINT NOT NULL CHECK (age > 17),
        role role_type NOT NULL DEFAULT 'Intern',
        salary DECIMAL(8, 2) NOT NULL CHECK (salary >= 0)
    );
`;

export const getAllEmployeeQuery = `SELECT * FROM employee_details;`;

export const createEmployeeQuery = `
    INSERT INTO employee_details (name, email, age, role, salary)   
    VALUES ($1, $2, $3, COALESCE($4::role_type, 'Intern'::role_type), $5) RETURNING *;
`;

export const getEmployeeByIdQuery = `
    SELECT * FROM employee_details WHERE id = $1;
`;

export const deleteEmployeeByIdQuery = `
    DELETE FROM employee_details WHERE id = $1 RETURNING *;
`;

export const updateEmployeeByIdQuery = `
    UPDATE employee_details
    SET name = COALESCE($1, name),
        email = COALESCE($2, email),
        age = COALESCE($3, age),
        role = COALESCE($4::role_type, role),
        salary = COALESCE($5, salary)
    WHERE id = $6
    RETURNING *;
`;
