import { VStack } from "@chakra-ui/react";
import EmployeeTable from "./components/ui/EmployeeTable";
import { useQuery } from "@tanstack/react-query";
import { baseUrl } from "../constants/global-variable.js";
import InputEmployee from "./components/ui/InputEmployee";
import { DialogTrigger } from "./components/ui/Dialog.jsx";
import { Button } from "@chakra-ui/react";

const App = () => {
  async function fetchEmployeeDetails(params) {
    const res = await fetch(baseUrl);
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error);
    }
    return data;
  }

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["employee_details"],
    queryFn: fetchEmployeeDetails,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  console.log("Data from postgres db:", data);

  return (
    <VStack gap="6" align="flex-start">
      <InputEmployee>
        <DialogTrigger asChild>
          <Button variant="outline">Add Employee</Button>
        </DialogTrigger>
      </InputEmployee>
      <EmployeeTable data={data} />
    </VStack>
  );
};

export default App;
