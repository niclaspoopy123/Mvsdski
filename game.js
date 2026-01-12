// Game Configuration
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game State
const gameState = {
    player: {
        x: 400,
        y: 300,
        width: 30,
        height: 40,
        speed: 3,
        color: '#e94560'
    },
    buildings: [
        { x: 100, y: 100, width: 150, height: 120 },
        { x: 550, y: 350, width: 180, height: 140 },
        { x: 250, y: 400, width: 120, height: 100 }
    ],
    isIndoors: false,
    brightness: 1.0, // Full brightness
    rainDrops: [],
    keys: {},
    soundVolume: 1.0 // Ready for audio implementation (e.g., rain sound effects)
};

// Input handling
document.addEventListener('keydown', (e) => {
    gameState.keys[e.key.toLowerCase()] = true;
});

document.addEventListener('keyup', (e) => {
    gameState.keys[e.key.toLowerCase()] = false;
});

// Rain Drop Class
class RainDrop {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = -Math.random() * canvas.height; // Start above screen (negative y)
        this.length = Math.random() * 15 + 10;
        this.speed = Math.random() * 3 + 5; // Vertical speed
        this.opacity = Math.random() * 0.3 + 0.5;
    }

    update() {
        // Rain falls straight down (not sideways)
        this.y += this.speed;
        
        // Reset when it falls off screen
        if (this.y > canvas.height) {
            this.y = -this.length;
            this.x = Math.random() * canvas.width;
        }
    }

    draw() {
        if (!gameState.isIndoors) {
            ctx.strokeStyle = `rgba(174, 194, 224, ${this.opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }
}

// Initialize rain drops
function initRain() {
    gameState.rainDrops = [];
    for (let i = 0; i < 200; i++) {
        gameState.rainDrops.push(new RainDrop());
    }
}

// Check if player is inside a building
function checkIndoors() {
    const player = gameState.player;
    let wasIndoors = gameState.isIndoors;
    gameState.isIndoors = false;
    
    for (let building of gameState.buildings) {
        if (player.x < building.x + building.width &&
            player.x + player.width > building.x &&
            player.y < building.y + building.height &&
            player.y + player.height > building.y) {
            gameState.isIndoors = true;
            break;
        }
    }
    
    // Adjust brightness and sound when entering/exiting buildings
    if (gameState.isIndoors) {
        gameState.brightness = 0.6; // Dimmer indoors
        gameState.soundVolume = 0.2; // Quieter rain sound indoors
    } else {
        gameState.brightness = 1.0; // Full brightness outdoors
        gameState.soundVolume = 1.0; // Full volume outdoors
    }
}

// Update player position
function updatePlayer() {
    const player = gameState.player;
    const keys = gameState.keys;
    
    let newX = player.x;
    let newY = player.y;
    
    // Movement controls (no camera shake or "pic" effect)
    if (keys['arrowup'] || keys['w']) {
        newY -= player.speed;
    }
    if (keys['arrowdown'] || keys['s']) {
        newY += player.speed;
    }
    if (keys['arrowleft'] || keys['a']) {
        newX -= player.speed;
    }
    if (keys['arrowright'] || keys['d']) {
        newX += player.speed;
    }
    
    // Boundary checking
    if (newX >= 0 && newX + player.width <= canvas.width) {
        player.x = newX;
    }
    if (newY >= 0 && newY + player.height <= canvas.height) {
        player.y = newY;
    }
}

// Draw buildings
function drawBuildings() {
    ctx.fillStyle = '#8B4513';
    ctx.strokeStyle = '#5A2E0A';
    ctx.lineWidth = 3;
    
    for (let building of gameState.buildings) {
        ctx.fillRect(building.x, building.y, building.width, building.height);
        ctx.strokeRect(building.x, building.y, building.width, building.height);
        
        // Add windows
        ctx.fillStyle = '#FFD700';
        const windowSize = 15;
        const windowGap = 25;
        
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.fillRect(
                    building.x + 20 + j * windowGap,
                    building.y + 20 + i * windowGap,
                    windowSize,
                    windowSize
                );
            }
        }
        
        // Draw door
        ctx.fillStyle = '#5A2E0A';
        ctx.fillRect(
            building.x + building.width / 2 - 15,
            building.y + building.height - 30,
            30,
            30
        );
        
        ctx.fillStyle = '#8B4513';
    }
}

// Draw player
function drawPlayer() {
    const player = gameState.player;
    
    // Draw player body
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    
    // Draw player head
    ctx.beginPath();
    ctx.arc(player.x + player.width / 2, player.y + 8, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw eyes
    ctx.fillStyle = '#000';
    ctx.fillRect(player.x + player.width / 2 - 3, player.y + 6, 2, 2);
    ctx.fillRect(player.x + player.width / 2 + 1, player.y + 6, 2, 2);
}

// Draw ground
function drawGround() {
    // Grass
    ctx.fillStyle = '#2d5016';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some texture with patches
    ctx.fillStyle = '#3d6026';
    for (let i = 0; i < 50; i++) {
        const x = (i * 37) % canvas.width;
        const y = (i * 53) % canvas.height;
        ctx.fillRect(x, y, 20, 20);
    }
}

// Draw status indicator
function drawStatus() {
    ctx.fillStyle = gameState.isIndoors ? '#4CAF50' : '#2196F3';
    ctx.font = '16px Arial';
    ctx.fillText(
        gameState.isIndoors ? 'Indoors - Sheltered' : 'Outdoors - Raining',
        10,
        20
    );
}

// Main game loop
function gameLoop() {
    // Update
    updatePlayer();
    checkIndoors();
    
    // Update rain drops
    for (let drop of gameState.rainDrops) {
        drop.update();
    }
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Apply brightness filter
    ctx.save();
    ctx.globalAlpha = gameState.brightness;
    
    // Draw ground
    drawGround();
    
    // Draw buildings
    drawBuildings();
    
    // Draw player
    drawPlayer();
    
    // Restore full opacity for rain
    ctx.restore();
    
    // Draw rain (always full opacity, but only visible outdoors)
    for (let drop of gameState.rainDrops) {
        drop.draw();
    }
    
    // Draw status
    drawStatus();
    
    requestAnimationFrame(gameLoop);
}

// Initialize and start game
initRain();
gameLoop();
