import { Select, Portal, createListCollection } from "@chakra-ui/react";

const SelectRole = ({ setInfo }) => {
  return (
    <Select.Root
      collection={roles}
      size="sm"
      width="320px"
      onChange={(e) => setInfo((prev) => ({ ...prev, role: e.target.value }))}
    >
      <Select.HiddenSelect />
      <Select.Label>Select role</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select role" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {roles.items.map((roles) => (
              <Select.Item item={roles} key={roles.value}>
                {roles.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>
  );
};

export default SelectRole;

const roles = createListCollection({
  items: [
    { label: "HR", value: "HR" },
    { label: "Developer", value: "Developer" },
    { label: "Manager", value: "Manager" },
    { label: "Intern", value: "Intern" },
    { label: "Sales", value: "Sales" },
  ],
});
