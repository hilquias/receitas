<script context="module">
    export async function preload({ params, query }) {
        const res = await this.fetch(`${params.section}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return { section: data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    export let section;
</script>

<svelte:head>
    <title>{section.name}</title>
</svelte:head>

<h1>{section.name}</h1>

<ul>
    {#each section.recipes as recipe}
        <li>
            <a rel="prefetch" href="{section.slug}/{recipe.slug}">
                {recipe.title}
            </a>
        </li>
    {/each}
</ul>
