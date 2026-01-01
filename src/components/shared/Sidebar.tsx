import { Home, FileText, CreditCard, Building, Users, UserCog, ClipboardList, LogOut } from "lucide-react";
import { Button } from "../ui/button";

interface SidebarProps {
  role: string;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

export function Sidebar({ role, activeTab, onTabChange, onLogout }: SidebarProps) {
  const getMenuItems = () => {
    if (role === "Resident") {
      return [
        { id: "dashboard", label: "Tổng quan", icon: Home },
        { id: "bills", label: "Hóa đơn", icon: FileText },
        { id: "payments", label: "Thanh toán", icon: CreditCard },
      ];
    }

    if (role === "Accountant") {
      return [
        { id: "dashboard", label: "Tổng quan", icon: Home },
        { id: "apartments", label: "Danh sách căn hộ", icon: Building },
        { id: "offline-payments", label: "Thanh toán ngoại tuyến", icon: CreditCard },
      ];
    }

    // Manager and Admin
    return [
      { id: "dashboard", label: "Tổng quan", icon: Home },
      { id: "accounts", label: "Quản lý tài khoản", icon: UserCog },
      { id: "residents", label: "Cư dân", icon: Users },
      { id: "apartments", label: "Căn hộ", icon: Building },
      { id: "building-managers", label: "Quản lý tòa nhà", icon: ClipboardList },
      { id: "accountants", label: "Kế toán", icon: ClipboardList },
    ];
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-indigo-600">BlueMoon</h1>
        <p className="text-gray-500 text-sm mt-1">{role}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start gap-3"
        >
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </Button>
      </div>
    </div>
  );
}
