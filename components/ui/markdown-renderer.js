'use client';

/**
 * Simple markdown renderer for feature descriptions
 * Supports: images, bold, italic, links
 */
export default function MarkdownRenderer({ content, className = '' }) {
    if (!content) return null;

    // Convert markdown to HTML
    const renderMarkdown = (text) => {
        let html = text;

        // Images: ![alt](url)
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, url) => {
            return `<img src="${url}" alt="${alt}" class="max-w-full h-auto rounded-lg my-2" />`;
        });

        // Links: [text](url)
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:underline">${text}</a>`;
        });

        // Bold: **text** or __text__
        html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');

        // Italic: *text* or _text_
        html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        html = html.replace(/_([^_]+)_/g, '<em>$1</em>');

        // Line breaks
        html = html.replace(/\n/g, '<br />');

        return html;
    };

    return (
        <div
            className={`markdown-content ${className}`}
            dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
        />
    );
}
