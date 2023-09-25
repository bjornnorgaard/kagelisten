<script lang="ts">
    import { slackers } from "$lib/stores";
</script>

<div class="flex flex-col items-center">
    <b>Slackerne, der ikke blev plads til</b>

    <ul class="m-2">
        {#each $slackers as s}
            <li>{s}</li>
        {/each}
    </ul>
</div>
