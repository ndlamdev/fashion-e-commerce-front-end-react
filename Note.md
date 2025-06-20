# Nhưng kiến thức học được khi làm dự án

## Cấu hình đăng nhập bằng google khi làm việc với Restfull Api

### Tổng quát

* Nếu backend viết chung cho các platform khác nhau thì phía backend sẽ phải xây dựng 1 endpoint chung để cho phía
  client
  có thể gửi `auth-code` của mình lấy được từ phía google và gửi về phía backed

* Nếu backend viết riêng cho từng platform thì không cần gửi `auth-code` mà có thể gửi luôn `access_token` cho phía
  backend và backend sẽ dùng để xác thực người dùng

Trong phần note này sẽ ví dụ cho phần triển khai dùng `auth-code` để gửi và phía backend và nhận `access_token` từ phía
backend generate

### Các thư viện cần có

```bash
npm install @react-oauth/google@latest
```

[Library](https://www.npmjs.com/package/@react-oauth/google)

### Cấu hình và triển khai

#### Tạo Provider

```js
import { GoogleOAuthProvider } from "@react-oauth/google";

<GoogleOAuthProvider clientId={"CLIENT_KEY"}>
  {/* Cần phải tạo 1 Provider wrapper các logic đăng nhập bằng google hoặc sử dụng các component hổ trợ đăng nhập của thư viện */}
</GoogleOAuthProvider>;
```

#### Viết function để lấy `auth-code` từ google

```js
import { useGoogleLogin } from "@react-oauth/google";

const login = useGoogleLogin({
  onSuccess: (authCode) => {
    console.log(authCode);
    // Tiếp tục triển khai logic đăng nhập phía backend của bạn.
  },
  onError: (errorResponse) => console.log(errorResponse),
  flow: "auth-code", // bắt buộc phải điền là `auth-code` để cho thư viện gửi request và chỉ lấy đúng `auth-code`
});
```