
  $(document).ready(function(){
    $('.uudai-list-info').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 2,
        arrows:true,
        draggable:false,
        prevArrow:"<button type='button' class='slick-prev slick-arrow'><i class='fa-sharp fa-solid fa-arrow-right'></i></button>",
        nextArrow:"<button type='button' class='slick-next slick-arrow'><i class='fa fa-angle-right' aria-hidden='true'></i></button>"
      });
  });

  // SLIDE ITEM IMAGE DETAIL
  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
  });
  $('.slider-nav').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: true,
    autoplay:true,
    focusOnSelect: true
  });
 
  $('a[data-slide]').click(function(e) {
    e.preventDefault();
    var slideno = $(this).data('slide');
    $('.slider-nav').slick('slickGoTo', slideno - 1);
  });

  // VIDEO
  function videoIntroHotel()
  {
    alert("ok")
  }
let indexPage = 0;
window.onload = function()
{
    
  var hotelAPI = "http://localhost:3000/listhotel"
  apiPlaceHotel=""
  let itemPlace = document.querySelectorAll(".img-place")
  itemPlace.forEach(item=>{
    item.onclick = function(e)
    {
      let index = e.target.className.indexOf(' ')
      apiPlaceHotel=e.target.className.substring(0,index)
      window.location.href="list-hotel.html"
    }
  })
   

  
  function start()
  {
    getHotel(renderHotel)
    getHotel(renderRoom)
  }
  start()
 
  function getHotel(callback)
  {
    fetch(hotelAPI)
      .then(function(response){
        return response.json()
      })
      
      .then(callback)
  }
  function renderHotel(hotels)
  {
    var listHotel = document.querySelector('.list-hotel')
    var html =hotels[0].phuquoc.map((ele,index)=>{
      return `
                    <div class="lht-item" namePlace="${ele.id}">
                            <div class="combo-title">
                                <i class="fas fa-clock"></i>
                                <p>${ele.intro}</p>
                            </div>
                            <div class="lht-main" >
                                <div class="lht-img">
                                    <div class="lht-img-img" style="background-image:url('${ele.img_hotel}')"></div>
                                    <div class="voucher">
                                      <div>
                                        <p class="voucher-label">${ele.voucher}</p>
                                      </div>
                                    </div>
                                </div>
                                <div class="lht-content">
                                    <p class="lht-name">${ele.name_hotel}</p>
                                    <div class="lht-content_rate">
                                        <div class="lht-content_rate_star">
                                            ${
                                                ele.star==5?'<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
                                                :ele.star==4?'<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
                                                :ele.star==3?'<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
                                                :ele.star==2?'<span class="fa fa-star checked"></span><span class="fa fa-star checked"></span>'
                                                :ele.star==1?'<span class="fa fa-star checked"></span>'
                                                :''
                                            }
                                        </div>
                                        
                                        <div class="lht-content_rate_mark">
                                            <p style="margin-right: 5px">${ele.point}</p>
                                            <p style="color: #9fc43a;font-size: 14px;margin-right: 5px;">Tuyệt vời</p>
                                            <p style="font-size: 14px">| ${ele.count_cmt} đánh giá</p>
                                        </div>
                                    </div>
                                    <div class="lht-direct">
                                        <a href="">
                                            <span class="fa fa-map-marker"></span>
                                            ${ele.address} - <b style="color: #0b3af4">Xem bản đồ</b style="color: #40a6f2">
                                        </a>
                                    </div>
                                    <div class="lht-character" value-character="${ele.character}">
                                    </div>
                                    <div class="bonus-charact">
                                        <div>
                                            <span class="fa fa-star checked" style="color: white;"></span>
                                        </div>
                                        <div>${ele.bonus_character}</div>
                                    </div>
                                </div>
                                <div class="lht-price">
                                    <div id="status_room" value-status-room="${ele.status}">
                                        <div class="lht-price-detail" id="huy">${ele.price} VND</div>
                                        <div class="type_room">
                                            <div>
                                                <p style="font-weight:bold">${ele.type_room}</p>
                                                <p>${ele.type_room_bonus}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>`
    })
    listHotel.innerHTML=html.join('');

    // SET PRICE
    var price = document.querySelectorAll(".lht-price-detail")
    for(let i = 0;i<price.length;i++)
    {
        let money = price[i].innerText
        var price1 = Number(money.substring(0,money.indexOf(' ')))
        document.querySelectorAll(".lht-price-detail")[i].innerHTML = new Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(price1)+" VND"
    }

    let itemHotel = document.querySelectorAll('.lht-item')
    itemHotel.forEach(ele=>{
      ele.onclick = function(e)
      {
        console.log(ele.getAttribute("namePlace"))
      }
    })

    //CHARACTER
    let listCharacter = document.querySelectorAll('.lht-character')
    listCharacter.forEach(item=>{
        let arrCharacter = item.getAttribute('value-character').split(',');
        let itemCharacter = ''
        for(let i = 0;i<arrCharacter.length;i++)
        {
            let htmlCharacter = arrCharacter[i]
            itemCharacter += `<div class="lht-character_item"><span class="fa fa-check"></span>${htmlCharacter}</div>`
            
        }
        item.innerHTML = itemCharacter
    })

    //STATUS_ROOM
    let status_room = document.querySelectorAll('#status_room')
    // console.log(status_room[0]);
    status_room.forEach(ele=>{
        // console.log(ele.getAttribute('value-status-room'));
        if(ele.getAttribute('value-status-room')=="Hết phòng")
        {
            ele.querySelector('.type_room').style.display="none"
            ele.querySelector('.lht-price-detail').innerHTML = '<div class="lht-price-detail" id="huy"><span class="fa fa-clock-o"></span>HẾT PHÒNG</div>'

        }
    })

    //KHU VỰC
    var listKhuVuc = document.querySelector('.list-khuvuc')
    var htmlkv = hotels[1].kv_phuquoc.map(ele=>{
        return `<div label="1sao" class="filter-hotel-by-star">
                    <input type="checkbox">
                    ${ele.namekv}
                </div>`
    })
    listKhuVuc.innerHTML=htmlkv.join('');

    // LOẠI HÌNH NHÀ Ở
    var listLoaiHinhNhaO = document.querySelector('.list-loaihinhnhao')
    var htmlTypeRoom = hotels[2].type_room_phuquoc.map(ele=>{
        return `<div label="1sao" class="filter-hotel-by-star">
                    <input type="checkbox">
                    ${ele.type_room}
                </div>`
    })
    listLoaiHinhNhaO.innerHTML=htmlTypeRoom.join('');

    // KINH NGHIỆM DU LỊCH
    var kndl = document.querySelector('.kndl-content')
    var htmlKNDL = hotels[3].kndl_phuquoc
    // console.log(htmlKNDL)
    kndl.innerHTML=htmlKNDL;
  }

}
  function renderRoom(rooms)
  {
    var listroomblock = document.querySelector('.list-room-block')
    var htmlListRoomChoose = rooms[0].phuquoc[0].list_room.map(ele=>{
      return `
      <div class="room-item" id="${ele.idroom}">
        <div class="row">
          <div class="room-item-img col-md-5">
              <img class="" src="${ele.imgroom}" alt="">
          </div>
          <div class="col-md-7">
              <div>
                  <h3 style="font-size: 2.75rem;font-weight:bold">${ele.nameroom}</h3>
                  <div style="float: right;font-size:20px;">
                      <p>Chỉ từ</p>
                      <p style="color: #f39f2d; font-weight: 700;" class="price-detail">${ele.priceroom}</p>
                      <p>/đêm</p>
                  </div>
                  <div style="clear: both;display: flex;justify-content: space-between;font-size: 20px">
                      <button type="button" style="background-color: white;border-bottom: 1px solid blue;" data-toggle="modal" data-target="#myModal">Xem phòng</button>
                      <a  disable type="" value=${ele.idroom} class="btn-search-click btn-search-click-listhotel" style="width:fit-content;padding: 6px;font-size: 20px">Chọn phòng</a>
                  </div>
              </div>
          </div>
        </div>
      </div>
    `
    })
    listroomblock.innerHTML=htmlListRoomChoose.join('')
    
    let xx = document.querySelectorAll('.room-item')
    xx.forEach(ele=>{
        ele.onclick = function(e)
        {
            // console.log(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id)
            console.log(e.target.getAttribute('value'))
        }
    })

    //INTRO
    let introHotel = document.querySelector('.lht-content')
    let ele = rooms[0].phuquoc[0]
    let htmlIntro = `
                      <p class="lht-name" style="font-size: 20px !important">${ele.name_hotel}</p>
                      <div class="lht-content_rate">
                          <div class="lht-content_rate_star">
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                              <span class="fa fa-star checked"></span>
                          </div>
                          
                          <div class="lht-content_rate_mark">
                              <p style="margin-right: 5px">${ele.point}</p>
                              <p style="color: #9fc43a;font-size: 14px;margin-right: 5px;">Tuyệt vời</p>
                              <p style="font-size: 14px">| ${ele.count_cmt} đánh giá</p>
                          </div>
                      </div>
                      <div class="lht-direct">
                          <a href="">
                              <span class="fa fa-map-marker"></span>
                              ${ele.address}
                          </a>
                      </div>
                    `
    introHotel.innerHTML = htmlIntro


}


//PHÂN TRANG
const element = document.querySelector(".pagination ul");
let totalPages = 2;
let page = 1;
element.innerHTML = createPagination(totalPages,page);
// selecting required element
function createPagination(totalPages, page)
{  
let liTag = '';
let active;
let beforePage = page;
let afterPage = page + 1;
if(page > 1){ //show the next button if the page value is greater than 1
  liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${page - 1})"><span><i class="fa fa-angle-left"></i> Prev</span></li>`;
}

if(page > 2){ //if page value is less than 2 then add 1 after the previous button
  liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
  if(page > 3){ //if page value is greater than 3 then add this (...) after the first li or page
    liTag += `<li class="dots"><span>...</span></li>`;
  }
}

// how many pages or li show before the current li
if (page == totalPages) {
  beforePage = beforePage - 2;
} else if (page == totalPages - 1) {
  beforePage = beforePage - 1;
}
// how many pages or li show after the current li
if (page == 1) {
  afterPage = afterPage + 2;
} else if (page == 2) {
  afterPage  = afterPage + 1;
}

for (var plength = beforePage; plength <= afterPage; plength++) {
  if (plength > totalPages) { //if plength is greater than totalPage length then continue
    continue;
  }
  if (plength == 0) { //if plength is 0 than add +1 in plength value
    plength = plength + 1;
  }
  if(page == plength){ //if page is equal to plength than assign active string in the active variable
    active = "active";
  }else{ //else leave empty to the active variable
    active = "";
  }
  liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
}

if(page < totalPages - 1){ //if page value is less than totalPage value by -1 then show the last li or page
  if(page < totalPages - 2){ //if page value is less than totalPage value by -2 then add this (...) before the last li or page
    liTag += `<li class="dots"><span>...</span></li>`;
  }
  liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
}

if (page < totalPages) { //show the next button if the page value is less than totalPage(20)
  liTag += `<li class="btn next" onclick="createPagination(totalPages, ${page + 1})"><span>Next <i class="fa fa-angle-right"></i></span></li>`;
}
element.innerHTML = liTag; //add li tag inside ul tag
document.querySelector('.pagination').setAttribute("valuepagination",page);
indexPage = indexPage+1
return liTag; //reurn the li tag
}
//calling function with passing parameters and adding inside element which is ul tag


