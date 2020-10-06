<script>
    export let segment;

    export let sections;
</script>

<style>
    nav {
        border-bottom: 1px solid rgba(255, 62, 0, 0.1);
        font-weight: 300;
        padding: 0 1em;
    }

    ul {
        margin: 0;
        padding: 0;
    }

    /* clearfix */
    ul::after {
        content: '';
        display: block;
        clear: both;
    }

    li {
        display: block;
        float: left;
    }

    [aria-current] {
        position: relative;
        display: inline-block;
    }

    [aria-current]::after {
        position: absolute;
        content: '';
        width: calc(100% - 1em);
        height: 2px;
        background-color: rgb(255, 62, 0);
        display: block;
        bottom: -1px;
    }

    a {
        text-decoration: none;
        padding: 1em 0.5em;
        display: block;
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
