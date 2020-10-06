import fs from 'fs';
import path from 'path';
import {
    extract_frontmatter,
    link_renderer,
} from '@sveltejs/site-kit/utils/markdown.js';
import marked from 'marked';

export default function get_recipes(dir) {
    return fs
        .readdirSync(`static/content/${dir}`)
        .reduce((out, file) => {
            if (path.extname(file) !== '.md') return out;

            const match = /^(\d+)-(.+)\.md$/.exec(file);

            if (!match) throw new Error(`Invalid filename '${file}'`);

            let [, key, slug] = match;

            key = parseInt(key);

            const markdown = fs.readFileSync(
                `static/content/${dir}/${file}`,
                'utf-8'
            );

            const { content, metadata } = extract_frontmatter(markdown);

            const title = metadata.title;

            const renderer = new marked.Renderer();

            renderer.link = link_renderer;

            const html = marked(content, { renderer });

            return out.concat({
                key,
                slug,
                title,
                html,
                metadata,
            });
        }, [])
        .sort((a, b) => (a.key < b.key ? 1 : -1));
}
