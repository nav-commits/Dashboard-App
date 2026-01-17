import Card from "@/components/Card";
import Image from "next/image";
import { customerStats } from "@/lib/customers";

export default function Customers() {
  return (
    <main className="p-6">
      <Card
        bgClass="bg-white"
        className="m-3 p-6"
        aria-label="Customer statistics"
      >
        <div className="flex flex-col lg:flex-row">
          {customerStats.map((stat) => (
            <div
              key={stat.id}
              className={`
                flex-1 flex items-start gap-3 px-4 py-4
                border-t border-gray-200
                lg:border-t-0 lg:border-r lg:last:border-r-0
              `}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <Image
                  src={stat.icon}
                  alt={`${stat.label} icon`}
                  width={84}
                  height={84}
                />
              </div>
              {/* Text */}
              <div className="flex-1">
                <p className="text-sm text-[#ACACAC]">{stat.label}</p>

                {/* Number */}
                {stat.number && (
                  <p className="font-semibold text-2xl mb-1">{stat.number}</p>
                )}
                {stat.growth && (
                  <div className="flex items-center gap-1 text-sm font-semibold">
                    {stat.growthType === "up" ? (
                      <span className="text-green-500">⬆</span>
                    ) : (
                      <span className="text-red-500">⬇</span>
                    )}
                    <span className="text-[#00AC4F]">{stat.growth}</span>
                    <span className="text-gray-500">this month</span>
                  </div>
                )}
                {stat.images && (
                  <div className="flex mt-2 -space-x-3">
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
    </main>
  );
}
