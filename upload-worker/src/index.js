export default {
    async fetch(request, env) {
        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle CORS preflight
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        const url = new URL(request.url);

        try {
            // POST /upload - Upload file
            if (request.method === 'POST' && url.pathname === '/upload') {
                const formData = await request.formData();
                const file = formData.get('file');

                if (!file) {
                    return new Response(JSON.stringify({ error: 'No file uploaded' }), {
                        status: 400,
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    });
                }

                // Generate unique filename
                const timestamp = Date.now();
                const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
                const filename = `${timestamp}-${safeName}`;

                // Upload to R2
                await env.UPLOADS_BUCKET.put(filename, file.stream());

                return new Response(
                    JSON.stringify({
                        success: true,
                        url: `/files/${filename}`,
                        filename: filename,
                    }),
                    {
                        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                    }
                );
            }

            // GET /files - List files
            if (request.method === 'GET' && url.pathname === '/files') {
                const listed = await env.UPLOADS_BUCKET.list();
                const files = listed.objects.map((obj) => ({
                    name: obj.key,
                    size: obj.size,
                    uploaded: obj.uploaded,
                }));

                return new Response(JSON.stringify({ files }), {
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // GET /files/:filename - Get file
            if (request.method === 'GET' && url.pathname.startsWith('/files/')) {
                const filename = url.pathname.slice(7); // Remove '/files/'
                const object = await env.UPLOADS_BUCKET.get(filename);

                if (!object) {
                    return new Response('File not found', {
                        status: 404,
                        headers: corsHeaders,
                    });
                }

                return new Response(object.body, {
                    headers: {
                        ...corsHeaders,
                        'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
                    },
                });
            }

            return new Response('Not Found', { status: 404, headers: corsHeaders });
        } catch (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    },
};
