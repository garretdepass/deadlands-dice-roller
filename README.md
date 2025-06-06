# Overview

A minimal web app designed to be used with the table top role playing game Deadlands. It does the hard work of character and roll management, so players can focus on the game.

![A looping gif that demonstrates the core functionality of this web app](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/demo.gif "A looping gif that demonstrates the core functionality of this web app")

Want to give it a try? Visit the [staging environment](https://dice-roller-deadlands.netlify.app/). It's currently not built for mobile, so viewing on a computer is best. Mess around with the functionality as much as you like. My players are using the production environment and production database.

### Sections

Different readers care about different things. Here's a few quick links to help you navigate.

🚀 Looking to learn about what this product is?

- [Problem this is solving](#what-problem-is-this-solving)
- [Key features](#key-features)

🤓 Want to dig into the technical details?

- [Tech stack](#tech-stack)
- [Code highlights](#code-highlights)
- [Testing and AI](#testing-and-ai)

🧑‍🎓 Curious about my takeaways?

- [Future roadmap](#future-roadmap)
- [What I learned](#what-i-learned)

<br/>

# What problem is this solving?

I initally started building this for my wife. We have a gaming group that plays [Deadlands](https://en.wikipedia.org/wiki/Deadlands) remotely, and over the last year my wife collected a patchwork of tools to use while playing. She uses Google Sheets to manage her stats, random dice rollers (not designed for the complex mechanics of this specific game), and discord to track things like experience points and fate chips. It was a lot to keep track of.

Virtual tabletop platforms like Roll20, D&D Beyond, or Foundry weren't right either. They were all too expensive, too poorly designed, or suffered from feature bloat. I decided I could build something better for her specific needs.

<br/>

# Tech Stack

**React** - React felt like a great fit for this project. In addition to being lightweight and fast, I'm excited about exploring React Native in the future, and this felt like a good step in that direction.

**Vitest** - I explored using both Jest and Vitest, but given that Vitest fully supports ESM and instant updates, it felt like a better choice for testing.

**MongoDB** - I chose MongoDB (vs something like MySQL) primarily because of the schema-less document model. While character sheets have similar structure, they can vary significantly on details. Some characters may know 5 languages, some may specialize in driving steam wagons. I wanted to create a system that would be friendly to players' characters as they grow and evolve.

**Netlify** - The focus of this project was to get functionality up and running quickly, so I looked into serverless deployment platforms like Netlify and Vercel. I liked that Netlify has built-in authentication, which could make it easier to support player login in the future, and didn't need things like SSR support that Vercel offers. I decided to use a Netlify + MongoDB Atlas starter project to expedite configuration and spend more of my time on feature development.

<br/>

# Key Features

## 🙋 Character selector view

Because each character's stats are different, it's important make sure they're using the correct character.

![The character selector view](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/character-selector.png "The character selector view")

An earlier version of this app had a character selector that was on the top of the character sheet with the first player in the array selected by default. This caused some confusion, because players could select dice and roll them without switching to the correct character. Consequently, I pulled out the character selector to a mandatory first step with its own screen.

Our DM (or "Marshal" in Deadlands) _loves_ keeping track of stats, so this serves the added benefit of giving him the ability to see anyone's stats instantly.

## 📊 Character Sheet

After selecting a character, that character's stats are automatically shown. These are pulled directly from MongoDB, and persist when the page is refreshed.

![The character sheet view, displaying all of this characters stats.](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/character-sheet.png "The character sheet view, displaying all of this characters stats.")

## 🎲 Dice rolling panel

This is the core functionality of this web app. A player can select any rollable stat and the correct number of dice with the correct number of sides will appear. Pressing `Roll Dice` rolls all the dice and scores according to unique Deadlands rules.

![Two instances of the roll panel. One with an ace and one with some score modifiers applied](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/roll-panel.png "Two instances of the roll panel. One with an ace and one with some score modifiers applied")

According to the Player handbook:

> Trait and Aptitude rolls are open-ended. This means if you roll the maximum number on any of your dice, you can roll that die again and add the next roll to that die’s current total. The maximum number on a die is called the “Ace.” You can keep rolling the die and adding it to the running total as long as you keep getting Aces. If you should get Aces on several of your individual dice, you need to keep track of each series of dice rolls separately. When you’re done, the series that got the highest total is the number you should give to the Marshal.

The roll panel also accounts for common modifiers. When a player rolls a stat with zero dice, their roll result receives a -4 modifier, and if a majority of dice are 1's, the player must inform the Marshal they have "gone bust".

## 💰 Bounty points

![Bounty points view, with upgrades ready to purchase](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/bounty-points.png "Bounty points view, with upgrades ready to purchase")
Bounty points are similar to experience points in other systems. They can be spent to upgrade stats, and the cost depends on a number of factors. This can be complicated to figure out, and the players in our group regularly needed reminders from the Marshal, so I calculated and displayed all costs within the app.

I also created a "shopping cart" that shows the remaining bounty points and the upgrades a player wants before they confirm and spend their points. These upgrades can be added or removed, and a notification appears if players try to spend more points than they have.

<br/>

# Design Decisions & Tradeoffs

**Web-only**

The players in my group all play remotely on computers over discord, so I opted for a large-screen-only design for the first iteration. In the future, I may explore design solutions that support mobile views. It could be useful to have the roller on a second smaller screen to enable the player to primarily focus on the video call. For the MVP, the use case didn't justify the effort.

**Netlify + MongoDB Atlas**

The primary focus of this project was to build react code that functioned within a working tech stack. Consequently, I biased for more pre-configured technology to support my efforts. Using Netlify and MongoDB Atlas in a starter project allowed me to get to working on core app functionality much faster than I would have been able to if I'd opted for putting together my own server and using a self-hosted instance of MongoDB.

The biggest tradeoff here is that I very much learn by doing, so I wasn't able to experience building the full stack here. I was certainly exposed to some necessary configuration, and I got to learn about MongoDB, but I didn't get the deep understanding that comes with building the infrastructure from scratch. In a future project, I'd like to spin up my own server to really get a sense of what that part of the process is like.

**Minimal UI design phase**

I also deprioritized a deep dive into the UI design up front. I did enough in figma to feel like I had a strong understanding of the basic layout and functionality, but I knew that complications would reveal themselves during the build that were not apparent to me in the design phase. This path proved valid, and got me to coding faster. It also allowed me to learn more about how the logic needed to work than I could have in Figma.

Of course, the tradeoff is that there's overall less visual polish than I'd like. Visual polish has a subconscious impact on overall perceived quality. While it's okay to deprioritize this for early product work, getting things looking sharp is important as the product matures. I've put a full design pass into my future roadmap below.

**Passing too many states between nested components**

Several different components are speaking to each other in this app. When I started, just the character sheet and roll panel needed to communicate, so this was a fine pattern. It was fast, simple, and added minimal complexity given the scope of the codebase at the time. However, when I added additional functionality, I found myself passing states up and down multiple layers of nested components.

While this is working, it's not the most elegant or maintainable. Before adding any additional functionality, I'd like to refactor this pattern and apply contexts to eliminate the need to pass states up and down.

# Testing and AI

### Use of AI

**All code in use is written by hand, not copy + pasted.** I can articulate how all parts of the codebase work, though some of the serverless functions are still a little fuzzy since I adapted them from the Netlify starter project. I used ChatGPT occasionally as a pairing partner, but only in so far as to help me get unstuck or provide feedback on my implementation decisions.

### Testing

I initially planned to work fully in TDD, but ran into issues early, trying to configure Vitest. After a couple days trying to get it right, I decided to circle back on writing tests after getting the initial MVP up. I recently got my first tests running and passing. I've added test coverage to my roadmap. Tech debt is best paid off just in time. If I wait longer to add test coverage, It will be more difficult to introduce features without the risk of breaking existing functionality.

<br/>

# Future Roadmap

After I released the MVP, the rest of the group saw what I'd built and asked to be added too. Now we're all using it, and I'm collecting feedback to inform future iterations. My near-term roadmap includes:

1.  Tech debt - add contexts and test coverage.
1.  Fate chip functionality - these have functional impacts on rolls, and can be exchanged for Bounty Points. I'd like to make them fully functional with menus that clearly explain the way chips are used.
1.  A Marshal view - the Marshal can benefit from seeing some things in aggregate, like the total number of fate chips in play.
1.  Equipment tracking - firearms, supplies, artifacts, etc...
1.  Edges and hindrances. These are quirks about player characters that have impacts on gameplay. I'd like to add their modifiers to rolls. Each is unique, and will require its own logic.
1.  Magic mechanics - complicated rules that make use of a shuffled deck of cards to cast spells
1.  Upload, store, and change character images
1.  Players adding new concentrations - useful if a character learns a new language or starts shooting with a new type of gun.
1.  Players create a new character - valuable if a character dies, or if a new player joins the game
1.  Visual polish - I'd like to take a measured visual pass and make the experience feel more refined.

Beyond adding basic functionality, I also think it would be interesting to explore releasing this as a product other gaming groups can use. It feels like there's a niche in this product category that I could fill. Depending on interest, I may explore releasing another similar lightweight dice roller for other game systems with a broader player base.

<br/>

# Code Highlights

## Spending bounty points

When spending bounty points, in order to update a stat in the database, I needed each stat upgrade to reference a specific place in that character's JSON document. I wanted this to be a generic function that could apply regardless of whether the player is updating a Trait, an attribute (which is a child of a trait), or a concentration (which is a child of an attribute).

Within [stat_upgrade_button.js](https://github.com/garretdepass/deadlands-dice-roller/blob/main/src/components/stat_upgrade_button.js), I created a function that returns any stat's index dynamically. I then set the output of that function to a property of an object that is created for any stat the player wants to upgrade. I then added that object to an array that populates the shopping cart.

```javascript
const jsonStatIndex = () => {
  for (
    let traitCounter = 0;
    traitCounter < character.stats.traits.length;
    traitCounter++
  ) {
    const currentTrait = character.stats.traits[traitCounter];
    if (currentTrait.name === stat.name) {
      return `stats.traits.${traitCounter}`;
    } else if (currentTrait.attributes) {
      for (
        let attributeCounter = 0;
        attributeCounter < currentTrait.attributes.length;
        attributeCounter++
      ) {
        const currentAttribute = currentTrait.attributes[attributeCounter];
        if (currentAttribute.name === stat.name) {
          return `stats.traits.${traitCounter}.attributes.${attributeCounter}`;
        } else if (currentAttribute.concentrations && currentAttribute.name) {
          for (
            let concentrationCounter = 0;
            concentrationCounter < currentAttribute.concentrations.length;
            concentrationCounter++
          ) {
            const currentConcentration =
              currentAttribute.concentrations[concentrationCounter];
            if (currentConcentration.name === stat.name) {
              return `stats.traits.${traitCounter}.attributes.${attributeCounter}.concentrations.${concentrationCounter}`;
            }
          }
        }
      }
    }
  }
};

const popover = document.getElementById("insufficientBountPointsPopover");

const handleAttributeOrConcentrationClick = () => {
  const cost = dieCountUpgradeCost();
  if (cost <= remainingBountyPoints) {
    const newUpgrade = {
      cost: dieCountUpgradeCost(),
      stat: stat,
      statType: statType,
      jsonStatIndex: jsonStatIndex(),
      upgradeType: "dieCount",
    };
    setUpgradesArray([...upgradesArray, newUpgrade]);
  } else {
    popover.showPopover();
  }
};
```

## Rolling dice

The way Deadlands handles dice rolling is rather unusual, so the code to handle it was a lot of fun to write! Within [roll_panel.js](https://github.com/garretdepass/deadlands-dice-roller/blob/main/src/components/roll_panel.js), it starts by creating an array of dice to roll based on which stat the player selects. This is used to display the pre-rolled state.

```javascript
const generateDiceArray = (dieCountToRoll, dieSidesToRoll) => {
  setHighestRollResult(null);
  setIsBust(false);
  const dice = [];
  let dieCount = dieCountToRoll;

  if (dieCount === 0) {
    dieCount = 1;
    setIsUnskilled(true);
  } else {
    setIsUnskilled(false);
  }
  for (let i = 0; i < dieCount; i++) {
    dice.push(dieSidesToRoll);
  }
  return dice;
};
```

Then it defines what a rolled value is

```javascript
const returnRolledDieValue = (totalSides) => {
  return Math.ceil(Math.random() * totalSides);
};
```

and rolls dice based on the stat selected by the player. Each roll is added to an array, with any highest possible rolls added to that array (a common term for this in RPGS is exploding dice).

```javascript
const returnRolledDiceArray = (dieCountToRoll, dieSidesToRoll) => {
  let threadCount = 0;
  isUnskilled === true ? (threadCount = 1) : (threadCount = dieCountToRoll);
  const allRolledThreads = [];

  for (let currentThread = 0; currentThread < threadCount; currentThread++) {
    const newThread = [];
    const rollResult = returnRolledDieValue(dieSidesToRoll);
    newThread.push(rollResult);

    if (rollResult === dieSidesToRoll) {
      let isExploding = true;
      while (isExploding === true) {
        const aceRollResult = returnRolledDieValue(dieSidesToRoll);
        newThread.push(aceRollResult);
        if (aceRollResult !== dieSidesToRoll) {
          isExploding = false;
        }
      }
    }
    allRolledThreads.push(newThread);
  }
  return allRolledThreads;
};
```

Then each array is evaluated for which one returned the highest total

```javascript
const findHighestThread = (array) => {
  const allThreadTotals = [];

  array.forEach((thread) => {
    let threadTotal = 0;
    thread.forEach((value, index) => {
      threadTotal += value;
    });
    allThreadTotals.push(threadTotal);
  });

  const highestThread = {};
  highestThread.total = 0;

  allThreadTotals.forEach((value, index) => {
    if (value > highestThread.total) {
      highestThread.total = value;
      highestThread.index = index;
    }
  });
  return highestThread;
};
```

And the roll is evaluated to see if the player went bust

```javascript
const checkForBust = (array) => {
  let totalDice = 0;
  let numberOfOnes = 0;
  array.forEach((thread) => {
    thread.forEach((die) => {
      totalDice++;
      if (thread[0] === 1) {
        numberOfOnes++;
      }
    });
  });
  if (numberOfOnes > Math.floor(totalDice / 2)) {
    setIsBust(true);
  } else {
    setIsBust(false);
  }
};
```

Then for each die, JSX is generated to render the die shapes

```javascript
const returnDie = (thread, isInHighThread) => {
  const die = Array.isArray(thread) ? (
    thread.map((value, valueIndex) => (
      <Die
        key={generateKey()}
        dieSides={dieSidesToRoll}
        dieFace={value}
        isInHighThread={isInHighThread}
      />
    ))
  ) : (
    <Die
      key={generateKey()}
      dieSides={dieSidesToRoll}
      dieFace={thread}
      isInHighThread={isInHighThread}
    />
  );
  return die;
};
```

and each thread is rendered in JSX, with the highest thread getting special styling.

```javascript
const renderDiceThreads = (array, newHighestThread) => {
  const jsx = Array.isArray(array) ? (
    array.map((thread, threadIndex) =>
      newHighestThread.index === threadIndex ? (
        <div key={`thread-${threadIndex}`} className="dice-section__die-thread">
          <div className="dice-section__die-thread-inner dice-section__die-thread-inner_highest">
            {returnDie(thread, true)}
            <div className="dice-section_highest-roll-text">Highest roll</div>
          </div>
        </div>
      ) : (
        <div key={`thread-${threadIndex}`} className="dice-section__die-thread">
          <div className="dice-section__die-thread-inner">
            {returnDie(thread, false)}
          </div>
        </div>
      )
    )
  ) : (
    <div>missing array</div>
  );
  return jsx;
};
```

Finally, it's all pulled together in `handleRollDice`.

```javascript
const handleRollDice = (dieCountToRoll, dieSidesToRoll) => {
  const threads = returnRolledDiceArray(dieCountToRoll, dieSidesToRoll);
  const newHighestThread = findHighestThread(threads);
  let adjustedTotal = newHighestThread.total;
  if (isUnskilled) {
    adjustedTotal -= 4;
  }
  if (adjustedTotal < 0) {
    adjustedTotal = 0;
  }
  setHighestRollResult(adjustedTotal);
  checkForBust(threads);
  setDiceSection(renderDiceThreads(threads, newHighestThread));
};
```

<br/>

# What I Learned

I find code fascinating, and enjoy the process of learning how it works. This project sharpened my skills with react, and gave me a lot of cycles solving different types of problems.

From a workflow perspective, it's been novel as well. Historically, I've both written tickets and worked from tickets, but this was my first time fully designing, PMing, and engineering a project.

### As an engineer

I got to feel what it's like to have acceptance criteria clearly (and sometimes not so clearly) recorded by my PM brain. I got to experience the difference between a well-constructed figma component that let me copy and paste styling, and a not-so-well built component that required me to define styles, name things, and generally figure stuff out on my own. I also got to experience being given a high-complexity story that was high enough priority that it was worth taking extra time to complete.

### As a product manager

I got to feel the impact of engineering communicating feature complexity. Do we cut scope? Do we push through and deliver the value of the feature? What do we deprioritize in order to make room for the most important things? Is there anything we can shave off of this story to make it easier to ship?

### As a designer

I got to experiment with more of a "go fast and do less" approach than I'm used to. I've always strived to put together well-crafted deliverables with engineering in mind but, in a situation where I'm wearing all the hats, deprioritizing this felt like the right tradeoff.
