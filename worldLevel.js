/*
WorldLevel.js — Tile Map Version
*/

class WorldLevel {
  constructor(levelJson) {
    // Name
    this.name = levelJson.name || "Level";

    // Theme
    this.theme = Object.assign(
      { bg: "#F0F0F0", platform: "#C8C8C8", blob: "#1478FF" },
      levelJson.theme || {},
    );

    // Physics
    this.gravity = levelJson.gravity ?? 0.65;
    this.jumpV = levelJson.jumpV ?? -11.0;

    // Player spawn
    this.start = {
      x: levelJson.start?.x ?? 80,
      y: levelJson.start?.y ?? 180,
      r: levelJson.start?.r ?? 26,
    };

    // Tile map
    this.tileSize = levelJson.tileSize;
    this.map = levelJson.map;

    // Platforms
    this.platforms = [];

    // Generate from map OR fallback
    if (this.map && this.tileSize) {
      this.buildFromMap();
    } else {
      this.platforms = (levelJson.platforms || []).map((p) => new Platform(p));
    }
  }

  // Generate platforms with loops
  buildFromMap() {
    for (let row = 0; row < this.map.length; row++) {
      for (let col = 0; col < this.map[row].length; col++) {
        const tile = this.map[row][col];

        if (tile === "#") {
          const x = col * this.tileSize;
          const y = row * this.tileSize;

          this.platforms.push(
            new Platform({
              x: x,
              y: y,
              w: this.tileSize,
              h: this.tileSize,
            }),
          );
        }
      }
    }
  }

  inferWidth(defaultW = 640) {
    if (this.map && this.tileSize) {
      return this.map[0].length * this.tileSize;
    }

    if (!this.platforms.length) return defaultW;

    return max(this.platforms.map((p) => p.x + p.w));
  }

  inferHeight(defaultH = 360) {
    if (this.map && this.tileSize) {
      return this.map.length * this.tileSize;
    }

    if (!this.platforms.length) return defaultH;

    return max(this.platforms.map((p) => p.y + p.h));
  }

  drawWorld() {
    background(color(this.theme.bg));

    for (const p of this.platforms) {
      p.draw(color(this.theme.platform));
    }
  }
}
