<script>
    import RawSaintsInput from "./RawSaintsInput.svelte";
    import RawEveryoneInput from "./RawEveryoneInput.svelte";
    import {everyone, saints, unknown} from "$lib/stores";
</script>

<div class="flex gap-4">
    <RawSaintsInput/>
    <RawEveryoneInput/>
</div>

<br>

<div class="flex gap-4">
    <pre>{JSON.stringify($everyone, null, 2)}</pre>
    <pre>{JSON.stringify($saints, null, 2)}</pre>
    <pre>{JSON.stringify($unknown, null, 2)}</pre>
</div>
