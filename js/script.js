//function for return of correct ajax object for cross browser

 
   
 
function getHttpObject(){
//    if(document.getElementById("btnAjaxLoad").onclick != function()){
//       outputElement.innerHTML = "No data";
//       }
//       else
//       {
    var xhr;
    var ajaxLoad = document.getElementById("btnAjaxLoad");
    
    if(window.XMLHttpRequest){
        xhr = new XMLHttpRequest();
//        browser current
    }
    else if(window.ActiveXObject) {
//        check for ie6
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
    }
    return xhr;
  }
//}
   
   

function ajaxCall(dataUrl, outputElement, callback){
    
var request = getHttpObject();
   
outputElement.innerHTML = "Data Loading";

    request.onreadystatechange = function() {
        if(request.readyState == 4 && request.status == 200){
             var games = JSON.parse(request.responseText);
            if(typeof callback == "function"){
                callback(games);
            }
        }
    }
//   
    request.open("GET", dataUrl, true);
    request.send(null);
    
}


    (function(){
    
    var searchForm = document.getElementById("search-form");
    var searchField = document.getElementById("sInput");
    var getAll = document.getElementById("btnAllGames");
    var saveItem = document.getElementById("btnLocalSave");
    var localLoad = document.getElementById("btnLocalLoad");   
    var ajaxLoad = document.getElementById("btnAjaxLoad");
    var clearItem = document.getElementById("btnLocalClear");
    var target = document.getElementById("output");
    
    var gameListMethod = {
        gameData : "",
        search : function(event){ 
            
            var output = document.getElementById("output");
            
             ajaxCall('data/games.json', output, function (data) {
            
            
            gameListMethod.gameData = data
            var searchValue = searchField.value,
            listGames = data.games,     
            count = listGames.length, 
            i;
            
            event.preventDefault();
            
            target.innerHTML = "";
            
            if(count > 0 && searchValue !== ""){
                
                for(i = 0; i < count; i ++){
                    
                    var obj = listGames[i],
                     isItFound = obj.title.indexOf(searchValue);
                    
                    if (isItFound !== -1){
                     

                        target = document.getElementById("output");
                        var gTitle = document.createElement("p");
                        
                        var gLink = document.createElement("a");
                        var linkTxtNode = document.createTextNode("Steam Page");
                        gLink.href = (obj.information);
                        
                        var createImgElement = document.createElement("img");
                        createImgElement.src = (obj.image);
                       

                        
                        var textRank = document.createTextNode( "Rank:"  + obj.rank);
                        var textTitle = document.createTextNode("Title:" + obj.title);
                        var textGenre = document.createTextNode("Genre:" + obj.genre);
                        var textPub = document.createTextNode("Publisher:" + obj.publisher);  
                      
                        target.appendChild(createImgElement);
                        gTitle.appendChild(textRank);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textTitle);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textGenre);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textPub);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(gLink);
                        gLink.appendChild(linkTxtNode);
                        target.appendChild(gTitle);
                        
//                        radio buttons
                        
                        
                  
                         
                    }
                 
                    
               
                 
                
                }
             }
             });
//            end ajax call
                      
            },
//        radioButtons : function() {
//          $("#item1").text(obj.title);  
//        },
        getAllTitles : function(){
                 var output = document.getElementById("output");
                 
             ajaxCall('data/games.json', output, function (data) {
             gameListMethod.gameData = data;    
            var listGames = data.games,     
            count = listGames.length, 
            i;
                 
                 
            target.innerHTML = "";
            var i;
            
            if (count > 0){
                
                for(i = 0; i < count; i ++){
                    
                    var obj = listGames[i];
//                    var labels = $(["#item1", "#item2", "#item3", "#item4", "#item5"]);
//                    var labelObj = { one: 1, two: 2, three: 3, four: 4, five: 5 };
//                    jQuery.each(labels, function(i, val){
//                       
//                        $(labels.title).text(obj.title);
//                        return (val === "five"); 
//                    });
                    $("#item" + i).text(obj.title);
                   
                    
                    
                      target = document.getElementById("output");
                        var gTitle = document.createElement("p");
                        var gLink = document.createElement("a");
                        var linkTxtNode = document.createTextNode("Steam Page");
                        gLink.href = (obj.information);
                     
                    var createImgElement = document.createElement("img");
                        createImgElement.src = (obj.image);
                        
//                    var iLink = obj.information.link(obj.information);
//                        var testLink = document.getElementById("output").innerHTML = iLink;
                        var textRank = document.createTextNode( "Rank:"  + obj.rank);
                        var textTitle = document.createTextNode("Title:" + obj.title);
                        var textGenre = document.createTextNode("Genre:" + obj.genre);
                        var textPub = document.createTextNode("Publisher:" + obj.publisher);  
                      
                        target.appendChild(createImgElement);
                        gTitle.appendChild(textRank);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textTitle);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textGenre);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(textPub);
                        gTitle.appendChild(document.createElement("br"));
                        gTitle.appendChild(gLink);
                        gLink.appendChild(linkTxtNode);
                        target.appendChild(gTitle);
//                    
                }
            }
             });
//            end ajax callS
        
        },
        localSave : function() {
            var stringData = JSON.stringify(gameListMethod.gameData)
            localStorage.setItem("saveobject",stringData);
        },
        localClear : function() {
            localStorage.removeItem("saveobject");
        },
        
        localLoad : function() {
            if(localStorage.saveobject === undefined){
                target.innerHTML = "No data saved!";
            }
            else{
            result = localStorage.getItem("saveobject");
                if(result === '""') {
                    target.innerHTML = "Data is empty!";
                }
                else{
                    data = JSON.parse(result);
                 gameListMethod.getAllTitles(data);
                }
//               
            }
        },
            
        setActiveSection : function(){
            
            this.parentNode.setAttribute("class", "active");
        },
        removeActiveSection : function(){
            
            this.parentNode.removeAttribute("class");
        }
            
                
        }
        getAll.addEventListener("click", gameListMethod.getAllTitles, false);
    
        searchForm.addEventListener("submit", gameListMethod.search, false);
    
        searchField.addEventListener("keyup", gameListMethod.search, false);
        
        saveItem.addEventListener("click", gameListMethod.localSave, false); 
        
        clearItem.addEventListener("click", gameListMethod.localClear, false);

        localLoad.addEventListener("click", gameListMethod.localLoad, false);
         
        
//        saveItem.addEventListener("click",  
    
    
                      
                        console.log(target);
                       
                         console.log(searchForm);
                        
// get all contacts when you click the button

                 
}());
