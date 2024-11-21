<script lang="ts">
    let date = $state(new Date());

    setInterval(() => {
        date = new Date();
    }, 1000);
</script>

<div class="flex justify-end p-1 bg-neutral-500">
    <span class="mr-2 text-lg text-white">{`${date.toLocaleDateString()}`}</span>
    <span class="text-lg text-white"> {`${date.toLocaleTimeString()}`}</span>
</div>
