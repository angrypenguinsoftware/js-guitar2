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
const getChord = document.querySelector('#get-chord');
const showChords = document.querySelector('.show-chords');

const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];

// const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
// const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const notesFlat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
const notesSharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// Other instruments tunings object
// const instrumentTuningPresets = {
//     'Guitar': [4, 11, 7, 2, 9, 4],
//     'Guitar 1 Step Down': [3, 10, 6, 1, 8, 3],
//     'Guitar Drop D': [4, 11, 7, 2, 9, 2],
//     'Bass (4 Strings)': [7, 2, 9, 4], 
//     'Bass (5 Strings)': [7, 2, 9, 4, 11], 
//     'Ukulele': [9, 4, 0, 7],
//     'Open C': [4, 0, 7, 0, 7, 0],
//     'Open D': [2, 9, 6, 2, 9, 2],
//     'Modal D': [2, 9, 7, 2, 7, 2],
//     'Open D Minor': [2, 7, 5, 2, 7, 2],
//     'Open G': [2, 11, 7, 2, 7, 2],
//     'Modal G': [2, 0, 7, 2, 7, 2],
//     'Open G Minor': [2, 10, 7, 2, 7, 2],
//     'Open A': [4, 9, 4, 1, 9, 4]
// };

const instrumentTuningPresets = {
    'Guitar': [7, 2, 10, 5, 0, 7],
    'Bass (4 Strings)': [10, 5, 0, 7]
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

// const notesFlat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
// const notesSharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// This is confusing but the root note starts on 0 not 1...
const chordFormulas = {
    'Major': [0, 4, 7],
    'Minor': [0, 3, 7],
    '7th Dominant': [0, 4, 7, 10],
    'Minor 7th': [0, 3, 7, 10],
    'Major 7th': [0, 4, 7, 11],
    'Augmented': [0, 4, 8],
    'Diminished': [0, 3, 6],
    'Diminished 7th': [0, 3, 6, 9],
    'Half Diminished 7th': [0, 3, 6, 10],
    'Sus4': [0, 5, 7],
    'Sus2': [0, 2, 7],
    '6th': [0, 4, 7, 9],
    'Minor 6th': [0, 3, 7, 9],
    '9th': [0, 2, 4, 7, 10],
    'Minor 9th': [0, 2, 3, 7, 10],
    'Major 9th' : [0, 2, 4, 7, 11],
    'Added 9th': [0, 2, 4, 7],
    '6th Add 9': [0, 2, 4, 7, 9],
    '7th #5': [0, 4, 8, 10],
    '7th b5': [0, 4, 6, 10],
    '7th #9': [0, 3, 4, 7, 10],
    '11th': [0, 4, 5, 7, 10],
    'Minor 11th': [0, 2, 3, 6, 7, 10],
    '7th #11th': [0, 2, 4, 6, 7, 10],
    '13th': [0, 2, 4, 5, 7, 8, 10],
    'Minor 13th': [0, 2, 3, 5, 7, 8, 10]
}

// use let as these settings will change
let allNotes;
let showMultipleNotes = false;
let showAllNotes = false;
let numberOfFrets = 24;
let showIndividualNotes = false;

let stringWidth;

// Set if using flats or sharps
let accidentals = 'sharps'; // defalut sharps
let selectedInstrument = 'Guitar';
let numberOfStrings = instrumentTuningPresets[selectedInstrument].length;

let selectedKey ='C';
let selectedScale;

let chordNotes = [];

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
    },

    toggleAllNotes(showNotes) {
        if (showNotes){
            showAllNotesSelector.checked = true;
            root.style.setProperty('--noteDotOpacity', 1);
            app.setupFretboard();
        } else {
            showAllNotesSelector.checked = false;
            root.style.setProperty('--noteDotOpacity', 0);
            app.setupFretboard();
        }
    },

    clearChordList() {
        let testing = document.querySelectorAll('li');
        testing.forEach(each => {
            each.remove();
        })
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
            // console.log("THis is a note");
            event.target.style.setProperty('--noteDotOpacity', 0);
        }   
    },

    showClickedNoteDot(event){

        console.log(event.target);

        // Persists the notes
        if (showIndividualNotes) {
            if (!chordNotes.includes(event.target.dataset.note)) {
                chordNotes.push(event.target.dataset.note);
            }

            if (event.target.classList.contains('note-fret')){
                if (showMultipleNotes){
                    app.toggleMultipleNotes(event.target.dataset.note, 1);
                } else {
                    event.target.style.setProperty('--noteDotOpacity', 1);
                    // event.target.style.setProperty('--noteBackground', 'red');
                }
            }
        } else {
            return;
        }    
        
        // if (event.target.style.getPropertyValue('--noteDotOpacity') == 0 || event.target.style.getPropertyValue('--noteDotOpacity') == null) {
        //     console.log('yes');
        //     if (showAllNotes || showIndividualNotes){
        //         return;
        //     }
        //     if (event.target.classList.contains('note-fret')){
        //         if (showMultipleNotes){
        //             app.toggleMultipleNotes(event.target.dataset.note, 1);
        //         } else {
        //             event.target.style.setProperty('--noteDotOpacity', 1);
        //         }
        //     }
        // } else {
        //     console.log('no');
        //     if (showAllNotes || showIndividualNotes){
        //         return;
        //     }
        //     if (showMultipleNotes){
        //         app.toggleMultipleNotes(event.target.dataset.note, 0);
        //     } else {
        //         event.target.style.setProperty('--noteDotOpacity', 0);
        //     }   
        // }
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
        if (showAllNotes) {
            return
        }

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

    identifyChord(event){
        // let newNotes = [chordNotes.sort()];
        let arr = [];
        let temp;
        let offset;
        let rootNote;
        let chordsToShow = [];

        // Will manipulate chordNotes so use local array instead
        let localChordNotes = [] = chordNotes;

        // console.log(chordNotes);
        // const notesSharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

        for (let w = 0; w < chordNotes.length; w++) {
            // Cycle through chordNotes changing the starting not of localChordNotes each time... 

            for (let i = 0; i < localChordNotes.length; i++) {
                rootNote = localChordNotes[0];
                if (typeof localChordNotes[i] != 'undefined') {
                    // console.log("local " + chordNotes[i]);
                    if (accidentals === 'flats'){
                        // Flats
                        temp = notesFlat.indexOf(localChordNotes[i]);
                    } else {
                        // Sharps
                        temp = notesSharp.indexOf(localChordNotes[i]);
                    }

                    // Get the first note index to use as an offset as if all notes are mover in relation to root
                    if (i == 0) {
                        offset = temp;
                    }

                    // Handle where the temp-oddset calculation makes it a negative number
                    if (temp - offset < 0) {
                        temp = temp + 12;
                    }

                    // let objChordNote = {
                    //     'chordNoteName': chordNotes[i],
                    //     'chordNoteValue': temp,
                    //     'chordTone': temp - offset
                    // }
                    // arr.push(objChordNote);

                    arr.push(temp - offset);
                }
            }
            let bob = arr.sort((a, b) => a - b).toString();
            // let bob = arr.toString();
            // console.log("this is bob - " + bob);
            arr = [];

            for (chord in chordFormulas){
                // console.log(chordFormulas[chord].toString());
                if (bob == chordFormulas[chord].toString()) {
                    if (typeof rootNote != 'undefined') {
                        // console.log(rootNote + " " + chord + " " + chordFormulas[chord].toString());
                        chordsToShow.push(rootNote + " " + chord + "  - " + localChordNotes);
                    }
                }
            }

            // console.log(localChordNotes);
            let blah = localChordNotes.shift();
            // console.log("BLAH - " + localChordNotes);
            localChordNotes.push(blah);    
        }

        if (chordsToShow.length > 0) {
            for (let r = 0; r < chordsToShow.length; r++) {
                let item = tools.createElement('li', chordsToShow[r]);
                showChords.appendChild(item);
            }
        } else {
            let item = tools.createElement('li', 'No Identifiable Chords to Show');
            showChords.appendChild(item);
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
        getChord.addEventListener('click', this.identifyChord);

        keySelector.addEventListener('click', (event) => {
            app.setupFretboard();
            selectedKey = event.target.value;
            // console.log(selectedKey);
        });

        scaleSelector.addEventListener('click', (event) => {
            app.setupFretboard();

            showAllNotes = true;

            // console.log("here");

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
            showAllNotes = false;
            chordNotes = [];
            app.toggleAllNotes(showAllNotes);
            if (showIndividualSelectedNotes){
                app.setupFretboard();
            } else {
                return;
            }
            app.clearChordList();
        });

        clearButtonTheory.addEventListener('click', (event) => {
            showAllNotes = false;
            chordNotes = [];
            app.toggleAllNotes(showAllNotes);
            app.setupFretboard();
            app.clearChordList();
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