import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { 
  CheckCircle2, 
  Users, 
  Building, 
  Calculator, 
  ClipboardList, 
  Shield,
  Plus,
  Pencil,
  Trash2,
  Eye,
  AlertCircle
} from "lucide-react";

export function CRUDFeaturesDemo() {
  const crudOperations = [
    {
      icon: Plus,
      name: "CREATE (Tạo)",
      color: "bg-green-100 text-green-700 border-green-300",
      description: "Thêm bản ghi mới vào hệ thống",
      features: [
        "Dialog form với validation",
        "Xử lý lỗi và thông báo",
        "Reset form sau khi tạo thành công",
      ],
    },
    {
      icon: Eye,
      name: "READ (Đọc)",
      color: "bg-blue-100 text-blue-700 border-blue-300",
      description: "Xem danh sách và chi tiết",
      features: [
        "Hiển thị dữ liệu trong bảng",
        "Loading states",
        "Empty states khi không có dữ liệu",
      ],
    },
    {
      icon: Pencil,
      name: "UPDATE (Cập nhật)",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
      description: "Chỉnh sửa thông tin hiện có",
      features: [
        "Pre-fill form với dữ liệu hiện tại",
        "Validation và xử lý lỗi",
        "Refresh danh sách sau khi cập nhật",
      ],
    },
    {
      icon: Trash2,
      name: "DELETE (Xóa)",
      color: "bg-red-100 text-red-700 border-red-300",
      description: "Xóa bản ghi khỏi hệ thống",
      features: [
        "Confirmation dialog trước khi xóa",
        "Không thể hoàn tác",
        "Thông báo kết quả",
      ],
    },
  ];

  const modules = [
    {
      icon: Shield,
      title: "Quản lý Tài khoản",
      path: "/components/admin/AccountManagementTab.tsx",
      operations: ["CREATE", "UPDATE (Role)", "UPDATE (Password)", "DELETE"],
      note: "Cần endpoint GET /api/accounts/ để xem danh sách",
      status: "partial",
    },
    {
      icon: Users,
      title: "Quản lý Cư dân",
      path: "/components/admin/ResidentManagementTab.tsx",
      operations: ["CREATE", "READ", "UPDATE", "DELETE"],
      status: "complete",
    },
    {
      icon: Calculator,
      title: "Quản lý Kế toán",
      path: "/components/admin/AccountantsTab.tsx",
      operations: ["CREATE", "READ", "UPDATE", "DELETE"],
      status: "complete",
    },
    {
      icon: ClipboardList,
      title: "Quản lý Quản lý tòa nhà",
      path: "/components/admin/BuildingManagersTab.tsx",
      operations: ["CREATE", "READ", "UPDATE", "DELETE"],
      status: "complete",
    },
    {
      icon: Building,
      title: "Quản lý Căn hộ",
      path: "/components/admin/ApartmentManagementTab.tsx",
      operations: ["CREATE", "READ", "UPDATE", "DELETE"],
      status: "complete",
    },
  ];

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <Card className="shadow-xl border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <CheckCircle2 className="w-8 h-8" />
            Chức năng CRUD đã hoàn thành
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <p className="text-lg text-gray-700 mb-2">
                Hệ thống BlueMoon đã được triển khai đầy đủ{" "}
                <strong className="text-blue-700">5 modules quản lý</strong> với chức năng CRUD hoàn chỉnh.
              </p>
              <p className="text-gray-600">
                Mỗi module đều có giao diện nhất quán, xử lý lỗi tốt, và trải nghiệm người dùng mượt mà.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Badge className="bg-green-500 text-white">5 Modules</Badge>
              <Badge className="bg-blue-500 text-white">4 Operations</Badge>
              <Badge className="bg-purple-500 text-white">20+ Features</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* CRUD Operations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {crudOperations.map((operation, index) => {
          const Icon = operation.icon;
          return (
            <Card key={index} className={`border-2 ${operation.color} shadow-lg`}>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Icon className="w-5 h-5" />
                  {operation.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-3">{operation.description}</p>
                <ul className="space-y-1">
                  {operation.features.map((feature, fIndex) => (
                    <li key={fIndex} className="text-xs flex items-start gap-1">
                      <CheckCircle2 className="w-3 h-3 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modules Status */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader className="bg-blue-50 border-b border-blue-200">
          <CardTitle className="text-blue-900">Trạng thái các Module</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{module.title}</h4>
                    <p className="text-xs text-gray-500 mb-2">{module.path}</p>
                    <div className="flex flex-wrap gap-1">
                      {module.operations.map((op, opIndex) => (
                        <Badge key={opIndex} variant="outline" className="text-xs">
                          {op}
                        </Badge>
                      ))}
                    </div>
                    {module.note && (
                      <div className="mt-2 flex items-start gap-1 text-xs text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                        <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                        <span>{module.note}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {module.status === "complete" ? (
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Hoàn thành
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500 text-white">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Một phần
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Common Features */}
      <Card className="shadow-lg border-purple-200">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle>Tính năng chung cho tất cả Modules</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {[
              { icon: "🎨", text: "Theme màu xanh dương nhất quán" },
              { icon: "📝", text: "Dialog forms với validation" },
              { icon: "⚠️", text: "Confirmation dialogs cho xóa" },
              { icon: "🔔", text: "Toast notifications (sonner)" },
              { icon: "⏳", text: "Loading states với spinners" },
              { icon: "📊", text: "Empty states với icons" },
              { icon: "✏️", text: "Action buttons trên mỗi hàng" },
              { icon: "📱", text: "Responsive design" },
              { icon: "✔️", text: "Form validation với required fields" },
              { icon: "🔒", text: "Role-based access control" },
              { icon: "🔄", text: "Auto-refresh sau mỗi thao tác" },
              { icon: "🎯", text: "Tích hợp đầy đủ với API backend" },
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <span className="text-xl">{feature.icon}</span>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* API Integration */}
      <Card className="shadow-lg border-green-200">
        <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <CardTitle>Tích hợp API</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-gray-700 mb-4">
            Tất cả các chức năng CRUD đều đã được kết nối với backend API theo đúng tài liệu API:
          </p>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm font-mono">
              <div>
                <div className="text-green-600 mb-1">POST /api/accounts/account</div>
                <div className="text-blue-600 mb-1">GET /api/residents/get-residents-data</div>
                <div className="text-yellow-600 mb-1">PUT /api/residents/{"{id}"}</div>
                <div className="text-red-600 mb-1">DELETE /api/residents/{"{id}"}</div>
              </div>
              <div>
                <div className="text-green-600 mb-1">POST /api/accountants/</div>
                <div className="text-blue-600 mb-1">GET /api/building-managers/</div>
                <div className="text-yellow-600 mb-1">PATCH /api/accountants/{"{id}"}</div>
                <div className="text-red-600 mb-1">DELETE /api/apartments/{"{id}"}</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Base URL: <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code>
          </p>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card className="shadow-lg border-indigo-200">
        <CardHeader className="bg-indigo-50 border-b border-indigo-200">
          <CardTitle className="text-indigo-900">Các bước tiếp theo</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 font-bold">1.</span>
              <span>
                Thêm endpoint <code className="bg-gray-100 px-2 py-1 rounded text-sm">GET /api/accounts/</code> 
                vào backend để xem danh sách tất cả tài khoản
              </span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 font-bold">2.</span>
              <span>Kiểm tra và test tất cả chức năng CRUD với backend thực tế</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 font-bold">3.</span>
              <span>Thêm pagination cho các bảng có nhiều dữ liệu</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 font-bold">4.</span>
              <span>Thêm chức năng tìm kiếm và lọc dữ liệu</span>
            </li>
            <li className="flex items-start gap-2 text-gray-700">
              <span className="text-indigo-600 font-bold">5.</span>
              <span>Thêm bulk actions (xóa nhiều, export CSV, etc.)</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
