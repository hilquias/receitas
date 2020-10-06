<script>
    export let segment;

    export let sections;
</script>

<style>
    nav {
        display: flex;
    }
    nav > a {
        margin: 0 8px;
    }
    nav > a:first-child {
        margin-left: 0;
    }
</style>

<header>
    <h1>Receitas</h1>
    <nav>
        {#each sections as section, i (section.slug)}
            <a
                rel="prefetch"
                aria-current="{segment === section.slug ? 'page' : undefined}"
                href="{section.slug}">{section.name}</a>
            {#if i + 1 !== sections.length}<span>/</span>{/if}
        {/each}
    </nav>
</header>
