import { updateState, state } from './state.js';
import { initRenderer } from './renderer.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the rendering engine
    initRenderer();

    // -- Bind UI Controls --

    // Image Upload
    const uploadInput = document.getElementById('upload-input');
    uploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                updateState({ artworkSrc: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    });

    // Frame Material
    const materialBtns = document.querySelectorAll('.texture-btn');
    materialBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            materialBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateState({ frameMaterial: e.target.dataset.texture });
        });
    });

    // Frame Width
    const frameWidthInput = document.getElementById('frame-width');
    const frameWidthVal = document.getElementById('frame-width-val');
    frameWidthInput.addEventListener('input', (e) => {
        const val = e.target.value;
        frameWidthVal.textContent = `${val}px`;
        updateState({ frameThickness: parseInt(val, 10) });
    });

    // Mount Color
    const colorBtns = document.querySelectorAll('.color-btn');
    colorBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            colorBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            updateState({ mountColor: e.target.dataset.color });
        });
    });

    // Mount Size
    const mountSizeInput = document.getElementById('mount-size');
    const mountSizeVal = document.getElementById('mount-size-val');
    mountSizeInput.addEventListener('input', (e) => {
        const val = e.target.value;
        mountSizeVal.textContent = `${val}px`;
        updateState({ mountThickness: parseInt(val, 10) });
    });
});
