import { state, subscribe } from './state.js';

const root = document.documentElement;
const artworkImage = document.getElementById('artwork-image');

// Map material names to asset paths
const materialsMap = {
    'oak': 'assets/texture-oak.svg',
    'black': 'assets/texture-black.svg',
    'gold': 'assets/texture-gold.svg'
};

export function initRenderer() {
    // Initial render
    render(state);
    
    // Subscribe to future changes
    subscribe(render);
}

function render(currentState) {
    // Update CSS Variables for the visualizer
    root.style.setProperty('--frame-thickness', `${currentState.frameThickness}px`);
    root.style.setProperty('--mount-thickness', `${currentState.mountThickness}px`);
    root.style.setProperty('--mount-color', currentState.mountColor);
    
    // Update frame texture
    const textureUrl = `url('../${materialsMap[currentState.frameMaterial]}')`;
    root.style.setProperty('--frame-texture', textureUrl);

    // Update artwork image if changed
    if (artworkImage.src !== currentState.artworkSrc && !artworkImage.src.includes(currentState.artworkSrc)) {
        artworkImage.src = currentState.artworkSrc;
    }
}
