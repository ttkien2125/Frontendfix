# BlueMoon - Role-Based Access Control Summary

This document outlines the role-based permissions implemented in the BlueMoon frontend application, aligned with the API documentation.

## Permission Matrix

### 🏠 Resident Role
**Access Rights:**
- ✅ Authentication (Login, View Profile)
- ✅ View My Bills (`/api/bills/my-bills`)
- ✅ View My Payment History (`/api/payments/my-history`)
- ✅ Create QR Payment (`/api/online-payments/create-qr`)

**Dashboard Tabs:**
- Tổng quan (Overview)
- Hóa đơn (Bills)
- Thanh toán (Payments)

---

### 💼 Accountant Role
**Access Rights:**
- ✅ Authentication (Login, View Profile)
- ✅ View Apartments List (`/api/apartments/get-apartments-data`)
- ✅ Process Offline Payments (`/api/offline-payments/offline_payment`)
- ✅ View Receipts (`/api/receipts/{transaction_id}`)

**Dashboard Tabs:**
- Tổng quan (Overview)
- Căn hộ (Apartments)
- Thanh toán ngoại tuyến (Offline Payments)

---

### 👔 Manager Role
**Access Rights:**
- ✅ Authentication (Login, View Profile)
- ✅ Account Management (Create, View, Edit, Disable accounts)
- ✅ Building Managers Management (Full CRUD)
- ✅ Buildings Management (View, Update)
- ✅ Accountants Management (Full CRUD)
- ✅ Residents Management (Full CRUD)
- ✅ View Apartments List

**Dashboard Tabs:**
- Tổng quan (Overview)
- Quản lý tài khoản (Account Management)
- Cư dân (Residents)
- Căn hộ (Apartments)
- Quản lý tòa nhà (Building Managers)
- Kế toán (Accountants)

---

### 👑 Admin Role
**Access Rights:**
- ✅ **ALL PERMISSIONS** (Superset of all roles)
- ✅ Everything Manager can do
- ✅ PLUS: Access to Resident bills and payments
- ✅ PLUS: Process offline payments (like Accountant)

**Dashboard Tabs:**
- All tabs available to Manager
- Special access to resident data

---

## Implementation Details

### Permission Enforcement
Permissions are enforced at multiple levels:

1. **Sidebar Navigation** (`/components/shared/Sidebar.tsx`)
   - Dynamically shows/hides menu items based on role permissions
   - Uses centralized permission utility

2. **Tab Components** (All admin tabs)
   - Each tab validates permissions before rendering
   - Shows "Access Denied" message for unauthorized roles

3. **Centralized Permissions** (`/utils/permissions.ts`)
   - Single source of truth for all permission checks
   - Type-safe role checking
   - Easy to maintain and update

### API Endpoint Mapping

| Feature | Endpoint | Resident | Accountant | Manager | Admin |
|---------|----------|:--------:|:----------:|:-------:|:-----:|
| View Bills | `/api/bills/my-bills` | ✅ | ❌ | ❌ | ✅ |
| Payment History | `/api/payments/my-history` | ✅ | ❌ | ❌ | ✅ |
| Create QR | `/api/online-payments/create-qr` | ✅ | ❌ | ❌ | ✅ |
| View Apartments | `/api/apartments/get-apartments-data` | ❌ | ✅ | ✅ | ✅ |
| Offline Payments | `/api/offline-payments/offline_payment` | ❌ | ✅ | ❌ | ✅ |
| Manage Residents | `/api/residents/*` | ❌ | ❌ | ✅ | ✅ |
| Manage Accounts | `/api/accounts/*` | ❌ | ❌ | ✅ | ✅ |
| Manage Building Managers | `/api/building-managers/*` | ❌ | ❌ | ✅ | ✅ |
| Manage Accountants | `/api/accountants/*` | ❌ | ❌ | ✅ | ✅ |

## Security Features

1. **Frontend Validation**: All components check permissions before rendering
2. **Type Safety**: TypeScript ensures role values are valid
3. **Centralized Logic**: Permission checks use a single utility file
4. **User Feedback**: Clear "Access Denied" messages for unauthorized access
5. **Backend Enforcement**: Backend APIs enforce permissions independently

## File Structure

```
/utils/permissions.ts              # Central permission definitions
/components/shared/Sidebar.tsx     # Dynamic menu based on permissions
/components/admin/*Tab.tsx         # Permission-checked admin tabs
/components/resident/*             # Resident-specific components
```

## Notes

- Admin role has superset permissions (can access everything)
- Manager cannot access resident bills/payments (only Admin can)
- Accountant has limited scope (apartments + offline payments only)
- All roles can login and view their own profile
