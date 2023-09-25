<script lang="ts">

    import {derived} from "svelte/store";
    import {rawSaints} from "$lib/stores";

    const schedule = derived(rawSaints, rs => {
        const lines = rs.split("\n");
        const schedule = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].includes(":")) {
                
            }
        }
    })

</script>

