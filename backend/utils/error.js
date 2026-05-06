export const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

export const formatDbError = (error) => {
  // Duplicate email
  if (error.code === "23505") {
    if (error.constraint === "employee_details_email_key") {
      return createError(409, "An employee with this email already exists.");
    }

    if (error.constraint === "employee_details_pkey") {
      return createError(409, "Employee ID already exists. Please try again.");
    }

    return createError(409, "This record already exists.");
  }

  // Check constraint failed
  if (error.code === "23514") {
    if (error.constraint?.includes("age")) {
      return createError(400, "Employee must be at least 18 years old.");
    }

    if (error.constraint?.includes("salary")) {
      return createError(400, "Salary cannot be negative.");
    }

    return createError(400, "Some employee data is invalid.");
  }

  // Invalid enum value, example: role_type "intern"
  if (error.code === "22P02") {
    if (error.message.includes("role_type")) {
      return createError(
        400,
        "Invalid role selected. Please choose HR, Developer, Manager, Intern, or Sales.",
      );
    }

    return createError(400, "Invalid input value.");
  }

  return createError(500, "Something went wrong. Please try again.");
};
