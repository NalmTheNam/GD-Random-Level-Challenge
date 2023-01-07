/* Buttons and Inputs */
const pickRandLevelButton = document.getElementById("pickRandomLevel")

/* Form */
const form = document.querySelector("form")
const gdLevelsFieldSet = createFieldSet({
    name: "gd-levels-fieldset",
    legendText: "Include these GD levels:",
    inputs: [
        createInput({
            id: "gd-levels-fieldset-gd_fullver", name: "geometry-dash-full-version",
            labelText: "Include Full Version GD Levels?",
            type: "checkbox", value: true, returnAs: "object"
        }),
        createInput({
            id: "gd-levels-fieldset-gd_subzero", name: "geometry-dash-subzero",
            labelText: "Include GD Subzero Levels?",
            type: "checkbox", value: false, returnAs: "object"
        }),
        createInput({
            id: "gd-levels-fieldset-gd_meltdown", name: "geometry-dash-meltdown",
            labelText: "Include GD Meltdown Levels?",
            type: "checkbox", value: false, returnAs: "object"
        })
    ]
})

/* Display */
const introductionDisplay = document.getElementById("introduction")
const playerTypeButtons = introductionDisplay.querySelectorAll(".plrtypebtn")

const detailDisplay = document.getElementById("detail")

const levelDisplay = document.getElementById("level")
const difficultyDisplay = document.getElementById("difficulty")

const attemptsDisplay = document.getElementById("attempts")
const percentageDisplay = document.getElementById("percentage")

/**
 * @param {{
*   id?: string
*   className?: string
*   text?: string
*   onClick?: (this: HTMLButtonElement, ev: MouseEvent) => void
*   attributes?: [string, string | number | boolean][]
*  }} data The data for the button.
*/
function createButton({ id, className, text = "Button", onClick, attributes = [] }) {
    const button = document.createElement("button")

    if (id !== undefined) button.id = id
    if (className !== undefined) button.className = className
    button.textContent = text

    /* Event Listeners */
    if (onClick !== undefined) button.addEventListener("click", onClick)

    /* Attributes */
    for (const attribute of attributes)
        button.setAttribute(...attribute)

    return button
}

/**
 * @param {{
*   id?: string
*   className?: string
*   children?: HTMLElement[]
*  }} data The data for the DIV element.
*/
function createDiv({ id, className, children }) {
    const div = document.createElement("div")

    if (id !== undefined) div.id = id
    if (className !== undefined) div.className = className
    if (children !== undefined) div.append(...children)

    return div
}

/**
 * @param {{
 *   id: string
 *   name: string
 *   type?: "text" | "number" | "checkbox" | "radio"
 *   value?: string | number | boolean
 *   labelText?: string,
 *   returnAs?: "object" | "fragment"
 * }} data The data for the input and the label.
 */
function createInput({ id = Math.random(), name, type = "text", value, labelText, returnAs = "fragment" }) {
    const groupedElements = document.createElement("div")

    const label = document.createElement("label")
    const input = document.createElement("input")

    label.htmlFor = id
    label.textContent = labelText

    input.id = id
    input.name = name

    input.type = type

    if (type === "checkbox" || type === "radio") input.checked = value
    else input.value = value

    groupedElements.append(label, input)
    return returnAs === "object" ? { input, label } : groupedElements
}

/**
 * @param {{
*   name: string
*   legendText: string
*   inputs?: {input: HTMLInputElement, label: HTMLLabelElement}[]
* }} data The data for the fieldset and the legend.
*/
function createFieldSet({ name, legendText, inputs = [] }) {
    const fieldset = document.createElement("fieldset")
    const legend = document.createElement("legend")

    const transformedInputs = inputs.map(({ input, label }) => {
        const groupedElements = document.createElement("div")

        groupedElements.append(input, label)
        return groupedElements
    })

    legend.textContent = legendText

    fieldset.name = name
    fieldset.append(legend, ...transformedInputs)

    return fieldset
}

(function initialize() {
    const introDisplayGrid = introductionDisplay.querySelector(".grid")
    const playerTypeItems = []

    for (let i = 0; i < 3; i++) {
        const buttonTexts = ["Beginner", "Intermediate", "Advanced"]

        playerTypeItems.push(createDiv({
            className: "item",
            children: [createButton({ 
                className: "plrtypebtn", text: buttonTexts[i],
                onClick() {
                    
                }
            })]
        }))
    }

    form.append(
        createInput({
            id: "secretcoins", name: "secretcoins",
            type: "number", value: 0,
            labelText: "Secret Coins:"
        }),
        gdLevelsFieldSet
    )

    introDisplayGrid.append(...playerTypeItems)
})()

const secretCoinsInput = form.elements.namedItem("secretcoins")