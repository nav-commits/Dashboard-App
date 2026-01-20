// lib/customers.ts
import { Customer } from "@/types/customers";
  // Mock customer data
  export const customers: Customer[] = [
    {
      id: "1",
      name: "Alice Johnson",
      company: "Tech Solutions",
      phone: "+1 416-555-1234",
      email: "alice.johnson@techsolutions.com",
      country: "Canada",
      status: "active",
    },
    {
      id: "2",
      name: "Bob Smith",
      company: "Creative Minds",
      phone: "+1 647-555-5678",
      email: "bob.smith@creativeminds.com",
      country: "Canada",
      status: "inactive",
    },
    {
      id: "3",
      name: "Carla Gomez",
      company: "Marketing Pro",
      phone: "+1 905-555-9012",
      email: "carla.gomez@marketingpro.com",
      country: "Canada",
      status: "active",
    },
    {
      id: "4",
      name: "David Lee",
      company: "FinTech Ltd",
      phone: "+1 416-555-3456",
      email: "david.lee@fintech.com",
      country: "Canada",
      status: "active",
    },
    {
      id: "5",
      name: "Emily Davis",
      company: "HealthCare Co",
      phone: "+1 647-555-7890",
      email: "emily.davis@healthcareco.com",
      country: "Canada",
      status: "inactive",
    },
    {
      id: "6",
      name: "Frank Thompson",
      company: "BuildIt Corp",
      phone: "+1 416-555-2345",
      email: "frank.thompson@buildit.com",
      country: "Canada",
      status: "active",
    },
    {
      id: "7",
      name: "Grace Li",
      company: "Design Studio",
      phone: "+1 905-555-6789",
      email: "grace.li@designstudio.com",
      country: "Canada",
      status: "active",
    },
    {
      id: "8",
      name: "Henry Patel",
      company: "Finance Pros",
      phone: "+1 647-555-4321",
      email: "henry.patel@financepros.com",
      country: "Canada",
      status: "inactive",
    },
    {
      id: "9",
      name: "Isabella Rossi",
      company: "Travel Experts",
      phone: "+1 416-555-8765",
      email: "isabella.rossi@travelexperts.com",
      country: "Canada",
      status: "active",
    },
  ];
  
import { CustomerStat } from "@/types/customerStat";
  // Mock data for dashboard cards
  export const customerStats: CustomerStat[] = [
    {
      id: "1",
      icon: "/Icons/user-profile.svg",
      label: "Total Customers",
      number: "5,423",
      growth: "16%",
      growthType: "up",
    },
    {
      id: "2",
      icon: "/Icons/single-user.svg",
      label: "Members",
      number: "3,210",
      growth: "12%",
      growthType: "down",
    },
    {
      id: "3",
      icon: "/Icons/desktop.svg",
      label: "Active Now",
      number: "189",
      images: [
        "/images/person-1.png",
        "/images/person-2.png",
        "/images/person-3.png",
        "/images/person-4.png",
        "/images/person-5.png",
      ],
    },
  ];
  