'use client'


import RevenueTrendChart from "@/components/commonLayout/admin/chart/RevenueTrendChart";
import ServiceRequestsChart from "@/components/commonLayout/admin/chart/ServiceRequestsCharts";
import RecentRequestsSectionUserData from "@/components/reUseAbleComponents/columns/Action/RecentRequestsSectionUserData";
import { StatsCard } from "@/components/reUseAbleComponents/StatCard";
import { DashboardSkeleton } from "@/Skeleton/DashboardSkeleton";
import { Suspense } from "react";
import { useGetAdminStatsQuery } from "@/redux/api/log";


function AdminDashboardContent() {

    const { data: adminStats } = useGetAdminStatsQuery({});

    // Extract data with fallback values
    const cards = adminStats?.data?.cards || {};
    const revenueTrendData = adminStats?.data?.revenueTrend || [];
    const serviceRequestsData = adminStats?.data?.serviceRequests || [];

    // Map the chart data to format expected by Recharts if needed
    // (In this case, renaming `month` to `name` and `amount`/`count` to `revenue`/`value`)
    const formattedRevenueData = revenueTrendData.map((item: any) => ({
        name: item.month,
        revenue: item.amount
    }));

    const formattedRequestsData = serviceRequestsData.map((item: any) => ({
        name: item.month,
        value: item.count
    }));

    return (
        <div className="space-y-10">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    title="Total Request"
                    value={cards.totalRequest?.toString() || "0"}
                    iconName={"Activity"}
                    className="text-foreground py-8 flex  "
                    iconClassName="bg-muted "
                    iconColorClassName="text-secondary"

                />
                <StatsCard
                    title="Active Users"
                    value={cards.activeUsers?.toString() || "0"}
                    iconName={"Users"}
                    className="text-foreground flex py-8   "
                    iconClassName="bg-muted "

                    iconColorClassName="text-secondary"
                />
                <StatsCard
                    title="Pending request"
                    value={cards.pendingRequest?.toString() || "0"}
                    className="text-foreground flex  py-8 "
                    iconClassName="bg-muted"

                    iconColorClassName="text-secondary"
                    iconName={"LayoutList"} />

            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 md:mt-8">
                {/* Revenue Trend Card */}
                <div className="bg-card rounded-xl border shadow-sm p-5 min-h-90 sm:min-h-100 lg:min-h-115">
                    <div className="mb-4 pb-1 border-b">
                        <h3 className="text-lg font-semibold tracking-tight">Revenue Trend</h3>
                        <p className="text-sm text-muted-foreground">Monthly overview — Last 7 months</p>
                    </div>
                    <div className="h-[calc(100%-76px)]">
                        <RevenueTrendChart data={formattedRevenueData} />
                    </div>
                </div>

                {/* Service Requests Card */}
                <div className="bg-card rounded-xl border shadow-sm p-5 min-h-90 sm:min-h-100 lg:min-h-115">
                    <div className="mb-4 pb-1 border-b">
                        <h3 className="text-lg font-semibold tracking-tight">Service Requests Trend</h3>
                        <p className="text-sm text-muted-foreground">Monthly total — Last 7 months</p>
                    </div>
                    <div className="h-[calc(100%-76px)]">
                        <ServiceRequestsChart data={formattedRequestsData} />

                    </div>
                </div>
            </div>
            {/* Recent Requests Table */}
            <RecentRequestsSectionUserData
            />
        </div>

    )

}

const AdminDashboardPage = () => {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome Emma!</h1>
            </div>

            <Suspense fallback={<DashboardSkeleton />}>
                <AdminDashboardContent />
            </Suspense>
        </div>
    );
};

export default AdminDashboardPage;