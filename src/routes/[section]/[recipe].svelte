<script context="module">
    export async function preload({ params, query }) {
        const res = await this.fetch(`${params.section}/${params.recipe}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return { recipe: data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let recipe;
</script>

<svelte:head>
    <title>{recipe.title}</title>
</svelte:head>

<h1>{recipe.title}</h1>

<div class="content">
    {@html recipe.html}
</div>
