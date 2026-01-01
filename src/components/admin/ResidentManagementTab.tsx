import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ShieldAlert } from "lucide-react";
import { api, Resident } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface ResidentManagementTabProps {
  role: string;
}

export function ResidentManagementTab({ role }: ResidentManagementTabProps) {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);

  const canAccess = role === "Manager" || role === "Admin";

  useEffect(() => {
    if (canAccess) {
      loadResidents();
    }
  }, [canAccess]);

  const loadResidents = async () => {
    try {
      const data = await api.residents.getAll();
      setResidents(data);
    } catch (error) {
      console.error("Failed to load residents:", error);
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
            Chỉ Manager và Admin mới có quyền quản lý cư dân
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
        <CardTitle>Danh sách cư dân</CardTitle>
      </CardHeader>
      <CardContent>
        {residents.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Không có cư dân nào</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Họ tên</TableHead>
                <TableHead>Căn hộ</TableHead>
                <TableHead>Tuổi</TableHead>
                <TableHead>Số điện thoại</TableHead>
                <TableHead>Chủ hộ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.residentID}>
                  <TableCell>{resident.residentID}</TableCell>
                  <TableCell>{resident.fullName}</TableCell>
                  <TableCell>{resident.apartmentID || "N/A"}</TableCell>
                  <TableCell>{resident.age || "N/A"}</TableCell>
                  <TableCell>{resident.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{resident.isOwner ? "Có" : "Không"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
