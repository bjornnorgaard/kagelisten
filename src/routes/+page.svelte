<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import {everyone, rawSaints, saints, unknown} from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
</script>

<div class="flex flex-col gap-4">
    <section>
        <h2>Copy/paste data</h2>
        <div class="sm:flex sm:gap-4">
            <RawSaintsInput/>
            <RawEveryoneInput/>
        </div>
    </section>


    {#if $unknown.length}
        <section>
            <h2>Ret ukendte</h2>
            <UnknownMatcher/>
        </section>
    {:else}
        <section>
            <h2>Ingen ukendte</h2>
            <span>Alle navne fra 'De Artige' er fundet i 'Allesammen'.</span>
        </section>
    {/if}
</div>

<div class="flex gap-4">
    <pre>Everyone{JSON.stringify($everyone, null, 2)}</pre>
    <pre>RawSaints{JSON.stringify($rawSaints.split("\n"), null, 2)}</pre>
    <pre>Saints{JSON.stringify($saints, null, 2)}</pre>
    <pre>Unknown{JSON.stringify($unknown, null, 2)}</pre>
</div>
