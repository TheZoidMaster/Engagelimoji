const emojiMap = {};
fetch(
    "https://raw.githubusercontent.com/chalda-pnuzig/emojis.json/refs/heads/master/src/list.json"
)
    .then((response) => response.json())
    .then((data) => {
        data.emojis.forEach((emojiObj) => {
            const slug = emojiObj.name.replace(/\s+/g, "_");
            emojiMap[slug] = emojiObj.emoji;
        });
    })
    .catch((error) => console.error("Error fetching emojis:", error));

var customEmojis = {};
fetch(
    "https://raw.githubusercontent.com/TheZoidMaster/Engagelimoji/refs/heads/main/assets/emojis.json"
)
    .then((response) => response.json())
    .then((data) => {
        customEmojis = data;
    })
    .catch((error) => console.error("Error fetching custom emojis:", error));

function replaceTestEmojis() {
    document.querySelectorAll("[data-testid='text-bubble']").forEach((el) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const text = node.textContent;
            const regex = /:(\w+):/g;
            let match;
            while ((match = regex.exec(text))) {
                const emojiName = match[1];
                if (emojiMap[emojiName]) {
                    node.textContent = text.replace(
                        match[0],
                        emojiMap[emojiName]
                    );
                }
            }
        }
        if (!window.twemoji) return;
        window.twemoji.parse(el, {
            base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
            emojis: customEmojis,
        });
    });
}

const observer = new MutationObserver(() => {
    replaceTestEmojis();
});

observer.observe(document.body, { childList: true, subtree: true });
