<script>
    import "../app.css";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';

    inject({mode: dev ? 'development' : 'production'});
</script>

<main class="container">
    <h1 class="md:mt-8">Kagelisten</h1>

    <slot/>
</main>
