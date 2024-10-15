<script lang="ts">
    export let degree: string;
    export let major: string;
    export let concentration: string;
    export let school: string;
    export let start: string;
    export let end: string;
</script>

<div class='card bg-body-secondary'>
    <div class='card-body'>
        <div class='fs-2 text-wrap'>{degree}, {major}</div>
        <div class='fs-4 text-wrap'>Concentration: {concentration}</div>
        <div class='fs-4 text-wrap'>{school}</div>
        <div class="fs-4 text-wrap">{new Date(start).toLocaleString('en-us', {
            year: 'numeric',
            month: 'long'
        })} &mdash; {new Date(end).toLocaleString('en-us', {
            year: 'numeric',
            month: 'long'
        })}</div>
    </div>
</div>