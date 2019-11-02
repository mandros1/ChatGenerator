// mainDiv is the only element that has to be predefined and preexisting in the html document which includes this script
const mainDiv = document.getElementById('chat-container');
    const divChatContainer = document.createElement('div');
    divChatContainer.setAttribute('id', 'chatDiv');

        // Chat popup window - Left main div holding input, send button, header and chat window
        const divPopupWindow = document.createElement('div');
        divPopupWindow.setAttribute('id', 'popup');

            const divChatHeader = document.createElement('div');
            divChatHeader.setAttribute('id', 'chat-header');

                const imageHeader = document.createElement('img');

                // Calculating the available space in the div header for the image
                let viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.8 * 0.1;

                imageHeader.setAttribute('src', `https://eu.ui-avatars.com/api/?name=Chatbot&length=1&size=${viewportHeight}&rounded=true&color=CD5C5C&background=fff`);
                imageHeader.setAttribute('alt', 'Avatar image');

                const div1 = document.createElement('div');
                div1.setAttribute('id', 'div1');
                const div2 = document.createElement('div');
                div2.setAttribute('id', 'div2');

                const textHeader = document.createElement('h2');
                textHeader.innerText = "ChatBot";

                div2.appendChild(textHeader);
                div1.appendChild(div2);

            divChatHeader.appendChild(imageHeader);
            divChatHeader.appendChild(div1);

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
                    inputField.addEventListener("keyup", function(event) {
                        if (event.which === 13) {
                            event.preventDefault();
                            document.getElementById("send-button").click();
                        }
                    });

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
                            // TODO: zamijeniti value sa tokenom iz session storage-a
                            xhr.setRequestHeader("token", "DF3A2DEEB01F32C0C6B98DC810FB0D80");

                            xhr.send(`userId=${userId}&question=${sanitizedText}`);
                        }
                    });

                divButtonContainer.appendChild(divSendAction);

            divInputContainer.appendChild(divTextAreaContainer);
            divInputContainer.appendChild(divButtonContainer);

        divPopupWindow.appendChild(divChatHeader);
        divPopupWindow.appendChild(divChatWindow);
        divPopupWindow.appendChild(divInputContainer);

        const divPopupButton = document.createElement('div');
        divPopupButton.setAttribute('id', 'buttonDiv');

            // Button that shows and hides chat popup window is defined here
            const chatPopupButton = document.createElement('button');
            // TODO: find a way to replace 'CHAT' text with an icon/icons (enable/disable icon)
            chatPopupButton.innerText = "CHAT";
            chatPopupButton.classList.add("chatExpandButton");
            chatPopupButton.classList.add("inactiveButton");
            chatPopupButton.setAttribute('id', 'expandButton');

            chatPopupButton.addEventListener('click', ()=>{
                const divChatWindow = document.getElementById('popup');

                if(chatPopupButton.classList.contains('inactiveButton')) {
                    chatPopupButton.classList.remove('inactiveButton');
                    chatPopupButton.classList.add('activeButton');
                } else {
                    chatPopupButton.classList.remove('activeButton');
                    chatPopupButton.classList.add('inactiveButton');
                }

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


function appendChatDivElement(text, isUser) {
    let divClass = isUser === true ? 'userMessage' : 'chatbotMessage';
    let div = document.createElement('div');
    div.setAttribute('class', divClass);
    div.innerHTML = text;
    document.getElementById('chat-window').appendChild(div);
}
