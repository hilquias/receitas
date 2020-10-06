<script context="module">
    export async function preload({ params, query }) {
        const res = await this.fetch('index.json');
        const data = await res.json();

        if (res.status === 200) {
            return { sections: data };
        } else {
            this.error(res.status, data.message);
        }
    }
</script>

<script>
    import Nav from '../components/Nav.svelte';

    export let segment;

    export let sections;
</script>

<style>
    main {
        position: relative;
        max-width: 56em;
        background-color: white;
        padding: 2em;
        margin: 0 auto;
        box-sizing: border-box;
    }
</style>

<Nav segment="{segment}" sections="{sections}" />

<main>
    <slot />
</main>
