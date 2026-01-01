import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { CheckCircle2, FileText, Presentation } from "lucide-react";
import { AdminCRUDSummary } from "./admin/AdminCRUDSummary";
import { CRUDFeaturesDemo } from "./admin/CRUDFeaturesDemo";
import { AccountManagementTab } from "./admin/AccountManagementTab";
import { ResidentManagementTab } from "./admin/ResidentManagementTab";
import { AccountantsTab } from "./admin/AccountantsTab";
import { BuildingManagersTab } from "./admin/BuildingManagersTab";
import { ApartmentManagementTab } from "./admin/ApartmentManagementTab";

export function CRUDTestPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Mock admin role for testing
  const mockRole = "Admin";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            BlueMoon CRUD Features Test Page
          </h1>
          <p className="text-gray-600">
            Comprehensive testing interface for all CRUD operations
          </p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 lg:grid-cols-7 mb-6 bg-white shadow-lg">
            <TabsTrigger value="overview" className="gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span className="hidden sm:inline">Tổng quan</span>
            </TabsTrigger>
            <TabsTrigger value="demo" className="gap-2">
              <Presentation className="w-4 h-4" />
              <span className="hidden sm:inline">Demo</span>
            </TabsTrigger>
            <TabsTrigger value="accounts" className="gap-2">
              🔐
              <span className="hidden sm:inline">Tài khoản</span>
            </TabsTrigger>
            <TabsTrigger value="residents" className="gap-2">
              👥
              <span className="hidden sm:inline">Cư dân</span>
            </TabsTrigger>
            <TabsTrigger value="accountants" className="gap-2">
              🧮
              <span className="hidden sm:inline">Kế toán</span>
            </TabsTrigger>
            <TabsTrigger value="managers" className="gap-2">
              📋
              <span className="hidden sm:inline">Quản lý</span>
            </TabsTrigger>
            <TabsTrigger value="apartments" className="gap-2">
              🏢
              <span className="hidden sm:inline">Căn hộ</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <AdminCRUDSummary />
          </TabsContent>

          {/* Demo Tab */}
          <TabsContent value="demo">
            <CRUDFeaturesDemo />
          </TabsContent>

          {/* Accounts Tab */}
          <TabsContent value="accounts">
            <div className="space-y-4">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Testing Account Management
                      </h3>
                      <p className="text-sm text-gray-700">
                        Test creating accounts with different roles. Note: Backend needs{" "}
                        <code className="bg-white px-2 py-1 rounded text-xs">
                          GET /api/accounts/
                        </code>{" "}
                        to display the list.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <AccountManagementTab role={mockRole} />
            </div>
          </TabsContent>

          {/* Residents Tab */}
          <TabsContent value="residents">
            <div className="space-y-4">
              <Card className="bg-green-50 border-green-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-green-900 mb-1">
                        Testing Resident Management
                      </h3>
                      <p className="text-sm text-gray-700">
                        Test full CRUD operations: Create, Read, Update, and Delete residents.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ResidentManagementTab role={mockRole} />
            </div>
          </TabsContent>

          {/* Accountants Tab */}
          <TabsContent value="accountants">
            <div className="space-y-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-purple-900 mb-1">
                        Testing Accountant Management
                      </h3>
                      <p className="text-sm text-gray-700">
                        Test full CRUD operations: Create, Read, Update, and Delete accountants.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <AccountantsTab role={mockRole} />
            </div>
          </TabsContent>

          {/* Building Managers Tab */}
          <TabsContent value="managers">
            <div className="space-y-4">
              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-orange-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-orange-900 mb-1">
                        Testing Building Manager Management
                      </h3>
                      <p className="text-sm text-gray-700">
                        Test full CRUD operations: Create, Read, Update, and Delete building managers.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <BuildingManagersTab role={mockRole} />
            </div>
          </TabsContent>

          {/* Apartments Tab */}
          <TabsContent value="apartments">
            <div className="space-y-4">
              <Card className="bg-indigo-50 border-indigo-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-indigo-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-indigo-900 mb-1">
                        Testing Apartment Management
                      </h3>
                      <p className="text-sm text-gray-700">
                        Test full CRUD operations: Create, Read, Update, and Delete apartments.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <ApartmentManagementTab role={mockRole} />
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="mt-8 p-4 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900">CRUD Implementation Status</h3>
              <p className="text-sm text-gray-600">All modules are ready for testing</p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="text-green-700 font-semibold">5/5 Modules Complete</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
