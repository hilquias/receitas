import posts from './_sections.js';

const contents = JSON.stringify(
    posts.map((section) => {
        return {
            name: section.name,
            slug: section.slug,
        };
    })
);

export function get(req, res) {
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.end(contents);
}
