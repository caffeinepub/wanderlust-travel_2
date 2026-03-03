import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import {
  ArrowLeft,
  CalendarDays,
  Compass,
  InboxIcon,
  RefreshCw,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import {
  useAdminSubscriberCount,
  useGetAllInquiries,
} from "../hooks/useAdminQueries";

export function AdminDashboard() {
  const queryClient = useQueryClient();
  const { data: inquiries, isLoading, isError } = useGetAllInquiries();
  const { data: subscriberCount, isLoading: subscribersLoading } =
    useAdminSubscriberCount();

  const handleBack = () => {
    window.location.hash = "";
  };

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["allInquiries"] });
    queryClient.invalidateQueries({ queryKey: ["adminSubscriberCount"] });
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "—";
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen font-body"
      style={{ background: "oklch(0.97 0.008 240)" }}
    >
      {/* Header */}
      <header className="navy-gradient shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[oklch(0.65_0.22_35)] flex items-center justify-center shadow-[0_4px_14px_oklch(0.65_0.22_35/0.4)]">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <span className="font-display text-white font-bold tracking-tight text-lg">
              Wanderlust
            </span>
            <span className="hidden sm:inline-block text-white/30 text-sm ml-1">
              /
            </span>
            <span className="hidden sm:inline-block text-white/60 text-sm font-medium">
              Admin
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              data-ocid="admin.refresh_button"
              className="text-white/70 hover:text-white hover:bg-white/10 gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBack}
              data-ocid="admin.back_button"
              className="bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Site
            </Button>
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <h1 className="font-display text-3xl font-bold text-[oklch(0.18_0.09_255)] mb-1">
            Booking Dashboard
          </h1>
          <p className="text-[oklch(0.52_0.04_255)] text-sm">
            View and manage all travel inquiry submissions.
          </p>
        </motion.div>

        {/* Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10"
        >
          {/* Total Inquiries */}
          <Card
            data-ocid="admin.stat.total_inquiries"
            className="border-[oklch(0.88_0.02_240)] shadow-card bg-white overflow-hidden relative"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.65 0.22 35) 0%, transparent 70%)",
              }}
            />
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-[oklch(0.52_0.04_255)] uppercase tracking-wider">
                Total Inquiries
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-[oklch(0.65_0.22_35/0.1)] flex items-center justify-center">
                <InboxIcon className="w-4.5 h-4.5 text-[oklch(0.65_0.22_35)]" />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-9 w-20 rounded-lg" />
              ) : (
                <p className="font-display text-4xl font-bold text-[oklch(0.18_0.09_255)]">
                  {inquiries?.length ?? 0}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Newsletter Subscribers */}
          <Card
            data-ocid="admin.stat.subscribers"
            className="border-[oklch(0.88_0.02_240)] shadow-card bg-white overflow-hidden relative"
          >
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.24 0.09 255) 0%, transparent 70%)",
              }}
            />
            <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-semibold text-[oklch(0.52_0.04_255)] uppercase tracking-wider">
                Newsletter Subscribers
              </CardTitle>
              <div className="w-9 h-9 rounded-xl bg-[oklch(0.24_0.09_255/0.08)] flex items-center justify-center">
                <Users className="w-4.5 h-4.5 text-[oklch(0.24_0.09_255)]" />
              </div>
            </CardHeader>
            <CardContent>
              {subscribersLoading ? (
                <Skeleton className="h-9 w-20 rounded-lg" />
              ) : (
                <p className="font-display text-4xl font-bold text-[oklch(0.18_0.09_255)]">
                  {subscriberCount !== undefined
                    ? subscriberCount.toString()
                    : "0"}
                </p>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Inquiries Table */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="border-[oklch(0.88_0.02_240)] shadow-card bg-white">
            <CardHeader className="border-b border-[oklch(0.88_0.02_240)] pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="font-display text-lg font-bold text-[oklch(0.18_0.09_255)]">
                    Booking Inquiries
                  </CardTitle>
                  <p className="text-[oklch(0.52_0.04_255)] text-sm mt-0.5">
                    All submitted travel booking requests
                  </p>
                </div>
                {!isLoading && inquiries && inquiries.length > 0 && (
                  <Badge
                    className="bg-[oklch(0.65_0.22_35/0.1)] text-[oklch(0.58_0.22_30)] border-[oklch(0.65_0.22_35/0.2)] font-semibold text-xs px-2.5"
                    variant="outline"
                  >
                    {inquiries.length}{" "}
                    {inquiries.length === 1 ? "inquiry" : "inquiries"}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Loading State */}
              {isLoading && (
                <div data-ocid="admin.loading_state" className="p-8 space-y-3">
                  {["sk-1", "sk-2", "sk-3", "sk-4"].map((sk) => (
                    <Skeleton key={sk} className="h-12 w-full rounded-lg" />
                  ))}
                </div>
              )}

              {/* Error State */}
              {isError && !isLoading && (
                <div className="p-12 text-center">
                  <p className="text-[oklch(0.52_0.04_255)] text-sm">
                    Failed to load inquiries. Try refreshing.
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!isLoading &&
                !isError &&
                (!inquiries || inquiries.length === 0) && (
                  <div
                    data-ocid="admin.inquiries.empty_state"
                    className="flex flex-col items-center justify-center py-16 px-8 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-[oklch(0.93_0.02_240)] flex items-center justify-center mb-4">
                      <CalendarDays className="w-6 h-6 text-[oklch(0.52_0.04_255)]" />
                    </div>
                    <h3 className="font-display font-semibold text-[oklch(0.18_0.09_255)] mb-1.5">
                      No inquiries yet
                    </h3>
                    <p className="text-[oklch(0.52_0.04_255)] text-sm max-w-xs">
                      When travelers submit booking requests, they'll appear
                      here.
                    </p>
                  </div>
                )}

              {/* Table */}
              {!isLoading && !isError && inquiries && inquiries.length > 0 && (
                <div
                  data-ocid="admin.inquiries.table"
                  className="overflow-x-auto"
                >
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-[oklch(0.88_0.02_240)] bg-[oklch(0.97_0.008_240)] hover:bg-[oklch(0.97_0.008_240)]">
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)] pl-6">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)]">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)]">
                          Package
                        </TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)]">
                          Travel Date
                        </TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)] text-center">
                          Travelers
                        </TableHead>
                        <TableHead className="font-semibold text-xs uppercase tracking-wider text-[oklch(0.52_0.04_255)] pr-6">
                          Message
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {inquiries.map((inquiry, index) => (
                        <TableRow
                          key={`${inquiry.email}-${index}`}
                          data-ocid={`admin.inquiries.row.${index + 1}`}
                          className="border-b border-[oklch(0.88_0.02_240)] hover:bg-[oklch(0.97_0.008_240)] transition-colors"
                        >
                          <TableCell className="pl-6 py-4">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full bg-[oklch(0.65_0.22_35/0.12)] flex items-center justify-center flex-shrink-0">
                                <span className="font-display font-bold text-xs text-[oklch(0.58_0.22_30)]">
                                  {inquiry.name.charAt(0).toUpperCase()}
                                </span>
                              </div>
                              <span className="font-medium text-[oklch(0.18_0.09_255)] text-sm truncate max-w-[120px]">
                                {inquiry.name}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-[oklch(0.33_0.06_255)] text-sm truncate max-w-[180px] block">
                              {inquiry.email}
                            </span>
                          </TableCell>
                          <TableCell className="py-4">
                            <Badge
                              variant="outline"
                              className="bg-[oklch(0.24_0.09_255/0.06)] border-[oklch(0.24_0.09_255/0.15)] text-[oklch(0.24_0.09_255)] text-xs font-medium whitespace-nowrap"
                            >
                              {inquiry.packageName || "—"}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-4">
                            <span className="text-[oklch(0.33_0.06_255)] text-sm whitespace-nowrap">
                              {formatDate(inquiry.travelDate)}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 text-center">
                            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[oklch(0.93_0.02_240)] font-semibold text-sm text-[oklch(0.27_0.07_255)]">
                              {inquiry.numTravelers.toString()}
                            </span>
                          </TableCell>
                          <TableCell className="py-4 pr-6">
                            <span className="text-[oklch(0.52_0.04_255)] text-sm line-clamp-2 max-w-[240px]">
                              {inquiry.message || "—"}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer credit */}
        <div className="mt-8 text-center">
          <p className="text-[oklch(0.52_0.04_255)] text-xs">
            © {new Date().getFullYear()} Wanderlust Travel — Admin Panel
          </p>
        </div>
      </main>
    </div>
  );
}
