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

                    const inputField = document.createElement('input');
                    inputField.setAttribute('data-gramm_editor', 'false'); //this can be ommitted it is used to disable Grammarly
                    inputField.setAttribute('type', 'text');
                    inputField.setAttribute('id', 'input-text');
                    inputField.setAttribute('name', 'text');
                        let a = document.createElement('span');
                        a.innerHTML = "Po&scaron;alji poruku";
                    inputField.setAttribute('placeholder', a.textContent);

                divTextAreaContainer.appendChild(inputField);

                const divButtonContainer = document.createElement('div');
                divButtonContainer.setAttribute('id', 'container-button');

                    const divSendAction = document.createElement('div');
                    divSendAction.innerHTML = "&#187;";
                    divSendAction.setAttribute('id', 'send-button');

                    divSendAction.addEventListener('click', ()=>{

                        const inputElement = document.getElementById('input-text');
                        const text = inputElement.value;

                        if(text.length === 0) {
                            window.alert('Morate unjeti pitanje prije klika na gumb')
                        } else {

                            // ENABLE THIS AFTER TESTING - needed for our API
                                // let userId = localStorage.getItem('userId');
                                // if(userId){
                                //     // Do everything that needs to be done
                                // } else {
                                //     // can't send anything to API without userId
                                // }
                                let userId = 423532543;

                            let sanitizedText = text.replace(/[|&;$%@"<>()+,]/g, "");

                            appendChatDivElement(sanitizedText, true);

                            // let div = document.createElement('div');
                            // div.setAttribute('class', 'user-message');
                            // div.innerText = sanitizedText;
                            // document.getElementById('chat-window').appendChild(div);

                            inputElement.value = "";

                            // TODO: Change the route
                            let apiUrl = "http://localhost:3005/api/question";

                            let xhr = new XMLHttpRequest();

                            xhr.onreadystatechange = function() {
                                if (xhr.readyState === XMLHttpRequest.DONE) {
                                    let json = JSON.parse(xhr.responseText);
                                    let watsonMessages = json.message;
                                    let values = Object.values(watsonMessages);
                                    for (let i=0; i<values.length; i++) {
                                        if (values[i]['response_type'] === 'text') {
                                            appendChatDivElement(values[i]['text'], false);
                                        }
                                    }
                                }
                            };

                            xhr.open("POST", apiUrl, true);
                            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                            xhr.setRequestHeader("token", "DF3A2DEEB01F32C0C6B98DC810FB0D80");

                            xhr.send(`userId=${userId}&question=${sanitizedText}`);
                        }
                    });

                divButtonContainer.appendChild(divSendAction);

            divInputContainer.appendChild(divTextAreaContainer);
            divInputContainer.appendChild(divButtonContainer);

        divPopupWindow.appendChild(divChatWindow);
        divPopupWindow.appendChild(divInputContainer);

        const divPopupButton = document.createElement('div');
        divPopupButton.setAttribute('id', 'buttonDiv');

            // Button that shows and hides chat popup window is defined here
            const chatPopupButton = document.createElement('button');
            // TODO: find a way to replace 'CHAT' text with an icon/icons (enable/disable icon)
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


mainDiv.appendChild(divChatContainer);

/**

    const sendButton = document.getElementById('send-button');
    sendButton.addEventListener("click", ()=> {

        let txt = document.getElementById('input-text').value;
        if(txt.length > 0 ) {
            let div = document.createElement('div');
            div.setAttribute('class', 'user-message');
            div.innerText = txt
            document.getElementById('chat-window').appendChild(div);
            const div2 = document.createElement('div');
            div2.setAttribute('class', 'chatbot-message');
            div2.innerText = `Answer to "${txt}" is going to go here`;
            document.getElementById('chat-window').appendChild(div2);
        } else {
            window.alert('Input cannot be empty');
        }
    });


    const btn = document.getElementById('expandButton');
    btn.addEventListener("click", ()=> {
        const div = document.getElementById('popup');
        div.style.visibility === 'hidden'
        || div.style.visibility === ""
            ? div.style.visibility = 'visible'
            : div.style.visibility = 'hidden';

    });
*/

function appendChatDivElement(text, isUser) {
    let divClass = isUser === true ? 'user-message' : 'chatbot-message';
    let div = document.createElement('div');
    div.setAttribute('class', divClass);
    div.innerHTML = text;
    document.getElementById('chat-window').appendChild(div);
}
