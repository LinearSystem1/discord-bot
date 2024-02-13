
module.exports = {
    deleted: false,
    testOnly: true,
    name: 'work-in-progress',
    description: 'Work in progress',


    callback: async (client, interatction) => {
        await interatction.deferReply();

        const list = ["-1 Level", "-3 Levels", "-5 Levels", "-10 Levels", "+1 Level", "+3 Levels", "+5 Levels", "+7 Levels", "Automatic HE Role", "Automatic TETH Role", "Automatic WAW Role", "Choosen Level Reset", "Go to #base-camp (damned for an hour get 3 levels for full sentence)", "Level Reset", "Librarian Role (Must have Colored Fixer, if not default to reroll)", "Double Trouble", "Reroll"];
        var random = Math.floor(Math.random() * list.length);
        interatction.editReply(list[random])

    },
};