// API Configuration - Update this to point to your Python backend
const API_BASE_URL = "http://localhost:8000";

// ==================== TYPE DEFINITIONS ====================

// Auth Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  username: string;
  role: string;
}

export interface MeResponse {
  username: string;
  role: string;
}

// Account Types
export interface AccountCreate {
  username: string;
  password: string;
  role: "Resident" | "Accountant" | "Manager" | "Admin";
}

export interface AccountResponse {
  username: string;
  role: string;
  isActive: boolean;
}

export interface AccountRoleUpdate {
  role: "Resident" | "Accountant" | "Manager" | "Admin";
}

export interface AccountPasswordUpdate {
  newPassword: string;
}

// Apartment Types
export interface Apartment {
  apartmentID: string;
  area?: number;
  status?: string;
  buildingID?: string;
  numResident?: number;
}

export interface ApartmentCreate {
  apartmentID: string;
  area?: number;
  status?: string;
  buildingID?: string;
}

// Resident Types
export interface Resident {
  residentID: number;
  apartmentID?: string;
  fullName: string;
  age?: number;
  date?: string;
  phoneNumber?: string;
  isOwner: boolean;
  username?: string;
}

export interface ResidentCreate {
  apartmentID?: string;
  fullName: string;
  age?: number;
  date?: string;
  phoneNumber?: string;
  isOwner: boolean;
  username?: string;
}

export interface ResidentUpdate {
  apartmentID?: string;
  fullName?: string;
  age?: number;
  date?: string;
  phoneNumber?: string;
  isOwner?: boolean;
  username?: string;
}

// Bill Types
export interface Bill {
  billID: number;
  apartmentID?: string;
  accountantID?: number;
  createDate?: string;
  deadline?: string;
  typeOfBill?: string;
  amount?: number;
  total?: number;
  status: "Unpaid" | "Paid" | "Overdue";
  paymentMethod?: string;
}

export interface BillCreate {
  apartmentID: string;
  accountantID: number;
  deadline: string;
  typeOfBill: string;
  amount: number;
  total: number;
}

// Building Manager Types
export interface BuildingManager {
  managerID: number;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

export interface BuildingManagerCreate {
  fullName: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

export interface BuildingManagerUpdate {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

// Building Types
export interface Building {
  buildingID: string;
  address?: string | null;
  numApartment?: number | null;
  managerID?: number | null;
}

export interface BuildingUpdateManager {
  managerID?: number | null;
}

// Accountant Types
export interface Accountant {
  accountantID: number;
  fullName: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

export interface AccountantCreate {
  fullName: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

export interface AccountantUpdate {
  fullName?: string;
  phoneNumber?: string;
  email?: string;
  username?: string;
}

// Payment Types
export interface PaymentTransaction {
  transID: number;
  residentID: number;
  amount: number;
  paymentContent?: string;
  paymentMethod?: string;
  status: "Pending" | "Success" | "Failed";
  createdDate?: string;
  payDate?: string;
  gatewayTransCode?: string;
}

export interface PaymentCreateRequest {
  bill_ids: number[];
}

export interface OfflinePaymentRequest {
  residentID: number;
  paymentContent: string;
  paymentMethod?: string;
  bill_ids: number[];
}

export interface PaymentResponse {
  transID: number;
  status: string;
  totalAmount: number;
  billsPaid: number;
}

export interface QRCodeResponse {
  qrCodeUrl: string;
  transactionId?: number;
  amount?: number;
  expiry?: string;
}

// Receipt Types
export interface ReceiptBillDetail {
  billID: number;
  billName: string;
  amount: number;
  dueDate: string;
}

export interface Receipt {
  transID: number;
  residentID: number;
  residentName: string;
  apartmentID: string;
  phoneNumber?: string | null;
  totalAmount: number;
  paymentMethod: string;
  paymentContent?: string | null;
  status: string;
  payDate: string;
  bills: ReceiptBillDetail[];
}

// Notification Types
export interface Notification {
  notificationID: number;
  residentID: number;
  title: string;
  content: string;
  createdDate: string;
  isRead: boolean;
  electricity?: number | null;
  water?: number | null;
}

export interface BroadcastNotification {
  title: string;
  content: string;
}

// Accounting Types
export interface MeterReadingCreate {
  apartmentID: string;
  month: number;
  year: number;
  oldElectricity: number;
  newElectricity: number;
  oldWater: number;
  newWater: number;
}

export interface ServiceFeeCreate {
  buildingID: string;
  typeOfBill: string;
  feePerUnit?: number | null;
  flatFee?: number | null;
  effectiveDate: string;
}

export interface CalculateBillsRequest {
  month: number;
  year: number;
  deadline_day?: number;
  overwrite?: boolean;
}

// ==================== API ERROR CLASS ====================

export class ApiError extends Error {
  public status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

// ==================== HELPER FUNCTIONS ====================

// Helper to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem("access_token");
};

// Generic fetch wrapper
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  const token = getAuthToken();
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      detail: "An error occurred",
    }));
    throw new ApiError(
      response.status,
      errorData.detail || "Request failed"
    );
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

// ==================== API SERVICE ====================

export const api = {
  // ==================== AUTHENTICATION ====================
  auth: {
    login: async (
      username: string,
      password: string
    ): Promise<LoginResponse> => {
      const response = await fetchApi<LoginResponse>("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      // Store token in localStorage
      if (response.access_token) {
        localStorage.setItem("access_token", response.access_token);
        localStorage.setItem("username", response.username);
        localStorage.setItem("role", response.role);
      }

      return response;
    },

    me: async (): Promise<MeResponse> => {
      return fetchApi<MeResponse>("/api/auth/me", {
        method: "GET",
      });
    },

    logout: () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("username");
      localStorage.removeItem("role");
    },
  },

  // ==================== ACCOUNT MANAGEMENT ====================
  accounts: {
    create: async (account: AccountCreate): Promise<AccountResponse> => {
      return fetchApi<AccountResponse>("/api/accounts/account", {
        method: "POST",
        body: JSON.stringify(account),
      });
    },

    get: async (username: string): Promise<AccountResponse> => {
      return fetchApi<AccountResponse>(`/api/accounts/managers/${username}`, {
        method: "GET",
      });
    },

    delete: async (username: string): Promise<void> => {
      return fetchApi<void>(`/api/accounts/${username}`, {
        method: "DELETE",
      });
    },

    updateRole: async (
      username: string,
      roleData: AccountRoleUpdate
    ): Promise<AccountResponse> => {
      return fetchApi<AccountResponse>(
        `/api/accounts/managers/${username}/role`,
        {
          method: "PATCH",
          body: JSON.stringify(roleData),
        }
      );
    },

    updatePassword: async (
      username: string,
      passwordData: AccountPasswordUpdate
    ): Promise<AccountResponse> => {
      return fetchApi<AccountResponse>(
        `/api/accounts/managers/${username}/password`,
        {
          method: "PATCH",
          body: JSON.stringify(passwordData),
        }
      );
    },
  },

  // ==================== APARTMENTS ====================
  apartments: {
    getAll: async (
      skip: number = 0,
      limit: number = 100
    ): Promise<Apartment[]> => {
      return fetchApi<Apartment[]>(
        `/api/apartments/get-apartments-data?skip=${skip}&limit=${limit}`,
        { method: "GET" }
      );
    },

    create: async (apartment: ApartmentCreate): Promise<Apartment> => {
      return fetchApi<Apartment>("/api/apartments/add-new-apartment", {
        method: "POST",
        body: JSON.stringify(apartment),
      });
    },

    update: async (
      id: string,
      apartment: Partial<Apartment>
    ): Promise<Apartment> => {
      return fetchApi<Apartment>(`/api/apartments/${id}`, {
        method: "PUT",
        body: JSON.stringify(apartment),
      });
    },

    delete: async (id: string): Promise<void> => {
      return fetchApi<void>(`/api/apartments/${id}`, {
        method: "DELETE",
      });
    },
  },

  // ==================== RESIDENTS ====================
  residents: {
    getAll: async (
      skip: number = 0,
      limit: number = 100
    ): Promise<Resident[]> => {
      return fetchApi<Resident[]>(
        `/api/residents/get-residents-data?skip=${skip}&limit=${limit}`,
        { method: "GET" }
      );
    },

    getDetail: async (
      fullname: string,
      apartmentId: string
    ): Promise<Resident> => {
      return fetchApi<Resident>(
        `/api/residents/resident_detail?fullname=${encodeURIComponent(
          fullname
        )}&apartment_id=${encodeURIComponent(apartmentId)}`,
        { method: "GET" }
      );
    },

    // Get residents by apartment ID
    getByApartment: async (apartmentId: string): Promise<Resident[]> => {
      const allResidents = await fetchApi<Resident[]>(
        `/api/residents/get-residents-data?skip=0&limit=1000`,
        { method: "GET" }
      );
      // Filter by apartment ID on the client side
      return allResidents.filter(r => r.apartmentID === apartmentId);
    },

    create: async (resident: ResidentCreate): Promise<Resident> => {
      return fetchApi<Resident>("/api/residents/add-new-resident", {
        method: "POST",
        body: JSON.stringify(resident),
      });
    },

    update: async (
      id: number,
      resident: ResidentUpdate
    ): Promise<Resident> => {
      return fetchApi<Resident>(`/api/residents/${id}`, {
        method: "PUT",
        body: JSON.stringify(resident),
      });
    },

    delete: async (id: number): Promise<void> => {
      return fetchApi<void>(`/api/residents/${id}`, {
        method: "DELETE",
      });
    },
  },

  // ==================== BILLS ====================
  bills: {
    getMyBills: async (): Promise<Bill[]> => {
      return fetchApi<Bill[]>("/api/bills/my-bills", {
        method: "GET",
      });
    },

    create: async (bill: BillCreate): Promise<Bill> => {
      return fetchApi<Bill>("/api/bills/", {
        method: "POST",
        body: JSON.stringify(bill),
      });
    },
  },

  // ==================== BUILDING MANAGERS ====================
  buildingManagers: {
    getAll: async (): Promise<BuildingManager[]> => {
      return fetchApi<BuildingManager[]>("/api/building-managers/", {
        method: "GET",
      });
    },

    get: async (id: number): Promise<BuildingManager> => {
      return fetchApi<BuildingManager>(`/api/building-managers/${id}`, {
        method: "GET",
      });
    },

    create: async (
      manager: BuildingManagerCreate
    ): Promise<BuildingManager> => {
      return fetchApi<BuildingManager>("/api/building-managers/", {
        method: "POST",
        body: JSON.stringify(manager),
      });
    },

    update: async (
      id: number,
      manager: BuildingManagerUpdate
    ): Promise<BuildingManager> => {
      return fetchApi<BuildingManager>(`/api/building-managers/${id}`, {
        method: "PATCH",
        body: JSON.stringify(manager),
      });
    },

    delete: async (id: number): Promise<void> => {
      return fetchApi<void>(`/api/building-managers/${id}`, {
        method: "DELETE",
      });
    },
  },

  // ==================== BUILDINGS ====================
  buildings: {
    getAll: async (): Promise<Building[]> => {
      return fetchApi<Building[]>("/api/buildings/", {
        method: "GET",
      });
    },

    getByManager: async (managerId: number): Promise<Building[]> => {
      return fetchApi<Building[]>(`/api/buildings/manager/${managerId}`, {
        method: "GET",
      });
    },

    updateManager: async (
      buildingId: string,
      data: BuildingUpdateManager
    ): Promise<Building> => {
      return fetchApi<Building>(`/api/buildings/${buildingId}/manager`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
    },
  },

  // ==================== ACCOUNTANTS ====================
  accountants: {
    getAll: async (): Promise<Accountant[]> => {
      return fetchApi<Accountant[]>("/api/accountants/", {
        method: "GET",
      });
    },

    get: async (id: number): Promise<Accountant> => {
      return fetchApi<Accountant>(`/api/accountants/${id}`, {
        method: "GET",
      });
    },

    create: async (accountant: AccountantCreate): Promise<Accountant> => {
      return fetchApi<Accountant>("/api/accountants/", {
        method: "POST",
        body: JSON.stringify(accountant),
      });
    },

    update: async (
      id: number,
      accountant: AccountantUpdate
    ): Promise<Accountant> => {
      return fetchApi<Accountant>(`/api/accountants/${id}`, {
        method: "PATCH",
        body: JSON.stringify(accountant),
      });
    },

    delete: async (id: number): Promise<void> => {
      return fetchApi<void>(`/api/accountants/${id}`, {
        method: "DELETE",
      });
    },
  },

  // ==================== ONLINE PAYMENTS ====================
  payments: {
    createQR: async (billIds: number[]): Promise<QRCodeResponse> => {
      return fetchApi<QRCodeResponse>("/api/payments/create-qr", {
        method: "POST",
        body: JSON.stringify({ bill_ids: billIds }),
      });
    },

    checkExpiry: async (): Promise<any> => {
      return fetchApi<any>("/api/payments/check-expiry", {
        method: "POST",
      });
    },

    // Get payment history for current user
    getMyHistory: async (): Promise<PaymentTransaction[]> => {
      return fetchApi<PaymentTransaction[]>("/api/payments/my-history", {
        method: "GET",
      });
    },
  },

  // ==================== OFFLINE PAYMENTS ====================
  offlinePayments: {
    create: async (
      payment: OfflinePaymentRequest
    ): Promise<PaymentResponse> => {
      return fetchApi<PaymentResponse>("/api/offline-payments/offline_payment", {
        method: "POST",
        body: JSON.stringify(payment),
      });
    },
  },

  // ==================== RECEIPTS ====================
  receipts: {
    get: async (transactionId: number): Promise<Receipt> => {
      return fetchApi<Receipt>(`/api/receipts/${transactionId}`, {
        method: "GET",
      });
    },
  },

  // ==================== NOTIFICATIONS ====================
  notifications: {
    // Get my notifications
    getMyNotifications: async (skip: number = 0, limit: number = 50): Promise<Notification[]> => {
      return fetchApi<Notification[]>(
        `/api/notification/my-notification?skip=${skip}&limit=${limit}`,
        {
          method: "GET",
        }
      );
    },

    // Mark notification as read
    markAsRead: async (id: number): Promise<{ message: string }> => {
      return fetchApi<{ message: string }>(`/api/notification/${id}/read`, {
        method: "PUT",
      });
    },

    // Get unread count
    getUnreadCount: async (): Promise<{ count: number }> => {
      return fetchApi<{ count: number }>("/api/notification/unread-count", {
        method: "GET",
      });
    },

    // Broadcast notification (Manager/Admin only)
    broadcast: async (notification: BroadcastNotification): Promise<{ message: string }> => {
      return fetchApi<{ message: string }>("/api/notification/broadcast", {
        method: "POST",
        body: JSON.stringify(notification),
      });
    },
  },

  // ==================== ACCOUNTING ====================
  accounting: {
    // Record meter readings
    recordMeterReading: async (data: MeterReadingCreate): Promise<{ message: string }> => {
      return fetchApi<{ message: string }>("/api/accounting/meter-readings", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    // Set service fees
    setServiceFee: async (data: ServiceFeeCreate): Promise<{ message: string }> => {
      return fetchApi<{ message: string }>("/api/accounting/service-fees", {
        method: "POST",
        body: JSON.stringify(data),
      });
    },

    // Calculate monthly bills
    calculateBills: async (
      data: CalculateBillsRequest
    ): Promise<{ status: string; message: string; count: number }> => {
      return fetchApi<{ status: string; message: string; count: number }>(
        "/api/accounting/bills/calculate",
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );
    },

    // Get all bills with optional filters
    getAllBills: async (
      apartmentId?: string,
      status?: string
    ): Promise<Bill[]> => {
      const params = new URLSearchParams();
      if (apartmentId) params.append("apartment_id", apartmentId);
      if (status) params.append("status", status);

      const queryString = params.toString();
      const endpoint = queryString
        ? `/api/accounting/bills?${queryString}`
        : "/api/accounting/bills";

      return fetchApi<Bill[]>(endpoint, {
        method: "GET",
      });
    },
  },
};

// ==================== EXPORTS ====================
export default api;