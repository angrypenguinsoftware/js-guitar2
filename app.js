// IIFE self calling function for variable security
(function(){
const root = document.documentElement;

const fretboard = document.querySelector('.fretboard');
const instrumentSelector = document.querySelector('#instrument-selector'); // use # to access element id
const accidentalSelector = document.querySelector('.accidental-selector');
const numberOfFretsSelector = document.querySelector('#number-of-frets');
const showAllNotesSelector = document.querySelector('#show-all-notes');
const showMultipleNotesSelector = document.querySelector('#show-multiple-notes');
const showIndividualSelectedNotes = document.querySelector('#select-individual-notes');
const clearButton = document.querySelector('#clear-button');
//const fretNumbersSection = document.querySelector('.fretNumbers');
const noteNameSection = document.querySelector('.note-name-section');
const scaleSelector = document.querySelector('#scale-selector');
const keySelector = document.querySelector('#key-selector');
const clearButtonTheory = document.querySelector('#clear-button-theory');

const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];

const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Other instruments tunings object
const instrumentTuningPresets = {
    'Guitar': [4, 11, 7, 2, 9, 4],
    'Bass (4 Strings)': [7, 2, 9, 4], 
    'Bass (5 Strings)': [7, 2, 9, 4, 11], 
    'Ukulele': [9, 4, 0, 7],
    'Open C': [4, 0, 7, 0, 7, 0],
    'Open D': [2, 9, 6, 2, 9, 2],
    'Modal D': [2, 9, 7, 2, 7, 2],
    'Open D Minor': [2, 7, 5, 2, 7, 2],
    'Open G': [2, 11, 7, 2, 7, 2],
    'Modal G': [2, 0, 7, 2, 7, 2],
    'Open G Minor': [2, 10, 7, 2, 7, 2],
    'Open A': [4, 9, 4, 1, 9, 4]
};

// List of scales
const scaleFormulas = {
    'Major (Ionian)': [0, 2, 4, 5, 7, 9, 11],
    'Dorian': [0, 2, 3, 5, 7, 9, 10],
    'Phrygian': [0, 1, 3, 5, 7, 8, 10],
    'Lydian': [0, 2, 4, 6, 7, 9, 11],
    'Mixolydian':[0, 2, 4, 5, 7, 9, 10],
    'Aeolian (Natural Minor)':[0, 2, 3, 5, 7, 8, 10],
    'Locrian':[0, 1, 3, 5, 6, 8, 10],
    'Minor Pentatonic': [0, 3, 5, 7, 10],
    'Major Pentatonic': [0, 2, 4, 7, 9],
    'Blues Scale': [0, 3, 5, 6, 7, 10],
    'Major "Blues" Pentatonic': [0, 2, 3, 4, 7, 9],
    'Melodic Minor': [0, 2, 3, 5, 7, 9, 11],
    'Harmonic Minor': [0, 2, 3, 5, 7, 8, 11]  
};

// use let as these settings will change
let allNotes;
let showMultipleNotes = false;
let showAllNotes = false;
let numberOfFrets = 24;
let showIndividualNotes = false;

let stringWidth;

// Set if using flats or sharps
let accidentals = 'flats'; // defalut flats
let selectedInstrument = 'Guitar';
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

let selectedKey ='C';
let selectedScale;

const app = {
    // initialize app
    init(){
        this.setupFretboard();
        this.setupinstrumentSelector();
        // this.setupFretNumbersSection();
        this.setupNoteNameSection();
        this.setupKeySelector();
        this.setupScaleSelector();
        handlers.setupEventListeners();
    },

    setupFretboard(){
        // Clear fretBoard div
        fretboard.innerHTML = '';
        root.style.setProperty('--number-of-strings', numberOfStrings);

        // Add strings to the fretboard
        for(let i = 0; i < numberOfStrings; i++){
            let string = tools.createElement('div');
            string.classList.add('string');

            // Set the individual string heights - larger on the bottom
            switch(i){
                case 0:
                    stringWidth = 4;
                    break;
                case 1:
                    stringWidth = 5;
                    break;
                case 2:
                    stringWidth = 6;
                    break;
                case 3:
                    stringWidth = 8;
                    break;
                case 4:
                    stringWidth = 10;
                    break;
                case 5:
                    stringWidth = 12;
                    break;
                default:    // defaulted here and in the CSS to 10
                    stringWidth = 10;
                    break;
            }
            string.style.setProperty('--string-height', stringWidth);

            fretboard.appendChild(string);

            // Create Frets
            for(let fret = 0; fret <= numberOfFrets; fret++){
                let noteFret = tools.createElement('div');
                noteFret.classList.add('note-fret');
                string.appendChild(noteFret);

                // Use the guitarTuning array to allow different string tunings
                let noteName = this.generateNoteNames((fret + instrumentTuningPresets[selectedInstrument][i]), accidentals);
                noteFret.setAttribute('data-note', noteName);

                // Add single fret marks
                if (i === 0 && singleFretMarkPositions.indexOf(fret) !== -1){
                    noteFret.classList.add('single-fretmark');
                }

                // Add double fret marks
                if (i === 0 && doubleFretMarkPositions.indexOf(fret) !== -1){
                    let doubleFretMark = tools.createElement('div');
                    doubleFretMark.classList.add('double-fretmark');
                    noteFret.appendChild(doubleFretMark);
                }
            }
        }
        // Get collection of elements
        allNotes = document.querySelectorAll('.note-fret');
    },

    generateNoteNames(noteIndex, accidentals){
        noteIndex = noteIndex % 12;
        let noteName;
        if (accidentals === 'flats'){
            noteName = notesFlat[noteIndex];
        } else if (accidentals === 'sharps'){
            noteName = notesSharp[noteIndex];
        }
        return noteName;
    },

    setupinstrumentSelector(){
        for(instrument in instrumentTuningPresets){
            //console.log(instrument);
            let instrumentOption = tools.createElement('option', instrument);
            instrumentSelector.appendChild(instrumentOption);
        }
    },

    // Add scale formulas to the scale selector drop down
    setupScaleSelector(){
        for(scale in scaleFormulas){
            let scaleOption = tools.createElement('option', scale);
            scaleSelector.appendChild(scaleOption);
        }
    },

    // setupFretNumbersSection(){
    //     fretNumbersSection.innerHtml = ''; 
    //     let fretNumbers = singleFretMarkPositions;
    //     fretNumbers.forEach((fretNumber) => {
    //         let fretNumberElement = tools.createElement('span', fretNumber);
    //         fretNumbersSection.appendChild(fretNumberElement);
    //     });
    // },

    setupNoteNameSection(){
        noteNameSection.innerHTML = '';
        let noteNames;
        if (accidentals === 'flats'){
            noteNames = notesFlat;
        } else {
            noteNames = notesSharp;
        }
        noteNames.forEach((noteName) => {
            let noteNameElement = tools.createElement('span', noteName);
            noteNameSection.appendChild(noteNameElement);
        });
    },

    // Setup the Key Selector Drop down
    setupKeySelector(){
        keySelector.innerText = '';
        let keys;
        if (accidentals === 'flats'){
            keys = notesFlat;
        } else {
            keys = notesSharp;
        }
        keys.forEach((key) => {
            let keyElement = tools.createElement('option', key);
            keySelector.appendChild(keyElement);
        });
    },

   
    toggleMultipleNotes(noteName, opacity){
        for (let i = 0; i < allNotes.length; i++){
            if (allNotes[i].dataset.note === noteName){
                allNotes[i].style.setProperty('--noteDotOpacity', opacity);   
            }
        }
    }
}

const handlers = {
    showNoteDot(event){
        // Check if show all notes is selected
        if (showAllNotes || showIndividualNotes){
            return;
        }
        if (event.target.classList.contains('note-fret')){
            if (showMultipleNotes){
                app.toggleMultipleNotes(event.target.dataset.note, 1);
            } else {
                event.target.style.setProperty('--noteDotOpacity', 1);
            }
        }
    },

    hideNoteDot(event){
        if (showAllNotes || showIndividualNotes){
            return;
        }
        if (showMultipleNotes){
            app.toggleMultipleNotes(event.target.dataset.note, 0);
        } else {
            event.target.style.setProperty('--noteDotOpacity', 0);
        }   
    },

    showClickedNoteDot(event){
        // Persists the notes
        if (showIndividualNotes) {
            if (event.target.classList.contains('note-fret')){
                if (showMultipleNotes){
                    app.toggleMultipleNotes(event.target.dataset.note, 1);
                } else {
                    event.target.style.setProperty('--noteDotOpacity', 1);
                }
            }
        } else {
            return;
        }      
    },

    setSelectedInstrument(event){
        selectedInstrument = event.target.value;
        //console.log(selectedInstrument);
        numberOfStrings = instrumentTuningPresets[selectedInstrument].length;
        app.setupFretboard();
    },

    setAccidentals(event){
        if (event.target.classList.contains = 'acc-select'){
            accidentals = event.target.value;
            app.setupFretboard();
            app.setupNoteNameSection();
            app.setupKeySelector();
        } else {
            return;
        }
    },

    setNumberOfFrets(){
        numberOfFrets = numberOfFretsSelector.value;
        app.setupFretboard();
    },

    setShowAllNotes(){
        showAllNotes = showAllNotesSelector.checked;
        //console.log(showAllNotesSelector.checked);
        if (showAllNotes){
            root.style.setProperty('--noteDotOpacity', 1);
            app.setupFretboard();
        } else {
            root.style.setProperty('--noteDotOpacity', 0);
            app.setupFretboard();
        }
    },

    setShowMultipleNotes(){
        showMultipleNotes = !showMultipleNotes;
    },

    setNotesToShow(event){
        if (!showIndividualNotes){
            let noteToShow = event.target.innerText;
            app.toggleMultipleNotes(noteToShow, 1);
        } else {
            return
        }
    },

    setIndividualNotes(event){
        showIndividualNotes = !showIndividualNotes;
    },

    setNotesToHide(event){
        if (!showIndividualNotes){
            if (!showAllNotes) {
                let noteToHide = event.target.innerText;
                app.toggleMultipleNotes(noteToHide, 0);
            } else {
                return;
            }
        }
    },

    // ---- Event Listeners Start Here ----
    setupEventListeners(){
        fretboard.addEventListener('mouseover', this.showNoteDot);
        fretboard.addEventListener('mouseout', this.hideNoteDot);
        fretboard.addEventListener('mousedown', this.showClickedNoteDot);
        instrumentSelector.addEventListener('change', this.setSelectedInstrument);
        accidentalSelector.addEventListener('click', this.setAccidentals);
        numberOfFretsSelector.addEventListener('change', this.setNumberOfFrets);
        showAllNotesSelector.addEventListener('change', this.setShowAllNotes);
        showMultipleNotesSelector.addEventListener('change', this.setShowMultipleNotes);
        showIndividualSelectedNotes.addEventListener('change', this.setIndividualNotes)
        noteNameSection.addEventListener('mouseover', this.setNotesToShow);
        noteNameSection.addEventListener('mouseout', this.setNotesToHide);  

        keySelector.addEventListener('click', (event) => {
            app.setupFretboard();
            selectedKey = event.target.value;
            //console.log(selectedKey);
        });


        scaleSelector.addEventListener('change', (event) => {
            app.setupFretboard();

            let keys;
            if (accidentals === 'flats'){
                keys = notesFlat;
            } else {
                keys = notesSharp;
            }
            
            let index = keys.indexOf(selectedKey);
            const notes = [];

            let offset = index;
            for( let i=0; i < keys.length; i++) {
                let pointer = (i + offset) % keys.length;
                notes.push(keys[pointer]);
            }
            selectedScale = event.target.value;

            let index2 = scaleFormulas[selectedScale];
  
            for( let j = 0; j < notes.length; j++){
                if (index2.includes(j)){
                    

                    // if (selectedKey === notes[j]) {
                    //     //root.style.setProperty('--noteBackground', 'black');
                    //     noteFret.setAttribute('note-color', 'black');
                    // } else {
                    //      //root.style.setProperty('--noteBackground', 'teal');
                    //      noteFret.setAttribute('note-color', 'teal');
                    //  }

                    app.toggleMultipleNotes(notes[j], 1);
                }
            } 
        });


        clearButton.addEventListener('click', (event) => {
            //root.style.setProperty('--noteDotOpacity', 0);
            if (showIndividualSelectedNotes){
                app.setupFretboard();
            } else {
                return;
            }
        });

        clearButtonTheory.addEventListener('click', (event) => {
            app.setupFretboard();
        });
    }
    // ---- Event Listeners End Here ----
}


// Add elements to the HTML page
const tools = {
    createElement(element, content) {
        element = document.createElement(element);
        if(arguments.length > 1) {
            element.innerHTML = content;
        }
        return element;
    }
}

app.init();
})();