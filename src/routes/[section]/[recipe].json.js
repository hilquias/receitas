import get_recipes from './_recipes.js';

let lookup_section_map;

export function get(req, res, next) {
    if (!lookup_section_map) {
        lookup_section_map = new Map();
    }

    if (!lookup_section_map.has(req.params.section)) {
        lookup_section_map.set(req.params.section, new Map());
    }

    const section_map = lookup_section_map.get(req.params.section);

    if (!section_map || process.env.NODE_ENV != 'production') {
        get_recipes(req.params.section).forEach((recipe) => {
            section_map.set(recipe.slug, JSON.stringify(recipe));
        });
    }

    const recipe = section_map.get(req.params.recipe);

    if (recipe) {
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });

        res.end(recipe);
    } else {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });

        res.end(
            JSON.stringify({
                message: `Not found`,
            })
        );
    }
}
