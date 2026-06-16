const scene = document.querySelector('.scene');

// We use the 5 images cropped from the original editorial layout
const images = [
    'assets/ed_frame1.png',
    'assets/ed_frame2.png',
    'assets/ed_frame3.png',
    'assets/ed_frame4.png',
    'assets/ed_frame5.png'
];

const totalFrames = 30; // Total number of frames in the tunnel
const zSpacing = 800; // Distance between each frame on the Z axis

// Generate the frames
for (let i = 0; i < totalFrames; i++) {
    const wrapper = document.createElement('div');
    wrapper.className = 'frame-wrapper';
    
    // Distribute frames randomly across X and Y axes, but keep them generally in view
    // X spread: -800px to 800px
    const offsetX = (Math.random() - 0.5) * 1600;
    // Y spread: -600px to 600px
    const offsetY = (Math.random() - 0.5) * 1200;
    
    // Z position pushes the frame deep into the screen
    // First frame starts at Z = -1000px
    const zPos = -1000 - (i * zSpacing);
    
    // Apply a slight random rotation to make them look floating in space
    const rotateX = (Math.random() - 0.5) * 20; // -10deg to 10deg
    const rotateY = (Math.random() - 0.5) * 30; // -15deg to 15deg
    
    wrapper.style.transform = `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${zPos}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    
    const frame = document.createElement('div');
    frame.className = 'frame';
    
    const img = document.createElement('img');
    img.src = images[i % images.length];
    
    // Randomize image size between 300px and 600px width
    const width = 300 + Math.random() * 300;
    img.style.width = `${width}px`;
    
    frame.appendChild(img);
    wrapper.appendChild(frame);
    scene.appendChild(wrapper);
}

// Scroll Interaction Logic
let currentScroll = 0;
let targetScroll = 0;

window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
});

// Smooth scroll loop for butter-smooth camera movement
function render() {
    // Lerp (Linear Interpolation) for smooth easing
    currentScroll += (targetScroll - currentScroll) * 0.1;
    
    // Calculate scroll progress (0 to 1)
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = currentScroll / maxScroll;
    
    // Move the entire scene forward on the Z axis based on scroll
    // The camera effectively flies forward through the Z space
    const zMove = progress * (totalFrames * zSpacing + 1000);
    
    scene.style.transform = `translateZ(${zMove}px)`;
    
    // Optional: Fade out frames as they pass the camera
    const wrappers = document.querySelectorAll('.frame-wrapper');
    wrappers.forEach((wrapper, index) => {
        const zPos = -1000 - (index * zSpacing);
        // Distance from camera = absolute Z position + camera Z movement
        const distanceToCamera = zPos + zMove;
        
        // If the frame has passed the camera (distance > 0), fade it out rapidly
        if (distanceToCamera > 200) {
            wrapper.style.opacity = '0';
        } else if (distanceToCamera > -500) {
            // Fade out as it gets super close to the camera
            wrapper.style.opacity = (1 - (distanceToCamera + 500) / 700).toString();
        } else {
            wrapper.style.opacity = '1';
        }
    });
    
    requestAnimationFrame(render);
}

render();
