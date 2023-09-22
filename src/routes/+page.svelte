<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import {everyone, saints, unknown} from "$lib/stores";
    import UnknownMatcher from "./UnknownMatcher.svelte";
</script>

<article>
    <h2>Copy/paste data</h2>
    <div class="grid">
        <RawSaintsInput/>
        <RawEveryoneInput/>
    </div>
</article>

<article>
    <h2>Ret ukendte</h2>
    <div>
        <UnknownMatcher/>
    </div>
</article>


<br>

<div class="flex gap-4">
    <pre>{JSON.stringify($everyone, null, 2)}</pre>
    <pre>{JSON.stringify($saints, null, 2)}</pre>
    <pre>{JSON.stringify($unknown, null, 2)}</pre>
</div>
