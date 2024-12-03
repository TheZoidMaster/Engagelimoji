const script = document.createElement("script");
script.src = chrome.runtime.getURL("scripts/inject.js");
script.defer = true;
document.head.appendChild(script);

var customEmojis = {};
fetch(
    "https://raw.githubusercontent.com/TheZoidMaster/Engagelimoji/refs/heads/main/assets/emojis.json"
)
    .then((response) => response.json())
    .then((data) => {
        customEmojis = data;
    })
    .catch((error) => console.error("Error fetching custom emojis:", error));

function replaceEmojis() {
    document.querySelectorAll("[data-testid='chat-bubble']").forEach((el) => {
        if (!window.twemoji) return;
        window.twemoji.parse(el, {
            base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
            emojis: customEmojis,
        });
        el.querySelectorAll("img.emoji").forEach((emojiEl) => {
            if (emojiEl.parentElement.childNodes.length === 1) {
                emojiEl.classList.add("jumboable");
                emojiEl.parentElement.classList.add("jumboContainer");
            }
        });
    });
}

const observer = new MutationObserver(() => {
    replaceEmojis();
});

observer.observe(document.body, { childList: true, subtree: true });
