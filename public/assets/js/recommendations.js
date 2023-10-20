(function () {
    function init() {
        if (window.DataIntelligenceSubmitScript) {
            recommendationFlow();
        }
        else {
            if (window.addEventListener) {
                window.addEventListener('decclientready', recommendationFlow, false);
            }
            else if (window.attachEvent) {
                window.attachEvent('decclientready', recommendationFlow);
            }
        }
    }

    function recommendationFlow() {
        const recommendationsMetadatas = document.getElementsByClassName("recommendations-metadata");
        for (let i = 0; i < recommendationsMetadatas.length; i++) {
            const currentRecommendationMetadata = recommendationsMetadatas[i];
            const uniqueId = currentRecommendationMetadata.getElementsByClassName("unique-id")[0].value;
            const webServicePath = currentRecommendationMetadata.getElementsByClassName("web-service-path")[0].value;
            const conversionId = currentRecommendationMetadata.getElementsByClassName("conversion-id")[0].value;
            const maxNumberOfItems = currentRecommendationMetadata.getElementsByClassName("max-number-of-items")[0].value;
            const siteId = currentRecommendationMetadata.getElementsByClassName("site-id")[0].value;

            executeRecommendationFlow(webServicePath, parseInt(conversionId), uniqueId, parseInt(maxNumberOfItems), siteId);
        }
    }

    function executeRecommendationFlow(webServicePath, conversionId, widgetUniqueId, maxNumberOfItems, siteId) {
        if (window.DataIntelligenceSubmitScript) {
            let clientJourney = window.DataIntelligenceSubmitScript._client.recommenderClient.getClientJourney();
            if (clientJourney && clientJourney.length > 0) {
                const data = {
                    conversionId: conversionId,
                    journeyJson: JSON.stringify(clientJourney)
                }

                getRecommendations(`/${webServicePath}/Default.GetRecommendations()?sf_site=${siteId}`, data)
                    .then(handleResponseData);
            }
        }

        function handleResponseData(data) {
            const recommendations = data.value;
            const recommendationsWrapperId = `recommendations-wrapper-${widgetUniqueId}`;
            if (recommendations && recommendations.length > 0) {
                const recommendationsWrapper = document.getElementById(recommendationsWrapperId);
                recommendationsWrapper.removeAttribute("hidden");
            }

            for (let i = 0; i < recommendations.length; i++) {
                if (i === maxNumberOfItems) {
                    break;
                }

                const recommendation = recommendations[i];
                const recommendationUrl = window.DataIntelligenceSubmitScript._client.recommenderClient.prepareRecommendationUrl(recommendation.Url, conversionId)
                const recommendationDivElement = document.createElement("div");
                const recommendationTitleElement = document.createElement(`a`);
                recommendationTitleElement.setAttribute("href", recommendationUrl);
                recommendationTitleElement.innerText = recommendation.Title;
                recommendationTitleElement.classList.add("fs-5");
                recommendationDivElement.appendChild(recommendationTitleElement);

                const recommendationsWrapper = document.getElementById(recommendationsWrapperId);
                const recommendationsDiv = recommendationsWrapper.getElementsByClassName("content-recommendations")[0];
                recommendationsDiv.appendChild(recommendationTitleElement);

                window.DataIntelligenceSubmitScript._client.recommenderClient.trackRecommendationShown(recommendation, conversionId);
            }
        }

        function getRecommendations(url, data) {
            const responseJson = fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            });

            return responseJson;
        }
    }

    document.addEventListener("DOMContentLoaded", init);
})();
