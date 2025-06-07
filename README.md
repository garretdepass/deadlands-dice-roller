# Overview

A minimal web app designed to be used with the table top role playing game Deadlands. It does the hard work of character and roll management, so players can focus on the game.

![A looping gif that demonstrates the core functionality of this web app](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/demo.gif "A looping gif that demonstrates the core functionality of this web app")

Want to give it a try? Visit the [staging environment](https://dice-roller-deadlands.netlify.app/). It's currently not built for mobile, so viewing on a computer is best. Mess around with the functionality as much as you like. My players are using the production environment and production database.

<br/>

## Sections

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

🤝 Interested in working with me? **Email me at garretdepass@gmail.com**

<br/>
<br/>

# What problem is this solving?

I initally started building this for my wife. We have a gaming group that plays [Deadlands](https://en.wikipedia.org/wiki/Deadlands) remotely, and over the last year my wife collected a patchwork of tools to use while playing. She uses Google Sheets to manage her stats, dice rollers (not designed for the complex mechanics of this specific game), calculator apps, and discord to track things like experience points and fate chips. It was a lot to keep track of.

Virtual tabletop platforms like Roll20, D&D Beyond, or Foundry weren't right either. They were all too expensive, too poorly designed, or suffered from feature bloat. I decided I could build something better for her specific needs.

<br/>
<br/>

# Tech Stack

## React

React felt like a great fit for this project. In addition to being lightweight and fast, I'm excited about exploring React Native in the future, and this felt like a good step in that direction.

## Vitest

I explored using both Jest and Vitest, but given that Vitest fully supports ESM and instant updates, it felt like a better choice for testing.

## MongoDB

I chose MongoDB (vs something like MySQL) primarily because of the schema-less document model. While character sheets have similar structure, they can vary significantly on details. Some characters may know 5 languages, others may specialize in flying zepelins. I wanted to create a system that would be friendly to players' characters as they grow and evolve.

## Netlify

The focus of this project was to get functionality up and running quickly, so I looked into serverless deployment platforms like Netlify and Vercel. I liked that Netlify has built-in authentication, which could make it easier to support player login in the future, and didn't need things like SSR support that Vercel offers. I decided to use a Netlify + MongoDB Atlas starter project to expedite configuration and spend more of my time on feature development.

<br/>
<br/>

# Key Features

## 🙋 Character selector view

Because each character's stats are different, it's important make sure they're using the correct character.

![The character selector view](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/character-selector.png "The character selector view")

An earlier version of this app had a character selector that was on the top of the character sheet with the first player in the array selected by default. This caused some confusion. Players were rolling dice based on the wrong character's stats. Consequently, I pulled out the character selector to a mandatory first step with its own screen.

## 📊 Character Sheet

Selecting a character displays their character sheet.

![The character sheet view, displaying all of this characters stats.](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/character-sheet.png "The character sheet view, displaying all of this characters stats.")

Our DM (or "Marshal" in Deadlands) _loves_ keeping track of stats, so this serves the added benefit of giving him the ability to see anyone's stats instantly.

## 🎲 Dice rolling panel

A player can select any rollable stat and roll the corresponding number of dice with the correct number of sides. This accounts for the complex roll logic in Deadlands, as well as common modifiers to roll results. See [rolling dice](#rolling-dice) for more on this.

![Two instances of the roll panel. One with an ace and one with some score modifiers applied](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/roll-panel.png "Two instances of the roll panel. One with an ace and one with some score modifiers applied")

## 💰 Bounty points

Bounty points are similar to experience points in other systems. They can be spent to upgrade stats, and the cost depends on a number of factors. This can be complicated to figure out, and the players in our group regularly needed reminders from the Marshal, so I calculated and displayed all costs within the app.

I also created a "shopping cart" that shows the remaining bounty points and the upgrades a player wants before they confirm and spend their points. These upgrades can be added or removed, and a notification appears if players try to spend more points than they have.

![Bounty points view, with upgrades ready to purchase](https://raw.githubusercontent.com/garretdepass/deadlands-dice-roller/refs/heads/main/public/images/screenshots/bounty-points.png "Bounty points view, with upgrades ready to purchase")

<br/>
<br/>

# Design Decisions & Tradeoffs

## Web-only

The players in my group all play remotely on computers over discord, so I opted for a large-screen-only design to get the first iteration live more quickly. I'm monitoring feedback from my players to see if I need to prioritize a mobile view later.

## Netlify + MongoDB Atlas

The primary focus of this project was to build react code that functioned within a working tech stack. Consequently, I decided on Netlify and MongoDB Atlas in a starter project. This let me get working on core app functionality much faster than I would have been able to if I'd spun up my own server and self-hosted MongoDB.

Unfortunately, that meant I wasn't able to experience building the full stack. I was exposed to some necessary configuration and I got to learn about MongoDB, but I'd like to spin up my own server in a future project to get a sense of what the full process is like.

## Minimal UI design phase

I deprioritized a deep dive into the UI design up front, doing just enough in figma to feel like I had a strong understanding of the basic layout and functionality. I knew that complications would reveal themselves during the build that were not apparent to me in the design phase.

Of course, the tradeoff is that there's overall less visual polish than I'd like. Visual polish has a subconscious impact on overall perceived quality. While it's okay to deprioritize this for early product work, getting things looking sharp is important as the product matures. I've put a full design pass into my future roadmap below.

## Passing too many states between nested components

When I started building, only the character sheet and roll panel needed to communicate state, so I passed state up and down nested components. It was fast, simple, and added minimal complexity given the scope of the codebase at the time. However, when I added additional functionality, I found myself passing states up and down multiple layers of nested components.

While this is working, it's not the most elegant or maintainable. I've included a refactor in my roadmap to introduce contexts and remove so many passed states.

<br/>
<br/>

# Testing and AI

## Use of AI

**All code in use is written by hand.** I can articulate how all parts of the codebase work, though some of the serverless functions are still a little fuzzy since I adapted them from the Netlify starter project. I used ChatGPT occasionally as a pairing partner, but only in so far as to help me get unstuck or provide feedback on my implementation decisions.

## Testing

I initially planned to work fully in TDD, but ran into issues early while trying to configure Vitest. After a couple days trying to get it right, I decided to circle back on writing tests after the MVP was live. I have since gotten Vitest configured. My first tests are passing and I've added further test coverage to my roadmap.

<br/>
<br/>

# Future Roadmap

After I released the MVP, the rest of the group saw what I'd built and asked to be added too. Now we're all using it, and I'm collecting feedback. My users are vocal, so I've had to prioritize. The very near term roadmap includes:

1.  Tech debt - add contexts and test coverage.
1.  Fate chip functionality - these have functional impacts on rolls, and can be exchanged for Bounty Points. I'd like to make them fully functional with menus that clearly explain the way chips are used.
1.  Visual polish - I'd like to take a measured visual pass and make the experience feel more refined.

I have a very full set of not-yet-prioritized features to work through after these.

<br/>
<br/>

# Code Highlights

## Spending bounty points

When spending bounty points, in order to update a stat in the database, I needed each stat upgrade to reference a specific place in that character's JSON document. I wanted this to be a generic function that could apply regardless of whether the player is updating a trait, an attribute (which is a child of a trait), or a concentration (which is a child of an attribute).

Within [stat_upgrade_button.jsx](https://github.com/garretdepass/deadlands-dice-roller/blob/main/src/components/stat_upgrade_button.jsx), I created a function that returns any stat's index dynamically.

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
```

I then set the output of that function to a property of an object that is created for any stat the player wants to upgrade, and added that object to an array that populates the shopping cart.

```javascript
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
    setRemainingBountyPoints((previousValue) => previousValue - cost);
  } else {
    popover.showPopover();
  }
};
```

## Rolling dice

The way Deadlands handles dice rolling is rather unusual, so the code to handle it was a lot of fun to write! Within [roll_panel.jsx](https://github.com/garretdepass/deadlands-dice-roller/blob/main/src/components/roll_panel.jsx), it starts by creating an array of dice to roll based on which stat the player selects. This is used to display the pre-rolled state.

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

and rolls dice based on the stat selected by the player. Each roll starts a new array, and adds the roll result to that array. If it is the highest possible result, it adds that result to the array and repeats. "Exploding" is a common term for this process in RPGs.

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

Then each array is evaluated for which one returned the highest total.

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

The roll is evaluated to see if the player went bust.

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

Then for each die, JSX is generated to render the die shapes.

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

Each thread is rendered in JSX, with the highest thread getting special styling.

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
<br/>

# What I Learned

I find code fascinating, and enjoy the process of learning how it works. This project sharpened my skills with react, and gave me a lot of cycles solving different types of problems.

The workflow has been novel as well. I have experience writing tickets and consuming tickets, but this was my first time fully designing, PMing, and engineering a project.

### As an engineer

I got to feel what it's like to have acceptance criteria clearly (and sometimes not so clearly) recorded by my PM brain. I got to experience the difference between a well-constructed figma component that let me copy and paste styling, and a not-so-well-built component that required me to define styles, name things, and generally figure stuff out on the fly. I also got to experience being given a high-complexity story that was high enough priority that it was worth taking extra time to complete.

### As a product manager

I got to feel the impact of navigating feature complexity. Do we cut scope? Do we push through and deliver the value of the feature? What do we deprioritize in order to make room for the most important things? Is there anything we can shave off of this story to make it easier to ship?

### As a designer

I got to experiment with more of a "go fast and do less" approach than I'm used to. I've always strived to put together well-crafted deliverables with engineering in mind but, in a situation where I'm wearing all the hats, deprioritizing this felt like the right tradeoff.
