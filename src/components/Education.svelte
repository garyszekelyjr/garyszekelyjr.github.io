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

<div class="card bg-body-secondary">
    <div class="card-body">
        <div class="fs-2 text-wrap">{degree}, {major}</div>
        <div class="fs-4 text-wrap">Concentration: {concentration}</div>
        <div class="fs-4 text-wrap">{school}</div>
        <div class="fs-4 text-wrap">
            {new Date(start).toLocaleString("en-us", {
                year: "numeric",
                month: "long",
            })} &mdash; {new Date(end).toLocaleString("en-us", {
                year: "numeric",
                month: "long",
            })}
        </div>
    </div>
</div>
