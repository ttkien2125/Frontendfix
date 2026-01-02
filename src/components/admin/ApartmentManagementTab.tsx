import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { ShieldAlert, Building, Plus, Pencil, Trash2 } from "lucide-react";
import { api, Apartment, ApartmentCreate } from "../../services/api";
import { LoadingSpinner } from "../shared/LoadingSpinner";
import { Permissions, UserRole } from "../../utils/permissions";
import { toast } from "sonner@2.0.3";

interface ApartmentManagementTabProps {
  role: string;
}

export function ApartmentManagementTab({ role }: ApartmentManagementTabProps) {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState(true);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  // Form states
  const [createForm, setCreateForm] = useState<ApartmentCreate>({
    apartmentID: "",
    area: undefined,
    status: "",
    buildingID: "",
  });

  const [editForm, setEditForm] = useState<Partial<Apartment>>({
    apartmentID: "",
    area: undefined,
    status: "",
    buildingID: "",
  });

  const canAccess = Permissions.canViewApartments(role as UserRole);

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
      toast.error("Không thể tải danh sách căn hộ");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.apartments.create(createForm);
      toast.success("Thêm căn hộ thành công");
      setCreateDialogOpen(false);
      setCreateForm({
        apartmentID: "",
        area: undefined,
        status: "",
        buildingID: "",
      });
      loadApartments();
    } catch (error: any) {
      toast.error(error.message || "Không thể thêm căn hộ");
    }
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApartment) return;

    try {
      await api.apartments.update(selectedApartment.apartmentID, editForm);
      toast.success("Cập nhật căn hộ thành công");
      setEditDialogOpen(false);
      loadApartments();
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật căn hộ");
    }
  };

  const handleDelete = async () => {
    if (!selectedApartment) return;

    try {
      await api.apartments.delete(selectedApartment.apartmentID);
      toast.success("Xóa căn hộ thành công");
      setDeleteDialogOpen(false);
      loadApartments();
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa căn hộ");
    }
  };

  const openEditDialog = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setEditForm({
      apartmentID: apartment.apartmentID,
      area: apartment.area,
      status: apartment.status,
      buildingID: apartment.buildingID,
    });
    setEditDialogOpen(true);
  };

  const openDeleteDialog = (apartment: Apartment) => {
    setSelectedApartment(apartment);
    setDeleteDialogOpen(true);
  };

  if (!canAccess) {
    return (
      <Card className="shadow-lg">
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
    <div className="space-y-4">
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-white">Danh sách căn hộ</CardTitle>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Thêm căn hộ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Thêm căn hộ mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin căn hộ mới vào hệ thống
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreate} className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Lưu ý:</strong> Số cư dân sẽ tự động được cập nhật khi bạn thêm hoặc xóa cư dân khỏi căn hộ này.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-apartmentID">Mã căn hộ *</Label>
                  <Input
                    id="create-apartmentID"
                    value={createForm.apartmentID}
                    onChange={(e) => setCreateForm({ ...createForm, apartmentID: e.target.value })}
                    placeholder="Ví dụ: A101"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-area">Diện tích (m²)</Label>
                  <Input
                    id="create-area"
                    type="number"
                    value={createForm.area || ""}
                    onChange={(e) => setCreateForm({ ...createForm, area: e.target.value ? parseFloat(e.target.value) : undefined })}
                    placeholder="Ví dụ: 75"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-status">Trạng thái</Label>
                  <Input
                    id="create-status"
                    value={createForm.status}
                    onChange={(e) => setCreateForm({ ...createForm, status: e.target.value })}
                    placeholder="Ví dụ: Đang ở, Trống"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="create-buildingID">Mã tòa nhà</Label>
                  <Input
                    id="create-buildingID"
                    value={createForm.buildingID}
                    onChange={(e) => setCreateForm({ ...createForm, buildingID: e.target.value })}
                    placeholder="Ví dụ: B001"
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Thêm căn hộ
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          {apartments.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Building className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">Không có căn hộ nào</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="text-blue-900">Mã căn hộ</TableHead>
                    <TableHead className="text-blue-900">Diện tích (m²)</TableHead>
                    <TableHead className="text-blue-900">Trạng thái</TableHead>
                    <TableHead className="text-blue-900">Mã tòa nhà</TableHead>
                    <TableHead className="text-blue-900">
                      <div className="flex items-center gap-1">
                        <span>Số cư dân</span>
                        <span className="text-xs text-blue-600" title="Tự động cập nhật khi thêm/xóa cư dân">(Auto)</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-blue-900 text-right">Hành động</TableHead>
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
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                            onClick={() => openEditDialog(apartment)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => openDeleteDialog(apartment)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa căn hộ</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin căn hộ {selectedApartment?.apartmentID}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEdit} className="space-y-4">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-800">
                  <strong>Số cư dân hiện tại:</strong> {selectedApartment?.numResident || 0} người
                </p>
                <span className="text-xs text-blue-600">(Tự động cập nhật)</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-apartmentID">Mã căn hộ *</Label>
              <Input
                id="edit-apartmentID"
                value={editForm.apartmentID}
                onChange={(e) => setEditForm({ ...editForm, apartmentID: e.target.value })}
                required
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-area">Diện tích (m²)</Label>
              <Input
                id="edit-area"
                type="number"
                value={editForm.area || ""}
                onChange={(e) => setEditForm({ ...editForm, area: e.target.value ? parseFloat(e.target.value) : undefined })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Trạng thái</Label>
              <Input
                id="edit-status"
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-buildingID">Mã tòa nhà</Label>
              <Input
                id="edit-buildingID"
                value={editForm.buildingID}
                onChange={(e) => setEditForm({ ...editForm, buildingID: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Cập nhật
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa căn hộ</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa căn hộ "{selectedApartment?.apartmentID}" không?
              Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
