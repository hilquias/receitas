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

<Nav segment="{segment}" sections="{sections}" />

<main>
    <slot />
</main>
