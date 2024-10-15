<script lang="ts">
    export let tab: string;
</script>

<span class="me-3 fs-3">
    <i class={`bi bi-${{
        'About': 'info-circle-fill',
        'Projects': 'folder-fill',
        'Contact': 'person-rolodex'
    }[tab]} fs-3`} />
</span>