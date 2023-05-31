const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDgwZWRlZTA1ZDUxZWQ3OWQ1NGYzNmYxYzc5ZjdlZCIsInN1YiI6IjY0NzE0YmQ0ODgxM2U0MDEwMzU2YjRiMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J4EaZaROzOT41aMCipYrRWayXCxv1JIWJ182czkrun8'
  }
};

let movieMain = document.querySelector(".slide-inner")
let movieList = document.querySelector("#movie-list");
let movieout

let mainDraw = function(keyvalue = Array) {
  keyvalue.forEach((a, b) => {
    let { title: name, vote_average: rating, vote_count: vote, overview, poster_path: imgSrc, id } = a
    let temp_html
    if(b < 3) {
      temp_html =`
      <div class="slide">
      <div class="slide-num" onclick="idAlert(this)">
      <div class="slide-img">
      <img src="https://image.tmdb.org/t/p/w500${imgSrc}" alt="${name} poster">
      </div>
                <div class="slide-info">
                    <div class="rank">Rank ${b + 1}</div>
                    <div class="title" id="${id}">${name}</div>
                    <div class="rating">Rating : ${rating} / vote : ${vote}</div>
                    <div class="caption">${overview}</div>
                </div>
            </div>
          </div>`;
          movieMain.insertAdjacentHTML("beforeend",temp_html)
          }
      })
      console.log("메인 영역은 성공!")
    }

let listDraw = function(keyvalue = Array) {
      // 새롭게 temp_html에 값을 할당하고.
      keyvalue.forEach((a, b) => {
        //구조분해할당 / 키값을 그대로 활용 하거나 : 변수명 으로 지정이 가능하다.
        let { title: name, vote_average: rating, vote_count: vote, overview, poster_path: imgSrc, id } = a

        let temp_html = "";

        if( b >= 3){
      temp_html =`
                  <div class="list-content">
                    <div class="list-num" onclick="idAlert(this)">
                      <div class="rank">
                          <div>Rank</div>
                          <div>${b + 1}</div>
                      </div>
                      <div class="list-img" style="">
                          <img src="https://image.tmdb.org/t/p/w500${imgSrc}" alt="name poster">
                      </div>
                      <div class="list-info" >
                          <div class="title" id="${id}">${name}</div>
                          <div class="rating">Rating : ${rating} / vote : ${vote}</div>
                          <div class="caption">${overview}</div>
                      </div>
                    </div>
                  </div>`;
        // 상단에 선언한 movieList위치에 temp_html을 append합니다.
        movieList.insertAdjacentHTML("beforeend",temp_html)
       }}
       )
      console.log('리스트도 성공')
      };
      
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(data =>  {
        movieout = data.results
        const movie = data.results

        movie.sort((a, b) => {
            return b['vote_average'] - a['vote_average'] || b['vote_count'] - a['vote_count']
          });
          
          movieList.innerHTML=""
          movieMain.innerHTML=""
          
          mainDraw(movie)
          listDraw(movie)
          
        })
        .catch(err => console.error(err));

        
let getInput = function() {
  const inputVal = document.getElementById("search-input").value;
  return inputVal
}

function fnEnterKey () {
  if (window.event.keyCode == 13) {
    pushButton()
  }
}

let inputval
let pushButton = function () {
    console.log('클릭했습니다.')
    inputval = getInput()
     movieList.innerHTML=""

    movieSearch = movieout.filter(function(item){
      return item.title.match(new RegExp(inputval, "i"))
    })

    console.log(movieSearch)
    movieSearch.forEach((a, b) => {
    let { title: name, vote_average: rating, vote_count: vote, overview, poster_path: imgSrc, id } = a
     
    let temp_html = "";
    
    temp_html =`
      <div class="list-content">
        <div class="list-num" onclick="idAlert(this)">
          <div class="rank">
            <div>Rank</div>
            <div>${b + 1}</div>
           </div>
           <div class="list-img" style="">
             <img src="https://image.tmdb.org/t/p/w500${imgSrc}" alt="name poster">
           </div>
           <div class="list-info" >
           <div class="title" id="${id}">${name}</div>
           <div class="rating">Rating : ${rating} / vote : ${vote}</div>
           <div class="caption">${overview}</div>
          </div>
        </div>
      </div>`;
      movieList.insertAdjacentHTML("beforeend",temp_html)

})
console.log('리스트 검색 성공')
            }
     
function idAlert(idclick) {
  let titleSelector = idclick.querySelector(".title")
  alert(`movie id is ${titleSelector.id}`)
}



//슬라이더기능
/*
  div사이즈 동적으로 구하기
*/
const outer = document.querySelector('#slider');
const innerList = document.querySelector('.slide-inner');
const inners = document.querySelectorAll('.slide');
let currentIndex = 0; // 현재 슬라이드 화면 인덱스

inners.forEach((inner) => {
  inner.style.width = `${outer.clientWidth}px`; // inner의 width를 모두 outer의 width로 만들기
})

innerList.style.width = `${outer.clientWidth * inners.length}px`; // innerList의 width를 inner의 width * inner의 개수로 만들기

/*
  버튼에 이벤트 등록하기
*/
const buttonLeft = document.querySelector('.button-left');
const buttonRight = document.querySelector('.button-right');

buttonLeft.addEventListener('click', () => {
  currentIndex--;
  currentIndex = currentIndex < 0 ? 0 : currentIndex; // index값이 0보다 작아질 경우 0으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

buttonRight.addEventListener('click', () => {
  currentIndex++;
  currentIndex = currentIndex >= inners.length ? inners.length - 1 : currentIndex; // index값이 inner의 총 개수보다 많아질 경우 마지막 인덱스값으로 변경
  innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`; // index만큼 margin을 주어 옆으로 밀기
  clearInterval(interval); // 기존 동작되던 interval 제거
  interval = getInterval(); // 새로운 interval 등록
});

/*
  주기적으로 화면 넘기기
*/
const getInterval = () => {
  return setInterval(() => {
    currentIndex++;
    currentIndex = currentIndex >= inners.length ? 0 : currentIndex;
    innerList.style.marginLeft = `-${outer.clientWidth * currentIndex}px`;
  }, 5000);
}

let interval = getInterval(); // interval 등록

// ----------------------------------------------------------------------------------------