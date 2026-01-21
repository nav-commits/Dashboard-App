"use client";

import { useCallback, useMemo, useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Dropdown from "@/components/Dropdown";
import { CustomerStat } from "@/types/customerStat";
import { statusOptions } from "@/lib/constants/status";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/services/firebase";
import { Customer } from "@/types/customers";
import { useFetch } from "@/hooks/useFetch";
import InputField from "@/components/InputField";

export default function Customers() {
  // Filters & pagination
  const [filteredStatus, setFilteredStatus] = useState<"all" | "active" | "inactive">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch customers
  const fetchCustomers = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "customers"));
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Customer[];
  }, []);
  const customersState = useFetch(fetchCustomers);

  // Fetch stats
  const fetchStats = useCallback(async () => {
    const snapshot = await getDocs(collection(db, "customerStats"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CustomerStat[];
    const order = ["Total Customers", "Members", "Active Now"];
    return order.map((label) => data.find((stat) => stat.label === label)!);
  }, []);
  const statsState = useFetch(fetchStats);

  // Filtered customers
  const filteredData = useMemo(() => {
    return (customersState.data ?? []).filter((item) => {
      const statusMatch = filteredStatus === "all" || item.status === filteredStatus;
      const searchMatch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.country.toLowerCase().includes(searchQuery.toLowerCase());
      return statusMatch && searchMatch;
    });
  }, [customersState.data, filteredStatus, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  // Reset page when filter/search changes
  const handleFilterChange = (id: "all" | "active" | "inactive") => {
    setFilteredStatus(id);
    setCurrentPage(1);
  };
  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  return (
    <main className="p-6">
      {/* Stats */}
      <Card bgClass="bg-white" className="m-3 p-6 shadow-xs w-full" aria-label="Customer statistics">
        {statsState.loading && <p className="text-gray-500">Loading stats...</p>}
        {statsState.error && <p className="text-red-500">{statsState.error}</p>}
        {!statsState.loading && !statsState.error && statsState.data?.length === 0 && (
          <p className="text-gray-400">No stats available</p>
        )}

        {!statsState.loading && !statsState.error && (statsState.data?.length ?? 0) > 0 && (
          <div className="flex flex-col lg:flex-row w-full">
            {statsState.data?.map((stat) => (
              <div
                key={stat.id}
                className="flex-1 flex flex-col sm:flex-row gap-3 px-4 py-4 text-left lg:border-r border-gray-200 lg:last:border-r-0 min-w-0"
              >
                {/* Icon */}
                {stat.icon && (
                  <div className="flex-shrink-0">
                    <Image
                      src={stat.icon}
                      alt={`${stat.label} icon`}
                      width={84}
                      height={84}
                      className="max-w-full h-auto"
                    />
                  </div>
                )}

                {/* Text content */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ACACAC]">{stat.label}</p>

                  {stat.number && (
                    <p className="font-semibold text-2xl mb-1 break-words truncate">
                      {stat.number}
                    </p>
                  )}

                  {stat.growth && (
                    <div
                      className={`flex flex-wrap gap-1 text-sm font-semibold items-center ${
                        stat.growthType === "up" ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      <Image
                        src={stat.growthType === "up" ? "/Icons/arrow-up.svg" : "/Icons/arrow-down.svg"}
                        alt="growth icon"
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                      />
                      <span>{stat.growth}</span>
                      <span className="text-black font-normal">this month</span>
                    </div>
                  )}

                  {stat.images && (
                    <div className="flex justify-start mt-2 -space-x-3">
                      {stat.images.map((img, idx) => (
                        <Image
                          key={idx}
                          src={img}
                          alt={`Customer ${idx + 1}`}
                          width={32}
                          height={32}
                          className="rounded-full border border-white"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Customers Table */}
      <Card className="m-3 p-6 shadow-xs w-full" aria-label="All Customers">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">All Customers</h2>
            <h3 className="text-md text-[#16C098]">Active Members</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full sm:w-auto">
            <InputField
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search"
              bgClass="bg-gray-100"
              type="search"
              icon={<img src="/Icons/search.svg" className="w-5 h-5" />}
            />
            <Dropdown
              placeholder="Sort by:"
              items={statusOptions}
              bgClass="bg-gray-100"
              initialSelectedId={filteredStatus}
              onSelect={(item) =>
                handleFilterChange(item.id as "all" | "active" | "inactive")
              }
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse divide-y divide-gray-200">
            <thead className="hidden sm:table-header-group">
              <tr>
                {["Customer Name", "Company", "Email", "Phone Number", "Country", "Status"].map((col) => (
                  <th
                    key={col}
                    className="px-4 sm:px-6 py-2 text-left text-sm font-medium text-[#B5B7C0]"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-6 text-center text-sm text-gray-400">
                    {customersState.loading
                      ? "Loading customers..."
                      : customersState.error
                      ? customersState.error
                      : "No customers found"}
                  </td>
                </tr>
              ) : (
                currentItems.map((customer) => (
                  <tr
                    key={customer.id}
                    className="sm:table-row block sm:block hover:bg-gray-50 transition-colors sm:hover:bg-none"
                  >
                    <td className="block sm:table-cell px-4 py-2">
                      <p className="text-sm font-medium">{customer.name}</p>
                      <p className="text-xs text-gray-500 sm:hidden">{customer.company}</p>
                    </td>
                    <td className="hidden sm:table-cell px-4 py-2">{customer.company}</td>
                    <td className="hidden sm:table-cell px-4 py-2">{customer.email}</td>
                    <td className="hidden sm:table-cell px-4 py-2">{customer.phone}</td>
                    <td className="hidden sm:table-cell px-4 py-2">{customer.country}</td>
                    <td className="block sm:table-cell px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-semibold ${
                          customer.status === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-2 gap-2">
          {/* Mobile Pagination */}
          <div className="flex justify-between w-full sm:hidden">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-md border border-gray-300 bg-white text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>

          {/* Desktop Pagination */}
          <div className="hidden sm:flex sm:items-center sm:justify-between w-full">
            <p className="text-sm text-[#B5B7C0]">
              Showing{" "}
              <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, filteredData.length)}
              </span>{" "}
              of <span className="font-medium">{filteredData.length}</span> results
            </p>
            <nav aria-label="Pagination" className="inline-flex -space-x-px rounded-md">
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="inline-flex items-center px-1.5 py-1.5 bg-[#EEEEEE] text-gray-600 hover:bg-gray-300 disabled:opacity-50 mr-2"
              >
                <span className="sr-only">Previous</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 text-xs font-medium rounded-md ${
                    currentPage === i + 1 ? "bg-indigo-600 text-white" : "bg-[#EEEEEE] text-gray-900"
                  } ${i < totalPages - 1 ? "mr-2" : ""}`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="inline-flex items-center px-1.5 py-1.5 bg-[#EEEEEE] text-gray-600 hover:bg-gray-300 disabled:opacity-50 ml-2"
              >
                <span className="sr-only">Next</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                  <path
                    d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </Card>
    </main>
  );
}
