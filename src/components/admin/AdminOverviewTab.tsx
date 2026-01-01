import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Users, Building, FileText, UserCog } from "lucide-react";

export function AdminOverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng cư dân</CardTitle>
            <Users className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">-</div>
            <p className="text-xs text-gray-500 mt-1">Đang cập nhật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tổng căn hộ</CardTitle>
            <Building className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">-</div>
            <p className="text-xs text-gray-500 mt-1">Đang cập nhật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Hóa đơn chưa thanh toán</CardTitle>
            <FileText className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">-</div>
            <p className="text-xs text-gray-500 mt-1">Đang cập nhật</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm">Tài khoản quản trị</CardTitle>
            <UserCog className="w-4 h-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-gray-900">-</div>
            <p className="text-xs text-gray-500 mt-1">Đang cập nhật</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Chào mừng đến với hệ thống BlueMoon</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Sử dụng menu bên trái để quản lý các chức năng của hệ thống.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
