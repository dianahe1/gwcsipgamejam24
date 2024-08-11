/* VARIABLES */
let newSpiritFont, winkleFont;
let playButton, playButtonText;
let player, ground, platforms, emojis, obstacles;
let screen1Emojis = ["🍎", "🥕", "🥑", "🍖", "🍓", "🌾", "💧", "☀️", "😴"];
let screen2Emojis = ["🏠", "🔑", "💵", "🏥", "💼", "🔐", "☂️", "💰", "📱"];
let screen3Emojis = ["👭", "💞", "🥰", "🏘️", "🎀", "💬", "🤝", "🙌", "👋"];
let screen4Emojis = ["🥂", "🏆", "🎓", "🏋🏻", "👏", "🎉", "🏅", "👑", "✨"];
let screen5Emojis = ["🧘🏻", "🎧", "🚵‍♀️", "🎨", "💪", "🎯", "🌟", "🧠", "📚"];
let collisionTextVisible = false;
let obstaclesEmojis = ["🔥", "⚠️", "🚨", "🚧", "💥", "💔", "🥀", "😭", "😓", "🗣️", "😒", "😔", "😨", "⏳", "😞", "⏰"]
let nextLevelText = false;
let screen = 0;
let score = 0;
let angle = 0;
let replayButton, replayButtonText;
let screenFunctions = [showScreen1, showScreen2, showScreen3, showScreen4, showScreen5, showScreen6];
let backgroundColors = ["#C3D8EA", "#F8F3D6", "#FFEBEB", "#E1F0E1", "#F1EAF8", "#F3E9DE"];

/* PRELOADS FILES */
function preload() {
  newSpiritFont = loadFont('assets/New-Spirit.otf');
  winkleFont = loadFont('assets/Winkle-Regular.ttf');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400, 400);

  //Play button
  playButton = new Sprite(-200, -325, 100, 35, 'k');
  playButtonText = new Sprite(-200, -322, 1, 'k');
  playButton.color = 235;
  playButtonText.color = 235;
  playButtonText.text = "Play";
  playButtonText.textSize = 15;

  //Replay
  replayButton = new Sprite(-200, -325, 100, 35, 'k');
  replayButtonText = new Sprite(-200, -322, 1, 'k');
  replayButton.color = "#dec7ad";
  replayButtonText.text = "Replay";
  replayButtonText.textSize = 15;

  showHomeScreen();
  noStroke();

  //Player
  player = new Sprite(-50, -200, 30);
  player.color = '#C3D8EA';
  player.rotationLock = true;
  player.vel.x = 0;
  player.vel.y = 0;
  player.offset.y = -3;

  //Ground
  ground = new Sprite(-150, -100, 600, 40, "s");
  ground.color = color(188, 158, 130);
  ground.friction = 0;

  //Platforms
  platforms = new Group();
  platforms.color = "#6495ED";
  platforms.collider = "k";
  platforms.friction = 0;

  //Emojis
  emojis = new Group();
  emojis.color = '#C3D8EA';
  emojis.collider = "k";

  //Obstacles
  obstacles = new Group();
  obstacles.color = '#C3D8EA';
  obstacles.collider = "k";

  //Overlaps method takes in a Sprite or emojis, then calls a function (collect)
  player.overlaps(emojis, collect);

  textFont(newSpiritFont);
}

/* DRAW LOOP REPEATS */
function draw() {
  if (playButton.mouse.presses()) {
    screenFunctions[screen]();
    screen = 1;
  }
  if (score == 9) {
    score = 0;
    nextLevelText = true;
    if (screen == 5) {
      setTimeout(reset, 1000);
    } else {
      setTimeout(reset, 2000);
    }
  }

  //Move obstacles
  if (screen == 1 && !nextLevelText) {
    if (obstacles[1].y < 255) {
      obstacles[0].vel.x = 1;
      obstacles[1].vel.y = 2;
    } else if (obstacles[1].y > 335) {
      obstacles[0].vel.x = -1;
      obstacles[1].vel.y = -2;
    }
  }
  if (screen == 2 && !nextLevelText) {
    if (obstacles[0].y < 256) {
      obstacles[0].vel.y = 1;
    } else if (obstacles[0].y > 275) {
      obstacles[0].vel.y = -1;
    }
    if (obstacles[2].x < 671) {
      obstacles[1].vel.y = 1.5;
      obstacles[2].vel.x = 1.5;
    } else if (obstacles[2].x > 720) {
      obstacles[1].vel.y = -1.5;
      obstacles[2].vel.x = -1.5;
    }
  }
  if (screen == 3 && !nextLevelText) {
    if (obstacles[0].y < 256) {
      obstacles[0].vel.y = 2;
    } else if (obstacles[0].y > 335) {
      obstacles[0].vel.y = -2;
    } else if (obstacles[1].x < 361) {
      obstacles[1].vel.x = 2;
    } else if (obstacles[1].x > 425) {
      obstacles[1].vel.x = -2;
    }
    let newX = 875 + 45 * cos(angle);
    let newY = 285 + 45 * sin(angle);
    obstacles[2].pos = { x: newX, y: newY };
    angle = angle + 2;
  }
  if (screen == 4 && !nextLevelText) {
    if (obstacles[0].x < 116) {
      obstacles[0].vel.x = 0.7;
      obstacles[1].vel.x = -0.7;
      platforms[3].vel.y = -0.5;
      platforms[3].rotationSpeed = 0.3;
      platforms[4].vel.y = 0.5;
      obstacles[2].vel.x = 5;
    } else if (obstacles[0].x > 188) {
      obstacles[0].vel.x = -0.7;
      obstacles[1].vel.x = 0.7;
      platforms[3].vel.y = 0.5;
      platforms[3].rotationSpeed = -0.6;
      platforms[4].vel.y = -0.5;
      obstacles[2].vel.x = -5;
    }
  }
  if (screen == 5 && !nextLevelText) {
    if (obstacles[18].y < 251) {
      obstacles[18].vel.y = 1;
      obstacles[19].vel.x = 1;
    } else if (obstacles[18].y > 295) {
      obstacles[18].vel.y = -1;
      obstacles[19].vel.x = -1;
    }
    let newX = 45 * cos(angle);
    let newY = 45 * sin(angle);
    obstacles[16].pos = { x: 175 + newX, y: 175 + newY };
    obstacles[17].pos = { x: 325 - newX, y: 135 + newY };
    angle = angle + 2;
  }

  if (screen > 0) {

    if (screen != 6) {
      background(backgroundColors[screen - 1]);
      //Draw score to screen
      textSize(18);
      textFont(newSpiritFont);
      if (nextLevelText) {
        text('Health collected: 9/9', 25, 38);
      } else {
        text('Health collected: ' + score + '/9', 25, 38);
      }
      textSize(16);
      text('Level: ' + screen + '/5', 25, 65);
      textFont("Arial");
    }

    //Move player
    if (kb.presses("up") && (player.colliding(platforms) || player.colliding(ground))) {
      player.vel.y = -6;
    }
    if (kb.pressing("left")) {
      player.vel.x = -3;
    } else if (kb.pressing("right")) {
      player.vel.x = 3;
    } else {
      player.vel.x = 0;
    }

    //Stop player from moving off screen
    if (player.x < 10) {
      player.x = 10;
    }
    if (player.y < 10 && !collisionTextVisible && screen != 6) {
      player.y = 10;
    }

    //Collide with monster and restart
    if (player.collides(obstacles)) {
      world.gravity.y = 0;
      player.y = -500;
      collisionTextVisible = true;
      setTimeout(reset, 2000);
    }
    if (collisionTextVisible) {
      textFont(newSpiritFont);
      textSize(17);
      text('Start again! You hit an obstacle.', 25, 95);
      textFont("Arial");
    }

    //Set camera to follow player
    camera.x = player.x + 102;
    ground.x = camera.x;

    //Display text if player finishes level
    if (nextLevelText && screen != 5) {
      textFont(newSpiritFont);
      textSize(17);
      text('You passed this level. ' + (5 - screen) + " more to go!", 25, 105);
      textFont("Arial");
    }
  }
  if (screen == 6) {
    if (replayButton.mouse.presses()) {
      showHomeScreen();
      textFont(newSpiritFont);
      playButton.pos = { x: 120, y: 305 };
      playButtonText.pos = { x: 120, y: 302 };
      screen = 0;
      angle = 0;
    }
  }
}

/* FUNCTIONS */
function showHomeScreen() {
  noStroke();
  for (let i = 0; i < 40; i++) {
    fill(235 - i, i + 195, 234);
    rect(0, i * 10, 400, 10);
  }
  textAlign(CENTER);

  //Home Title
  fill('#1b1b1b');
  textFont(winkleFont);
  textSize(30);
  text('Vitality  Run', 198, 87);

  //Home Message
  textFont(newSpiritFont);
  textLeading(22);
  textSize(15);
  text("Find hope by collecting emojis for health and\nwell-being! Use arrow keys to pass 5 levels\nand avoid obstacles. Each level's difficulty is\nbased on its tier in Maslow's hierarchy of needs,\nfrom basic food & water to mental health.", 200, 148);

  //Play button
  playButton.pos = { x: 200, y: 305 };
  playButtonText.pos = { x: 200, y: 302 };
  replayButton.pos = { x: -200, y: -325 };
  replayButtonText.pos = { x: -200, y: -322 };

  //Emojis at bottom
  textFont("Arial");
  textSize(17);
  text("🤕         😨        😔        😊        😎         🤩", 200, 383);
}

//Collecting the emojis 
function collect(player, emoji) {
  emoji.remove();
  score = score + 1;
}

function reset() {
  score = 0;
  if (nextLevelText) {
    screen += 1;
  }
  emojis.removeAll();
  obstacles.removeAll();
  platforms.removeAll();
  screenFunctions[screen - 1]();
  collisionTextVisible = false;
  nextLevelText = false;
}

function showScreen1() {
  world.gravity.y = 10;
  emojis.color = '#C3D8EA';
  platforms.color = '#6495ED';
  obstacles.color = '#C3D8EA';
  textAlign(LEFT);

  playButton.pos = { x: -200, y: -100 };
  playButtonText.pos = { x: -100, y: -100 };

  player.pos = { x: 10, y: 320 };
  ground.pos = { x: 150, y: 380 };
  textFont("Arial");
  player.text = "🤕";
  player.textSize = 35;
  //Create two platforms
  new platforms.Sprite(185, 330, 55, 20);
  new platforms.Sprite(330, 280, 75, 20);
  new platforms.Sprite(165, 185, 125, 20);

  //Create nine emojis
  textSize(28);
  new emojis.Sprite(185, 305, 15); //apple
  new emojis.Sprite(332, 255, 15); //carrot
  new emojis.Sprite(195, 160, 15); //avocado
  textSize(30);
  new emojis.Sprite(495, 338, 15); //meat
  textSize(28);
  new emojis.Sprite(580, 336, 15);
  new emojis.Sprite(663, 336, 15);
  new emojis.Sprite(857, 338, 15);
  textSize(30);
  new emojis.Sprite(920, 338, 15);
  new emojis.Sprite(980, 338, 15);
  emojis.text = (i) => screen1Emojis[i];

  textSize(38);
  new obstacles.Sprite(130, 155, 35);
  new obstacles.Sprite(770, 254, 35);
  obstacles.text = (i) => obstaclesEmojis[i];
}

function showScreen2() {
  world.gravity.y = 10;
  emojis.color = '#F8F3D6';
  platforms.color = '#EADA82';
  obstacles.color = '#F8F3D6';

  player.pos = { x: 10, y: 320 };
  textFont("Arial");
  player.text = "😨";
  player.textSize = 35;

  new platforms.Sprite(135, 310, 150, 30);
  new platforms.Sprite(260, 200, 150, 30);
  new platforms.Sprite(390, 250, 150, 30);
  new platforms.Sprite(830, 290, 150, 25);
  new platforms.Sprite(720, 210, 150, 25);

  //Create nine emojis
  textSize(28);
  new emojis.Sprite(100, 280, 15);
  new emojis.Sprite(260, 170, 15);
  new emojis.Sprite(390, 220, 15);
  new emojis.Sprite(515, 338, 15);
  new emojis.Sprite(605, 338, 15);
  new emojis.Sprite(800, 260, 15);
  textSize(28);
  new emojis.Sprite(850, 260, 15);
  new emojis.Sprite(685, 183, 15);
  new emojis.Sprite(755, 183, 15);
  emojis.text = (i) => screen2Emojis[i];

  textSize(38);
  new obstacles.Sprite(165, 255, 35);
  new obstacles.Sprite(520, 235, 30);
  new obstacles.Sprite(670, 340, 35);
  obstacles.text = (i) => obstaclesEmojis[i + 2];
}

function showScreen3() {
  world.gravity.y = 10;
  emojis.color = '#FFEBEB';
  platforms.color = '#E8B8B8';
  obstacles.color = '#FFEBEB';

  player.pos = { x: 10, y: 320 };
  textFont("Arial");
  player.text = "😔";
  player.textSize = 35;

  //Platforms
  new platforms.Sprite(135, 325, 85, 20); //lowest step
  new platforms.Sprite(75, 255, 85, 20);
  new platforms.Sprite(195, 185, 85, 20);
  new platforms.Sprite(370, 120, 150, 20, 'k'); //long rotating step
  new platforms.Sprite(370, 120, 5, 5); //offset dot
  platforms[3].rotationSpeed = 1;
  platforms[4].color = '#E37383';
  new platforms.Sprite(555, 310, 150, 20); //step after rotating step
  new platforms.Sprite(715, 220, 30, 30); //diamond
  platforms[6].rotation = 65;
  new platforms.Sprite(625, 130, 50, 20); //high step left of diamond
  new platforms.Sprite(865, 180, 100, 20); //step right of diamond

  //Emojis
  textSize(28);
  new emojis.Sprite(160, 290, 15);
  new emojis.Sprite(210, 150, 15);
  new emojis.Sprite(505, 280, 15); //step after rotating step
  new emojis.Sprite(595, 280, 15); //step after rotating step
  new emojis.Sprite(625, 105, 15); //high step to left of diamond
  new emojis.Sprite(865, 155, 15); //high step right of diamond
  new emojis.Sprite(725, 338, 15); //below diamond
  new emojis.Sprite(875, 285, 15);
  new emojis.Sprite(955, 335, 15);
  emojis.text = (i) => screen3Emojis[i];

  textSize(35);
  new obstacles.Sprite(300, 255, 35);
  new obstacles.Sprite(360, 338, 35);
  new obstacles.Sprite(875, 285, 35);
  obstacles.text = (i) => obstaclesEmojis[i + 5];
}

function showScreen4() {
  world.gravity.y = 10;
  emojis.color = '#E1F0E1';
  platforms.color = '#A8C5A8';
  obstacles.color = '#E1F0E1';

  player.pos = { x: 10, y: 320 };
  textFont("Arial");
  player.text = "😊";
  player.textSize = 35;

  new platforms.Sprite(135, 295, 150, 50); //lowest step
  new platforms.Sprite(250, 165, 150, 50);
  new platforms.Sprite(425, 225, 150, 50);
  new platforms.Sprite(675, 285, 50, 20); //rotating
  new platforms.Sprite(805, 215, 50, 20); //going up down
  new platforms.Sprite(885, 135, 50, 20);
  new platforms.Sprite(995, 255, 75, 15); //slanted
  platforms[6].rotation = 35;
  new platforms.Sprite(1170, 185, 155, 15);

  textSize(28);
  new emojis.Sprite(165, 250, 15);
  new emojis.Sprite(305, 120, 15);
  new emojis.Sprite(450, 180, 15); //third initial platform
  new emojis.Sprite(570, 295, 15); //air between initial and rotating
  new emojis.Sprite(675, 150, 15); //air above rotating
  new emojis.Sprite(805, 225, 15); //above going up down
  new emojis.Sprite(885, 110, 15);
  new emojis.Sprite(1135, 165, 15);
  new emojis.Sprite(1205, 165, 15);
  emojis.text = (i) => screen4Emojis[i];

  textSize(30);
  new obstacles.Sprite(115, 250, 30);
  new obstacles.Sprite(280, 120, 30);
  new obstacles.Sprite(525, 338, 30);
  obstacles.text = (i) => obstaclesEmojis[i + 8];
}

function showScreen5() {
  world.gravity.y = 10;
  emojis.color = '#F1EAF8';
  platforms.color = '#C3ADD9';
  obstacles.color = '#F1EAF8';

  player.pos = { x: 10, y: 320 };
  textFont("Arial");
  player.text = "😎";
  player.textSize = 35;//Platforms
  new platforms.Sprite(100, 318, 25, 85); //first vertical column
  new platforms.Sprite(255, 300, 25, 120);
  new platforms.Sprite(410, 282, 25, 155);
  new platforms.Sprite(575, 135, 95, 20); //first rotating
  new platforms.Sprite(725, 215, 85, 20);
  platforms[3].rotationSpeed = -1;
  platforms[3].offset.x = 10;
  platforms[4].rotationSpeed = 1;
  platforms[4].offset.x = 10;
  new platforms.Sprite(885, 195, 33, 'hexagon');
  platforms[5].rotationSpeed = 1;
  platforms[5].offset.x = 10;
  new platforms.Sprite(1055, 185, 65, 15);
  new platforms.Sprite(1235, 150, 88, 15);

  //Create nine emojis
  textSize(26);
  new emojis.Sprite(175, 175, 15);
  new emojis.Sprite(320, 135, 15);
  new emojis.Sprite(595, 135, 15); //on rotating step
  textSize(28);
  new emojis.Sprite(725, 195, 15);
  new emojis.Sprite(865, 150, 15); //on rotating star
  new emojis.Sprite(1105, 335, 15); //goals
  new emojis.Sprite(1230, 338, 15); //star on ground
  new emojis.Sprite(1175, 235, 15); //brain in mid air
  new emojis.Sprite(1210, 125, 15); //books on highest step
  emojis.text = (i) => screen5Emojis[i];

  for (let i = 0; i < 16; i++) {
    new obstacles.Sprite(555 + (i * 25), 338, 75, 'triangle');
    obstacles[i].color = 60;
  }
  textSize(35);
  new obstacles.Sprite(175, 175, 32);
  new obstacles.Sprite(330, 135, 32);
  new obstacles.Sprite(1160, 250, 35);
  new obstacles.Sprite(1235, 120, 35);
  obstacles.text = (i) => (i > 15) ? obstaclesEmojis[i - 4] : "";
}

function showScreen6() {
  background(backgroundColors[5]);
  world.gravity.y = 0;
  player.pos = { x: -200, y: -200 };
  ground.pos = { x: -200, y: -200 };
  textAlign(CENTER);
  textFont(newSpiritFont);
  text("Congrats, you made it to the end!\n\nYou've taken care of your physical &\npsychological needs and found\nhope through your personal health.\n\n(now step away from your screen\nand go outside)", 200, 90);
  replayButton.pos = { x: 120, y: 318 };
  replayButtonText.pos = { x: 120, y: 315 };
}