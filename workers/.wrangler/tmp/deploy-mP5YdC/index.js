var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/utils/response.js
var corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders
    }
  });
}
__name(jsonResponse, "jsonResponse");

// src/utils/resend.js
async function sendEmail(apiKey, options) {
  const { from, to, subject, html } = options;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
      subject,
      html
    })
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${error}`);
  }
  return await response.json();
}
__name(sendEmail, "sendEmail");

// src/handlers/contact.js
var CONFIG_KEY = "site_config";
async function getEmailConfig(env) {
  let config = {};
  try {
    const stored = await env.CONFIG_KV.get(CONFIG_KEY, "json");
    if (stored)
      config = stored;
  } catch (e) {
    console.log("KV not available, using env vars");
  }
  return {
    contactEmail: config.contactEmail || env.CONTACT_EMAIL || "info@labubuwholesale.com",
    fromEmail: config.fromEmail || env.FROM_EMAIL || "noreply@labubuwholesale.com",
    fromName: config.fromName || "Labubu Wholesale"
  };
}
__name(getEmailConfig, "getEmailConfig");
async function handleContact(request, env) {
  try {
    const { name, email, company, phone, quantity, message } = await request.json();
    if (!name || !email || !message) {
      return jsonResponse({ success: false, msg: "Please fill in all required fields" }, 400);
    }
    const emailConfig = await getEmailConfig(env);
    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: `New Quote Request - ${name}`,
      html: `
        <h2>New Quote Request</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 10px; border: 1px solid #ddd;">${name}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 10px; border: 1px solid #ddd;">${email}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 10px; border: 1px solid #ddd;">${company || "Not provided"}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Phone</td><td style="padding: 10px; border: 1px solid #ddd;">${phone || "Not provided"}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Quantity</td><td style="padding: 10px; border: 1px solid #ddd;">${quantity || "Not specified"}</td></tr>
          <tr><td style="padding: 10px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 10px; border: 1px solid #ddd;">${message}</td></tr>
        </table>
      `
    });
    return jsonResponse({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Contact error:", error);
    return jsonResponse({ success: false, msg: "Failed to send message" }, 500);
  }
}
__name(handleContact, "handleContact");

// src/handlers/subscribe.js
var CONFIG_KEY2 = "site_config";
async function getEmailConfig2(env) {
  let config = {};
  try {
    const stored = await env.CONFIG_KV.get(CONFIG_KEY2, "json");
    if (stored)
      config = stored;
  } catch (e) {
    console.log("KV not available, using env vars");
  }
  return {
    contactEmail: config.contactEmail || env.CONTACT_EMAIL || "info@labubuwholesale.com",
    fromEmail: config.fromEmail || env.FROM_EMAIL || "noreply@labubuwholesale.com",
    fromName: config.fromName || "Labubu Wholesale",
    siteName: config.siteName || "Labubu Wholesale"
  };
}
__name(getEmailConfig2, "getEmailConfig");
async function handleSubscribe(request, env) {
  try {
    const { email } = await request.json();
    if (!email || !email.includes("@")) {
      return jsonResponse({ success: false, msg: "Please enter a valid email" }, 400);
    }
    const emailConfig = await getEmailConfig2(env);
    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: emailConfig.contactEmail,
      subject: "New Newsletter Subscription",
      html: `<h2>New Subscription</h2><p><strong>${email}</strong></p>`
    });
    await sendEmail(env.RESEND_API_KEY, {
      from: `${emailConfig.fromName} <${emailConfig.fromEmail}>`,
      to: email,
      subject: `Welcome to ${emailConfig.siteName} Newsletter!`,
      html: `
        <h1 style="color: #f97316;">Welcome to ${emailConfig.siteName}!</h1>
        <p>Thank you for subscribing to our newsletter.</p>
        <p>You'll be the first to know about new products and exclusive deals!</p>
      `
    });
    return jsonResponse({ success: true, msg: "Subscribed successfully!" });
  } catch (error) {
    console.error("Subscribe error:", error);
    return jsonResponse({ success: false, msg: "Failed to subscribe" }, 500);
  }
}
__name(handleSubscribe, "handleSubscribe");

// src/utils/jwt.js
function base64UrlEncode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
__name(base64UrlEncode, "base64UrlEncode");
function base64UrlDecode(str) {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4)
    str += "=";
  return atob(str);
}
__name(base64UrlDecode, "base64UrlDecode");
async function sign(message, secret) {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return base64UrlEncode(String.fromCharCode(...new Uint8Array(signature)));
}
__name(sign, "sign");
async function generateToken(payload, secret) {
  const header = base64UrlEncode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    exp: Date.now() + 24 * 60 * 60 * 1e3
    // 24 小时过期
  }));
  const signature = await sign(`${header}.${body}`, secret);
  return `${header}.${body}.${signature}`;
}
__name(generateToken, "generateToken");
async function verifyToken(token, secret) {
  try {
    const [header, body, signature] = token.split(".");
    const expectedSig = await sign(`${header}.${body}`, secret);
    if (signature !== expectedSig)
      return null;
    const payload = JSON.parse(base64UrlDecode(body));
    if (payload.exp < Date.now())
      return null;
    return payload;
  } catch {
    return null;
  }
}
__name(verifyToken, "verifyToken");

// src/handlers/admin/login.js
async function handleLogin(request, env) {
  try {
    const { username, password } = await request.json();
    const adminUsername = env.ADMIN_USERNAME || "admin";
    const adminPassword = env.ADMIN_PASSWORD;
    const jwtSecret = env.JWT_SECRET || "your-secret-key-change-in-production";
    if (!adminPassword) {
      return jsonResponse({ success: false, msg: "Admin not configured" }, 500);
    }
    if (username !== adminUsername || password !== adminPassword) {
      return jsonResponse({ success: false, msg: "Invalid credentials" }, 401);
    }
    const token = await generateToken({ username, role: "admin" }, jwtSecret);
    return jsonResponse({
      success: true,
      token,
      msg: "Login successful"
    });
  } catch (error) {
    console.error("Login error:", error);
    return jsonResponse({ success: false, msg: "Login failed" }, 500);
  }
}
__name(handleLogin, "handleLogin");

// src/handlers/admin/config.js
var CONFIG_KEY3 = "site_config";
var defaultConfig = {
  contactEmail: "",
  fromEmail: "",
  fromName: "Labubu Wholesale",
  activeTheme: "labubu",
  siteName: "Labubu Wholesale",
  siteDescription: "Premium designer collectibles"
};
async function triggerDeploy(deployHookUrl) {
  if (!deployHookUrl)
    return { triggered: false, reason: "No deploy hook configured" };
  try {
    const res = await fetch(deployHookUrl, { method: "POST" });
    if (res.ok) {
      return { triggered: true };
    }
    return { triggered: false, reason: `Deploy hook returned ${res.status}` };
  } catch (error) {
    return { triggered: false, reason: error.message };
  }
}
__name(triggerDeploy, "triggerDeploy");
async function handleConfig(request, env) {
  const jwtSecret = env.JWT_SECRET || "your-secret-key-change-in-production";
  if (request.method === "GET") {
    try {
      const authHeader = request.headers.get("Authorization");
      let isAdmin = false;
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const payload = await verifyToken(token, jwtSecret);
        isAdmin = payload && payload.role === "admin";
      }
      let config = await env.CONFIG_KV.get(CONFIG_KEY3, "json");
      if (!config)
        config = defaultConfig;
      if (!isAdmin) {
        return jsonResponse({
          success: true,
          config: {
            activeTheme: config.activeTheme,
            siteName: config.siteName,
            siteDescription: config.siteDescription
          }
        });
      }
      return jsonResponse({
        success: true,
        config: {
          ...config,
          _effectiveContactEmail: config.contactEmail || env.CONTACT_EMAIL || "Not set",
          _effectiveFromEmail: config.fromEmail || env.FROM_EMAIL || "Not set"
        }
      });
    } catch (error) {
      console.error("Get config error:", error);
      return jsonResponse({ success: false, msg: "Failed to get config" }, 500);
    }
  }
  if (request.method === "POST") {
    try {
      const authHeader = request.headers.get("Authorization");
      if (!authHeader) {
        return jsonResponse({ success: false, msg: "No token provided" }, 401);
      }
      const token = authHeader.replace("Bearer ", "");
      const payload = await verifyToken(token, jwtSecret);
      if (!payload || payload.role !== "admin") {
        return jsonResponse({ success: false, msg: "Invalid or expired token" }, 401);
      }
      const updates = await request.json();
      let config = await env.CONFIG_KV.get(CONFIG_KEY3, "json");
      if (!config)
        config = defaultConfig;
      const newConfig = {
        ...config,
        ...updates,
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedBy: payload.username
      };
      await env.CONFIG_KV.put(CONFIG_KEY3, JSON.stringify(newConfig));
      let deployResult = null;
      if (updates.activeTheme && updates.activeTheme !== config.activeTheme) {
        deployResult = await triggerDeploy(env.DEPLOY_HOOK_URL);
      }
      return jsonResponse({
        success: true,
        msg: deployResult?.triggered ? "Config saved. Rebuild triggered, please wait a few minutes." : "Config updated successfully",
        config: newConfig,
        deploy: deployResult
      });
    } catch (error) {
      console.error("Update config error:", error);
      return jsonResponse({ success: false, msg: "Failed to update config" }, 500);
    }
  }
  return jsonResponse({ success: false, msg: "Method not allowed" }, 405);
}
__name(handleConfig, "handleConfig");

// src/handlers/admin/themes.js
var availableThemes = {
  labubu: {
    id: "labubu",
    name: "Labubu Wholesale",
    description: "Labubu \u6279\u53D1\u4E3B\u9898 - \u8BBE\u8BA1\u5E08\u6536\u85CF\u54C1",
    preview: "/themes/labubu/logo1.webp"
  },
  b: {
    id: "b",
    name: "Theme B",
    description: "\u4E3B\u9898 B",
    preview: "/themes/b/logo1.webp"
  }
};
async function handleThemes(request, env) {
  try {
    const themes = Object.values(availableThemes);
    return jsonResponse({ success: true, themes });
  } catch (error) {
    console.error("Get themes error:", error);
    return jsonResponse({ success: false, msg: "Failed to get themes" }, 500);
  }
}
__name(handleThemes, "handleThemes");

// src/index.js
var corsHeaders2 = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
};
function handleOptions() {
  return new Response(null, { headers: corsHeaders2 });
}
__name(handleOptions, "handleOptions");
function jsonResponse2(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders2
    }
  });
}
__name(jsonResponse2, "jsonResponse");
var src_default = {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "OPTIONS") {
      return handleOptions();
    }
    try {
      if (path === "/" || path === "") {
        return jsonResponse2({
          success: true,
          msg: "Labubu API is running",
          endpoints: [
            "POST /api/contact",
            "POST /api/subscribe",
            "POST /api/admin/login",
            "GET/POST /api/admin/config",
            "GET /api/admin/themes"
          ]
        });
      }
      if (path === "/api/contact" && request.method === "POST") {
        return await handleContact(request, env);
      }
      if (path === "/api/subscribe" && request.method === "POST") {
        return await handleSubscribe(request, env);
      }
      if (path === "/api/admin/login" && request.method === "POST") {
        return await handleLogin(request, env);
      }
      if (path === "/api/admin/config") {
        return await handleConfig(request, env);
      }
      if (path === "/api/admin/themes" && request.method === "GET") {
        return await handleThemes(request, env);
      }
      return jsonResponse2({ success: false, msg: "Not found" }, 404);
    } catch (error) {
      console.error("Error:", error);
      return jsonResponse2({ success: false, msg: "Internal server error" }, 500);
    }
  }
};
export {
  src_default as default
};
//# sourceMappingURL=index.js.map
