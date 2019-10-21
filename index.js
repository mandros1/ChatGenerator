const mainDiv = document.getElementById('chat-container');
    const divChatContainer = document.createElement('div');
    divChatContainer.setAttribute('id', 'chatDiv');

        const divPopupWindow = document.createElement('div');
        divPopupWindow.setAttribute('id', 'popup');

            const divChatWindow = document.createElement('div');
            divChatWindow.setAttribute('id', 'chat-window');

            const divInputContainer = document.createElement('div');
            divInputContainer.setAttribute('id', 'input-div');

                const divTextAreaContainer = document.createElement('div');
                divTextAreaContainer.setAttribute('id', 'container-input');

                    const textArea = document.createElement('textarea');
                    textArea.setAttribute('data-gramm_editor', 'false'); //this can be ommitted it is used to disable Grammarly
                    textArea.setAttribute('type', 'text');
                    textArea.setAttribute('id', 'area-text');
                    textArea.setAttribute('name', 'text');
                    textArea.setAttribute('placeholder', 'Ask me a question');

                divTextAreaContainer.appendChild(textArea);

                const divButtonContainer = document.createElement('div');
                divButtonContainer.setAttribute('id', 'container-button');

                    const buttonSend = document.createElement('button');
                    buttonSend.innerText = "Send";
                    buttonSend.setAttribute('id', 'send-button');
                    buttonSend.addEventListener('click', ()=>{
                        const divChatWindow = document.getElementById('area-text');
                        let inputText = divChatWindow.innerText;

                        if(inputText.length === 0) {
                            window.alert('You must type something in the input before clicking "Send"')
                        } else {
                            let userId = localStorage.getItem('userId');
                            if(userId){
                                // Do everything that needs to be done
                            } else {
                                // can't send anything to API without userId
                            }
                        }

                        // Check if there is anything in the input

                        // if NO,

                            // 1. send alert

                        // if YES

                            // 1. Take out the userId/token from local storage

                            // 2. SANITIZE AND VALIDATE inputText

                            // 3. append div element to the chatWindow for User

                            // 4. Call API and get response

                            // 5. Append div element to the chatWindow for Watson answer

                        // provjeriti ima li ista u text area
                    });


        divPopupWindow.appendChild(divChatWindow);

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
