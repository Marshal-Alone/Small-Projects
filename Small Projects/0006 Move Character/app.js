// Game elements
const character = document.querySelector('.character');
const gameWorld = document.querySelector('.game-world');
const resetBtn = document.getElementById('reset-btn');
const controlsInfo = document.querySelector('.controls-info');
const toggleControlsBtn = document.getElementById('toggle-controls');

// Game state
let position = { x: 50, y: 50 }; // percentage
let speed = 0.8; // Increased from 0.5 to 0.8 for faster movement
let isControlsVisible = false;
let keys = {
    up: false,
    down: false,
    left: false,
    right: false
};

// Initialize character position
function initCharacter() {
    position = { x: 50, y: 50 };
    updateCharacterPosition();
}

// Update character position
function updateCharacterPosition() {
    character.style.left = `${position.x}%`;
    character.style.top = `${position.y}%`;
}

// Move character
function moveCharacter() {
    const prevPosition = { ...position };
    
    if (keys.up && position.y > 0) position.y -= speed;
    if (keys.down && position.y < 100) position.y += speed;
    if (keys.left && position.x > 0) position.x -= speed;
    if (keys.right && position.x < 100) position.x += speed;

    // Keep character within bounds
    position.x = Math.max(0, Math.min(100, position.x));
    position.y = Math.max(0, Math.min(100, position.y));

    // Only update if position changed
    if (prevPosition.x !== position.x || prevPosition.y !== position.y) {
        updateCharacterPosition();
    }
}

// Visual feedback for key presses
function highlightKey(key) {
    const keyElement = document.querySelector(`.key:contains('${key}')`);
    if (keyElement) {
        keyElement.style.background = 'var(--primary)';
        keyElement.style.transform = 'translateY(-2px)';
        keyElement.style.boxShadow = 'var(--glow)';
    }
}

function removeHighlight(key) {
    const keyElement = document.querySelector(`.key:contains('${key}')`);
    if (keyElement) {
        keyElement.style.background = 'var(--surface-light)';
        keyElement.style.transform = 'translateY(0)';
        keyElement.style.boxShadow = 'var(--shadow)';
    }
}

// Handle keyboard input
function handleKeyDown(e) {
    switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            if (!keys.up) {
                keys.up = true;
                highlightKey('W');
                highlightKey('↑');
            }
            break;
        case 's':
        case 'arrowdown':
            if (!keys.down) {
                keys.down = true;
                highlightKey('S');
                highlightKey('↓');
            }
            break;
        case 'a':
        case 'arrowleft':
            if (!keys.left) {
                keys.left = true;
                highlightKey('A');
                highlightKey('←');
            }
            break;
        case 'd':
        case 'arrowright':
            if (!keys.right) {
                keys.right = true;
                highlightKey('D');
                highlightKey('→');
            }
            break;
    }
}

function handleKeyUp(e) {
    switch(e.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
            keys.up = false;
            removeHighlight('W');
            removeHighlight('↑');
            break;
        case 's':
        case 'arrowdown':
            keys.down = false;
            removeHighlight('S');
            removeHighlight('↓');
            break;
        case 'a':
        case 'arrowleft':
            keys.left = false;
            removeHighlight('A');
            removeHighlight('←');
            break;
        case 'd':
        case 'arrowright':
            keys.right = false;
            removeHighlight('D');
            removeHighlight('→');
            break;
    }
}

// Toggle controls visibility
function toggleControls(event) {
    if (event) {
        event.stopPropagation(); // Prevent event from bubbling up
    }
    
    isControlsVisible = !isControlsVisible;
    
    if (isControlsVisible) {
        controlsInfo.classList.remove('hidden');
        controlsInfo.classList.remove('slide-up');
        controlsInfo.classList.add('slide-down');
        toggleControlsBtn.innerHTML = '<i class="fas fa-keyboard"></i><span>Hide Controls</span>';
    } else {
        hideControls();
    }
}

// Hide controls
function hideControls() {
    if (!isControlsVisible) return;
    
    isControlsVisible = false;
    controlsInfo.classList.add('slide-up');
    toggleControlsBtn.innerHTML = '<i class="fas fa-keyboard"></i><span>Show Controls</span>';
    setTimeout(() => {
        if (!isControlsVisible) {
            controlsInfo.classList.add('hidden');
        }
    }, 300);
}

// Reset character position
function resetPosition() {
    position = { x: 50, y: 50 };
    updateCharacterPosition();
    resetBtn.classList.add('active');
    setTimeout(() => resetBtn.classList.remove('active'), 200);
}

// Event listeners
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);
resetBtn.addEventListener('click', resetPosition);
toggleControlsBtn.addEventListener('click', toggleControls);
controlsInfo.addEventListener('click', (e) => e.stopPropagation()); // Prevent clicks inside controls from closing
document.addEventListener('click', hideControls); // Hide controls when clicking outside

// Start game
initCharacter();

// Game loop
function gameLoop() {
    moveCharacter();
    requestAnimationFrame(gameLoop);
}

gameLoop();
