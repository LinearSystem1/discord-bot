module.exports = {
    name: 'Knucklebones',
    description: 'The classic game of Knucklebones.',
    deleted: false,
    devOnly: false,
    testOnly: false,

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
            
        }
    },
};