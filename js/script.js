const inputBox = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');
const Lyricsbtn = document.querySelector('.btn');
const songs = document.querySelector('.songs')
const containerSongs = document.querySelector('.songlist');
const nextBtn = document.querySelector('.nextBtn');


submitBtn.addEventListener('click',function(e)
{
    e.preventDefault();
    if(inputBox.value == "")
    {
        alert("Please Enter song or Artist name"); 
    }
    const query = inputBox.value;
    getDataFromApi(query);

});

async function getLyrics(artist,title)
{
    try{
        const dataRecieved = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        const json = await dataRecieved.json();
        const data = json

        console.log(data)

        if(data.lyrics)
        {
            containerSongs.innerHTML = `<h3>${artist} ${title}</h3>`
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            containerSongs.innerHTML += lyrics;
        }
        if(data.error)
            {alert(data.error)}

        }catch(error)
            {
                alert(error); 
            }
}

const getDataFromApi = async function(query){
    try{

        const dataRecieved = await fetch(`https://api.lyrics.ovh/suggest/${query}`);

        const trasformedData = await dataRecieved.json();
        const {data} = trasformedData;
        containerSongs.innerHTML = " "
        
        if(data.length == 0)
        {
            containerSongs.innerHTML += "No Songs Available"
        }
        
        for(i=0;i<data.length;i++)
        {
            containerSongs.innerHTML += `<li>
                <span><strong>${data[i].title}</strong>  - ${data[i].artist.name}</span>
                <button class="btn" onclick = "getLyrics('${data[i].artist.name}','${data[i].title}')">Get Lyrics</button>
            </li>`
        }
    }catch(error)
    {
        console.log(error);
        containerSongs.innerHTML = error
    }
}