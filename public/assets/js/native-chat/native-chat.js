(function() {
    var chatWindowId = "kcChatWindow";
    var chatSettings;

    document.addEventListener('DOMContentLoaded', function () {
        var settingsElement = document.getElementById("native-chat-data");
        if (settingsElement) {
            chatSettings = JSON.parse(settingsElement.textContent)

            var display = {
                id: chatWindowId,
                origin: "",
                display: {
                    mode: chatSettings.chatMode,
                    launcher: {
                        openIconUrl: chatSettings.openIconUrl,
                        closeIconUrl: chatSettings.closeIconUrl
                    },
                    containerId: chatSettings.containerId
                },
                chat: chatSettings
            };
            if (window.DataIntelligenceSubmitScript) {
                initChat(chatSettings, display);
            }
            else if (document.getElementById('sf-insight-settings')) {
                if (window.addEventListener) {
                    window.addEventListener('decclientready', initChat.bind(this, chatSettings, display), false);
                }
                else if (window.attachEvent) {
                    window.attachEvent('decclientready', initChat.bind(this, chatSettings, display));
                }
            }
            else {
                initChat(chatSettings, display);
            }
        }
    });

    function initChat(chatSettings, display) {
        var canTrack = typeof TrackingConsentManager === "undefined" ? true : TrackingConsentManager.canTrackCurrentUser();
        var userData = {};
        if (canTrack) {
            var userData = getUserData();
            if (userData !== "") {
                userData = JSON.parse(userData);

                if (userData.LastName === null) {
                    userData.LastName = "";
                }

                var emptyGuid = chatSettings.emptyGuid;
                if (userData.value.Id == emptyGuid) {
                    var insightSubject = chatSettings.insightSubject;
                    userData.value = {
                        FirstName: "Anonymous",
                        LastName: "Anonymous",
                        Id: insightSubject,
                        ProviderType: "Sitefinity Insight",
                    };
                }

                chatSettings.user = {
                    firstName: userData.value.FirstName,
                    lastName: userData.value.LastName,
                    id: userData.value.Id,
                    providerType: "Sitefinity",
                    hideName: true
                };
            }
        }

        var nativeChatLaunched = "nativechat-launched";

        if (chatSettings.proactive === "True" && chatSettings.chatMode !== 'inline') {
            if (chatSettings.isEdit === "False") {
                if (!sessionStorage[nativeChatLaunched]) {
                    display.display.launcher.popupDelayInMs = 3000;
                    sessionStorage[nativeChatLaunched] = true;
                }
            }

            chatSettings.session.hideUserMessage = true;
        }

        if (chatSettings.bot.avatarUrl !== "") {
            chatSettings.bot.avatarUrl = window.location.origin + chatSettings.bot.avatarUrl;
        }

        if (window.DataIntelligenceSubmitScript) {
            chatSettings.session.context = {
                _systemTracking: {
                    insight: {
                        apiKey: window.DataIntelligenceSubmitScript._client.apiKey,
                        dataSource: window.DataIntelligenceSubmitScript._client.source,
                        subject: window.DataIntelligenceSubmitScript._client.sentenceClient.subjectKey,
                        apiServerUrl: window.DataIntelligenceSubmitScript._client.apiServerUrl,
                        canTrackCurrentUser: canTrack
                    }
                }
            };
        }

        window.NativeChat.load(display);

        var nativeChatLauncher = document.getElementById(`nativechat-launcher-${chatWindowId}`);
        if (nativeChatLauncher) {
            var nativeChatContainer = document.getElementById("nativechat-container");
            nativeChatLauncher.remove();
            nativeChatContainer.appendChild(nativeChatLauncher);
        }
    }

    function getUserData() {
        var url = window.location.origin + "/" + chatSettings.webServicePath + "/currentuser";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();

        return xhr.response;
    }
})();
