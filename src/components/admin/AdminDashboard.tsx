import { useState } from "react";
import { Sidebar } from "../shared/Sidebar";
import { AdminOverviewTab } from "./AdminOverviewTab";
import { AccountManagementTab } from "./AccountManagementTab";
import { ResidentManagementTab } from "./ResidentManagementTab";
import { ApartmentManagementTab } from "./ApartmentManagementTab";
import { BuildingManagersTab } from "./BuildingManagersTab";
import { AccountantsTab } from "./AccountantsTab";
import { OfflinePaymentsTab } from "./OfflinePaymentsTab";

interface AdminDashboardProps {
  username: string;
  role: string;
  onLogout: () => void;
}

export function AdminDashboard({ username, role, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        role={role}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={onLogout}
      />

      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-gray-900">
              Xin chào, {username}
            </h2>
            <p className="text-gray-600">Bảng điều khiển {role}</p>
          </div>

          {activeTab === "dashboard" && <AdminOverviewTab />}
          {activeTab === "accounts" && <AccountManagementTab role={role} />}
          {activeTab === "residents" && <ResidentManagementTab role={role} />}
          {activeTab === "apartments" && <ApartmentManagementTab role={role} />}
          {activeTab === "building-managers" && <BuildingManagersTab role={role} />}
          {activeTab === "accountants" && <AccountantsTab role={role} />}
          {activeTab === "offline-payments" && <OfflinePaymentsTab />}
        </div>
      </div>
    </div>
  );
}
