import * as esbuild from "esbuild";
import { join } from "path";

async function bundle() {
    console.log("📦 Bundling worker...");

    try {
        await esbuild.build({
            entryPoints: [join(process.cwd(), ".open-next/worker.js")],
            bundle: true,
            outfile: join(process.cwd(), ".open-next/assets/_worker.js"),
            format: "esm",
            target: "esnext",
            platform: "node", // Changed to node to allow built-ins, Cloudflare nodejs_compat handles this
            external: [
                "node:*",
                "cloudflare:*",
                "workerd:*",
                "fs",
                "path",
                "os",
                "crypto",
                "stream",
                "util",
                "events",
                "url",
                "buffer",
                "string_decoder",
                "querystring",
                "http",
                "https",
                "zlib",
                "net",
                "tls",
                "child_process",
                "worker_threads",
                "async_hooks",
                "vm",
                "module",
                "constants",
                "assert",
                "tty"
            ],
            minify: false,
            sourcemap: true,
            logLevel: "info",
            banner: {
                js: `
          // Polyfill for Cloudflare Workers
          globalThis.process = globalThis.process || { env: {}, cwd: () => '/' };
        `
            },
        });
        console.log("✅ Worker bundled successfully to .open-next/assets/_worker.js");
    } catch (error) {
        console.error("❌ Bundling failed:", error);
        process.exit(1);
    }
}

bundle();
