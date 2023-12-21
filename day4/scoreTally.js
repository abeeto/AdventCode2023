const fs = require("fs").promises;


async function readFile(){
    try{
        const data = await fs.readFile('./rawCards.txt', 'utf8');
            // console.log(data);
            //parse each line as element of array
            const dataByLine = data.split('\n');
            const bothLines = dataByLine.map(line => line.split(':')[1]);

            return bothLines.reduce((sepLine, line) => {
                //sepLine is accumulator initially set to two empty arrays
                //line is the element of bothLines (unparsed)
                const parts = line.split('|');
                //push part before '|' into one array, the next part into second array

                sepLine[0].push(processLine(parts[0]))
                sepLine[1].push(processLine(parts[1]))
                //return sepLine which is two arrays - being assigned to winCard and myCard resp.
                return sepLine
            }, [[], []])
        }catch (err){
            console.log(err);
        }   
    } 
function processLine(lineToParse){
    let toParse =  lineToParse.trim().split(' ');
    toParse = toParse.filter(e => e.length>0)

    //make the list from string to int by parsing each string element to base10 int
    toParse = toParse.map(x=> parseInt(x, 10))
    return toParse
}
function findMatch(winRow, myRow){
    //stage two: find matching elements

    let match = [];
    for(let i = 0; i < winRow.length; i++){
        let valToCheck = winRow[i]
        if(myRow.includes(valToCheck)){
            match.push(valToCheck);
        }
    }
    const rowScore = match.length > 0 ? 2**(match.length - 1) : 0;
    return rowScore;
}
async function main(){
    //stage one: parse data
    const [winCards, myCards] = await readFile();
    let sum = 0;
    for(let i = 0; i < winCards.length; i++){
        sum += findMatch(winCards[i], myCards[i]);
    }
    console.log(sum);
}
main();