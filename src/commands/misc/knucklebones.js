module.exports = {

    deleted: false,
    devOnly: false,
    testOnly: false,
    name: 'knucklebones',
    description: 'The classic game of Knucklebones.',

    callback: async (client, interatction) => {
        await interatction.deferReply();

        //I cant wait to write so much logic
        //const p1 = uhh
        //const p2 =...
        const diceNum = [0, 1, 2, 3, 4, 5, 6]
        var row1 = []
        var row2 = []
        var row3 = []

        function declareDiceNum() {
            var dice = Math.floor(Math.random() * diceNum.length);
            return dice
        }
        var dice = declareDiceNum()
        interatction.editReply(dice)
    },
};