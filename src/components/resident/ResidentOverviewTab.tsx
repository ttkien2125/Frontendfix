import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FileText, CreditCard, CheckCircle, AlertCircle } from "lucide-react";
import { api, Bill } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";

export function ResidentOverviewTab() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBills();
  }, []);

  const loadBills = async () => {
    try {
      const data = await api.bills.getMyBills();
      setBills(data);
    } catch (error) {
      console.error("Failed to load bills:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const unpaidBills = bills.filter((b) => b.status === "Unpaid").length;
  const paidBills = bills.filter((b) => b.status === "Paid").length;
  const overdueBills = bills.filter((b) => b.status === "Overdue").length;
  const totalUnpaid = bills
    .filter((b) => b.status === "Unpaid" || b.status === "Overdue")
    .reduce((sum, b) => sum + (b.total || 0), 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng hóa đơn</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{bills.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Chưa thanh toán</CardTitle>
            <AlertCircle className="w-4 h-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{unpaidBills}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Đã thanh toán</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">{paidBills}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng nợ</CardTitle>
            <CreditCard className="w-4 h-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">
              {totalUnpaid.toLocaleString("vi-VN")} ₫
            </div>
          </CardContent>
        </Card>
      </div>

      {overdueBills > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700">Cảnh báo quá hạn</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              Bạn có {overdueBills} hóa đơn đã quá hạn. Vui lòng thanh toán sớm để tránh phí phạt.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
