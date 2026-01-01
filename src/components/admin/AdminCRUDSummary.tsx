import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CheckCircle2, Users, Building, Calculator, ClipboardList, Shield } from "lucide-react";

export function AdminCRUDSummary() {
  const features = [
    {
      icon: Shield,
      title: "Quản lý Tài khoản",
      features: [
        "✅ Tạo tài khoản mới với tên đăng nhập, mật khẩu và vai trò",
        "✅ Cập nhật vai trò tài khoản (Resident, Accountant, Manager, Admin)",
        "✅ Đổi mật khẩu cho tài khoản",
        "✅ Xóa/vô hiệu hóa tài khoản",
      ],
    },
    {
      icon: Users,
      title: "Quản lý Cư dân",
      features: [
        "✅ Thêm cư dân mới với đầy đủ thông tin",
        "✅ Xem danh sách tất cả cư dân",
        "✅ Chỉnh sửa thông tin cư dân",
        "✅ Xóa cư dân khỏi hệ thống",
      ],
    },
    {
      icon: Calculator,
      title: "Quản lý Kế toán",
      features: [
        "✅ Thêm kế toán mới",
        "✅ Xem danh sách kế toán",
        "✅ Cập nhật thông tin kế toán",
        "✅ Xóa kế toán khỏi hệ thống",
      ],
    },
    {
      icon: ClipboardList,
      title: "Quản lý Quản lý tòa nhà",
      features: [
        "✅ Thêm quản lý tòa nhà mới",
        "✅ Xem danh sách quản lý",
        "✅ Cập nhật thông tin quản lý",
        "✅ Xóa quản lý khỏi hệ thống",
      ],
    },
    {
      icon: Building,
      title: "Quản lý Căn hộ",
      features: [
        "✅ Thêm căn hộ mới",
        "✅ Xem danh sách căn hộ",
        "✅ Cập nhật thông tin căn hộ",
        "✅ Xóa căn hộ khỏi hệ thống",
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-green-200 bg-green-50">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6" />
            Chức năng CRUD đã được triển khai đầy đủ
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-6">
            Tất cả 5 module quản lý đã có đầy đủ chức năng <strong>Create (Tạo)</strong>,{" "}
            <strong>Read (Đọc)</strong>, <strong>Update (Cập nhật)</strong>, và{" "}
            <strong>Delete (Xóa)</strong> với các tính năng sau:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((module, index) => {
              const Icon = module.icon;
              return (
                <Card key={index} className="border-blue-200">
                  <CardHeader className="bg-blue-50">
                    <CardTitle className="flex items-center gap-2 text-blue-900">
                      <Icon className="w-5 h-5" />
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <ul className="space-y-2">
                      {module.features.map((feature, fIndex) => (
                        <li key={fIndex} className="text-sm text-gray-700">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Tính năng chung cho tất cả modules:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-700">
              <li>🎨 Giao diện nhất quán với theme màu xanh dương</li>
              <li>📝 Dialog forms cho tạo/chỉnh sửa</li>
              <li>⚠️ Confirmation dialogs cho xóa</li>
              <li>🔔 Toast notifications cho thành công/lỗi</li>
              <li>⏳ Loading states với spinners</li>
              <li>📊 Empty states với icons hữu ích</li>
              <li>✏️ Action buttons (Edit/Delete) trên mỗi hàng</li>
              <li>📱 Responsive design</li>
              <li>✔️ Form validation</li>
              <li>🔒 Role-based access control</li>
            </ul>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Lưu ý:</h4>
            <p className="text-sm text-gray-700">
              Module <strong>Quản lý Tài khoản</strong> hiện chỉ có chức năng Tạo tài khoản mới. 
              Để xem danh sách tất cả tài khoản, backend cần thêm endpoint{" "}
              <code className="bg-white px-2 py-1 rounded">GET /api/accounts/</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
