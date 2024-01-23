const socket=io()
let intro;
let textarea=document.getElementById("textarea");
let messageArea=document.querySelector(".messagearea");



do{
    intro=prompt("Please enter Your Name:")
}while(!intro);



textarea.addEventListener("keyup",(e)=>{
if(e.key === "Enter"){
    sendMessage(e.target.value);
}
})



function  sendMessage(message){
    let msg ={
user:intro,
message:message.trim()

    }
//append
    appendMessage(msg, "out")
    textarea.value="";
    scrollTOBottom()


    //send to server
socket.emit("message", msg)

}



function appendMessage(msg ,type){
    let mainDiv=document.createElement("div")
    let className =type
    mainDiv.classList.add(className,"message");

    let markup=`
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
mainDiv.innerHTML=markup

messageArea.appendChild(mainDiv);

}


//recieve message

socket.on("message",(msg)=>{
    appendMessage(msg , "in");
    scrollTOBottom()
})


function scrollTOBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}

