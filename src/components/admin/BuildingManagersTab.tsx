import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ShieldAlert } from "lucide-react";
import { api, BuildingManager } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface BuildingManagersTabProps {
  role: string;
}

export function BuildingManagersTab({ role }: BuildingManagersTabProps) {
  const [managers, setManagers] = useState<BuildingManager[]>([]);
  const [loading, setLoading] = useState(true);

  const canAccess = role === "Manager" || role === "Admin";

  useEffect(() => {
    if (canAccess) {
      loadManagers();
    }
  }, [canAccess]);

  const loadManagers = async () => {
    try {
      const data = await api.buildingManagers.getAll();
      setManagers(data);
    } catch (error) {
      console.error("Failed to load managers:", error);
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
            Chỉ Manager và Admin mới có quyền quản lý quản lý tòa nhà
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
        <CardTitle>Danh sách quản lý tòa nhà</CardTitle>
      </CardHeader>
      <CardContent>
        {managers.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Không có quản lý tòa nhà nào</p>
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
              {managers.map((manager) => (
                <TableRow key={manager.managerID}>
                  <TableCell>{manager.managerID}</TableCell>
                  <TableCell>{manager.fullName}</TableCell>
                  <TableCell>{manager.phoneNumber || "N/A"}</TableCell>
                  <TableCell>{manager.email || "N/A"}</TableCell>
                  <TableCell>{manager.username || "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
