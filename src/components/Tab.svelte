<script lang="ts">
    interface Props {
        tab: string;
    }

    let { tab }: Props = $props();
</script>

<span class="me-3 fs-3">
    <i
        class={`bi bi-${
            {
                About: "info-circle-fill",
                Projects: "folder-fill",
                Contact: "person-rolodex",
            }[tab]
        } fs-3`}
    ></i>
</span>
