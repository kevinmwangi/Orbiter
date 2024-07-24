<template>
    <div :class="$style.loaderContainer">
        <div :class="$style.loaderCircle"></div>
        <div :class="$style.loaderLineMask">
            <div :class="$style.loaderLine"></div>
        </div>

        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="50" height="50" rx="25" fill="url(#pattern0_1010_14255)"/>
            <defs>
                <pattern id="pattern0_1010_14255" patternContentUnits="objectBoundingBox" width="1" height="1">
                    <use xlink:href="#image0_1010_14255" transform="matrix(0.01 0 0 0.01 0 -0.005)"/>
                </pattern>
                <image id="image0_1010_14255" width="100" height="101" xlink:href="data:image/png;base64,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"/>
            </defs>
        </svg>
    </div>
</template>

<style module>
.loaderContainer {
    height: 100vh;
    width: 100vw;
    
    .loaderCircle {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 7.5rem;
        height: 7.5rem;
        border-radius: 50%;
        box-shadow: inset 0 0 0 0.188rem rgba(255, 255, 255, .1);
        margin-left: -3.75rem;
        margin-top: -3.75rem;
    }

    .loaderLineMask {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 3.75rem;
        height: 7.5rem;
        margin-left: -3.75rem;
        margin-top: -3.75rem;
        overflow: hidden;
        transform-origin: 3.75rem 3.75rem;
        -webkit-mask-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        animation: rotate 1.2s infinite linear;

        .loaderLine {
            width: 7.5rem;
            height: 7.5rem;
            border-radius: 50%;
            box-shadow: inset 0 0 0 0.188rem rgba(255, 255, 255, 0.8);
        }
    }
    
    svg {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -3.656rem;
        margin-top: -3.656rem;
        width: 7.313rem;
        height: 7.313rem;
    }
}

@keyframes rotate { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);}}
</style>