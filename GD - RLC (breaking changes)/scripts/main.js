import {
    /* Buttons */
    playerTypeButtons, pickRandLevelButton,
    /* Display */
    introductionDisplay, levelDisplay, difficultyDisplay, attemptsDisplay, percentageDisplay
} from "./dom.js"
import { levels, difficulties, settings } from "./data.js"
import { range } from "./functions.js"

for (const button of playerTypeButtons) {
    const setPlayerType = (playerType) => settings.playerType = parseInt(playerType)

    button.addEventListener("click", button => {
        setPlayerType(button.target.getAttribute("data-value"))

        introductionDisplay.style.opacity = 0
        setTimeout(() => introductionDisplay.style.display = "none", 250)
    })
}

pickRandLevelButton.addEventListener("click", pickRandomLevel)

function pickRandomLevel() {
    const filteredLevels = levels.filter(level => {
        const isGDLevels = level.availableOn.includes("gd") && settings.includedGDLevels["full-version"]
        const isSubzeroLevels = level.availableOn.includes("subzero") && settings.includedGDLevels.subzero
        const isMeltdownLevels = level.availableOn.includes("meltdown") && settings.includedGDLevels.meltdown
        const isGDLiteLevels = level.availableOn.includes("gdlite")

        return level.playerTypes.includes(settings.playerType)
            && (!level.secretCoinsRequired || settings.secretCoins >= level.secretCoinsRequired)
            && (isGDLevels || isSubzeroLevels || isMeltdownLevels || isGDLiteLevels)
    })
    const randomLevel = filteredLevels[Math.floor(Math.random() * filteredLevels.length)]

    const percentage = range(
        5 * 3 ** (settings.playerType - 1),
        Math.floor((Math.random() * 100 / (randomLevel.difficulty + 1)) * 3 ** (settings.playerType - 1)),
        100
    )

    if (document.body.classList.item(0))
        document.body.classList.replace(document.body.classList.item(0), randomLevel.class)
    else
        document.body.classList.add(randomLevel.class)

    levelDisplay.innerText = randomLevel.name

    difficultyDisplay.setAttribute("src", `assets/difficultyimages/${difficulties[randomLevel.difficulty]}.png`)
    difficultyDisplay.setAttribute("alt", difficulties[randomLevel.difficulty])
    difficultyDisplay.title = difficulties[randomLevel.difficulty]

    attemptsDisplay.textContent = Math.floor(
        range(10 / settings.playerType, Math.random() * 50 / settings.playerType)
    )
    percentageDisplay.textContent = `${settings.playerType === 3 ? 100 : percentage}%`
}
