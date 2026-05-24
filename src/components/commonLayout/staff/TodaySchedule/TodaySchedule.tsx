"use client"
import AppButton from "@/components/ui/AppButton"
import { useGetTodayAssignmentsQuery } from "@/redux/api/staff.api";
import { UserRole } from "@/types";
import { ArrowRight, Clock, MapPin, User } from "lucide-react"
import { useAppSelector } from "@/redux/hooks";

const TodaySchedule = () => {
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role as UserRole | null;

  // Access the assignments array from your API response
  const { data } = useGetTodayAssignmentsQuery(undefined, {});
  const assignments = data?.data?.assignments || [];

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Today's Schedule</h1>
      </div>

      <div className="space-y-3">
        {assignments.length > 0 ? (
          assignments.map((assignment: any) => (
            <div
              key={assignment.id}
              className="flex flex-col sm:flex-row w-full items-start sm:items-center justify-between gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
            >
              {/* Left Section */}
              <div className="flex items-start sm:items-center gap-4 flex-1">
                {/* Time Box */}
                <div className="flex flex-col items-center justify-center min-w-[70px] p-3 rounded-lg bg-gray-50 border border-gray-200">
                  <Clock className="h-5 w-5 text-gray-600 mb-1" />
                  {/* Displaying Preferred Time or formatted date */}
                  <span className="text-sm font-semibold text-gray-700">
                    {assignment.booking.preferredTime || "All Day"}
                  </span>
                </div>

                {/* Appointment Details */}
                <div className="flex-1 space-y-2">
                  <h3 className="text-base font-semibold text-gray-900">
                    {assignment.booking.serviceName || "General Checkup"}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{assignment.booking.patient.name}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span>{assignment.booking.address}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section - View Details Button */}
              <div className="w-full sm:w-auto">
                <AppButton
                  label="View Details"
                  textColor="text-background hover:text-background"
                  hoverBgColor=""
                  className="flex items-center gap-2 text-sm hover:bg-secondary font-medium  hover:underline focus:outline-none mt-2 sm:mt-0"
                  icon={<ArrowRight className="h-4 w-4" />}
                  href={`/shared/care-history/${assignment.booking.patient.id}`}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm italic">No assignments for today.</p>
        )}
      </div>
    </div>
  )
}

export default TodaySchedule