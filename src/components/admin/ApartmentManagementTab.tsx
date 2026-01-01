import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ShieldAlert } from "lucide-react";
import { api, Apartment } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";

interface ApartmentManagementTabProps {
  role: string;
}

export function ApartmentManagementTab({ role }: ApartmentManagementTabProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);

  const canAccess = role === "Accountant" || role === "Manager" || role === "Admin";

  useEffect(() => {
    if (canAccess) {
      loadApartments();
    }
  }, [canAccess]);

  const loadApartments = async () => {
    try {
      const data = await api.apartments.getAll();
      setApartments(data);
    } catch (error) {
      console.error("Failed to load apartments:", error);
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
            Chỉ Accountant, Manager và Admin mới có quyền xem danh sách căn hộ
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
        <CardTitle>Danh sách căn hộ</CardTitle>
      </CardHeader>
      <CardContent>
        {apartments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">Không có căn hộ nào</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã căn hộ</TableHead>
                <TableHead>Diện tích (m²)</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead>Mã tòa nhà</TableHead>
                <TableHead>Số cư dân</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apartments.map((apartment) => (
                <TableRow key={apartment.apartmentID}>
                  <TableCell>{apartment.apartmentID}</TableCell>
                  <TableCell>{apartment.area || "N/A"}</TableCell>
                  <TableCell>{apartment.status || "N/A"}</TableCell>
                  <TableCell>{apartment.buildingID || "N/A"}</TableCell>
                  <TableCell>{apartment.numResident || 0}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
