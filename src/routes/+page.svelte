<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import {everyone, saints, unknown} from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
</script>

<section>
    <h2>Copy/paste data</h2>
    <div class="sm:flex sm:gap-4">
        <RawSaintsInput/>
        <RawEveryoneInput/>
    </div>
</section>

<section>
    <h2>Ret ukendte</h2>
    <div>
        <UnknownMatcher/>
    </div>
</section>

<div class="flex gap-4">
    <pre>{JSON.stringify($everyone, null, 2)}</pre>
    <pre>{JSON.stringify($saints, null, 2)}</pre>
    <pre>{JSON.stringify($unknown, null, 2)}</pre>
</div>
