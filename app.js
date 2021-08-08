const sizes = document.querySelectorAll('.size');
const colors = document.querySelectorAll('.color');
const cans = document.querySelectorAll('.can');
const bgcolor = document.querySelectorAll('.gcolor');
const Bg = document.querySelector('.Background');

let prevColor = "blue";
let animationEnd = true;

function changeSize(){
    sizes.forEach(size => size.classList.remove('active'));
    this.classList.add('active');
}

function changeColor(){
    if(!animationEnd) return;
    let primary = this.getAttribute('primary');
    let color = this.getAttribute('color');
    let can = document.querySelector(`.can[color="${color}"]`);
    let gcolor = document.querySelector(`.gcolor[color="${color}"]`);
    let prevgcolor = document.querySelector(`.gcolor[color="${prevColor}"]`);

    if(color == prevColor) return;

    colors.forEach(c => c.classList.remove('active'));
    this.classList.add('active');

    document.documentElement.style.setProperty('--primary', primary);
    
    cans.forEach(s => s.classList.remove('visible'));
    can.classList.add('visible');

    bgcolor.forEach(g => g.classList.remove('first', 'second'));
    gcolor.classList.add('first');
    prevgcolor.classList.add('second');

    prevColor = color;
    animationEnd = false;

    gcolor.addEventListener('animationend', () => {
        animationEnd = true;
    })
}

sizes.forEach(size => size.addEventListener('click', changeSize));
colors.forEach(c => c.addEventListener('click', changeColor));

let x = window.matchMedia("(max-width: 420px)");

function changeHeight(){
    if(x.matches){
        let canHeight = cans[0].offsetHeight;
        Bg.style.height = `${canHeight * 1.2}px`;
    }
    else{
        Bg.style.height = "450px";
    }
}

changeHeight();

window.addEventListener('resize', changeHeight);