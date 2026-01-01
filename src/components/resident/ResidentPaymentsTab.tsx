import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { api, PaymentTransaction, Bill } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { toast } from "sonner";

export function ResidentPaymentsTab() {
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [unpaidBills, setUnpaidBills] = useState<Bill[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBills, setSelectedBills] = useState<number[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [paymentData, billData] = await Promise.all([
        api.payments.getMyHistory(),
        api.bills.getMyBills(),
      ]);
      setPayments(paymentData);
      setUnpaidBills(billData.filter((b) => b.status === "Unpaid" || b.status === "Overdue"));
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateQR = async () => {
    if (selectedBills.length === 0) {
      toast.error("Vui lòng chọn ít nhất một hóa đơn");
      return;
    }

    try {
      await api.payments.createQR(selectedBills);
      toast.success("Tạo mã QR thanh toán thành công!");
      setSelectedBills([]);
      loadData();
    } catch (error: any) {
      toast.error(error.message || "Tạo mã QR thất bại");
    }
  };

  const toggleBillSelection = (billId: number) => {
    setSelectedBills((prev) =>
      prev.includes(billId)
        ? prev.filter((id) => id !== billId)
        : [...prev, billId]
    );
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Success":
        return <Badge className="bg-green-500">Thành công</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500">Đang xử lý</Badge>;
      case "Failed":
        return <Badge className="bg-red-500">Thất bại</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Unpaid Bills Section */}
      {unpaidBills.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Hóa đơn chưa thanh toán</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {unpaidBills.map((bill) => (
                <div
                  key={bill.billID}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() => toggleBillSelection(bill.billID)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={selectedBills.includes(bill.billID)}
                      onChange={() => {}}
                      className="w-4 h-4"
                    />
                    <div>
                      <p>
                        #{bill.billID} - {bill.typeOfBill}
                      </p>
                      <p className="text-sm text-gray-500">
                        Hạn: {bill.deadline ? new Date(bill.deadline).toLocaleDateString("vi-VN") : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p>{(bill.total || 0).toLocaleString("vi-VN")} ₫</p>
                    {bill.status === "Overdue" && (
                      <span className="text-xs text-red-500">Quá hạn</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <Button
              onClick={handleCreateQR}
              disabled={selectedBills.length === 0}
              className="w-full"
            >
              Tạo mã QR thanh toán ({selectedBills.length} hóa đơn)
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Chưa có giao dịch nào</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Mã giao dịch</TableHead>
                  <TableHead>Nội dung</TableHead>
                  <TableHead>Phương thức</TableHead>
                  <TableHead>Số tiền</TableHead>
                  <TableHead>Ngày thanh toán</TableHead>
                  <TableHead>Trạng thái</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.transID}>
                    <TableCell>#{payment.transID}</TableCell>
                    <TableCell>{payment.paymentContent || "N/A"}</TableCell>
                    <TableCell>{payment.paymentMethod || "N/A"}</TableCell>
                    <TableCell>{payment.amount.toLocaleString("vi-VN")} ₫</TableCell>
                    <TableCell>
                      {payment.payDate
                        ? new Date(payment.payDate).toLocaleDateString("vi-VN")
                        : "N/A"}
                    </TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
