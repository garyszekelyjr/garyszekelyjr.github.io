<script lang="ts">
    interface Props {
        title: string;
        company: string;
        start: string;
        end: string;
    }

    let { title, company, start, end }: Props = $props();
</script>

<div class="card bg-body-secondary">
    <div class="card-body">
        <div class="fs-2 text-wrap">{title}</div>
        <div class="fs-4 text-wrap">{company}</div>
        <div class="fs-4 text-wrap">
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
