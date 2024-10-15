<script lang="ts">
    export let title: string;
    export let company: string;
    export let start: string;
    export let end: string; 
</script>

<div class='card bg-body-secondary'>
    <div class='card-body'>
        <div class="fs-2 text-wrap">{title}</div>
        <div class="fs-4 text-wrap">{company}</div>
        <div class="fs-4 text-wrap">{new Date(start).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long'
        })} &mdash; {end ? new Date(end).toLocaleDateString('en-us', {
            year: 'numeric',
            month: 'long'
        }) : 'Present'}</div>
    </div>
</div>