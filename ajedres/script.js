const knightMovesList = [
    [2, 1],
    [2, -1],
    [-2, 1],
    [-2, -1],
    [1, 2],
    [1, -2],
    [-1, 2],
    [-1, -2],
];

function isValidPosition(position) {
    const [x, y] = position;

    return x >= 0 && x < 8 && y >= 0 && y < 8;
}

function getValidMoves(position) {
    const validMoves = [];

    for (const movement of knightMovesList) {
        const newPosition = [
        position[0] + movement[0],
        position[1] + movement[1],
        ];

        if (isValidPosition(newPosition)) {
        validMoves.push(newPosition);
        }
    }

    return validMoves;
}

function knightMoves(start, end) {
    if (!isValidPosition(start) || !isValidPosition(end)) {
        throw new Error("Las posiciones deben estar dentro del tablero.");
    }

    const queue = [
        {
        position: start,
        path: [start],
        },
    ];

    const visited = new Set();
    visited.add(start.toString());

    while (queue.length > 0) {
        const currentNode = queue.shift();

        if (
        currentNode.position[0] === end[0] &&
        currentNode.position[1] === end[1]
        ) {
        const path = currentNode.path;
        const moves = path.length - 1;

        console.log(`You made it in ${moves} moves! Here's your path:`);

        for (const position of path) {
            console.log(`[${position[0]},${position[1]}]`);
        }

        return path;
        }

        const validMoves = getValidMoves(currentNode.position);

        for (const move of validMoves) {
        const moveKey = move.toString();

        if (!visited.has(moveKey)) {
            visited.add(moveKey);

            queue.push({
            position: move,
            path: [...currentNode.path, move],
            });
        }
        }
    }

    return null;
}

const board = document.getElementById("chessboard");
const startValue = document.getElementById("start-value");
const endValue = document.getElementById("end-value");
const startCard = document.getElementById("start-card");
const endCard = document.getElementById("end-card");
const findRouteButton = document.getElementById("find-route");
const resetButton = document.getElementById("reset-button");
const result = document.getElementById("result");

let startPosition = null;
let endPosition = null;

function positionToChess(position) {
    const files = "ABCDEFGH";
    return `${files[position[0]]}${position[1] + 1}`;
}

function createBoard() {
    for (let y = 7; y >= 0; y -= 1) {
        for (let x = 0; x < 8; x += 1) {
            const square = document.createElement("button");
            const chessPosition = positionToChess([x, y]);

            square.type = "button";
            square.className = `square ${(x + y) % 2 === 0 ? "dark" : ""}`;
            square.dataset.x = x;
            square.dataset.y = y;
            square.setAttribute("role", "gridcell");
            square.setAttribute("aria-label", `Casilla ${chessPosition}`);

            if (x === 0) {
                square.insertAdjacentHTML("beforeend", `<span class="coordinate rank">${y + 1}</span>`);
            }

            if (y === 0) {
                square.insertAdjacentHTML(
                    "beforeend",
                    `<span class="coordinate file">${"abcdefgh"[x]}</span>`,
                );
            }

            square.addEventListener("click", () => selectSquare([x, y]));
            board.appendChild(square);
        }
    }
}

function getSquare(position) {
    return board.querySelector(
        `[data-x="${position[0]}"][data-y="${position[1]}"]`,
    );
}

function clearRoute() {
    board.querySelectorAll(".path, .selected-start, .selected-end").forEach((square) => {
        square.classList.remove("path", "selected-start", "selected-end");
        square.querySelectorAll(".knight, .move-number").forEach((marker) => marker.remove());
    });
}

function selectSquare(position) {
    if (!startPosition || (startPosition && endPosition)) {
        clearRoute();
        startPosition = position;
        endPosition = null;
        getSquare(position).classList.add("selected-start");
        getSquare(position).insertAdjacentHTML(
            "beforeend",
            '<span class="knight" aria-hidden="true">♞</span>',
        );

        startValue.textContent = positionToChess(position);
        endValue.textContent = "Selecciona el destino";
        startCard.classList.add("complete");
        startCard.classList.remove("active");
        endCard.classList.add("active");
        endCard.classList.remove("complete");
        findRouteButton.disabled = true;
        result.innerHTML = `
            <div class="result-icon" aria-hidden="true">♞</div>
            <div><span>Origen seleccionado</span><strong>Ahora elige el destino</strong></div>
        `;
        return;
    }

    endPosition = position;
    getSquare(position).classList.add("selected-end");
    endValue.textContent = positionToChess(position);
    endCard.classList.remove("active");
    endCard.classList.add("complete");
    findRouteButton.disabled = false;
    result.innerHTML = `
        <div class="result-icon" aria-hidden="true">✓</div>
        <div><span>Todo listo</span><strong>Calcula la ruta más corta</strong></div>
    `;
}

function drawRoute() {
    if (!startPosition || !endPosition) return;

    const path = knightMoves(startPosition, endPosition);
    clearRoute();

    path.forEach((position, index) => {
        const square = getSquare(position);

        if (index === 0) {
            square.classList.add("selected-start");
            square.insertAdjacentHTML(
                "beforeend",
                '<span class="knight" aria-hidden="true">♞</span>',
            );
        } else if (index === path.length - 1) {
            square.classList.add("selected-end");
            square.insertAdjacentHTML(
                "beforeend",
                `<span class="move-number">${index}</span>`,
            );
        } else {
            square.classList.add("path");
            square.insertAdjacentHTML(
                "beforeend",
                `<span class="move-number">${index}</span>`,
            );
        }
    });

    const moves = path.length - 1;
    const routeText = path.map(positionToChess).join(" → ");
    result.innerHTML = `
        <div class="result-icon" aria-hidden="true">♞</div>
        <div>
            <span>Ruta encontrada</span>
            <strong>${moves} ${moves === 1 ? "movimiento" : "movimientos"} · ${routeText}</strong>
        </div>
    `;
}

function resetBoard() {
    clearRoute();
    startPosition = null;
    endPosition = null;
    startValue.textContent = "Selecciona una casilla";
    endValue.textContent = "Esperando origen";
    startCard.classList.add("active");
    startCard.classList.remove("complete");
    endCard.classList.remove("active", "complete");
    findRouteButton.disabled = true;
    result.innerHTML = `
        <div class="result-icon" aria-hidden="true">♞</div>
        <div><span>Ruta preparada</span><strong>Elige el punto de partida</strong></div>
    `;
}

findRouteButton.addEventListener("click", drawRoute);
resetButton.addEventListener("click", resetBoard);

createBoard();
