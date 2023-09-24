<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import {everyone, rawSaints, saints, unknown} from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
</script>

<section class="grid">
    <RawSaintsInput/>
    <RawEveryoneInput/>
</section>

{#if $unknown.length}
    <section>
        <UnknownMatcher/>
    </section>
{/if}

<div class="grid">
    <pre>Everyone{JSON.stringify($everyone, null, 2)}</pre>
    <pre>RawSaints{JSON.stringify($rawSaints.split("\n"), null, 2)}</pre>
    <pre>Saints{JSON.stringify($saints, null, 2)}</pre>
    <pre>Unknown{JSON.stringify($unknown, null, 2)}</pre>
</div>
