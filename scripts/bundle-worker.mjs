import { cp, rename } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

async function prepareWorker() {
    console.log("📦 Preparing worker for Cloudflare Pages...");

    try {
        const openNextDir = join(process.cwd(), ".open-next");
        const assetsDir = join(openNextDir, "assets");

        // Copy worker.js to assets as _worker.js
        const workerSource = join(openNextDir, "worker.js");
        const workerDest = join(assetsDir, "_worker.js");

        if (!existsSync(workerSource)) {
            throw new Error("worker.js not found in .open-next directory");
        }

        console.log("Copying worker.js to assets/_worker.js...");
        await cp(workerSource, workerDest);

        // Copy all necessary directories to assets
        const dirsToCopy = [
            "cloudflare",
            "middleware",
            "server-functions",
            ".build"
        ];

        for (const dir of dirsToCopy) {
            const srcDir = join(openNextDir, dir);
            const destDir = join(assetsDir, dir);

            if (existsSync(srcDir)) {
                console.log(`Copying ${dir}/ to assets/${dir}/...`);
                await cp(srcDir, destDir, { recursive: true });
            }
        }

        console.log("✅ Worker prepared successfully!");
        console.log("   Output: .open-next/assets/_worker.js");
        console.log("   Dependencies copied to .open-next/assets/");
    } catch (error) {
        console.error("❌ Preparation failed:", error);
        process.exit(1);
    }
}

prepareWorker();
