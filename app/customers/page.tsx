"use client";

import { useEffect, useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Search from "@/components/Search";
import Dropdown from "@/components/Dropdown";
import { CustomerStat } from "@/lib/customers";
import { statusOptions } from "@/lib/status";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { customers } from "@/lib/customers";

export default function Customers() {
  const [filteredStatus, setFilteredStatus] = useState<"active" | "inactive">(
    "active"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [customerStats, setCustomerStats] = useState<CustomerStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statsError, setStatsError] = useState<string | null>(null);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(customers.length / itemsPerPage);

  // Get current page items
  const currentItems = customers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setStatsLoading(true);
        const snapshot = await getDocs(collection(db, "customerStats"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as CustomerStat[];
        setCustomerStats(data);
      } catch (err) {
        console.error("Error fetching customer stats:", err);
        setStatsError("Failed to load stats.");
      } finally {
        setStatsLoading(false);
      }
    };
    fetchStats();
  }, []);
  return (
    <main className="p-6">
      {/* Customer Stats */}
      <Card
        bgClass="bg-white"
        className="m-3 p-6 shadow-xs"
        aria-label="Customer statistics"
      >
        {statsLoading && <p className="text-gray-500">Loading stats...</p>}
        {statsError && <p className="text-red-500">{statsError}</p>}
        {!statsLoading && !statsError && customerStats.length === 0 && (
          <p className="text-gray-400">No stats available</p>
        )}
        {!statsLoading && !statsError && customerStats.length > 0 && (
          <div className="flex flex-col lg:flex-row">
            {customerStats.map((stat) => (
              <div
                key={stat.id}
                className="flex-1 flex flex-col sm:flex-row items-center sm:items-start gap-3 px-4 py-4 text-center sm:text-left border-t border-gray-200 lg:border-t-0 lg:border-r lg:last:border-r-0"
              >
                <div className="flex-shrink-0">
                  <Image
                    src={stat.icon}
                    alt={`${stat.label} icon`}
                    width={84}
                    height={84}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#ACACAC]">{stat.label}</p>
                  {stat.number && (
                    <p className="font-semibold text-2xl mb-1 break-words">
                      {stat.number}
                    </p>
                  )}
                  {stat.growth && (
                    <div
                      className={`flex flex-wrap items-center justify-center sm:justify-start gap-1 text-sm font-semibold ${
                        stat.growthType === "up"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      <Image
                        src={
                          stat.growthType === "up"
                            ? "/icons/arrow-up.svg"
                            : "/icons/arrow-down.svg"
                        }
                        alt="growth icon"
                        width={20}
                        height={20}
                      />
                      <span>{stat.growth}</span>
                      <span className="text-black font-normal">this month</span>
                    </div>
                  )}
                  {stat.images && (
                    <div className="flex justify-center sm:justify-start mt-2 -space-x-3">
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
      <Card className="m-3 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
          <div>
            <h2 className="text-2xl font-semibold">All Customers</h2>
            <h3 className="text-md text-[#16C098]">Active Members</h3>
          </div>
          <div className="flex gap-3 items-center w-full sm:w-auto">
            <Search
              value={searchQuery}
              onChange={(val) => setSearchQuery(val)}
              bgClass="bg-gray-100"
            />
            <Dropdown
              placeholder="Sort by:"
              items={statusOptions}
              bgClass="bg-gray-100"
              initialSelectedId={filteredStatus}
              onSelect={(item) =>
                setFilteredStatus(item.id as "active" | "inactive")
              }
            />
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Customer Name
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Company
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Phone Number
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Country
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium text-[#B5B7C0]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentItems.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm whitespace-nowrap">
                    {customer.company}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm whitespace-nowrap">
                    {customer.phone}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm whitespace-nowrap">
                    {customer.country}
                  </td>
                  <td className=" sm:px-6 text-sm font-medium whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-md ${
                        customer.status === "active"
                          ? "text-[#008767] bg-[#16C098]"
                          : "text-red-500 bg-red-100"
                      }`}
                    >
                      {customer.status.charAt(0).toUpperCase() +
                        customer.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
          <div className="flex flex-1 justify-between sm:hidden">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <p className="text-sm text-[#B5B7C0]">
              Showing data{" "}
              <span className="font-medium">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              to{" "}
              <span className="font-medium">
                {Math.min(currentPage * itemsPerPage, customers.length)}
              </span>{" "}
              of <span className="font-medium">{customers.length}</span> results
            </p>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-xs"
            >
              {/* Previous Button */}
              <button
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="relative inline-flex items-center rounded-md px-1.5 py-1.5 bg-[#EEEEEE] text-gray-600 hover:bg-gray-300 disabled:opacity-50 mr-2"
              >
                <span className="sr-only">Previous</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  />
                </svg>
              </button>
              <div className="flex space-x-2">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 text-xs font-medium rounded-md ${
                      currentPage === i + 1
                        ? "z-10 bg-indigo-600 text-white"
                        : "text-gray-900 bg-[#EEEEEE] hover:bg-[#EEEEEE]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              {/* Next Button */}
              <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-md px-1.5 py-1.5 bg-[#EEEEEE] text-gray-600 hover:bg-gray-300 disabled:opacity-50 ml-2"
              >
                <span className="sr-only">Next</span>
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
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
