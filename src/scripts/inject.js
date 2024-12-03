(function () {
    const originalDeleteMessageById = window.deleteMessageById;

    window.deleteMessageById = function (messageId) {
        console.log("deleteMessageById was called with:", messageId);

        if (originalDeleteMessageById) {
            return originalDeleteMessageById.apply(this, arguments);
        }
    };
})();
