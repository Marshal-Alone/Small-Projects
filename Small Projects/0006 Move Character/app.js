const main_container = document.querySelector(".main-container");
const char_container = document.querySelector(".char-container");
const move = document.querySelector("input");
console.dir(move);


let curr_pos_x = 0;
let curr_pos_y = 0;
console.log(curr_pos_x, curr_pos_y);

function move_character() {
    char_container.style.transform = `translateX(${curr_pos_x}px) translateY(${curr_pos_y}px)`;
}
// function moveY() {
//     char_container.style.transform = `translateX(${curr_pos_x}px) translateY(${curr_pos_y}px) `;
// }

function reset() {
    char_container.style.transform = `translateX(0px)`;
    char_container.style.transform = `translateY(0px)`;
    curr_pos_x = 0;
    curr_pos_y = 0;
    move.setAttribute("placeholder","..Out of bounds..")

}

move.addEventListener("keydown", (event) => {
    let key = event.code;

    let parent_bound = document.querySelector(".parent").getBoundingClientRect();
    let char_bound = char_container.getBoundingClientRect();

    function isOutOfBound() {
        let res = (char_bound.left < parent_bound.left || char_bound.top < parent_bound.top || char_bound.right > parent_bound.right || char_bound.bottom > parent_bound.bottom);
        console.log(res);
        return res;
    }

    if (isOutOfBound()) {
        reset();
    } else {
        switch (key) {

            case 'ArrowUp':
                move.setAttribute("placeholder", "...moving up...")
                curr_pos_y -= 80;
                move_character();
                break;
            case 'ArrowDown':
                move.setAttribute("placeholder", "...moving down...")
                curr_pos_y += 80;
                move_character();
                break;
            case 'ArrowRight':
                move.setAttribute("placeholder", "...moving right...")
                curr_pos_x += 80;
                move_character();
                break;
            case 'ArrowLeft':
                move.setAttribute("placeholder", "...moving left...")
                curr_pos_x -= 80;
                move_character();
                break;

            default:
                move.setAttribute("placeholder", "INVALID MOVE")
                break;
        }
        console.log(curr_pos_x, curr_pos_y);
    }



})
