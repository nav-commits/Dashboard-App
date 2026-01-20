interface StatusItem {
  id: "all" | "active" | "inactive";
  name: string; 
}
export const statusOptions: StatusItem[] = [
  { id: "all", name: "All" },      
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" }, 
];
