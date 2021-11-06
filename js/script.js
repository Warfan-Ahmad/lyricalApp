const inputBox = document.getElementById('search');
const submitBtn = document.getElementById('submitBtn');
const Lyricsbtn = document.querySelector('.btn');
const songs = document.querySelector('.songs')
const containerSongs = document.querySelector('.songlist');
const nextBtn = document.querySelector('.nextBtn');


submitBtn.addEventListener('click',function(e)
{
    e.preventDefault();
    const query = inputBox.value;
    getDataFromApi(query);

});

function getLyrics(artist,title)
{

        const dataRecieved = fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`).then((res) => {
            return res.json();
        }).then((data)=> 
        {
            containerSongs.innerHTML = `<h3>${artist} ${title}</h3>`
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
            containerSongs.innerHTML += lyrics;
        });
}

const getDataFromApi = async function(query){
        const dataRecieved = await fetch(`https://api.lyrics.ovh/suggest/${query}`);

        const trasformedData = await dataRecieved.json();
        const {data} = trasformedData;
        
        console.log(data);
        containerSongs.innerHTML = " "
        
        for(i=0;i<data.length;i++)
        {
            containerSongs.innerHTML += `<li>
                <span><strong>${data[i].title}</strong>  - ${data[i].artist.name}</span>
                <button class="btn" onclick = "getLyrics('${data[i].artist.name}','${data[i].title}')">Get Lyrics</button>
            </li>`
        }
}