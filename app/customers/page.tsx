"use client";

import { useState } from "react";
import Card from "@/components/Card";
import Image from "next/image";
import Search from "@/components/Search";
import Dropdown from "@/components/Dropdown";
import { customerStats, customers } from "@/lib/customers";
import { statusOptions } from "@/lib/status";

export default function Customers() {
  const [filteredStatus, setFilteredStatus] = useState<"active" | "inactive">(
    "active"
  );
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="p-6">
      {/* Customer Stats */}
      <Card
        bgClass="bg-white"
        className="m-3 p-6 shadow-xs"
        aria-label="Customer statistics"
      >
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
      </Card>

      {/* Search + Status Filter + Table */}
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
              initialSelectedId={filteredStatus}
              onSelect={(item) =>
                setFilteredStatus(item.id as "active" | "inactive")
              }
            />
          </div>
        </div>

        {/* Tailwind Table - Responsive Version */}
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm text-[#B5B7C0]">
                  Customer Name
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm  text-[#B5B7C0]">
                  Company
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm text-[#B5B7C0]">
                  Email
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm text-[#B5B7C0]">
                  Phone Number
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm text-[#B5B7C0]">
                  Country
                </th>
                <th className="px-4 sm:px-6 py-4 text-left text-sm font-medium sm:text-sm text-[#B5B7C0]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm sm:text-base whitespace-nowrap">
                    {customer.name}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm sm:text-base whitespace-nowrap">
                    {customer.company}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm sm:text-base whitespace-nowrap">
                    {customer.email}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm sm:text-base whitespace-nowrap">
                    {customer.phone}
                  </td>
                  <td className="px-4 sm:px-6 py-6 font-medium text-sm sm:text-base whitespace-nowrap">
                    {customer.country}
                  </td>
                  <td
                    className={`px-4 sm:px-6 py-3 text-sm sm:text-base font-medium  whitespace-nowrap ${
                      customer.status === "active"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {customer.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </main>
  );
}
