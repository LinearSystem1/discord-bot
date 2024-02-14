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
        const diceNum = [1, 2, 3, 4, 5, 6]
        const spaceState = [0, 1, 2, 3, 4, 5, 6]
        var row1P1 = []
        var row2P1 = []
        var row3P1 = []
        var row1P2 = []
        var row2P2 = []
        var row3P2 = []

        function declareDiceNum() {
            var dice = Math.floor(Math.random() * diceNum.length);
            return dice
        }
        var dice = declareDiceNum();
        function appendDice() {
            row1P1.push(diceNum[dice])
            row2P1.push(diceNum[dice])
            row3P1.push(diceNum[dice])
            row1P2.push(diceNum[dice])
            row2P2.push(diceNum[dice])
            row3P2.push(diceNum[dice])
        }
        interatction.editReply("number" + dice)
    },
};