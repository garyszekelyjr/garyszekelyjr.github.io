<script lang="ts">
    let date = $state(new Date());

    setInterval(() => {
        date = new Date();
    }, 1000);
</script>

<div class="flex justify-end p-1">
    <span class="mr-2">{`${date.toLocaleDateString()}`}</span>
    <span>{`${date.toLocaleTimeString()}`}</span>
</div>
