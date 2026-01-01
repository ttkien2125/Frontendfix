import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { ShieldAlert, Plus, Pencil, Trash2, Key } from "lucide-react";
import { api, AccountCreate, AccountRoleUpdate, AccountPasswordUpdate } from "../../services/api";
import { Permissions, UserRole } from "../../utils/permissions";
import { toast } from "sonner@2.0.3";

interface AccountManagementTabProps {
  role: string;
}

type Account = {
  username: string;
  role: string;
  isActive: boolean;
};

export function AccountManagementTab({ role }: AccountManagementTabProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  // Form states
  const [createForm, setCreateForm] = useState<AccountCreate>({
    username: "",
    password: "",
    role: "Resident",
  });
  const [editRole, setEditRole] = useState<UserRole>("Resident");
  const [newPassword, setNewPassword] = useState("");

  const canAccess = Permissions.canManageAccounts(role as UserRole);

  const loadAccounts = async () => {
    // Note: Backend doesn't have a "get all accounts" endpoint
    // This is a placeholder - you would need to add this endpoint to your backend
    toast.info("Tính năng đang được phát triển");
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.accounts.create(createForm);
      toast.success("Tạo tài khoản thành công");
      setCreateDialogOpen(false);
      setCreateForm({ username: "", password: "", role: "Resident" });
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message || "Không thể tạo tài khoản");
    }
  };

  const handleUpdateRole = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    try {
      await api.accounts.updateRole(selectedAccount.username, { role: editRole });
      toast.success("Cập nhật vai trò thành công");
      setEditDialogOpen(false);
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message || "Không thể cập nhật vai trò");
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAccount) return;

    try {
      await api.accounts.updatePassword(selectedAccount.username, { newPassword });
      toast.success("Đổi mật khẩu thành công");
      setPasswordDialogOpen(false);
      setNewPassword("");
    } catch (error: any) {
      toast.error(error.message || "Không thể đổi mật khẩu");
    }
  };

  const handleDelete = async () => {
    if (!selectedAccount) return;

    try {
      await api.accounts.delete(selectedAccount.username);
      toast.success("Xóa tài khoản thành công");
      setDeleteDialogOpen(false);
      loadAccounts();
    } catch (error: any) {
      toast.error(error.message || "Không thể xóa tài khoản");
    }
  };

  if (!canAccess) {
    return (
      <Card className="shadow-lg">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <ShieldAlert className="w-12 h-12 text-red-500 mb-4" />
          <h3 className="text-gray-900 mb-2">Không có quyền truy cập</h3>
          <p className="text-gray-600 text-center">
            Chỉ Manager và Admin mới có quyền quản lý tài khoản
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle className="text-white">Quản lý tài khoản</CardTitle>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                <Plus className="w-4 h-4 mr-2" />
                Tạo tài khoản
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Tạo tài khoản mới</DialogTitle>
                <DialogDescription>
                  Nhập thông tin để tạo tài khoản mới trong hệ thống
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateAccount} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Tên đăng nhập</Label>
                  <Input
                    id="username"
                    value={createForm.username}
                    onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mật khẩu</Label>
                  <Input
                    id="password"
                    type="password"
                    value={createForm.password}
                    onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Vai trò</Label>
                  <Select
                    value={createForm.role}
                    onValueChange={(value) => setCreateForm({ ...createForm, role: value as UserRole })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Resident">Cư dân</SelectItem>
                      <SelectItem value="Accountant">Kế toán</SelectItem>
                      <SelectItem value="Manager">Quản lý</SelectItem>
                      <SelectItem value="Admin">Quản trị viên</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Hủy
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Tạo tài khoản
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-2">
              Chức năng xem danh sách tài khoản đang được phát triển.
            </p>
            <p className="text-gray-500 text-sm">
              Backend cần endpoint để lấy danh sách tất cả tài khoản.
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Hiện tại bạn có thể tạo tài khoản mới bằng nút "Tạo tài khoản" ở trên.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa vai trò</DialogTitle>
            <DialogDescription>
              Thay đổi vai trò của tài khoản {selectedAccount?.username}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateRole} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Vai trò mới</Label>
              <Select value={editRole} onValueChange={(value) => setEditRole(value as UserRole)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Resident">Cư dân</SelectItem>
                  <SelectItem value="Accountant">Kế toán</SelectItem>
                  <SelectItem value="Manager">Quản lý</SelectItem>
                  <SelectItem value="Admin">Quản trị viên</SelectItem>
                </SelectContent>
              </Select>
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

      {/* Change Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Đổi mật khẩu</DialogTitle>
            <DialogDescription>
              Đặt mật khẩu mới cho tài khoản {selectedAccount?.username}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-password">Mật khẩu mới</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={() => setPasswordDialogOpen(false)}>
                Hủy
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Đổi mật khẩu
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa tài khoản</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa tài khoản "{selectedAccount?.username}" không?
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
