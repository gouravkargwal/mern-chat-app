Object.defineProperty(exports, "__esModule", {
  value: true,
});

if (process.env.NODE_ENV === "development") {
  exports.default = {
    baseURL: "http://localhost:5000",
    authURL: "http://localhost:5000/auth",
  };
} else {
  exports.default = {
    baseURL: "https://mail.cashbite.in",
    authURL: "https://mail.cashbite.in/auth/",
  };
}
