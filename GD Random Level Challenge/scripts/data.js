/*
Difficulty list
0: Easy | 1: Normal | 2: Hard | 3: Harder | 4: Insane | 5: Demon
*/
const levels = [{
    name: "Stereo Madness", difficulty: 0, availableOn: ["gd", "gdlite"],
    class: "stereo_madness", playerTypes: [1]
}, {
    name: "Back On Track", difficulty: 0, availableOn: ["gd", "gdlite"],
    class: "back_on_track", playerTypes: [1]
}, {
    name: "Polargeist", difficulty: 1, availableOn: ["gd", "gdlite"],
    class: "polargeist", playerTypes: [1]
}, {
    name: "Dry Out", difficulty: 1, availableOn: ["gd", "gdlite"],
    class: "dry_out", playerTypes: [1]
}, {
    name: "Base After Base", difficulty: 2, availableOn: ["gd", "gdlite"],
    class: "base_after_base", playerTypes: [1]
}, {
    name: "Can't Let Go", difficulty: 2, availableOn: ["gd", "gdlite"],
    class: "cant_let_go", playerTypes: [1, 2]
}, {
    name: "Jumper", difficulty: 3, availableOn: ["gd", "gdlite"],
    class: "jumper", playerTypes: [1, 2]
}, {
    name: "Time Machine", difficulty: 3, availableOn: ["gd", "gdlite"],
    class: "time_machine", playerTypes: [1, 2, 3]
}, {
    name: "Cycles", difficulty: 3, availableOn: ["gd", "gdlite"],
    class: "cycles", playerTypes: [2]
}, {
    name: "xStep", difficulty: 4, availableOn: ["gd", "gdlite"],
    class: "xStep", playerTypes: [2, 3]
}, {
    name: "Clutterfunk", difficulty: 4, availableOn: ["gd", "gdlite"],
    class: "clutterfunk", playerTypes: [2, 3]
}, {
    name: "Theory of Everything", difficulty: 4, availableOn: ["gd", "gdlite"],
    class: "theory_of_everything", playerTypes: [2, 3]
}, {
    name: "Electroman Adventures", difficulty: 4, availableOn: ["gd", "gdlite"],
    class: "electroman_adventures", playerTypes: [2, 3]
}, {
    name: "Clubstep", difficulty: 5, availableOn: ["gd", "gdlite"], secretCoinsRequired: 10,
    class: "clubstep", playerTypes: [2, 3]
}, {
    name: "Electrodynamix", difficulty: 4, availableOn: ["gd", "gdlite"], 
    class: "electrodynamix", playerTypes: [3]
}, {
    name: "Hexagon Force", difficulty: 4, availableOn: ["gd", "gdlite"],
    class: "hexagon_force", playerTypes: [2, 3]
}, {
    name: "Blast Processing", difficulty: 3, availableOn: ["gd"],
    class: "blast_processing", playerTypes: [2, 3]
}, {
    name: "Theory of Everything 2", difficulty: 5, availableOn: ["gd"], secretCoinsRequired: 20,
    class: "theory_of_everything_2", playerTypes: [3]
}, {
    name: "Geometrical Dominator", difficulty: 3, availableOn: ["gd"],
    class: "geometrical_dominator", playerTypes: [2, 3]
}, {
    name: "Deadlocked", difficulty: 5, availableOn: ["gd"], secretCoinsRequired: 30,
    class: "deadlocked", playerTypes: [3]
}, {
    name: "Fingerdash", difficulty: 4, availableOn: ["gd"],
    class: "fingerdash", playerTypes: [2, 3]
}, {
    name: "Press Start", difficulty: 1, availableOn: ["subzero"],
    class: "press_start", playerTypes: [1, 2]
}, {
    name: "Nock Em", difficulty: 2, availableOn: ["subzero"],
    class: "nock_em", playerTypes: [1, 2, 3]
}, {
    name: "Power Trip", difficulty: 3, availableOn: ["subzero"],
    class: "power_trip", playerTypes: [2, 3]
}, {
    name: "The Seven Seas", difficulty: 0, availableOn: ["meltdown"],
    class: "the_seven_seas", playerTypes: [1, 2, 3]
}, {
    name: "Viking Arena", difficulty: 1, availableOn: ["meltdown"],
    class: "viking_arena", playerTypes: [1, 2, 3]
}, {
    name: "Airborne Robots", difficulty: 2, availableOn: ["meltdown"],
    class: "airborne_robots", playerTypes: [2, 3]
}]

const difficulties = ["Easy", "Normal", "Hard", "Harder", "Insane", "Demon"]
const settings = {
    playerType: 0,
    secretCoins: secretCoinsInput.value,
    includedGDLevels: {
        "full-version": true, subzero: false, meltdown: false
    }
}


secretCoinsInput.addEventListener("change", input =>
  settings.secretCoins = input.target.valueAsNumber)

for (const element of gdLevelsFieldSet.elements) {
    element.addEventListener("change", el => {
        settings.includedGDLevels[el.target.name.replace("geometry-dash-", "")] = el.target.checked
    })
}