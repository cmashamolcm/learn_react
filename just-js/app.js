const button = document.querySelector("button");

button.addEventListener("click", getDialog);

var modal;

function getDialog() {
    if(modal){
        return;
    }
    console.log("Clicked...");
    modal = document.createElement("div");
    const paragraph = document.createElement("p");
    paragraph.textContent = "Test text";
    modal.append(paragraph);
    document.body.append(modal);
}