<script lang="ts">
    interface Props {
        title: string;
        company: string;
        start: string;
        end: string;
    }

    let { title, company, start, end }: Props = $props();
</script>

<div class="mx-1 my-3">
    <div class="text-white">{title}</div>
    <div class="text-white">{company}</div>
    <div class="text-white">
        {new Date(start).toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
        })} &mdash; {end
            ? new Date(end).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "long",
              })
            : "Present"}
    </div>
</div>
