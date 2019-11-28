//Initializes global variables for speed, maxHP, the hero's turn, and the turn counter.
var speed = 1;
var maxHP = 250;
var heroesTurn;
var turnCounter = 0;
var times = [];
var threeRows = false;
var debugOption;
var log = "";
var bossTime = false;
var bossDefeats = 0;

//Builds the deck called cards
var cards = [];
//Adds cards to the deck
function buildCardsArray() {
  cards.push("0", "1", "2", "3", "3", "4", "4", "5", "5", "5", "6", "6", "6", "8", "8", "8", "8", "10", "10", "10", "10");
  addCards(cards,"12",5);
  addCards(cards,"15",5);
  addCards(cards,"20",6);
  addCards(cards,"25",6);
  addCards(cards,"30",7);
  addCards(cards,"40",7);
  addCards(cards,"50",6);
  addCards(cards,"60",6);
  addCards(cards,"70",5);
  addCards(cards,"75",5);
  addCards(cards,"80",3);
  addCards(cards,"90",3);
  addCards(cards,"100",2);
  addCards(cards,"125",2);
  cards.push("150", "200");
  addCards(cards,"0",10);
  addCards(cards,"+5",5);
  addCards(cards,"+10",6);
  addCards(cards,"+30",5);
  addCards(cards,"+50",2);
  cards.push("+100");
  addCards(cards,"R1",40);
  addCards(cards,"R2",20);
  addCards(cards,"R3",10);
  addCards(cards,"R4",7);
  addCards(cards,"R5",3);
}

//addCards function uses a for loop to add a specific amount of cards to the deck.
function addCards(deck, label, numCards) {
  for (var i = 0; i < numCards; i++)
    deck.push(label);
}

buildCardsArray();
buildCardsArray();
cards.push(maxHP.toString());

//sleep function ensures text doesn't appear all at once when a button is pressed.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//toggles the display of the help section.
function toggleHelp() {
  if (document.getElementById("help").style.display === "block")
    document.getElementById("help").style.display = "none";
  else
    document.getElementById("help").style.display = "block";
}

//toggles the display of the enemydescription section.
function toggleBattleLog() {
  if (document.getElementById("logsection").style.display === "block")
    document.getElementById("logsection").style.display = "none";
  else
    document.getElementById("logsection").style.display = "block";
}

function updateLog(information) {
  log = log.concat(information);
  document.getElementById("log").innerHTML = log;
}

//debug causes the battlefield to appear instantly.
function debug() {
  document.getElementById("welcome").style.display = "none";
  cleanWebpage();
  hero = new Fighter("Doug DeBugger",maxHP);
  machine = new Fighter("Bug DeMuro",maxHP);
  updateLog(hero.name + " vs " + machine.name);
  turnCounter = 0;
  heroesTurn = flipCoin();
  console.log("New Fight");
  document.getElementById("battlefield").style.display = "block";
  document.getElementById("messagebox").style.display = "inline";
  document.getElementById("turns").innerHTML = "TURNS: " + turnCounter;
  cleanBattlefield();
  updateStats();
  showFightButtons();
  showDebugButtons();
  debugOption = true;
}

//setSpeed function adjusts the speed at which messages appear according to the text speed buttons.
function setSpeed(newSpeed) {
  switch(parseInt(newSpeed)) {
    case 1:
      speed = 2;
      break;
    case 2:
      speed = 1.5;
      break;
    case 3:
      speed = 1;
      break;
    case 4:
      speed = 0.75;
      break;
    case 5:
      speed = 0.5;
      break;
    case 6:
      speed = 0.25;
      break;
    case 7:
      speed = 0.125;
      break;
    case 8:
      speed = 0;
      break;
    default:
      console.log("Are you sure you're doing this right?");
  }
  console.log("speed set to " + speed);
}

//The fighter class creates a fighter that plays the game.
class Fighter {
  //Each fighter has a name and an HP stat.
  constructor(name, hp) {
    this.name = name;
    this.hp = hp;
  }

  //Displays the stats onto the healthbar.
  displayStats() {
    return this.name + ": " + this.hp + "/" + maxHP;
  }

  //Pressing the fight button creates a new card from the deck.
  async pullCard(deck, opponent) {
    var card = new Card(getCard(deck),"normal",0,chance());
    if (debugOption)
    {
      if(document.getElementById("healcard").checked)
        card.label = "+" + document.getElementById("healpercent").value;
      else if(document.getElementById("mysterycard").checked)
        card.label = "R" + document.getElementById("mysteryclass").value;
      else if(document.getElementById("normalcard").checked)
        card.label = document.getElementById("normallabel").value.toString();
      if(document.getElementById("miss").checked)
        card.mod = "miss";
      else if(document.getElementById("crit").checked)
        card.mod = "crit";
      else if(document.getElementById("normal").checked)
        card.mod = "normal";
    }
    if (this.name.toLowerCase() === "megumin" || this.name.toLowerCase() === "chuck norris")
      card.label = maxHP.toString();
    card.analyzeCard();
    cleanBattlefield();
    var cardMessage = this.name + " pulls out ";
    if (card.cardType === "heal")
      cardMessage = cardMessage.concat("a heal card that says +" + card.value + ".");
    else if (card.cardType === "mystery")
      cardMessage = cardMessage.concat("a Class " + card.label.substring(1) + " mystery card.");
    else if (parseInt(card.label) >= maxHP)
      cardMessage = cardMessage.concat("an INFINITY card!!!");
    else if (card.label.startsWith("8"))
      cardMessage = cardMessage.concat("an " + card.label + " card.");
    else
      cardMessage = cardMessage.concat("a " + card.label + " card.");
    updateLog("<br><br>Turn " + turnCounter.toString() + ": " + cardMessage);
    document.getElementById("battleline4").innerHTML = cardMessage;
    times.push(new Date());
    if (this.name.toLowerCase() === "megumin")
    {
      await sleep(2000 * speed);
      var chant = this.name + " chants some weird phrases.";
      document.getElementById("battleline5").innerHTML = chant;

      await sleep(3000 * speed);
      chant = chant.concat("</p><p>She keeps chanting.");
      document.getElementById("battleline5").innerHTML = chant;

      await sleep(3000 * speed);
      chant = chant.concat("</p><p>Her chanting become intense!");
      document.getElementById("battleline5").innerHTML = chant;

      await sleep(3000 * speed);
      chant = chant.concat("</p><p>" + this.name + ": EXPLOSION!");
      document.getElementById("battleline5").innerHTML = chant;
    }
    await sleep(2000 * speed);
    if (card.cardType === "heal")
      card.heal(this);
    else
      card.attack(opponent);
    if(threeRows)
      await sleep(1000 * speed);
    if(parseInt(card.label) >= maxHP && card.mod !== "miss" && window.innerWidth > 812)
      await sleep(38500);
    updateLog("<br>" + hero.displayStats());
    updateLog("<br>" + machine.displayStats());
    await sleep(2000 * speed);
    pushTime("Game Over or Show Fight Buttons");
    if (opponent.hp === 0 || this.hp === 0 || turnCounter === 50)
      gameOver(parseInt(card.label) >= maxHP);
    else if (document.getElementById("autofight").checked)
      fight();
    else
      showFightButtons();
  }
}

class Card {
  constructor(label, cardType, value, mod) {
    this.label = label;
    this.cardType = cardType;
    this.value = value;
    this.mod = mod;
  }

  //The card's label is analyzed to determine the card type and the value.
  analyzeCard() {
    //All cards starting with "+" are heal cards.
    if (this.label.startsWith("+"))
    {
      this.cardType = "heal";
      //The heal card's value is determined by its label and the maximum HP.
      this.value = Math.floor(parseInt(this.label.substring(1)) * maxHP / 100);
    }
    //All cards starting with R are mystery cards, with R standing for random.
    else if (this.label.startsWith("R"))
    {
      this.cardType = "mystery";
      this.value = processValue(this.label);
    }
    else
    {
      this.cardType = "normal";
      this.value = parseInt(this.label);
    }
  }

  async heal(fighter) {
    threeRows = false;
    //Prints cards stats to the console.
    console.log(this.label + " " + this.value + " heal " + this.mod);
    //Returns nothing if the card misses.
    if (this.mod === "miss" || this.value < 0)
    {
      document.getElementById("battleline5").innerHTML = "The card crumbles to millions of pieces and failed to heal.";
      updateLog("<br>" + document.getElementById("battleline5").innerHTML);
    }
    else
    {
      //Adjusts the healing value if the value and the fighter's HP exceeds the maximum HP.
      if (this.value + fighter.hp > maxHP && fighter.hp <= maxHP)
        this.value = maxHP - fighter.hp;
      //This heals the fighter.
      fighter.hp = fighter.hp + this.value;
      document.getElementById("battleline5").innerHTML = fighter.name + " restored its health by " + this.value + "HP.";
      updateLog("<br>" + document.getElementById("battleline5").innerHTML);
      pushTime("Heal Self");
      updateStats();
      if (this.value === 0)
      {
        await sleep(1000 * speed);
        document.getElementById("battleline6").innerHTML = fighter.name + " wasted a turn.";
        threeRows = true;
        updateLog("<br>" + document.getElementById("battleline6").innerHTML);
        pushTime("Notify Wasted Turn");
      }
    }
  }

  async attack(opponent) {
    threeRows = false;
    console.log(this.label + " " + this.value + " " + this.cardType + " " + this.mod);
    if (opponent.name.toLowerCase() === "god" && this.value >= maxHP)
    {
      document.getElementById("battleline6").innerHTML = "The card vanishes in the presence of " + opponent.name + ".";
      updateLog("<br>" + document.getElementById("battleline6").innerHTML);
    }
    //Returns nothing if the card misses.
    else if (this.mod === "miss" || this.value < 0)
    {
      document.getElementById("battleline5").innerHTML = "The card crumbles to millions of pieces and did no damage.";
      updateLog("<br>" + document.getElementById("battleline5").innerHTML);
      if (this.cardType === "mystery")
      {
        await sleep(1000 * speed);
        document.getElementById("battleline6").innerHTML = "It would have hit for " + this.value + " damage.";
        threeRows = true;
        updateLog("<br>" + document.getElementById("battleline6").innerHTML);
        pushTime("Notify Mystery Value");
      }
    }
    else 
    {
      //The crit variable adds extra damage to the card if the card lands a critical hit.
      var crit = this.crit();
      if (this.mod === "crit")
        await sleep(1000 * speed);
      var damage = this.value + crit;
      var damageMessage = "";
      if(parseInt(this.label) >= maxHP)
      {
        damageMessage = damageMessage.concat("The card NUKES " + opponent.name + " for infinite damage!!!");
        opponent.hp = 0;
        updateStats();
        if (window.innerWidth > 812)
        {
          document.getElementById("nuke").style.display = "inline";
          document.getElementById("nuke").className = "visible";
          document.getElementById("nuke").play();
          await sleep(37500);
          document.getElementById("nuke").className = "fade";
          await sleep(1000);
          document.getElementById("nuke").style.display = "none";
        }
      }
      else if(damage >= 150)
        damageMessage = damageMessage.concat("The card devastates " + opponent.name + " for " + damage + " damage!");
      else if(damage >= 100)
        damageMessage = damageMessage.concat("The card blows " + opponent.name + " away for " + damage + " damage!");
      else if(damage >= 50)
        damageMessage = damageMessage.concat("The card strikes " + opponent.name + " hard for " + damage + " damage!");
      else if(damage >= 10)
        damageMessage = damageMessage.concat("The card hits " + opponent.name + " for " + damage + " damage!");
      else if(damage > 0)
        damageMessage = damageMessage.concat("The card hits " + opponent.name + " for only " + damage + " damage.");
      else
        damageMessage = damageMessage.concat("The card didn't do anything. Lame.");
      document.getElementById("battleline6").innerHTML = damageMessage;
      updateLog("<br>" + damageMessage);
      if (damage >= opponent.hp)
        opponent.hp = 0;
      else
        opponent.hp = opponent.hp - damage;
      updateStats();
    }
    pushTime("Attack opponent");
  }

  //The value of crit is obtained by taking the value of the card and multiplying it by 0.5.
  crit() {
    var critValue = 0;
    //If the card doesn't land a crit, return 0.
    if (this.mod !== "crit" || this.cardType === "heal")
      return critValue;
    document.getElementById("battleline5").innerHTML = "A critical hit!";
    updateLog("<br>A critical hit!");
    pushTime("Notify crit");
    threeRows = true;
    critValue = Math.ceil(this.value * 0.5);
    return critValue;
  }

  critical() {
    var critValue = 0;
    //If the card doesn't land a crit, return 0.
    if (this.mod !== "crit" || this.cardType === "heal")
      return critValue;
    critValue = Math.ceil(this.value * 0.5);
    return critValue;
  }
}

class Boss extends Fighter {
  async pullCard(deck, opponent) {
    var card1 = new Card(getCard(deck),"normal",0,chance());
    card1.analyzeCard();
    console.log(card1.critical());
    var valA = card1.value + card1.critical();
    if (card1.cardType === "heal" && valA + this.hp > maxHP)
      valA = maxHP - this.hp;
    var card2 = new Card(getCard(deck),"normal",0,card1.mod);
    card2.analyzeCard();
    var valB = card2.value + card2.critical();
    if (card2.cardType === "heal" && valB + this.hp > maxHP)
      valB = maxHP - this.hp;
    console.log('Card A: ' + card1.label + ' ' + valA.toString());
    console.log('Card B: ' + card2.label + ' ' + valB.toString());
    if (valA < valB || card1.cardType === "heal" && valB >= opponent.hp || card2.cardType === "heal" && valA < opponent.hp && valB > this.hp)
    {
      var card = card2;
      console.log("Card B is chosen.");
    }
    else
    {
      var card = card1;
      console.log("Card A is chosen.");
    }
    if (debugOption)
    {
      if(document.getElementById("healcard").checked)
        card.label = "+" + document.getElementById("healpercent").value;
      else if(document.getElementById("mysterycard").checked)
        card.label = "R" + document.getElementById("mysteryclass").value;
      else if(document.getElementById("normalcard").checked)
        card.label = document.getElementById("normallabel").value.toString();
      if(document.getElementById("miss").checked)
        card.mod = "miss";
      else if(document.getElementById("crit").checked)
        card.mod = "crit";
      else if(document.getElementById("normal").checked)
        card.mod = "normal";
      card.analyzeCard();
    }
    
    cleanBattlefield();
    var cardMessage = this.name + " pulls out ";
    if (card.cardType === "heal")
      cardMessage = cardMessage.concat("a heal card that says +" + card.value + ".");
    else if (card.cardType === "mystery")
      cardMessage = cardMessage.concat("a Class " + card.label.substring(1) + " mystery card.");
    else if (parseInt(card.label) >= maxHP)
      cardMessage = cardMessage.concat("an INFINITY card!!!");
    else if (card.label.startsWith("8"))
      cardMessage = cardMessage.concat("an " + card.label + " card.");
    else
      cardMessage = cardMessage.concat("a " + card.label + " card.");
    updateLog("<br><br>Turn " + turnCounter.toString() + ": " + cardMessage);
    document.getElementById("battleline4").innerHTML = cardMessage;
    times.push(new Date());
    await sleep(2000 * speed);
    if (card.cardType === "heal")
      card.heal(this);
    else
      card.attack(opponent);
    if(threeRows)
      await sleep(1000 * speed);
    updateLog("<br>" + hero.displayStats());
    updateLog("<br>" + machine.displayStats());
    await sleep(2000 * speed);
    pushTime("Game Over or Show Fight Buttons");
    if (opponent.hp === 0 || this.hp === 0 || turnCounter === 50)
      gameOver(parseInt(card.label) >= maxHP);
    else if (document.getElementById("autofight").checked)
      fight();
    else
      showFightButtons();
  }
}

//Gets a random card from the deck array. Unlike a deck, the cards aren't removed from the array once they're obtained.
function getCard(deck) {
  var cardIndex = Math.floor(Math.random() * deck.length);
  return deck[cardIndex];
}

//Determines by chance if a card will land a critical hit or miss.
function chance() {
  var luck = Math.floor(Math.random() * 20);
  if (luck === 0)
    return "miss";
  else if (luck === 19)
    return "crit";
  else
    return "normal";
}

//The value of mystery cards are calculated with this function.
function processValue(rCard) {
  possibleValues = [];
  //An array of 10 possible values are printed.
  for(var i = 0; i < 10; i++)
    possibleValues.push(Math.floor(Math.random() * 251));
  //The array is sorted.
  possibleValues.sort(function(a, b){return a - b});
  console.log(possibleValues);
  //These statements determine which value of the array will be returned depending on the mystery card's label.
  if (rCard === "R1")
    return possibleValues[0];
  else if (rCard === "R2")
    return possibleValues[1];
  else if (rCard === "R3")
    return possibleValues[2];
  else if (rCard === "R4")
    return possibleValues[3];
  else if (rCard === "R5")
    return possibleValues[4];
  return 0;
}

function cleanBattlefield() {
  document.getElementById("battleline4").innerHTML = "";
  document.getElementById("battleline5").innerHTML = "";
  document.getElementById("battleline6").innerHTML = "";
  document.getElementById("battlelinelast").innerHTML = "";
}

function showFightButtons() {
  document.getElementById("fight").style.display = "block";
  if (heroesTurn)
  {
    document.getElementById("battlelinelast").innerHTML = "What will " + hero.name + " do?";
    if (bossTime)
      document.getElementById("quit").style.display = "none";
    else
      document.getElementById("quit").style.display = "inline";
  }
  else
  {
    document.getElementById("battlelinelast").innerHTML = "It's " + machine.name + "'s turn. Press fight to continue.";
    document.getElementById("quit").style.display = "none";
  }
}

function showDebugButtons() {
  document.getElementById("debug").style.display = "inline";
  showDebug();
}

function debugBoss() {
  bossDefeats = 0;
  if (bossTime === false)
  {
    bossTime = true;
    cleanWebpage();
    hero = new Fighter("Doug DeBugger",maxHP);
    machine = new Boss("Bug DeMuro",maxHP);
    updateLog(hero.name + " vs " + machine.name);
    turnCounter = 0;
    heroesTurn = flipCoin();
    console.log("New Fight");
    document.getElementById("battlefield").style.display = "block";
    document.getElementById("messagebox").style.display = "inline";
    document.getElementById("turns").innerHTML = "TURNS: " + turnCounter;
    cleanBattlefield();
    updateStats();
    showFightButtons();
    showDebugButtons();
  }
  else
  {
    bossTime = false;
    debug();
  }
}

function showDebug() {
  document.getElementById("heal").style.display = "none";
  document.getElementById("mystery").style.display = "none";
  document.getElementById("normie").style.display = "none";
  if (document.getElementById("healcard").checked)
  {
    document.getElementById("heal").style.display = "inline";
    adjustHealValue();
  }
  else if (document.getElementById("mysterycard").checked)
    document.getElementById("mystery").style.display = "inline";
  else if (document.getElementById("normalcard").checked)
    document.getElementById("normie").style.display = "inline";
}

function adjustHealValue() {
  var input = document.getElementById("healpercent");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("healpercent").click();
    }
  });
  document.getElementById("healvalue").innerHTML = Math.floor(document.getElementById("healpercent").value * maxHP / 100);
}

function setHPtoOne() {
  hero.hp = 1;
  machine.hp = 1;
  updateStats();
}

function setTurnsTo49() {
  turnCounter = 49;
  document.getElementById("turns").innerHTML = "TURNS: " + turnCounter;
}

function switchSides() {
  heroesTurn = !heroesTurn;
  showFightButtons();
}

//Hides and clears elements on the webpage to keep things tidy when a new game is started.
function cleanWebpage() {
  document.getElementById("debug").style.display = "none";
  document.getElementById("battlefield").style.display = "none";
  document.getElementById("messagebox").style.display = "none";
  document.getElementById("end").style.display = "none";
  document.getElementById("pressF").style.display = "none";
  document.getElementById("finalmessage").innerHTML = "";
  document.getElementById("finalmessage2").innerHTML = "";
  document.getElementById("finalmessage3").innerHTML = "";
  document.getElementById("finalmessage4").innerHTML = "";
  document.getElementById("secondfight").style.display = "none";
  document.getElementById("playagain").style.display = "none";
  document.getElementById("changename").style.display = "none";
  document.getElementById("firstMessage").innerHTML = "";
  document.getElementById("secondMessage").innerHTML = "";
  document.getElementById("bossalert").innerHTML = "";
  document.getElementById("continue").style.display = "none";
  document.getElementById("coinflip").innerHTML = "";
  log = "";
  document.getElementById("log").innerHTML = "";
}

function pushTime(event) {
  times.push(new Date());
  console.log(event + ": " + (times[times.length - 1] - times[times.length - 2]).toString())
}

//Shows the name text field.
function showWelcome() {
  cleanWebpage();
  document.getElementById("welcome").style.display = "block";
  var input = document.getElementById("fighterName");
  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      showOpponent();
    }
  });
}

//Shows the opponent and the elements that come with it.
async function showOpponent() {
  debugOption = false;
  bossTime = false;
  //Gets name from text field.
  var name = document.getElementById("fighterName").value;
  if (name === '')
    name = "No Name";
  //Constructs the hero object.
  hero = new Fighter(name,maxHP);
  if (hero.name.toLowerCase() === "chuck norris" || hero.name.toLowerCase() === "god")
    hero.hp = 9999;
  //Hides the name input element.
  document.getElementById("welcome").style.display = "none";
  cleanWebpage();
  //Shows the opponent introduction element.
  document.getElementById("opponent").style.display = "block";
  //The wepage prepares the hero to meet their opponent.
  document.getElementById("firstMessage").innerHTML = name + ", prepare to meet your opponent.";
  times.push(new Date());
  await sleep(2000 * speed);
  if(Math.floor(Math.random() * 10) === 0)
  {
    bossTime = true;
    bossDefeats = 0;
  }
  generateOpponent();
}

//The name of the opponent always starts with Anonymous and ends with a random 4 digit number.
async function generateOpponent() {
  var firstName = ["Gamer", "Crazy", "Lewd", "Gangsta", "Crude", "Obscene", "Scary", "Violent", "Gay", "Angry", "Wicked", "R-Rated", "Mad", "Fighting", "Funny", "Vulgar", "Notorious", "Toxic", "Chaotic", "Diabolical", "Evil", "Weird", "Sexy", "Insane", "Anonymous"];
  var lastName = ["Troll", "Yuri Fan", "Monster", "Cancer", "Edgelord", "Criminal", "Antichrist", "Psychopath", "Killer", "Villainess", "Outlaw", "Pessimist", "Scumbag", "Nazi", "Freak", "Maniac", "Villain", "Pervert", "Delinquent", "Otaku", "Dude", "Degenerate", "Sinner", "Lunatic", "Hacker"];
  var bossFirstName = ["Extreme", "Hardcore", "Sadistic", "Ultimate", "Ultra", "Uber", "Super", "Hyper", "Great", "King", "Admin", "Master", "Grand", "Mega", "Strong", "Tyrant"];
  var bossLastName = ["Boss", "Gangsta", "Troll", "Yuri Fan", "Monster", "Cancer", "Edgelord", "Criminal", "Antichrist", "Psychopath", "Killer", "Villainess", "Outlaw", "Pessimist", "Scumbag", "Nazi", "Freak", "Maniac", "Villain", "Pervert", "Delinquent", "Otaku", "Dude", "Degenerate", "Sinner", "Lunatic", "Hacker"];
  if (bossTime)
  {
    document.getElementById("secondMessage").innerHTML = "";
    document.getElementById("bossalert").className = "active";
    document.getElementById("bossalert").innerHTML = "BOSS STAGE";
    await sleep(1000 * speed);
    var number = Math.floor(Math.random() * bossFirstName.length * bossLastName.length);
    var name = bossFirstName[Math.floor(number / bossLastName.length)] + " " + bossLastName[number % bossLastName.length];
  }
  else
  {
    document.getElementById("bossalert").className = "inactive";
    var number = Math.floor(Math.random() * firstName.length * lastName.length);
    var name = firstName[Math.floor(number / lastName.length)] + " " + lastName[number % lastName.length];
  }
  if (name === "Gangsta Yuri Fan")
    name = "Eminem Fan";
  if (name === "Gay Villainess")
    name = "Lesbian Villainess";
  if (name === "Sexy Cancer")
    name = "Disgusting Cancer";
  if (name === "King Nazi")
    name = "Der Führer";
  if (bossTime)
    machine = new Boss(name,maxHP);
  else
    machine = new Fighter(name,maxHP);
  updateLog(hero.name + " vs " + machine.name);
  document.getElementById("secondMessage").innerHTML = "Your opponent is " + name + ".";
  pushTime("Generate opponent");
  await sleep(1000 * speed);
  if (document.getElementById("autofight").checked)
    beginFight();
  else
    document.getElementById("continue").style.display = "block";
  pushTime("Display continue button");
}

async function beginFight() {
  times.push(new Date());
  turnCounter = 0;
  document.getElementById("continue").style.display = "none";
  await sleep(2000 * speed);
  if (flipCoin())
  {
    document.getElementById("coinflip").innerHTML = hero.name + " goes first.";
    heroesTurn = true;
  }
  else
  {
    document.getElementById("coinflip").innerHTML = machine.name + " goes first.";
    heroesTurn = false;
  }
  pushTime("Flip a coin");
  await sleep(2000 * speed);
  console.log("New Fight");
  cleanBattlefield();
  document.getElementById("battlefield").style.display = "block";
  document.getElementById("messagebox").style.display = "inline";
  document.getElementById("opponent").style.display = "none";
  document.getElementById("turns").innerHTML = "TURNS: " + turnCounter;
  updateStats();
  if (document.getElementById("autofight").checked)
    fight();
  else
    showFightButtons();
  pushTime("Display the battlefield");
}

function flipCoin() {
  var coin = Math.floor(Math.random() * 2);
  if (coin === 0)
    return true;
  else
    return false;
}

function updateStats() {
  //Changes the displayed HP value of hero
  document.getElementById("herostats").innerHTML = hero.displayStats();
  if (hero.hp > window.innerWidth)
    document.getElementById("hero").style.width = "100%";
  else
    document.getElementById("hero").style.width = hero.hp + "px";
  //Changes the color of the hero's HP bar
  if (hero.hp > maxHP / 2)
    changeBarColor("hero","#006600");
  else if (hero.hp > maxHP / 10 * 3)
    changeBarColor("hero","#666600");
  else if (hero.hp > maxHP / 5)
    changeBarColor("hero","#663300");
  else
    changeBarColor("hero","#660000");
  //Changes the displayed HP value of opponent
  document.getElementById("machinestats").innerHTML = machine.displayStats();
  document.getElementById("machine").style.width = machine.hp + "px";
  //Changes the color of the hero's HP bar
  if (machine.hp > maxHP / 2)
    changeBarColor("machine","#006600");
  else if (machine.hp > maxHP / 10 * 3)
    changeBarColor("machine","#666600");
  else if (machine.hp > maxHP / 5)
    changeBarColor("machine","#663300");
  else
    changeBarColor("machine","#660000");
}

function changeBarColor(fighter,color) {
  document.getElementById(fighter).style.backgroundColor = color;
}

async function fight() {
  turnCounter++;
  document.getElementById("turns").innerHTML = "TURNS: " + turnCounter;
  document.getElementById("fight").style.display = "none";
  if (heroesTurn)
  {
    hero.pullCard(cards,machine);
    heroesTurn = false;
  }
  else
  {
    machine.pullCard(cards,hero);
    heroesTurn = true;
  }
}

function fight2() {
  document.getElementById("end").style.display = "none";
  document.getElementById("finalmessage").innerHTML = "";
  document.getElementById("finalmessage2").innerHTML = "";
  document.getElementById("finalmessage3").innerHTML = "";
  document.getElementById("finalmessage4").innerHTML = "";
  document.getElementById("secondfight").style.display = "none";
  fight();
}

async function gameOver(nuked)
{
  times.push(new Date());
  document.getElementById("fight").style.display = "none";
  document.getElementById("end").style.display = "inline";
  if (hero.hp === 0)
  {
    if (bossTime && bossDefeats === 0 && !nuked)
    {
      document.getElementById("finalmessage").innerHTML = firstDefeatMessage(hero.name, machine.name);
      await sleep(2000 * speed);
      document.getElementById("finalmessage2").innerHTML = "But wait!";
      await sleep(1000 * speed);
      document.getElementById("finalmessage3").innerHTML = secondChanceMessage(hero.name, machine.name);
      await sleep(2000 * speed);
      document.getElementById("finalmessage4").innerHTML = "Everyone's HP is restored, and " + hero.name + " goes next.";
      hero.hp = maxHP;
      machine.hp = maxHP;
      updateStats();
      document.getElementById("secondfight").style.display = "inline";
    }
    else
      document.getElementById("finalmessage").innerHTML = defeatMessage(hero.name, machine.name);
  }
  else if (machine.hp === 0)
  {
    if (bossTime)
    {
      document.getElementById("finalmessage").innerHTML = "Congratulations, " + hero.name + "! You defeated a mighty boss!";
      await sleep(2000 * speed);
    }
    document.getElementById("finalmessage2").innerHTML = victoryMessage(hero.name, machine.name);
    if (hero.name.toLowerCase() === "megumin")
    {
      await sleep(2000 * speed);
      document.getElementById("finalmessage3").innerHTML = "But " + hero.name + " fell down!";
      pushTime("Megumin falls down after victory");
    }
  }
  else
  {
    document.getElementById("finalmessage").innerHTML = "This battle is already getting too long.";
    await sleep(2000 * speed);
    document.getElementById("finalmessage2").innerHTML = "The battle is over, and there are no winners.";
    pushTime("Second 50 turn message displayed");
  }
  if (document.getElementById("finalmessage").innerHTML.startsWith("Press F"))
  {
    document.getElementById("pressF").style.display = "inline-block";
    var input = document.getElementById("pressF");
    window.addEventListener("keyup", async function(event) 
    {
      if (event.keyCode === 70 || input.value.toLowerCase() === "f") 
      {
        event.preventDefault();
        await sleep(2000 * speed);
        document.getElementById("playagain").style.display = "inline";
        pushTime("Play again is shown");
      }
    });
  }
  else if (!bossTime || bossDefeats !== 0 || machine.hp === 0 || nuked)
  {
    await sleep(2000 * speed);
    document.getElementById("playagain").style.display = "inline";
    pushTime("Play again is shown");
  }
  else
    bossDefeats = 1;
}

async function quit() {
  if (heroesTurn && !bossTime)
  {
    times.push(new Date());
    document.getElementById("fight").style.display = "none";
    document.getElementById("end").style.display = "inline";
    document.getElementById("finalmessage").innerHTML = quitMessage(hero.name, hero.hp, machine.name);
    if (turnCounter < 2)
      document.getElementById("finalmessage2").innerHTML = "Why give up so soon?";
    else if (hero.hp === maxHP)
      document.getElementById("finalmessage2").innerHTML = "Oh, and " + hero.name + " came out completely unscathed.";
    await sleep(2000 * speed);
    document.getElementById("playagain").style.display = "inline";
    pushTime("Play again is shown");
  }
  else
    console.log("There is no quittng when it's the opponent's turn or when there's a boss.");
}

function firstDefeatMessage(name, othername) {
  var messages = [name + " failed.",
    "Epic fail for " + name + ".",
    name + " fainted.",
    othername + " pwned " + name + "!",
    othername + " rekt " + name + "!",
    othername + " blasts music to celebrate their victory!",
    "K.O!",
    "Well… that sucks…",
    "WASTED",
    "Sorry, " + name + "! You lost.",
    othername + " defeated " + name + "!"];
    message = Math.floor(Math.random() * messages.length);
    return messages[message];
}

function secondChanceMessage(name, othername) {
  var messages = [othername + " wants to defeat you a second time!",
    othername + " gives " + name + " a second chance!",
    othername + " would like to fight again!",
    "The rules say that when there's a boss fight, there must be a Round 2!",
    "The boss battle moves on to Round 2!",
    othername + " is forced to fight against " + name + " again for being a boss!",
    othername + " offers " + name + " a second chance to win!",
    "There's a second chance built in, and " + othername + " is shocked!",
    "You thought this boss battle was over? It's not!"];
    message = Math.floor(Math.random() * messages.length);
    return messages[message];
}

function defeatMessage(name, othername) {
  var messages = [name + " died.",
    othername + " killed " + name + "!",
    "Press F to pay respects to " + name + ".",
    name + " failed.",
    name + " gave up the ghost.",
    name + " went to the afterlife.",
    name + " was rushed to the hospital.",
    name + " passed away.",
    name + " bit the dust.",
    "Epic fail for " + name + ".",
    name + " expired.",
    name + " fainted.",
    othername + " will not be attending " + name + "'s funeral.",
    name + " flatlined.",
    othername + " pwned " + name + "!",
    othername + " rekt " + name + "!",
    othername + " blasts music to celebrate their victory!",
    "K.O!",
    "Well… that sucks…",
    "R.I.P. " + name,
    "WASTED",
    "Sorry, " + name + "! You lost.",
    othername + " destroyed " + name + "!",
    othername + " defeated " + name + "!"];
    message = Math.floor(Math.random() * messages.length);
    if (name.toLowerCase() === "kenny")
      document.getElementById("finalmessage2").innerHTML = othername + ", you bastard!";
    return messages[message];
}

function victoryMessage(name, othername) {
  messages = [name + " has won the game!",
      name + " stands victorious!",
      name + " does a victory dance!",
      "Cue the victory fanfare!",
      name + " pwned " + othername + "!",
      name + " rekt " + othername + "!",
      "Congratulations, " + name + "!",
      name + " pulled off an impressive victory!",
      "Epic win for " + name + "!",
      name + " is the winner!",
      name + " triumphs over " + othername + "!",
      "Justice is served to " + othername + "!",
      othername + " is toast.",
      othername + " won't be committing any atrocities anymore.",
      "♪♫Another one bites the dust!♪♫",
      name + " K.O'd " + othername + "!",
      "That was totally awesome!",
      "And the crowd goes wild for " + name + "'s win!",
      othername + " got what they deserved.",
      "Celebrate " + name + "'s win by saying \"Woohoo!\"",
      name + " destroyed " + othername + "!",
      name + " defeated " + othername + "!",
      name + " laughs at the defeat of " + othername + "!",
      name + " sings a victory song!"];
    message = Math.floor(Math.random() * messages.length);
    if (name.toLowerCase() === "teardrop")
      message = Math.floor(Math.random() * (messages.length - 2));
    if (message === 6 && bossTime)
      message = "Good job, " + name + "!";
    return messages[message];
}

function quitMessage(name, hp, othername) {
  var messages = [name + " ragequits.",
    name + " gave up.",
    name + " got away safely.",
    name + " didn't win, because quitters never win.",
    name + " left the battlefield.",
    name + " has decided to quit.",
    name + " is too tired to fight.",
    name + " lost the opportunity to win.",
    name + " made a good decision by not risking death.",
    name + " ran away.",
    "Goodbye, " + name + ".",
    "The fight has ended with no victor.",
    "Nobody dies from the fight.",
    "The crowd boos after " + name + " forefits.",
    "Winners never quit. Think about what you've done.",
    name + " spared " + othername + "'s life.",
    "The hospital and graveyard breathed a sigh of relief.",
    name + " escaped.",
    name + " is not gonna take it anymore.",
    name + " couldn't handle the pressure.",
    name + " was too afraid to continue.",
    name + " just won't keep fighting.",
    name + " got bored of fighting.",
    name + " is sick and tired of getting hit by cards."];
  message = Math.floor(Math.random() * messages.length);
  if (hp === maxHP)
    message = Math.floor(Math.random() * (messages.length-6));
  return messages[message];
}

function showNameChange() {
  document.getElementById("playagain").style.display = "none";
  document.getElementById("changename").style.display = "inline";
}
