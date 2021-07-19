document.addEventListener("DOMContentLoaded", () => {
    const cardArray = [
        {
            name: 'Capture1',
            img: '../images/level/Capture1.PNG'
        },
        {
            name: 'Capture1',
            img: '../images/level/Capture1.PNG'
        },
        {
            name: 'Capture2',
            img: '../images/level/Capture2.PNG'
        },
        {
            name: 'Capture2',
            img: '../images/level/Capture2.PNG'
        },
        {
            name: 'Capture3',
            img: '../images/level/Capture3.PNG'
        },
        {
            name: 'Capture3',
            img: '../images/level/Capture3.PNG'
        },
        {
            name: 'Capture4',
            img: '../images/level/Capture4.PNG'
        },
        {
            name: 'Capture4',
            img: '../images/level/Capture4.PNG'
        },
        {
            name: 'Capture5',
            img: '../images/level/Capture5.PNG'
        },
        {
            name: 'Capture5',
            img: '../images/level/Capture5.PNG'
        },
        {
            name: 'Capture6',
            img: '../images/level/Capture6.PNG'
        },
        {
            name: 'Capture6',
            img: '../images/level/Capture6.PNG'
        },
        {
            name: 'Capture7',
            img: '../images/level/Capture7.PNG'
        },
        {
            name: 'Capture7',
            img: '../images/level/Capture7.PNG'
        },
        {
            name: 'Capture8',
            img: '../images/level/Capture8.PNG'
        },
        {
            name: 'Capture8',
            img: '../images/level/Capture8.PNG'
        }
    ]

    let cardsChosen = []
    let cardsChosenId = []
    let cardsWon = []
    let steps = 0

    const grid = document.querySelector(".grid")
    const result = document.querySelector("#steps")
    const prevResult = document.querySelector("#prevSteps")
    prevResult.textContent = window.localStorage.getItem("prevSteps")

    const createAGame = () => {
        cardArray.sort(() => 0.5 - Math.random())

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement("img")
            card.setAttribute('src', '../images/level/question-mark.PNG')
            card.setAttribute('data-id', i)
            card.addEventListener('click', flipCard)
            grid.append(card)
        }
    }

    const resetTheGame = () => {
        window.localStorage.setItem("prevSteps", steps)
        prevResult.textContent = steps
        result.textContent = 0
        steps = 0

        grid.innerHTML = ''
        createAGame()
    }

    const checkForMatch = () => {
        result.textContent = ++steps

        const cards = document.querySelectorAll('img');
        const optionOneId = cardsChosenId[0]
        const optionTwoId = cardsChosenId[1]

        if (cardsChosen[0] === cardsChosen[1]) {
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionOneId].setAttribute('src', '../images/level/question-mark.PNG')
            cards[optionTwoId].setAttribute('src', '../images/level/question-mark.PNG')
        }

        cardsChosen = []
        cardsChosenId = []

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!')

            resetTheGame()
        }
    }

    function flipCard() {
        const cardId = this.getAttribute('data-id')

        if (cardsChosenId.length === 1 && cardsChosenId[0] == cardId || cardsChosen.length === 2) {
            return //prevent double click
        }

        cardsChosen.push(cardArray[cardId].name)
        cardsChosenId.push(cardId)
        this.setAttribute('src', cardArray[cardId].img);

        if (cardsChosen.length === 2) {
            setTimeout(checkForMatch, 500)
        }
    }

    createAGame()
})
