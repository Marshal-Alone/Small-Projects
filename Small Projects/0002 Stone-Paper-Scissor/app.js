let img1 = document.querySelector("#img1");
let img2 = document.querySelector("#img2");
let img3 = document.querySelector("#img3");

let txt = document.querySelector("#txt");

let user_choise;

let username = document.querySelector("#username");
let userName = prompt("Enter your name ");
username.innerText = userName;
let container = document.querySelector(".container");
container.classList.remove("hide");




const genCompChoice = () => {
    const options = ["rock", "paper", "scissor"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
  };
let comp_choise ;
let decision;


let user_cnt=0;
let comp_cnt = 0;




let decison = () => {
    comp_choise = genCompChoice();

    if (comp_choise == "rock") {
        img1.style.borderColor = "red";
    }else if (comp_choise === "paper") {
        img2.style.borderColor = "red";
    }else if (comp_choise === "scissor") {
        img3.style.borderColor = "red";
    }

    console.log(`Computer : ${comp_choise}`);
    if (user_choise === "rock") {
        console.log("User : Rock");
        if (comp_choise === "rock") {
            decision='draw'
        } else if (comp_choise === "paper") {
            decision = 'comp';
        }
        else if (comp_choise === "scissor") {
            decision='user'
        }
    }
    if (user_choise === "paper") {
        console.log("User : Paper");
        if (comp_choise === "rock") {
            decision='user'
        } else if (comp_choise === "paper") {
            decision = 'draw';
        }
        else if (comp_choise === "scissor") {
            decision='comp'
        }
    }
    if (user_choise === "scissor") {
        console.log("User : Scissor");
        if (comp_choise === "rock") {
            decision='comp'
        } else if (comp_choise === "paper") {
            decision = 'user';
        }
        else if (comp_choise === "scissor") {
            decision='draw'
        }
    }
    console.log(decision, "WON !");

    if (decision === 'user') {
        txt.innerText = 'You Won !!';
        txt.style.color = 'white';
        txt.style.backgroundColor = 'green';
        user_cnt++;
        document.querySelector("#user-count").innerText = user_cnt;
    } else if(decision==='comp'){
        comp_cnt++;
        txt.innerText='Marshal won !!'
        txt.style.backgroundColor = 'red';
        txt.style.color = 'white';
        document.querySelector("#comp-count").innerText = comp_cnt;
    } else if (decision === 'draw') {
        img1.style.borderColor = "transparent";
        img2.style.borderColor = "transparent";
        img3.style.borderColor = "transparent";
        txt.innerText = 'Its a draw';
        txt.style.backgroundColor = 'grey';
    }


}
let clear = () => {
    img1.style.borderColor = "transparent";
    img2.style.borderColor = "transparent";
    img3.style.borderColor = "transparent";
}
img1.addEventListener("click", () => {
    clear();
    user_choise = "rock";
    console.log(user_choise);
    img1.style.borderColor = "green";
    decison();
})
img2.addEventListener("click", () => {
    clear();
    user_choise = "paper";
    console.log(user_choise);
    img2.style.borderColor = "green";
    decison();
})
img3.addEventListener("click", () => {
    clear();
    user_choise = "scissor";
    console.log(user_choise);
    img3.style.borderColor = "green";
    decison();
})