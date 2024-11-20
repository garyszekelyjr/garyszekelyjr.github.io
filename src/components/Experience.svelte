<script lang="ts">
    interface Props {
        title: string;
        company: string;
        start: string;
        end: string;
    }

    let { title, company, start, end }: Props = $props();
</script>

<div class="">
    <div class="">
        <div class="">{title}</div>
        <div class="">{company}</div>
        <div class="">
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
</div>
