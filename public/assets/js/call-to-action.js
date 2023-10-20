(function () {
    document.addEventListener('DOMContentLoaded', function () {
        enhanceWidgets(document);
    });

    function enhanceWidgets(parentElement) {
        parentElement.querySelectorAll('[data-call-to-action]').forEach(function (x) {
            x.addEventListener('click', function (event) {
                if (window.DataIntelligenceSubmitScript) {
                    event.preventDefault();
                    DataIntelligenceSubmitScript._client.sentenceClient.writeSentence({
                        predicate: "Call to action",
                        object: event.currentTarget.innerText.trim(),
                    });

                    var href = event.currentTarget.getAttribute("href");
                    var target = event.currentTarget.getAttribute("target") || "_self";
                    setTimeout(function () {
                        window.open(href, target);
                    }, 500);
                }
            });
        });
    }
})();
