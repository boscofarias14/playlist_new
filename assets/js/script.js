var playListlocal = new Array();
var audio = document.getElementById("music");
var tituloMusica = $("#tituloMusica");
var listarMusicasPlaylist = function(itens){
    $.each(itens, function(indiceLS, valorLS){
        var ulPlaylistLocal = $("#playlist-local ul");
        ulPlaylistLocal.append("<li>");
        var template = `<a id="linkPlaylist-${valorLS.id}" href="">
                            <div class="info-musica">
                                <h6>#${valorLS.id} ${valorLS.titulo}</h6>
                                <span><em>${valorLS.cantor}</em></span>
                            </div>	
                        </a>
                        <a id="linkRemove-${valorLS.id}" href="">
                            <div class="col s4"><i class="small material-icons">remove_circle</i></div>
                        </a>`;
        var liPlaylistGeral = $(`#playlist-local ul li:nth-child(${indiceLS + 1})`);
        liPlaylistGeral.append(template);
    });
}

if(localStorage.musicas && localStorage.musicas.length > 0){
    playListlocal = JSON.parse(localStorage.musicas);
    console.log(playListlocal);
    listarMusicasPlaylist(playListlocal);
}
var executarMusica = function(musica){
    audio.src = `${musica.url}`;
    tituloMusica.html(musica.titulo);
    audio.play();
    // var playPromise = document.querySelector('audio').play;
    // if(playPromise != undefined){
    //     playPromise.then(function(){
    //         audio.addEventListener('loadeddata', function(){
    //             playPromise = audio.play();
    //         })
    //         audio.load();
    //     })
    // }
    
}
var inserirMusicaNaPlaylist = function(valorPlaylistGeral){
    //verifica se a música a ser adicionada já existe no LocalStorage;
    for(i=0; i<playListlocal.length;i++){
        if(playListlocal[i].id == valorPlaylistGeral.id){
            alert("Música já existe na playlist!");
            return;
        }
    }
    playListlocal.push(valorPlaylistGeral);
    localStorage.setItem('musicas', JSON.stringify(playListlocal));
    var ulPlaylistLocal = $("#playlist-local ul");
    ulPlaylistLocal.append("<li>");
    var template = `<a id="linkPlaylist-${valorPlaylistGeral.id}" href="">
                        <div class="info-musica">
                            <h6>#${valorPlaylistGeral.id} ${valorPlaylistGeral.titulo}</h6>
                            <span><em>${valorPlaylistGeral.cantor}</em></span>
                        </div>
                    </a>	
                    <a id="linkRemove-${valorPlaylistGeral.id}" href="">
                        <div class="col s4"><i class="small material-icons">remove_circle</i></div>
                    </a>`;
    var liPlaylistLocal = $(`#playlist-local ul li:last-child`);
    liPlaylistLocal.append(template);     
}

var removerMusicaDaPlaylist = function(valorPlaylistGeral){
    for(i = 0; i<playListlocal.length; i++){
        if(playListlocal[i].id == valorPlaylistGeral.id){
            var index = i;
            playListlocal.splice(index, 1);
        }
    }
    $(`#linkPlaylist-${valorPlaylistGeral.id}`).parent().remove();
    localStorage.musicas = JSON.stringify(playListlocal);
    
}
$.getJSON("lista-musicas.json",function (data) {
    $.each(data, function (indice, valor) { 
        var ulListaMusicasGeral = $("#lista-musicas-geral ul");
        ulListaMusicasGeral.append("<li>");
        var liListaMusicasGeral = $(`#lista-musicas-geral ul li:nth-child(${indice + 1})`);
        var template = `<div id="${valor.id}" class="info-musica">
                            <h6>#${valor.id} ${valor.titulo}</h6>
                            <span><em>${valor.cantor}</em></span>
                        </div>
                        <span>${valor.tempo}</span>							
                        <a id="linkAdd-${indice+1}" href="">
                            <div class="col s4"><i class="small material-icons">add_circle</i></div>
                        </a>`;
        liListaMusicasGeral.append(template);
        
        $(`#linkAdd-${indice+1}`).click(function (e) { 
            e.preventDefault();
            inserirMusicaNaPlaylist(valor);
            console.log(`ID: ${valor.id} | Título: ${valor.titulo}`);                
        });
        $(`#linkRemove-${valor.id}`).click(function (event){
            event.preventDefault();
            removerMusicaDaPlaylist(valor);
        });
        $(`#linkPlaylist-${valor.id}`).click(function(event){
            event.preventDefault();
            executarMusica(valor);
            console.log(`ID: ${valor.id} | Título: ${valor.titulo} `);
        })
    });
});
