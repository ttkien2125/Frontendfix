import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ShieldAlert } from "lucide-react";
import { api, Accountant } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface AccountantsTabProps {
  role: string;
}

export function AccountantsTab({ role }: AccountantsTabProps) {
  const [accountants, setAccountants] = useState<Accountant[]>([]);
  const [loading, setLoading] = useState(true);

  const canAccess = role === "Manager" || role === "Admin";

  useEffect(() => {
    if (canAccess) {
      loadAccountants();
    }
  }, [canAccess]);

  const loadAccountants = async () => {
    try {
      const data = await api.accountants.getAll();
      setAccountants(data);
    } catch (error) {
      console.error("Failed to load accountants:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!canAccess) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-gray-900 mb-2">Không có quyền truy cập</h3>
          <p className="text-gray-600 text-center">
            Chỉ Manager và Admin mới có quyền quản lý kế toán
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Danh sách kế toán</CardTitle>
      </CardHeader>
      <CardContent>
        {accountants.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Không có kế toán nào</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tài khoản</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {accountants.map((accountant) => (
                <TableRow key={accountant.accountantID}>
                  <TableCell>{accountant.accountantID}</TableCell>
                  <TableCell>{accountant.fullName}</TableCell>
                  <TableCell>{accountant.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{accountant.email || "N/A"}</TableCell>
                  <TableCell>{accountant.username || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
