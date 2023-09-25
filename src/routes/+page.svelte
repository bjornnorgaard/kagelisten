<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import { everyone, rawSaints, unknown } from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
    import { slide } from "svelte/transition";
    import Schedule from "./Schedule.svelte";

    $: hasData = $everyone.length && $rawSaints.length;
    $: hasUnknowns = $unknown.length && hasData;
</script>

<section class="grid">
    <RawSaintsInput/>
    <RawEveryoneInput/>
</section>

{#if hasData && hasUnknowns}
    <section in:slide out:slide>
        <UnknownMatcher/>
    </section>
{/if}

{#if hasData && !hasUnknowns}
    <section>
        <Schedule/>
    </section>
{/if}
