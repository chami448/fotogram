/*const animalImages = [
    "birds.jpg", 
    "elephants_1.jpg",
    "elephants_2.jpg",
    "gazelle.jpg",
    "hippo.jpg",
    "leopard_1.jpg",
    "leopard_2.jpg",
    "lion_1.jpg",
    "lion_2.jpg",
    "vulture.jpg"
];*/

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




window.onload = function() {
    document.getElementById('main').innerHTML = getNoteTemplate();
    document.body.innerHTML += renderDialog();
    dialog = document.getElementById('dialog');
    console.log('Dialog erstellt:', dialog);  // Sollte nicht null sein
    document.getElementById('closeBtn').onclick = closeDialog;


    
};

function renderMainContent(){
    let contentRef = document.getElementById("main");
    contentRef.innerHTML += getNoteTemplate();
}



function getNoteTemplate(){
    return `
    <section class="main-content">
        ${ANIMALS_DATA.animals.map((animal, index) => `
            <div class="cards-container" data-index="${index}" onclick="openDialog(${index})" tabindex="0">
                <figure>
                    <img src="${animal.file}" alt="${animal.alt}">
                    <figcaption>${animal.title}</figcaption> 
                </figure>
                
            </div>
        `).join('')}
    </section>`;
}


function renderDialog(){
    return `
    <dialog id="dialog" class="modal hidden">
        <section class="dialogContainer" aria-label="Safari Tiergalerie" data-index="" tabindex="0">
        <div class="dialog-header">
                    <h2 id="dialogTitle"></h2>
                    <button id="closeBtn" class="close-btn">&times;</button>
                </div>
        <div class="dialog-body">
        <button id="prevBtn" class="nav-btn prev-btn">&#8249;</button>

        <div class="image-container">
            <img id="dialogImage" src="" alt="">
            <p id="dialogDescription"></p>
        </div>

        <button id="nextBtn" class="nav-btn next-btn">&#8250;</button>
        </div>
        <div class="dialog-footer">
        <span id="pictureCounter"></span>
        </div>
        </section>
    
    </dialog>`;

}


function dialogContent(index){
    const animal = ANIMALS_DATA.animals[index];
    document.getElementById('dialogTitle').textContent = animal.title;
    document.getElementById('dialogImage').src = animal.file;
    document.getElementById('dialogImage').alt = animal.alt;
    document.getElementById('dialogDescription').textContent = animal.description;
    document.getElementById('pictureCounter').textContent = `${index + 1} / ${ANIMALS_DATA.animals.length}`;
    document.getElementById('prevBtn').onclick = function() {
        let newIndex = (index - 1 + ANIMALS_DATA.animals.length) % ANIMALS_DATA.animals.length;
        dialogContent(newIndex);
    }
    document.getElementById('nextBtn').onclick = function() {
        let newIndex = (index + 1) % ANIMALS_DATA.animals.length;
        dialogContent(newIndex);
    }
}

function openDialog(index){
    document.getElementById('dialog').classList.remove('hidden');
    dialogContent(index);
    dialog.showModal();
    
}

function closeDialog(){
    document.getElementById('dialog').classList.add('hidden');
    if(dialog){
        dialog.close();
    }
    
}