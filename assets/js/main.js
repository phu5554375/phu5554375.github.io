var section = document.querySelectorAll(".section");
var sections = {};
console.log(sections);
var i = 0;
// Lặp qua tất cả nội dung có trong class="section" mà nó bao bọc tất cả nội dung trên
Array.prototype.forEach.call(section, function(e) { 
  sections[e.id] = e.offsetTop;
  //nó sẽ lấy giá trị mà mình scroll phần tử với mà mình chọn so với khoảng cách phần tử cha và gán cho id có trong class="section"
});
Các bạn thử console.log(sections) thì các bạn sẽ biết độ cao của id="about-me",...

window.onscroll = function() {
  var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
  for (i in sections) {
  
  // Nếu mà giá trị section <= giá trị scrollTop mà mình scroll được thì mỗi thẻ a sẽ được addClass là active. Nếu mà giá trị đó lớn hơn thì những thằng nào có class="active" sẽ thành class rỗng. Thì nó sẽ ẩn class trong mỗi thẻ a. 
    if (sections[i] <= scrollPosition) {
      document.querySelector('.active').setAttribute('class', ' ');
      document.querySelector('a[href*=' + i + ']').setAttribute('class', 'active');
    }
  }
};