
const main = document.getElementById('main');
const dialog = document.getElementById('dialog');

let dialogTitle;
let dialogImage;
let dialogDescription;
let pictureCounter;
let closeBtn;
let prevBtn;
let nextBtn;


const ANIMALS_DATA = {
    animals: [
        {
            id: 1,
            title: "Flamingos",
            file: "./img/birds.jpg",
            alt: "birds",
            description: "Elegante rosa Flamingos in ihrer natürlichen Umgebung"
        },
        {
            id: 2,
            title: "Elefanten",
            file: "./img/elephants_1.jpg",
            alt: "Elefanten",
            description: "Majestätische Elefanten in der Wildnis"
        },
        {
            id: 3,
            title: "Elefanten",
            file: "./img/elephants_2.jpg",
            alt: "Elefanten",
            description: "Elefanten beim Trinken am Wasserloch"
        },
        {
            id: 4,
            title: "Gazelle",
            file: "./img/gazelle.jpg",
            alt: "Gazelle",
            description: "Anmutige Gazelle in der Savanne"
        },
        {
            id: 5,
            title: "Nilpferd",
            file: "./img/hippo.jpg",
            alt: "Nilpferd",
            description: "Nilpferd entspannt am Strand"
        },
        {
            id: 6,
            title: "Leopard",
            file: "./img/leopard_1.jpg",
            alt: "Leopard",
            description: "Getarnter Leopard auf der Jagd im hohen Gras"
        },
        {
            id: 7,
            title: "Leopard",
            file: "./img/leopard_2.jpg",
            alt: "Leopard",
            description: "Ruhender Leopard entspannt auf einem Baumast"
        },
        {
            id: 8,
            title: "Löwe",
            file: "./img/lion_1.jpg",
            alt: "Löwe",
            description: "Stolzer Löwe mit prächtiger Mähne als König der Tiere"
        },
        {
            id: 9,
            title: "Löwe",
            file: "./img/lion_2.jpg",
            alt: "Löwe",
            description: "Löwe ruhend in der warmen Savanne"
        },
        {
            id: 10,
            title: "Geier",
            file: "./img/vulture.jpg",
            alt: "Geier",
            description: "Geier auf einem Baum "
        }
    ]
};

function MainGalleryTemplate(){
    return `
        <section class="main-content">
            ${ANIMALS_DATA.animals.map((animal, id) => `
                <div class="cards-container" onclick="openDialog(${id})" tabindex="0">
                    <figure>
                        <img src="${animal.file}" alt="${animal.alt}">
                        <figcaption>${animal.title}</figcaption>
                    </figure>
                </div>
            `).join('')}
        </section>
    `;
};

function createDialogTemplate() {
    return `
        <section class="dialogContainer" aria-label="Safari Tiergalerie" tabindex="0">
            <div class="dialog-header">
                <h2 id="dialogTitle"></h2>
                <button id="closeBtn" class="close-btn" onclick="closeDialog()">&times;</button>
            </div>
            <div class="dialog-body">
                <div class="image-container">
                    <img id="dialogImage" src="" alt="">
                </div>
                <p id="dialogDescription"></p>
                <div class="button-container">
                    <button id="prevBtn" class="nav-btn prev-btn" >&#8249;</button>
                    <button id="nextBtn" class="nav-btn next-btn" >&#8250;</button>
                </div>
            </div>
            <div class="dialog-footer">
                <span id="pictureCounter"></span>
            </div>
        </section>
    `;
};

function setupDOM(){
    main.innerHTML = MainGalleryTemplate();
    dialog.innerHTML = createDialogTemplate();
};

function dialogElements(){
    dialogTitle = document.getElementById('dialogTitle');
    dialogImage = document.getElementById('dialogImage');
    dialogDescription = document.getElementById('dialogDescription');
    pictureCounter = document.getElementById('pictureCounter');
    closeBtn = document.getElementById('closeBtn');
    prevBtn = document.getElementById('prevBtn');
    nextBtn = document.getElementById('nextBtn');
};

function updateDialogContent(id){
    const animal = ANIMALS_DATA.animals[id];
    dialogTitle.textContent = animal.title;
    dialogImage.src = animal.file;
    dialogImage.alt = animal.alt;
    dialogDescription.textContent = animal.description;
    pictureCounter.textContent = `${id + 1} / ${ANIMALS_DATA.animals.length}`;
    prevBtn.onclick = function(){
        let buttonIndex;
        if(id === 0){
            buttonIndex = ANIMALS_DATA.animals.length - 1;
        } else {
            buttonIndex = id - 1;
        }
        updateDialogContent(buttonIndex);
    }
    nextBtn.onclick = function(){
        let buttonIndex;
        if ( id === ANIMALS_DATA.animals.length - 1){
            buttonIndex = 0;
        } else{
            buttonIndex = id + 1;
        }
        updateDialogContent(buttonIndex);
    }

};

function openDialog(id){
    updateDialogContent(id);
    dialog.showModal();
};

function closeDialog(){
    dialog.close();
};

function keyboardEvent(){
    const cards = document.querySelectorAll('.cards-container');

    cards.forEach((card, id) =>{
        card.addEventListener('keydown', function(e){
            if (e.key === 'Enter' || e.key === ' '){
                e.preventDefault();
                openDialog(id);
            }
        })
    })
};

function escapeKey(){
    document.addEventListener('keydown', function(e){
        if (e.key === 'Escape' && dialog && dialog.open) { //Dialog open genau überprüfen
            closeDialog();
        }
    })
};

function arrowDialogKeys(){
    document.addEventListener('keydown', function(e){
        if (dialog && dialog.open){
            if (e.key === 'ArrowLeft'){
                document.getElementById('prevBtn').click();
            } else if (e.key === 'ArrowRight'){
                document.getElementById('nextBtn').click();
            }
        }
    })
};

function outsideClickClose(){
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog();
        }
    });
};

function init(){
    setupDOM();
    dialogElements();
    keyboardEvent();
    escapeKey();
    arrowDialogKeys();
    outsideClickClose();
}

window.onload = init;