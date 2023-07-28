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
const noteNameSection = document.querySelector('.note-name-section');
const scaleSelector = document.querySelector('#scale-selector');
const keySelector = document.querySelector('#key-selector');
const clearButtonTheory = document.querySelector('#clear-button-theory');
const getChord = document.querySelector('#get-chord');
const showChords = document.querySelector('.show-chords');

const singleFretMarkPositions = [3, 5, 7, 9, 15, 17, 19, 21];
const doubleFretMarkPositions = [12, 24];

const notesFlat = ["A", "Bb", "B", "C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab"];
const notesSharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

// Other instruments tunings object
const instrumentTuningPresets = {
    'Guitar': [7, 2, 10, 5, 0, 7],
    'Guitar 1 Step Down': [6, 1, 9, 4, 11, 6],
    'Guitar Drop D': [7, 2, 10, 5, 12, 5],
    'Bass (4 Strings)': [10, 5, 0, 7],  
    'Bass (5 Strings)': [10, 5, 12, 7, 2], 
    'Ukulele': [12, 7, 3, 10],
    'Open C': [7, 3, 10, 3, 10, 3],
    'Open D': [5, 12, 9, 5, 12, 5],
    'Modal D': [5, 12, 10, 5, 10, 5],
    'Open D Minor': [5, 10, 8, 5, 10, 5],
    'Open G': [5, 2, 10, 5, 10, 5],
    'Modal G': [5, 3, 10, 5, 10, 5],
    'Open G Minor': [5, 1, 10, 5, 10, 5],
    'Open A': [7, 12, 7, 4, 12, 7]
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

// This is confusing but the root note starts on 0 not 1...
// so 1-3-5 is actually 0-4-7 and so on... See below for key

// Notes	A	A#	B	C	C#	D	D#	E	F	F#	G	G#	A	A#	B	C	C#	D	D#	E	F	F#
// Music	1	b2	2	b3	3	4	b5	5	b6	6	b7	7	8	b9	9	b10	10	11	b12	12	b13	13
// For App	0	1	2	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21

const chordFormulas = {
    'Major (maj) ': [0, 4, 7],
    'Minor (m or min) ': [0, 3, 7],
    'Dominant 7th (7 or dom7) ': [0, 4, 7, 10],
    'Minor 7th (m7 or min7) ': [0, 3, 7, 10],
    'Major 7th (M7 or maj7) ': [0, 4, 7, 11],
    'Minor Major 7th (mM7 or minMaj7) ': [0, 3, 7, 11],
    'Augmented (+ or aug) ': [0, 4, 8],
    'Diminished (dim or m(b5)) ': [0, 3, 6],
    'Diminished 5th (-5) ': [0, 4, 6],
    'Diminished 7th (dim7) ': [0, 3, 6, 9],
    'Half Diminished 7th (m7b5 or -7(b5)) ': [0, 3, 6, 10],
    'Suspended 4th (sus or sus4) ': [0, 5, 7],
    'Suspended 2nd (sus2) ': [0, 2, 7],
    'Sixth (6) ': [0, 4, 7, 9],
    'Minor 6 (m6) ': [0, 3, 7, 9],
    'Suspended 7th (7sus4) ': [0, 5, 7, 10],
    'Augmented 7th (+7 or aug7 or 7+5 or 7#5) ': [0, 4, 8, 10],
    'Augmented Major 7th (+(M7) or M7+5 or M7#5) ': [0, 4, 8, 11],
    '9th (9) ': [0, 2, 4, 7, 10],
    'Minor 9th (m9) ': [0, 2, 3, 7, 10],
    'Major 9th (maj9 or M9) ' : [0, 2, 4, 7, 11],
    'Added 9th (add9) ': [0, 2, 4, 7],
    '6th Add 9 (6/9) ': [0, 2, 4, 7, 9],
    '7th Sharp 5 (7#5) ': [0, 4, 8, 10],
    '7th Flat 5 (7b5) ': [0, 4, 6, 10],
    '7th Sharp 9 (7#9) ': [0, 3, 4, 7, 10],
    '7th Flat 9 (7b9) ': [0, 1, 4, 7, 10],
    '11th (11) ': [0, 4, 5, 7, 10],
    'Minor 11th (m11 or min11) ': [0, 2, 3, 6, 7, 10],
    'Major 11th (M11 or maj11) ': [0, 2, 4, 7, 9, 11],
    '7th Sharp 11th (7#11)': [0, 2, 4, 6, 7, 10],
    'Major 7 Sharp 11th (maj7#11) ': [0, 4, 6, 7, 11],
    '13th (13) ': [0, 2, 4, 5, 7, 9, 10],
    '13th (13)(11th omitted)': [0, 2, 4, 7, 9, 10],
    'Minor 13th (m13 or min13)': [0, 2, 3, 5, 7, 8, 10],
    'Power Chord (5)': [0, 7],
    'Added 4th (add4) ': [0, 4, 5, 7],
    'Minor Second Interval': [0, 1],
    'Major Second Interval': [0, 2],
    'Minor Third Interval': [0, 3],
    'Major Third Interval': [0, 4],
    'Perfect Fourth Interval': [0, 5],
    'Perfect Fifth Interval': [0, 6],
    'Diminished Fifth Interval': [0, 7],
    'Minor Sixth  Interval': [0, 8],
    'Major Sixth Interval': [0, 9],
    'Minor Seventh Interval': [0, 10],
    'Major Seventh Interval': [0, 11],
    'Octave Interval': [0]
}


// const notesSharp = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];

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

                if (showAllNotes) {
                    event.target.style.setProperty('--noteBackground', 'red');
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
        let arr = [];
        let temp;
        let offset;
        let rootNote;
        let chordsToShow = [];

        // Clear the list of chords
        app.clearChordList();

        // Will manipulate chordNotes so use local array instead
        let localChordNotes = [] = chordNotes;

        for (let w = 0; w < chordNotes.length; w++) {
            // Cycle through chordNotes changing the starting not of localChordNotes each time... 

            for (let i = 0; i < localChordNotes.length; i++) {
                rootNote = localChordNotes[0];
                if (typeof localChordNotes[i] != 'undefined') {
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

                    arr.push(temp - offset);
                }
            }
            // FYI array.sort() in javascript sucks! it sorts numbers alphabetically
            // Use the below code to sort numbers correctly
            let bob = arr.sort((a, b) => a - b).toString();
            arr = [];

            for (chord in chordFormulas){
                if (bob == chordFormulas[chord].toString()) {
                    if (typeof rootNote != 'undefined') {
                        chordsToShow.push(rootNote + " " + chord + " - " + localChordNotes);
                    }
                }
            }

            let blah = localChordNotes.shift();
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