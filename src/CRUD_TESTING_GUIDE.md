# 🧪 CRUD Testing Guide

## Quick Test Instructions

### Prerequisites
1. Backend server running at `http://localhost:8000`
2. Valid admin credentials
3. Database initialized with test data

---

## Testing Each Module

### 🔐 1. Account Management

**Test Create:**
1. Click "Tạo tài khoản" button
2. Fill in form:
   - Username: `testuser123`
   - Password: `password123`
   - Role: Select role from dropdown
3. Click "Tạo tài khoản"
4. ✅ Success toast should appear
5. ❌ Error toast if username exists

**Test Update Role:**
1. Currently not testable (needs list view)
2. Backend needs: `GET /api/accounts/`

**Test Update Password:**
1. Currently not testable (needs list view)

**Test Delete:**
1. Currently not testable (needs list view)

---

### 👥 2. Resident Management

**Test Create:**
1. Click "Thêm cư dân" button
2. Fill in form:
   - Họ tên: `Nguyễn Văn A` (required)
   - Mã căn hộ: `A101`
   - Tuổi: `30`
   - Số điện thoại: `0901234567`
   - Ngày: Select date
   - Tài khoản: `nguyenvana`
   - ☑️ Check "Chủ hộ" if owner
3. Click "Thêm cư dân"
4. ✅ Success toast appears
5. 🔄 Table refreshes with new resident

**Test Read:**
1. Observe table shows all residents
2. Check columns: ID, Họ tên, Căn hộ, Tuổi, Số điện thoại, Chủ hộ, Hành động
3. Empty state if no residents

**Test Update:**
1. Click pencil icon (✏️) on any row
2. Dialog opens with pre-filled data
3. Modify any field (e.g., change phone number)
4. Click "Cập nhật"
5. ✅ Success toast appears
6. 🔄 Table refreshes with updated data

**Test Delete:**
1. Click trash icon (🗑️) on any row
2. Confirmation dialog appears
3. Read warning message
4. Click "Xóa" to confirm (or "Hủy" to cancel)
5. ✅ Success toast appears
6. 🔄 Resident removed from table

---

### 🧮 3. Accountant Management

**Test Create:**
1. Click "Thêm kế toán" button
2. Fill in form:
   - Họ tên: `Trần Thị B` (required)
   - Số điện thoại: `0912345678`
   - Email: `tranthib@example.com`
   - Tài khoản: `tranthib`
3. Click "Thêm kế toán"
4. ✅ Success toast appears
5. 🔄 Table refreshes

**Test Read:**
1. View table with accountants
2. Check all data displays correctly

**Test Update:**
1. Click pencil icon (✏️)
2. Modify fields
3. Click "Cập nhật"
4. ✅ Verify success

**Test Delete:**
1. Click trash icon (🗑️)
2. Confirm deletion
3. ✅ Verify removal

---

### 📋 4. Building Manager Management

**Test Create:**
1. Click "Thêm quản lý" button
2. Fill in form:
   - Họ tên: `Lê Văn C` (required)
   - Số điện thoại: `0923456789`
   - Email: `levanc@example.com`
   - Tài khoản: `levanc`
3. Click "Thêm quản lý"
4. ✅ Success toast appears
5. 🔄 Table refreshes

**Test Read:**
1. View table with managers
2. Verify all columns display

**Test Update:**
1. Click pencil icon (✏️)
2. Edit information
3. Click "Cập nhật"
4. ✅ Verify success

**Test Delete:**
1. Click trash icon (🗑️)
2. Confirm deletion
3. ✅ Verify removal

---

### 🏢 5. Apartment Management

**Test Create:**
1. Click "Thêm căn hộ" button
2. Fill in form:
   - Mã căn hộ: `A101` (required)
   - Diện tích: `75.5`
   - Trạng thái: `Đang ở`
   - Mã tòa nhà: `B001`
3. Click "Thêm căn hộ"
4. ✅ Success toast appears
5. 🔄 Table refreshes

**Test Read:**
1. View table with apartments
2. Check: Mã căn hộ, Diện tích, Trạng thái, Mã tòa nhà, Số cư dân

**Test Update:**
1. Click pencil icon (✏️)
2. Note: Mã căn hộ is disabled
3. Modify other fields
4. Click "Cập nhật"
5. ✅ Verify success

**Test Delete:**
1. Click trash icon (🗑️)
2. Confirm deletion
3. ✅ Verify removal

---

## Common Test Scenarios

### ✅ Success Cases
- Valid data submission
- Proper form validation
- Toast notifications appear
- Data refreshes after operations
- Dialogs close after success

### ❌ Error Cases to Test
1. **Empty Required Fields**
   - Leave required field empty
   - Submit form
   - ❌ HTML5 validation should prevent submission

2. **Duplicate IDs**
   - Try creating resident/apartment with existing ID
   - ❌ Backend error toast should appear

3. **Invalid Data**
   - Enter negative age
   - Enter invalid email format
   - ❌ Validation should catch

4. **Network Errors**
   - Stop backend server
   - Try any CRUD operation
   - ❌ Connection error toast appears

5. **Unauthorized Access**
   - Login as Resident role
   - Try accessing admin tabs
   - 🚫 Access denied screen appears

---

## Test Results Checklist

### For Each Module:
- [ ] ✅ Can create new records
- [ ] ✅ Form validation works
- [ ] ✅ Can view all records
- [ ] ✅ Loading state displays
- [ ] ✅ Empty state shows correctly
- [ ] ✅ Can edit records
- [ ] ✅ Edit form pre-fills
- [ ] ✅ Can delete records
- [ ] ✅ Confirmation dialog works
- [ ] ✅ Success toasts appear
- [ ] ✅ Error toasts appear
- [ ] ✅ Table auto-refreshes
- [ ] ✅ RBAC works correctly

---

## Expected API Responses

### Success Response (200/201)
```json
{
  "residentID": 1,
  "fullName": "Nguyễn Văn A",
  "apartmentID": "A101",
  ...
}
```

### Error Response (400/404/500)
```json
{
  "detail": "Error message here"
}
```

### No Content (204)
- For successful DELETE operations
- No response body

---

## Troubleshooting

### Toast Not Appearing
- Check if Toaster component is in App.tsx
- Check console for errors
- Verify sonner import: `import { toast } from "sonner@2.0.3"`

### Table Not Loading
- Check backend is running
- Check API endpoint URL
- Check authentication token
- Open Network tab in DevTools

### Form Not Submitting
- Check HTML5 validation
- Check for console errors
- Verify API endpoint exists
- Check request payload format

### Permission Denied
- Verify user role is correct
- Check `utils/permissions.ts`
- Verify JWT token is valid

---

## Performance Testing

### Load Testing
1. Create 100+ residents
2. Verify table loads smoothly
3. Check pagination needed

### Concurrent Operations
1. Open multiple dialogs
2. Verify state management
3. Test rapid create/delete

---

## Browser Compatibility

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- 📱 Mobile browsers

---

## Next Steps After Testing

1. ✅ Fix any bugs found
2. ✅ Add pagination for large datasets
3. ✅ Implement search/filter
4. ✅ Add bulk operations
5. ✅ Performance optimization
6. ✅ Add audit logging
7. ✅ Add data export
8. ✅ Improve error messages

---

## Support

For issues or questions:
1. Check `/CRUD_IMPLEMENTATION_SUMMARY.md`
2. Review API documentation
3. Check component source code
4. Review console errors
