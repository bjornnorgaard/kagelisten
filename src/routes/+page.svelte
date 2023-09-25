<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import { everyone, rawSaints, slackers, spots, unknown } from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
    import { slide } from "svelte/transition";
    import Schedule from "./Schedule.svelte";
    import Slackers from "./Slackers.svelte";

    $: hasData = $everyone.length && $rawSaints.length;
    $: hasUnknowns = $unknown.length && hasData;
    $: hasSpots = !!$spots.length;
    $: hasSlackers = !!$slackers.length;
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
    <section in:slide out:slide>
        <Schedule/>
    </section>
{/if}

{#if !hasSpots && hasSlackers }
    <section in:slide out:slide>
        <Slackers/>
    </section>
{/if}
