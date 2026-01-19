export type StatusItem = {
    id: "active" | "inactive";
    value: string;
  };
  
  export const statusOptions: StatusItem[] = [
    { id: "active", value: "Newest" },
    { id: "inactive", value: "Oldest" },
  ];
  