<script lang="ts">
    interface Props {
        degree: string;
        major: string;
        concentration: string;
        school: string;
        start: string;
        end: string;
    }

    let { degree, major, concentration, school, start, end }: Props = $props();
</script>

<div class="mx-1 my-3">
    <div class="text-white">{degree}, {major}</div>
    <div class="text-white">Concentration: {concentration}</div>
    <div class="text-white">{school}</div>
    <div class="text-white">
        {new Date(start).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
        })} &mdash; {new Date(end).toLocaleString("en-us", {
            year: "numeric",
            month: "long",
        })}
    </div>
</div>
