// Slideshow Logic
let slides = document.querySelectorAll(".slide");
let index = 0;

function showSlides() {
    slides.forEach(s => s.classList.remove("active"));
    slides[index].classList.add("active");
    index = (index + 1) % slides.length;
}

setInterval(showSlides, 2500); // change image every 2.5 seconds


// Shayari Typing Effect
let shayariLines = [
    "Teri ek jhalak se dil mein aisi thandak baras jaati hai, ",
    "Jaise meri rooh ko teri mohabbat ki duaa choo kar guzar jaati hai,",
    "Aur sach keh doon… tu ho toh har dhadkan apne aap pyar ban jaati hai.💋💗"
];

let typed = "";
let lineIndex = 0;
let charIndex = 0;

function typeShayari() {
    if (lineIndex < shayariLines.length) {
        if (charIndex < shayariLines[lineIndex].length) {
            typed += shayariLines[lineIndex][charIndex];
            document.getElementById("typing").innerHTML = typed;
            charIndex++;
            setTimeout(typeShayari, 60);
        } else {
            typed += "<br><br>";
            charIndex = 0;
            lineIndex++;
            setTimeout(typeShayari, 800);
        }
    }
}

typeShayari();


// Next Page Link
function goNextPage() {
    window.location.href = "page3.html";
}