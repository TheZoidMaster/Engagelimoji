document.addEventListener("DOMContentLoaded", () => {
    fetch(
        "https://raw.githubusercontent.com/TheZoidMaster/Engagelimoji/refs/heads/main/assets/emojis.json"
    )
        .then((response) => response.json())
        .then((data) => {
            customEmojis = data;
            for (const emoji in customEmojis) {
                const emojiElement = document.createElement("div");
                emojiElement.classList.add("emoji-item");
                emojiElement.dataset.code = `:${emoji}:`;
                emojiElement.innerHTML = `:${emoji}:`;
                document.querySelector(".emoji-grid").appendChild(emojiElement);
                window.twemoji.parse(emojiElement, {
                    base: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/",
                    emojis: customEmojis,
                });
            }
            document.querySelectorAll(".emoji-item").forEach((item) => {
                item.addEventListener("click", () => {
                    const emojiCode = item.getAttribute("data-code");
                    navigator.clipboard
                        .writeText(emojiCode)
                        .then(() => {
                            alert(`Copied ${emojiCode} to clipboard!`);
                        })
                        .catch((err) => {
                            console.error("Failed to copy emoji code:", err);
                        });
                });
            });
        })
        .catch((error) =>
            console.error("Error fetching custom emojis:", error)
        );
});
