import RunningWolf from "./runningWolf";

const Petey = {
    trait: [

        {
            name: "Cognition",
            dieCount: 4,
            dieSides: 8,
            type: "trait",
            attribute: [
                
                {
                    name: "Artillery",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Arts",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
                {   
                    name: "Scrutinize",
                    dieCount: 2,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Search",
                    dieCount: 2,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Trackin'",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                }
            ]
        },
        {
            name: "Deftness",
            dieCount: 1,
            dieSides: 10,
            type: "trait",
            attribute: [
                {
                    name: "Bow",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Filchin'",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Lockpickin'",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Shootin'",
                    dieCount: 5,
                    dieSides: 10,
                    type: "attribute",
                    concentration: [
                        
                        {
                            name: "Pistol'",
                            dieCount: 5,
                            dieSides: 10,
                            type: "concentration",
                        },  
                        
                    ]
                },
                {
                    name: "Sleight of hand",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Speed load",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Throwin'",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Knowledge",
            dieCount: 3,
            dieSides: 6,
            type: "trait",
            attribute: [
                {
                    name: "Academia",
                    dieCount: 1,
                    dieSides: 6,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Occult",
                            dieCount: 1,
                            dieSides: 6,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Area knowledge",
                    dieCount: 2,
                    dieSides: 6,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Home County",
                            dieCount: 2,
                            dieSides: 6,
                            type: "concentration",
                            location: "Boston",
                        },  
                    ]
                },
                {
                    name: "Demolition",
                    dieCount: 0,
                    dieSides: 6,
                    type: "attribute",
                },
                {
                    name: "Disguise",
                    dieCount: 1,
                    dieSides: 6,
                    type: "attribute",
                },
                {
                    name: "Language",
                    dieCount: 2,
                    dieSides: 6,
                    type: "attribute",
                    concentration: [
                        {
                            name: "English",
                            dieCount: 2,
                            dieSides: 6,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Mad Science",
                    dieCount: 0,
                    dieSides: 6,
                    type: "attribute",
                },
                {
                    name: "Medicine",
                    dieCount: 0,
                    dieSides: 6,
                    type: "attribute",
                },
                {
                    name: "Professional",
                    dieCount: 1,
                    dieSides: 6,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Law",
                            dieCount: 1,
                            dieSides: 6,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Science",
                    dieCount: 1,
                    dieSides: 6,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Biology",
                            dieCount: 1,
                            dieSides: 6,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Trade",
                    dieCount: 0,
                    dieSides: 6,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Mien",
            dieCount: 4,
            dieSides: 12,
            type: "trait",
            attribute: [
                {
                    name: "Animal wranglin'",
                    dieCount: 0,
                    dieSides: 12,
                    type: "attribute",
                },
                {
                    name: "Leadership",
                    dieCount: 1,
                    dieSides: 12,
                    type: "attribute",
                },
                {
                    name: "Overawe",
                    dieCount: 0,
                    dieSides: 12,
                    type: "attribute",
                },
                {
                    name: "Performin'",
                    dieCount: 2,
                    dieSides: 12,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Acting",
                            dieCount: 2,
                            dieSides: 12,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Persuasion",
                    dieCount: 3,
                    dieSides: 12,
                    type: "attribute",
                },
                {
                    name: "Tale Tellin'",
                    dieCount: 2,
                    dieSides: 12,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Nimbleness",
            dieCount: 2,
            dieSides: 8,
            type: "trait",
            attribute: [
                {
                    name: "Climbin'",
                    dieCount: 1,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Dodge",
                    dieCount: 2,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Drivin'",
                    dieCount: 1,
                    dieSides: 8,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Steam Wagon",
                            dieCount: 1,
                            dieSides: 8,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Fightin'",
                    dieCount: 1,
                    dieSides: 8,
                    type: "attribute",
                    concentration: [
                        
                        {
                            name: "Knife'",
                            dieCount: 1,
                            dieSides: 8,
                            type: "concentration",
                        },  
                    ]
                },
                {
                    name: "Horse ridin'",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Sneak",
                    dieCount: 3,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Swimmin'",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Teamster",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Quickness",
            dieCount: 4,
            dieSides: 10,
            type: "trait",
            attribute: [
                {
                    name: "Quick Draw",
                    dieCount: 2,
                    dieSides: 10,
                    type: "attribute",
                    concentration: [
                        {
                            name: "Pistol",
                            dieCount: 2,
                            dieSides: 10,
                            type: "concentration",
                        },  
                    ]
                },
            ]
        },
        {
            name: "Smarts",
            dieCount: 3,
            dieSides: 10,
            type: "trait",
            attribute: [
                {
                    name: "Bluff",
                    dieCount: 2,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Gamblin'",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Ridicule",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Scroungin'",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Streetwise",
                    dieCount: 1,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Survival",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
                {
                    name: "Tinkerin'",
                    dieCount: 0,
                    dieSides: 10,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Spirit",
            dieCount: 3,
            dieSides: 8,
            type: "trait",
            attribute: [
                {
                    name: "Faith",
                    dieCount: 0,
                    dieSides: 8,
                    type: "attribute",
                },
                {
                    name: "Guts",
                    dieCount: 5,
                    dieSides: 8,
                    type: "attribute",
                },
            ]
        },
        {
            name: "Strength",
            dieCount: 2,
            dieSides: 4,
            type: "trait",
        },
        {
            name: "Vigor",
            dieCount: 4,
            dieSides: 6,
            type: "trait",
        },
    ],
    grit: 2,
    pace: 0,
    size: 6,
    wind: 0

};

const Character = Petey

function addSourceTraitToTarget (sourceTrait, targetTrait) {
    for (const Trait in Character.trait) {
      if (Character.trait[Trait].name === sourceTrait) {
        targetTrait = targetTrait + Character.trait[Trait].dieSides;
        return targetTrait
      }
    }  
  };
  
Character.wind = addSourceTraitToTarget("Spirit", Character.wind) + addSourceTraitToTarget("Vigor", Character.wind)
Character.pace = addSourceTraitToTarget("Nimbleness", Character.pace)

export default Petey;