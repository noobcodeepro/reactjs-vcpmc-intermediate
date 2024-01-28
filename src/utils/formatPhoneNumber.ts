export function formatPhoneNumber(phoneNumber: string): string {
  // Kiểm tra xem số điện thoại có bắt đầu bằng "0" không
  if (phoneNumber.startsWith('0')) {
    // Nếu có, thêm mã quốc gia vào trước số điện thoại
    return `(+84) ${phoneNumber.substring(1, 4)} ${phoneNumber.substring(4, 7)} ${phoneNumber.substring(7)}`;
  }

  // Nếu số điện thoại không bắt đầu bằng "0", giả sử đã có mã quốc gia
  return phoneNumber;
}
