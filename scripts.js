const katakana = ["ア", "イ", "ウ", "エ", "オ", "カ", "キ", "ク", "ケ", "コ", "サ", "シ", "ス", "セ", "ソ", "タ", "チ", "ツ", "テ", "ト", "ナ", "ニ", "ヌ", "ネ", "ノ", "ハ", "ヒ", "フ", "ヘ", "ホ", "マ", "ミ", "ム", "メ", "モ", "ヤ", "ユ", "ヨ", "ラ", "リ", "ル", "レ", "ロ", "ワ", "ヰ", "ヱ", "ヲ", "ン"]
const hiragana = ["あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ", "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と", "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ", "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り", "る", "れ", "ろ", "わ", "wi", "we", "を", "ん"]
const romanji = ["a", "i", "u", "e", "o", "ka", "ki", "ku", "ke", "ko", "sa", "shi", "su", "se", "so", "ta", "chi", "tsu", "te", "to", "na", "ni", "nu", "ne", "no", "ha", "hi", "fu", "he", "ho", "ma", "mi", "mu", "me", "mo", "ya", "yu", "yo", "ra", "ri", "ru", "re", "ro", "wa", "wi", "we", "wo", "n"]
const typesWrite = {"katakana": katakana, "hiragana": hiragana}


function getRandomRomanji(){
    const random = Math.floor(Math.random() * romanji.length);
    return romanji[random];
};

function shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  }

class System{

    constructor(type){
        this.type = type
        this.write = typesWrite[type];
        this.writeRomanji = romanji;
        this.choice = null;
        this.score = 0;
        this.done = [];
        this.wrongs = []
    }

    getRandom(){
        
        if (this.done.length == this.write.length || (this.type == "hiragana" && this.done.length == (this.write.length-2))){
            document.body.innerHTML = "";
            const TextElement = document.createElement("h1");
            TextElement.className = "center"
            TextElement.innerHTML = `Everything is done! You got ${this.score} out of ${this.done.length} correct!`;
            document.body.appendChild(TextElement)
            if (this.wrongs.length > 0){
                let count = 1
                const wrongStatus = document.createElement("h3")
                wrongStatus.innerHTML = `Heres everything you got wrong!`
                wrongStatus.className="center"
                document.body.appendChild(wrongStatus)
                const wrongDiv = document.createElement("div")
                wrongDiv.className = "center"
                this.wrongs.forEach((x)=>{
                    const wrongText = document.createElement("h3")
                    wrongText.innerHTML = `${count}: ${this.write[x]}  :  ${this.writeRomanji[x]}`
                    wrongDiv.appendChild(wrongText)
                    count += 1
                })
                document.body.appendChild(wrongDiv);
            }
            return
        }

        const random = Math.floor(Math.random() * this.write.length);
        if (this.done.includes(random) || this.write[random].includes('w')){
            return this.getRandom();
        }
        
        this.choice = random;
        this.done.push(this.choice)
        return this.write[this.choice];
    };
    
    update(){
        document.getElementById("score").innerHTML = "Score: "+ this.score;
        document.getElementById("buttons").innerHTML = "";
        document.getElementById("japText").innerHTML = this.getRandom();
        const randomList = [this.writeRomanji[this.choice]]
        for (let i = 0; i < 3; i++) {
            let romanji = getRandomRomanji();
            if (romanji == this.writeRomanji[this.choice]){
                i--
            }else{
                randomList.push(romanji)
            }
        }
        shuffle(randomList)
        randomList.forEach((x)=>
    {
        const button = document.createElement("button")
        button.innerHTML = x;
        if (x == this.writeRomanji[this.choice]){
            button.id = "true";
            button.onclick = this.correct.bind(this)
        }else{
            button.id = "false";
            button.onclick = this.wrong.bind(this)
        }
        document.getElementById("buttons").appendChild(button);
    })
        
      }

    correct(){
        document.getElementById("status").innerHTML = "Correct!";
        this.score += 1;
        this.update()
    }

    wrong(){
        document.getElementById("status").innerHTML = "Wrong!";
        this.wrongs.push(this.choice)
        this.update()
    }

}






  