module.exports = {
    name: "roll",
    description: "Shows the number of time you have counted",
    cooldown: 5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: ["344915148487786498"],
    options: [],
    run: async (client, interaction) => {
        const {guild, member} = interaction;

        let giveaway_file = JSON.parse(fs.readFileSync(`./database/giveaway2.json`))
        let ENTRIES = giveaway_file.entries
        let ids = []
        let winners = []

        for(let keys in ENTRIES){
            ids.push([keys, ENTRIES[keys]])
        }

        while(winners.length < 20){
            let item = pullItem()
            if(!winners.includes(item)) winners.push(item)
        }
        

        let msg = ''

        console.log(winners)

        function pullItem(){
            return ids[Math.floor(Math.random()*ids.length)]
        }

    }
}