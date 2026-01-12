# Mvsdski
Sigma boy

## Rain Shelter Game

A simple HTML5 canvas game where you control a character trying to find shelter from the rain.

### Features

- 🌧️ **Realistic Rain System**: Rain falls straight down with 200 individual particles
- 💡 **Dynamic Brightness**: Lighting adjusts when you enter/exit buildings
- 🏠 **Buildings**: Three buildings provide shelter from the rain
- 🔊 **Sound Control**: Volume adjusts based on indoor/outdoor location
- 🎮 **Smooth Controls**: Move with Arrow Keys or WASD

### How to Play

1. Open `index.html` in a web browser
2. Use **Arrow Keys** or **WASD** to move your character
3. Enter buildings to get shelter from the rain
4. Watch the status indicator change from "Outdoors - Raining" to "Indoors - Sheltered"

### Technical Details

- Pure JavaScript with HTML5 Canvas
- No external dependencies
- Responsive collision detection
- 60 FPS game loop

### Running the Game

Simply open `index.html` in any modern web browser, or run a local server:

```bash
python3 -m http.server 8000
# Then visit http://localhost:8000
```

### Issues Fixed

This implementation addresses:
- ✅ Fixed brightness control
- ✅ Rain falling sideways issue (now falls straight down)
- ✅ Removed unwanted walking effects
- ✅ Added proper rain particle system
- ✅ Fixed sound levels for indoor/outdoor
