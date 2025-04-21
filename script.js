const searchBtn=document.getElementById("searchBtn");
const wordInput=document.getElementById("wordInput");
const resultBox=document.getElementById("resultBox");
const darkToggle=document.getElementById("darkToggle");


searchBtn.addEventListener("click",searchWord);
darkToggle.addEventListener("click",toggleDarkMode);

function toggleDarkMode(){
    document.body.classList.toggle("dark-mode")

}
wordInput.addEventListener("keydown",function(event){
    if (event.key ==="Enter"){
        searchWord();
    }
})
function searchWord() {
    word=wordInput.value.trim();
    if(word ===''){
        resultBox.innerHTML=`<p> Please enter a word.</p>`;
        return;
    }
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
.then(response => response.json())
.then(data =>{
    if(data.title === "No Definitions Found"){
        resultBox.innerHTML = `<p>No definition found for "${word}".</p>`;
    }
    else{
        const definition = data[0].meanings[0].definitions[0].definition;
        const partOfSpeech = data[0].meanings[0].partOfSpeech;
        const phonetic = data[0].phonetic || "N/A";

        resultBox.innerHTML=`
          <h2>${word}</h2>
          <p><strong>Phonetic:</strong> ${phonetic}</p>
          <p><strong>Part of Speech:</strong> ${partOfSpeech}</p>
          <p><strong>Definition:</strong> ${definition}</p>
        `;

    }
})
.catch(error =>{
    resultBox.innerHTML=`<p>Error fetching definition.</p>`;
    console.error(error);


});
}