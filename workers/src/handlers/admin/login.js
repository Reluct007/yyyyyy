import { jsonResponse } from "../../utils/response.js";
import { generateToken } from "../../utils/jwt.js";

export async function handleLogin(request, env) {
  try {
    const { username, password } = await request.json();

    // 从环境变量获取管理员凭据
    const adminUsername = env.ADMIN_USERNAME || "admin";
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return jsonResponse({ success: false, msg: "Admin not configured" }, 500);
    }

    if (!env.JWT_SECRET) {
      return jsonResponse({ success: false, msg: "JWT_SECRET not configured" }, 500);
    }

    if (username !== adminUsername || password !== adminPassword) {
      return jsonResponse({ success: false, msg: "Invalid credentials" }, 401);
    }

    // 生成 token
    const token = await generateToken({ username, role: "admin" }, env.JWT_SECRET);

    return jsonResponse({
      success: true,
      token,
      msg: "Login successful",
    });
  } catch (error) {
    console.error("Login error:", error);
    return jsonResponse({ success: false, msg: "Login failed" }, 500);
  }
}
