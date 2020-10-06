import sections from '../_sections.js';
import get_recipes from './_recipes.js';

let json_map = new Map();

export function get(req, res) {
    const section = sections.find((x) => x.slug === req.params.section);

    if (!section) {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.end(
            JSON.stringify({
                message: `Not found`,
            })
        );
        return;
    }

    if (!json_map.has(section.slug) || process.env.NODE_ENV !== 'production') {
        const recipes = get_recipes(section.slug).map((recipe) => {
            return {
                key: recipe.key,
                slug: recipe.slug,
                title: recipe.title,
                metadata: recipe.metadata,
            };
        });

        json_map.set(
            section.slug,
            JSON.stringify({
                slug: section.slug,
                name: section.name,
                recipes,
            })
        );
    }

    res.writeHead(200, {
        'Content-Type': 'application/json',
    });

    res.end(json_map.get(section.slug));
}
