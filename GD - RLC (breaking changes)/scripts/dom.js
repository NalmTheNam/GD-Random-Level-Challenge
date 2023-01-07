const domFunctions = { createButton, createDiv, createElement, createFieldSet, createInput }

/* Buttons */
const pickRandLevelButton = document.getElementById("pickRandomLevel")

/* Form */
const form = document.querySelector("form")

const secretCoinsInput = createInput({
  id: "secretcoins", name: "secretcoins", inputType: "number", type: "number",
  labelText: "Secret Coins:"
})
const gdLevelsFieldSet = createFieldSet({
  name: "gd-levels-fieldset",
  legendText: "Include these GD levels:",
  inputs: [
    createInput({
      id: "gd-levels-fieldset-gd_fullver", name: "geometry-dash-full-version",
      labelText: "Include Full Version GD Levels:",
      type: "checkbox", value: true
    }),
    createInput({
      id: "gd-levels-fieldset-gd_subzero", name: "geometry-dash-subzero",
      labelText: "Include GD Subzero Levels:",
      type: "checkbox", value: false
    }),
    createInput({
      id: "gd-levels-fieldset-gd_meltdown", name: "geometry-dash-meltdown",
      labelText: "Include GD Meltdown Levels:",
      type: "checkbox", value: false
    })
  ]
})

/* Display */
const introductionDisplay = document.getElementById("introduction")
const detailDisplay = document.getElementById("detail")

const levelDisplay = document.getElementById("level")
const difficultyDisplay = document.getElementById("difficulty")

const attemptsDisplay = document.getElementById("attempts")
const percentageDisplay = document.getElementById("percentage");

/* Initialization */
(function initialize() {
  const introDisplayGrid = introductionDisplay.querySelector(".grid")
  const playerTypeItems = []

  for (let i = 0; i < 3; i++) {
    const buttonTexts = ["Beginner", "Intermediate", "Advanced"]
    const grid = createDiv({
      className: "grid", children: [
        createDiv({
          className: "item", children: ""
        })
      ]
    })

    playerTypeItems.push(createDiv({
      className: "item",
      children: [
        createButton({
          className: "plrtypebtn", text: buttonTexts[i],
          attributes: [["data-value", i + 1]]
        }),
        grid
      ]
    }))
  }

  form.append(secretCoinsInput, gdLevelsFieldSet)
  introDisplayGrid.append(...playerTypeItems)
})()

const playerTypeButtons = introductionDisplay.querySelectorAll(".plrtypebtn")

/* Functions */
/**
 * @param {{
 *   elementType?: keyof HTMLElementTagNameMap
 *   id?: string
 *   formName?: string
 *   className?: string | string[]
 *   style?: CSSStyleDeclaration
 *   children?: string | HTMLElement | HTMLElement[]
 *   inputOptions?: {
 *     type?: "text" | "number" | "checkbox" | "radio" | "file" | "password"
 *     value?: string | number | boolean,
 *     label?: HTMLLabelElement
 *   }
 *   fieldSetOptions?: {
 *     legend: HTMLLegendElement
 *   }
 *   htmlFor?: string
 *   events?: {
 *     click?: (this: HTMLElement, ev: MouseEvent) => void
 *     change?: (this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => void
 *   }
 *   attributes?: [string, string | number | boolean][]
*  }} options The options for the element.
*/
function createElement(options) {
  if (options.elementType === undefined) return

  const element = document.createElement(options.elementType)
  const groupedElements = document.createElement("div")

  if (options.id !== undefined) element.id = options.id
  if (options.className !== undefined)
    if (options.className instanceof Array) element.classList.add(...options.className)
    else element.className = options.className

  if (options.style !== undefined) {
    for (const [key, value] of Object.entries(options.style))
      element.style[key] = value
  }

  if ((element instanceof HTMLFormElement || element instanceof HTMLInputElement
    || element instanceof HTMLFieldSetElement) && options.formName !== undefined)
    element.name = options.formName

  if (element instanceof HTMLInputElement && options.inputOptions !== undefined) {
    const inputValue = options.inputOptions.value
    const inputType = options.inputOptions.type

    function chooseDefaultValue() {
      return inputType === "text" || inputType === "password" ? ""
        : inputType === "number" ? 0
          : inputType === "checkbox" || inputType === "radio" ? false : ""
    }

    element.type = inputType

    if (inputType === "checkbox" || inputType === "radio")
      element.checked = inputValue ?? chooseDefaultValue()
    else if (inputType !== "file") element.value = inputValue ?? chooseDefaultValue()
  }

  if (element instanceof HTMLLabelElement)
    element.htmlFor = options.htmlFor ?? ""

  if (options.events !== undefined) {
    for (const [eventName, eventHandler] of Object.entries(options.events))
      element.addEventListener(eventName, eventHandler)
  }

  if (options.attributes !== undefined) {
    for (const [attributeName, attributeValue] of options.attributes)
      element.setAttribute(attributeName, attributeValue)
  }

  if (options.children !== undefined) {
    if (element instanceof HTMLFieldSetElement) {
      const legend = options?.fieldSetOptions.legend ?? createElement({
        elementType: "legend", children: "Legend"
      })

      element.append(legend)
    }

    if (typeof options.children === "string") element.textContent = options.children
    else if (options.children instanceof HTMLElement) element.append(options.children)
    else element.append(...options.children)
  }

  if (element instanceof HTMLInputElement) {
    const label = options?.inputOptions.label ?? createElement({
      elementType: "label", children: "Label"
    })

    /* Automated htmlFor assignment */
    if (!label.htmlFor) label.htmlFor = options.id

    groupedElements.append(label, element)
  }

  return element instanceof HTMLInputElement ? groupedElements : element
}

/**
 * This function creates a button element.
 * @param {{
 *   id?: string
 *   className?: string
 *   style?: CSSStyleDeclaration
 *   text?: string
 *   onClick?: (this: HTMLButtonElement, ev: MouseEvent) => void
 *   attributes?: [string, string | number | boolean][]
 * }} data The data for the button.
*/
function createButton(data) {
  return createElement({
    elementType: "button", id: data.id, className: data.className,
    children: data.text, style: data.style,
    events: { click: data.onClick }, attributes: data.attributes
  })
}

/**
 * This function creates a DIV element.
 * @param {{
 *   id?: string
 *   className?: string
 *   children?: HTMLElement[]
 *   attributes?: [string, string | number | boolean][]
 * }} data The data for the DIV element.
 * @returns {HTMLDivElement}
*/
function createDiv(data) {
  return createElement({
    elementType: "div",
    id: data.id, className: data.className,
    children: data.children, attributes: data.attributes
  })
}

/**
 * This function creates an input element.
 * @param {{
 *   id: string
 *   name: string
 *   type?: "text" | "number" | "checkbox" | "radio" | "file" | "password"
 *   value?: string | number | boolean
 *   labelText?: string
 *   returnAs?: string
 * }} data The data for the input and the label.
 * @returns {HTMLInputElement}
*/
function createInput({ id = Math.random(), name, type = "text", value, labelText }) {
  return createElement({
    elementType: "input",
    id, formName: name,
    inputOptions: {
      label: createElement({ elementType: "label", children: labelText }),
      type, value
    },
  })
}

/**
 * This function creates a fieldset element.
 * @param {{
 *   name: string
 *   legendText?: string
 *   inputs?: HTMLDivElement[]
 *  }} data The data for the fieldset and the legend.
 *  @returns {HTMLFieldSetElement}
*/
function createFieldSet({ name, legendText, inputs = [] }) {
  return createElement({
    elementType: "fieldset",
    formName: name,
    fieldSetOptions: { legend: createElement({ elementType: "legend", children: legendText ?? "Legend" }) },
    children: inputs
  })
}

export {
  /* Functions */
  domFunctions,
  /* Buttons and Inputs */
  pickRandLevelButton, playerTypeButtons, secretCoinsInput,
  /* Form */
  form, gdLevelsFieldSet,
  /* Display */
  introductionDisplay, detailDisplay, levelDisplay, difficultyDisplay, attemptsDisplay, percentageDisplay
}