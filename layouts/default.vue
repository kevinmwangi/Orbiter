<template>
    <main :class="$style.main">
        <slot/>
    </main>
</template>

<style module>
@media only screen and (-webkit-min-device-pixel-ratio: 2),
only screen and (min-resolution: 192dpi) {

    html, :host{
        font-family: Inter, sans-serif;
        font-size: clamp(16px, calc(6px + 0.5vw), 18px); /* Now 1rem = 16px at -webkit-min-device-pixel-ratio: 2 viewport width */
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        color: var(--color-primary);
    }
}
.main {
    width: 100vw;
    height: 100vh;
}
</style>