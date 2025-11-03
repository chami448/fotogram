// Tierdaten direkt im Code - ersetzt die JSON-Datei
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
            title: "Gepard",
            file: "./img/cheetah.jpg",
            alt: "Gepard",
            description: "Der schnellste Landläufer der Welt"
        },
        {
            id: 3,
            title: "Elefanten",
            file: "./img/elephants_1.jpg",
            alt: "Elefanten",
            description: "Majestätische Elefantenherde in der Wildnis"
        },
        {
            id: 4,
            title: "Elefanten",
            file: "./img/elephants_2.jpg",
            alt: "Elefanten",
            description: "Elefanten beim Trinken am Wasserloch"
        },
        {
            id: 5,
            title: "Gazelle",
            file: "./img/gazelle.jpg",
            alt: "Gazelle",
            description: "Anmutige Gazelle springend in der Savanne"
        },
        {
            id: 6,
            title: "Giraffe",
            file: "./img/giraffe.jpg",
            alt: "Giraffe",
            description: "Hohe Giraffe mit charakteristischem Fleckenmuster"
        },
        {
            id: 7,
            title: "Nilpferd",
            file: "./img/hippo.jpg",
            alt: "Nilpferd",
            description: "Großes Nilpferd im Wasser mit offenem Maul"
        },
        {
            id: 8,
            title: "Leopard",
            file: "./img/leopard_1.jpg",
            alt: "Leopard",
            description: "Getarnter Leopard auf der Jagd im hohen Gras"
        },
        {
            id: 9,
            title: "Leopard",
            file: "./img/leopard_2.jpg",
            alt: "Leopard",
            description: "Ruhender Leopard entspannt auf einem Baumast"
        },
        {
            id: 10,
            title: "Löwe",
            file: "./img/lion_1.jpg",
            alt: "Löwe",
            description: "Stolzer Löwe mit prächtiger Mähne als König der Tiere"
        },
        {
            id: 11,
            title: "Löwe",
            file: "./img/lion_2.jpg",
            alt: "Löwe",
            description: "Löwenpaar zusammen ruhend in der warmen Savanne"
        },
        {
            id: 12,
            title: "Geier",
            file: "./img/vulture.jpg",
            alt: "Geier",
            description: "Geier mit ausgebreiteten Flügeln hoch am Himmel"
        }
    ]
};

// Globale Variablen für die App
let animalsData = [];
let currentImageIndex = 0;
let dialog = null;

// Main Container Reference 
const CONTENT = document.getElementById("main");

// App starten 
function init() {
    console.log('Fotogram App startet...');
    
    // Tierdaten laden
    loadAnimalsData();
    
    // Main Content mit innerHTML erstellen
    CONTENT.innerHTML = renderMain();
    
    // Dialog Elemente werden hinzugefügt, sobald Elemente im DOM sind
     dialog = document.getElementById('myDialog');
    
    // Event Listener einrichten
    setupEventListeners();
    
    console.log('App ist bereit!');
}

// Tierdaten laden 
function loadAnimalsData() {
    animalsData = ANIMALS_DATA;
    console.log('Tierdaten geladen:', animalsData);
}

// Main Content rendern 
function renderMain() {
    return `
        ${renderSafariSection()}
        ${renderDialogSection()}
    `;
}

// Safari Picture Section rendern
function renderSafariSection() {
    return `
        <section class="safariPicture" aria-label="Safari Tiergalerie">
            ${animalsData.animals.map((animal, index) => renderAnimalCard(animal, index)).join('')}
        </section>
    `;
}

// Einzelne Animal Card rendern
function renderAnimalCard(animal, index) {
    // Spezielle CSS-Klassen für bestimmte Tiere
    const specialClass = animal.title === 'Gepard' ? ' gepard' : 
                        animal.title === 'Giraffe' ? ' giraffe' : '';
    
    return `
        <div class="card" role="button" tabindex="0" 
             aria-describedby="card-${animal.id}-desc" 
             data-animal-id="${animal.id}">
            <figure class="cardsItems">
                <img class="${specialClass.trim()}" src="${animal.file}" 
                     alt="${animal.description}"
                     loading="lazy" width="300" height="200">
                <figcaption id="card-${animal.id}-desc">${animal.title}</figcaption>
            </figure>
        </div>
    `;
}

// Dialog Section rendern
function renderDialogSection() {
    return `
        <section>
            <dialog id="myDialog">
                <div class="dialog-header">
                    <h2 id="dialogTitle">Tiername</h2>
                    <button id="closeBtn" class="close-btn">&times;</button>
                </div>
                <div class="dialogContent">
                    <button id="prevBtn" class="nav-btn prev-btn">&#8249;</button>
                    <div class="image-container">
                        <img id="dialogImage" src="#" alt="#">
                        <p id="dialogDescription">Beschreibung des Tieres</p>
                    </div>
                    <button id="nextBtn" class="nav-btn next-btn">&#8250;</button>
                </div>
                <div class="dialog-footer">
                    <span id="pictureCounter">1 / 12</span>
                    <button id="closeButton">Schließen</button>
                </div>
            </dialog>
        </section>
    `;
}

// Event Listener einrichten
function setupEventListeners() {
    // Alle Karten finden 
    const cards = document.querySelectorAll('.card');
    
    // Für jede Karte Event Listener hinzufügen
    cards.forEach((card, index) => {
        // Maus-Klick
        card.addEventListener('click', function() {
            openDialog(index);
        });
        
        // Tastatur-Eingabe (Enter oder Leertaste)
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Verhindert Scrollen bei Leertaste
                openDialog(index);
            }
        });
    });
    
    // Dialog schließen Buttons
    const closeBtn = document.getElementById('closeBtn');
    const closeButton = document.getElementById('closeButton');
    
    if (closeBtn) closeBtn.addEventListener('click', closeDialog);
    if (closeButton) closeButton.addEventListener('click', closeDialog);
    
    // Navigation Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (prevBtn) prevBtn.addEventListener('click', showPreviousImage);
    if (nextBtn) nextBtn.addEventListener('click', showNextImage);
    
    // Außerhalb des Dialogs klicken zum Schließen
    if (dialog) {
        dialog.addEventListener('click', function(e) {
            if (e.target === dialog) {
                closeDialog();
            }
        });
    }
    
    // Tastatur-Navigation im gesamten Dokument
    document.addEventListener('keydown', handleKeyPress);
    
    console.log('Event Listeners eingerichtet für', cards.length, 'Cards');
}

// Dialog öffnen
function openDialog(imageIndex) {
    currentImageIndex = imageIndex;
    updateDialogContent();
    if (dialog) dialog.showModal();
}

// Dialog schließen
function closeDialog() {
    if (dialog) dialog.close();
}

// Dialog-Inhalt aktualisieren
function updateDialogContent() {
    if (!animalsData.animals || animalsData.animals.length === 0) {
        console.log('Keine Tierdaten verfügbar');
        return;
    }
    
    const animal = animalsData.animals[currentImageIndex];
    
    // Elemente finden und aktualisieren
    const titleElement = document.getElementById('dialogTitle');
    const imageElement = document.getElementById('dialogImage');
    const descriptionElement = document.getElementById('dialogDescription');
    const counterElement = document.getElementById('pictureCounter');
    
    if (titleElement) titleElement.textContent = animal.title;
    if (imageElement) {
        imageElement.src = animal.file;
        imageElement.alt = animal.alt;
    }
    if (descriptionElement) descriptionElement.textContent = animal.description;
    if (counterElement) {
        counterElement.textContent = `${currentImageIndex + 1} / ${animalsData.animals.length}`;
    }
}

// Vorheriges Bild
function showPreviousImage() {
    if (currentImageIndex === 0) {
        currentImageIndex = animalsData.animals.length - 1;
    } else {
        currentImageIndex = currentImageIndex - 1;
    }
    updateDialogContent();
}

// Nächstes Bild
function showNextImage() {
    if (currentImageIndex === animalsData.animals.length - 1) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = currentImageIndex + 1;
    }
    updateDialogContent();
}

// Tastatur-Navigation
function handleKeyPress(e) {
    if (dialog && dialog.open) {
        if (e.key === 'Escape') {
            closeDialog();
        } else if (e.key === 'ArrowLeft') {
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        }
    }
}

// App starten - wie in Ihrem Beispiel
document.addEventListener('DOMContentLoaded', init);