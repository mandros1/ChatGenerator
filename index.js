const mainDiv = document.getElementById('chat-container');
    const divChatContainer = document.createElement('div');
    divChatContainer.setAttribute('id', 'chatDiv');

        const divPopupWindow = document.createElement('div');
        divPopupWindow.setAttribute('id', 'popup');

            // OVDJE IDU 2 DIVA I SVE STO TREBA

        const divPopupButton = document.createElement('div');
        divPopupButton.setAttribute('id', 'buttonDiv');

            // Button that shows and hides chat popup window is defined here
            const chatPopupButton = document.createElement('button');
            chatPopupButton.innerText = "CHAT";
            chatPopupButton.setAttribute('id', 'expandButton');

            chatPopupButton.addEventListener('click', ()=>{
                const divChatWindow = document.getElementById('popup');
                divChatWindow.style.visibility === 'hidden'
                || divChatWindow.style.visibility === ""
                    ? divChatWindow.style.visibility = 'visible'
                    : divChatWindow.style.visibility = 'hidden';
            });

        divPopupButton.appendChild(chatPopupButton);

    // Adding created divs to the container which needs to be pushed in the pre-created
    divChatContainer.appendChild(divPopupWindow);
    divChatContainer.appendChild(divPopupButton);


    // mainDiv.appendChild(divChatContainer);


    const btn = document.getElementById('expandButton');
    btn.addEventListener("click", ()=> {
        const div = document.getElementById('popup');
        div.style.visibility === 'hidden'
        || div.style.visibility === ""
            ? div.style.visibility = 'visible'
            : div.style.visibility = 'hidden';
    });
