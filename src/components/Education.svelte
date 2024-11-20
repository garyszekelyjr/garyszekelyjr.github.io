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

<div class="">
    <div class="">
        <div class="">{degree}, {major}</div>
        <div class="">Concentration: {concentration}</div>
        <div class="">{school}</div>
        <div class="">
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
