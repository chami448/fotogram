// Einfache Variablen für die App
let animalsData = [];
let currentImageIndex = 0;
let dialog = null;

// App starten
function init() {
    console.log('Fotogram App startet...');
    
    // Dialog Element finden
    dialog = document.getElementById('myDialog');
    
    // Tierdaten laden
    loadAnimalsData();
    
    // Alle Event Listener einrichten
    setupEventListeners();
    
    console.log('App ist bereit!');
}

// Verbesserte loadAnimalsData() Funktion
async function loadAnimalsData() {
    try {
        // Timeout hinzufügen um Extension-Konflikte zu vermeiden
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch('./animals.json', {
            signal: controller.signal,
            cache: 'no-cache' // Verhindert Extension-Cache-Konflikte
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        animalsData = await response.json();
        console.log('Tierdaten geladen:', animalsData);
        
    } catch (error) {
        // Extension-Fehler ignorieren
        if (error.name === 'AbortError' || error.message.includes('message channel')) {
            console.log('Extension-Konflikt ignoriert, verwende Fallback');
        } else {
            console.error('Fehler beim Laden der Tierdaten:', error);
        }
        
        // Fallback: Wenn JSON nicht lädt, mit leeren Daten weiterarbeiten
        animalsData = { animals: [] };
    }
}

// Alle Event Listener einrichten
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
    
    closeBtn.addEventListener('click', closeDialog);
    closeButton.addEventListener('click', closeDialog);
    
    // Navigation Buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // Außerhalb des Dialogs klicken zum Schließen
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog();
        }
    });
    
    // Tastatur-Navigation im gesamten Dokument
    document.addEventListener('keydown', handleKeyPress);
}

// Dialog öffnen (vereinfacht - ohne Zentrierung)
function openDialog(imageIndex) {
    // Aktuellen Index setzen
    currentImageIndex = imageIndex;
    
    // Dialog-Inhalt aktualisieren
    updateDialogContent();
    
    // Dialog öffnen (CSS übernimmt die Zentrierung)
    dialog.showModal();
}

// Dialog schließen
function closeDialog() {
    dialog.close();
}

// Dialog-Inhalt mit aktuellen Tierdaten füllen
function updateDialogContent() {
    // Prüfen ob Daten vorhanden sind
    if (!animalsData.animals || animalsData.animals.length === 0) {
        console.log('Keine Tierdaten verfügbar');
        return;
    }
    
    // Aktuelles Tier holen
    const animal = animalsData.animals[currentImageIndex];
    
    // Titel setzen
    document.getElementById('dialogTitle').textContent = animal.title;
    
    // Bild setzen
    const dialogImage = document.getElementById('dialogImage');
    dialogImage.src = animal.file;
    dialogImage.alt = animal.alt;
    
    // Beschreibung setzen
    document.getElementById('dialogDescription').textContent = animal.description;
    
    // Zähler aktualisieren
    const counter = `${currentImageIndex + 1} / ${animalsData.animals.length}`;
    document.getElementById('pictureCounter').textContent = counter;
}

// Zum vorherigen Bild wechseln
function showPreviousImage() {
    // Zum letzten Bild springen wenn am Anfang
    if (currentImageIndex === 0) {
        currentImageIndex = animalsData.animals.length - 1;
    } else {
        currentImageIndex = currentImageIndex - 1;
    }
    
    // Dialog aktualisieren
    updateDialogContent();
}

// Zum nächsten Bild wechseln
function showNextImage() {
    // Zum ersten Bild springen wenn am Ende
    if (currentImageIndex === animalsData.animals.length - 1) {
        currentImageIndex = 0;
    } else {
        currentImageIndex = currentImageIndex + 1;
    }
    
    // Dialog aktualisieren
    updateDialogContent();
}

// Tastatur-Eingaben verarbeiten
function handleKeyPress(e) {
    // Nur wenn Dialog offen ist
    if (dialog.open) {
        if (e.key === 'Escape') {
            // ESC = Dialog schließen
            closeDialog();
        } else if (e.key === 'ArrowLeft') {
            // Pfeil links = Vorheriges Bild
            showPreviousImage();
        } else if (e.key === 'ArrowRight') {
            // Pfeil rechts = Nächstes Bild
            showNextImage();
        }
    }
}

// App starten wenn Seite geladen ist
document.addEventListener('DOMContentLoaded', init);