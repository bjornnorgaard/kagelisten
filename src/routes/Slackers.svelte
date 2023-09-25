<script lang="ts">
    import { slackers } from "$lib/stores";
</script>

<b>Slackerne, der ikke blev plads til</b>

<ul class="m-2">
    {#each $slackers as s}
        <li>{s}</li>
    {/each}
</ul>

