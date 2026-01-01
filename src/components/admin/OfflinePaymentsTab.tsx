import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function OfflinePaymentsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Thanh toán ngoại tuyến</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">
          Chức năng xử lý thanh toán ngoại tuyến cho cư dân.
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Tính năng đang được phát triển...
        </p>
      </CardContent>
    </Card>
  );
}
