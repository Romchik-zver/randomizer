//! first part of code
let wheel = document.getElementById("wheel");

let section = [];

let spinBtn= document.getElementById("btn-spin");

let input = document.getElementById("input-adder");

let add = document.querySelector(".btn-add");

let options = document.querySelector(".options");

const remove = document.querySelector(".btn-clear");

const clear = document.querySelector(".btn-clear-all")

const text = document.getElementById('msg');

text.style.opacity = 0;

spinBtn.disabled = true;

const flashMessage = () => {

    text.classList.add('animate__fadeIn'); 
    text.style.opacity = 1

    setTimeout(() => {

            text.classList.remove('animate__fadeIn');
            text.classList.add('animate__fadeOut');

            setTimeout ( () => {

                text.classList.remove('animate__fadeOut');
                text.style.opacity = 0;

            }, 1000);

        }, 2500);
}

const addOptions=()=>{
    let val = input.value.trim();
    if (val === ""){
        alert("Пустая строка!")
        return
    };
    let trigger = false;
    if (options.children.length>0){
        for (i=0;i<options.children.length;i++){
            if (options.children[i].textContent.trim() === val){
                   trigger = true;
                   break
            }
        }
    };

    if (!trigger){
        let p = document.createElement("li");
        p.textContent=input.value;
        options.appendChild(p);
    };
    if (trigger){
        flashMessage()
    }
    spinBtn.disabled = false;
    input.value = ""
};


//! second part of code
const addSection=()=>{
    if (!(section.length>0)){
        for (i=0; i<options.children.length; i++){
            let a = options.children[i].textContent;
            section.push(a);
        }
    } else{
        section = [];
        for (i=0; i<options.children.length; i++){
            let a = options.children[i].textContent;
            section.push(a);
        }
    }
    return section
}
const styleWheel=()=>{
    let section = addSection();

    const colors = section.map(() => '#' + Math.floor(Math.random()*16777215).toString(16));

    let gradient = 'conic-gradient(';

    let angle = 360/section.length;
    
    section.forEach((el, i)=> {
        let start = angle * i;
        let end = angle * (i+1);
        gradient+= `${colors[i]} ${start}deg ${end}deg, `
    });

    wheel.style.background = gradient.slice(0, -2) + ')';
};


const spinWheel=()=>{
    let rotate = 'rotateZ(';
    let dgr = Math.floor(Math.random()*100) * Math.floor(Math.random()*360);
    rotate += `${dgr}deg)`;
    wheel.style.transform = rotate;
    return dgr
};
const addSectionToWheel = () => {
    let section = addSection();
    wheel.replaceChildren();
    
    if (!section || section.length === 0) return;
    
    const angle = 360 / section.length;
    const wheelSize = wheel.offsetWidth;
    const radius = wheelSize / 2 - 50; 
    
    section.forEach((text, i) => {
        const textEl = document.createElement('div');
        textEl.className = 'segment-text';
        if (text.length > 20){
            textEl.textContent = text.slice(0, 17) + "...";
        } else{
            textEl.textContent = text;
        }    
       
        const segmentCenterAngle = angle * i + angle / 2;
        
        const needFlip = segmentCenterAngle > 90 && segmentCenterAngle < 270;
        const flipAngle = needFlip ? 180 : 0;

        // textEl.style.outline = '1px solid red'; // Для отладки

        textEl.style.transform = `
            rotate(${segmentCenterAngle}deg)
            translateY(-${radius}px)
            translateX(10px)
            rotate(90deg)
        `;
        
        textEl.style.width = `${radius}px`;
        textEl.style.fontSize = `${Math.min(16, radius / 8)}px`;
        wheel.appendChild(textEl);
    });
};

const addSections = () => {
    addSectionToWheel();
    styleWheel();     

    const pointerAngle = 270;
    const rotate = spinWheel();
    const section = addSection();
    const angle = 360 / section.length
    const normalizedRotation= rotate % 360;
    let target = (pointerAngle - normalizedRotation)%360
    if (target < 0) target += 360;
    console.log(section[Math.floor(target / angle)])
    return section[Math.floor(target / angle)]

};
const result =()=>{
    spinBtn.disabled = true;
    spinBtn.style.background = "#808080"
    spinBtn.style.color = "#000000ff"
    const res = addSections();
    setTimeout(()=>{
        const modalWindow = document.getElementById("myDialog");

        modalWindow.replaceChildren()

        const p = document.createElement("p");
        const btn = document.createElement("button");
        const h2 = document.createElement("h2");

        btn.className = "close-btn"
        btn.addEventListener("click", ()=>{
            modalWindow.close()
        })
        h2.textContent = "RESULT 👑"
        p.textContent=`🎉 Winner: ${res}`;

        modalWindow.appendChild(btn);
        modalWindow.appendChild(h2);
        modalWindow.appendChild(p);

        modalWindow.showModal()
        spinBtn.disabled =  false;
        spinBtn.style.background = "#000000ff"
        spinBtn.style.color = "#ffffffff"
    }, 4000)
    
    
}
spinBtn.addEventListener("click", result)
add.addEventListener("click", addOptions);
remove.addEventListener("click", (e)=>{
    options.removeChild(options.lastChild)
    spinBtn.disabled = true;
})
clear.addEventListener("click", (e)=>{
    options.replaceChildren()
    spinBtn.disabled = true;
})
input.addEventListener('keypress', (event) => {
    if (event.key === "Enter") {
        addOptions();
    }
});