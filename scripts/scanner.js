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
    document
        .querySelectorAll(
            "[data-testid='text-bubble'], .css-1uwms9u, .message-piece"
        )
        .forEach((el) => {
            if (!window.twemoji) return;
            window.twemoji.parse(el, {
                base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
                emojis: customEmojis,
            });
        });
}

const observer = new MutationObserver(() => {
    replaceEmojis();
});

observer.observe(document.body, { childList: true, subtree: true });
