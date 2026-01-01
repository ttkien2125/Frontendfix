import { useState } from "react";
import { Sidebar } from "../shared/Sidebar";
import { ResidentBillsTab } from "./ResidentBillsTab";
import { ResidentPaymentsTab } from "./ResidentPaymentsTab";
import { ResidentOverviewTab } from "./ResidentOverviewTab";

interface ResidentDashboardProps {
  username: string;
  role: string;
  onLogout: () => void;
}

export function ResidentDashboard({ username, role, onLogout }: ResidentDashboardProps) {
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
            <p className="text-gray-600">Chào mừng bạn đến với hệ thống BlueMoon</p>
          </div>

          {activeTab === "dashboard" && <ResidentOverviewTab />}
          {activeTab === "bills" && <ResidentBillsTab />}
          {activeTab === "payments" && <ResidentPaymentsTab />}
        </div>
      </div>
    </div>
  );
}
