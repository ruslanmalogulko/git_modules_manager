const log = (messages) => {
    if (Array.isArray(messages)) {
        messages.forEach(message => console.log(message));
    } else {
        console.log(messages);
    }
};

module.exports = {
    log
};
