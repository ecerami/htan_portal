import { observable } from "mobx";
var sankeyJson = require('./matches.json');

/**
 * Encapsulate all State Variables for the Application.
 */
export default class PatientSpaceState {
    NUM_PATIENTS = 1000;
    @observable mutationMatches = [];
    @observable tmbMatches = [];
    @observable egfVariantsSelected = 2;
    @observable tmbSelected = 0;
    @observable matchesJson = sankeyJson;

    constructor() {
        this.egfrMutations = [];
        this.tmbRates = [];
        this.createRandomPatients();
        this.computeMatches();
    }

    getMatchesJson() {
        return this.matchesJson;
    }

    createRandomPatients() {
        for (var i = 0; i < this.NUM_PATIENTS; i++) {
            var rand = Math.random();
            var mutation = "None";
            if (rand > .9) {
                mutation = "Tier1";
            }
            else if (rand > .8) {
                mutation = "Tier2";
            }
            else if (rand > .6) {
                mutation = "Tier3";
            }
            this.egfrMutations.push(mutation);
            this.tmbRates.push(Math.random() * 30)
        }
    }

    setEgfrVariantSelected(selected) {
        this.egfVariantsSelected = selected;
        this.computeMatches();
    }

    getEgfrVariantsSelected () {
        return this.egfVariantsSelected;
    }

    setTmbSelected(selected) {
        this.tmbSelected = selected;
        this.computeMatches();
    }

    getTmbSelected () {
        return this.tmbSelected;
    }    

    getNumMatchingPatients() {
        return this.tmbMatches.length;
    }

    computeMatches() {
        this.mutationMatches = this.computeMutationMatches();
        var tempMatches=[]
        for (var i=0; i<this.mutationMatches.length; i++) {
            var mutationIndex = this.mutationMatches[i];
            var currentTmb = this.tmbRates[mutationIndex];
            if (this.tmbSelected === 0) {
                tempMatches.push(mutationIndex);
            } else if(this.tmbSelected ===1) {
                if (currentTmb > 5) {
                    tempMatches.push(mutationIndex);                      
                }
            } else if (this.tmbSelected ===2) {
                if (currentTmb > 10) {
                    tempMatches.push(mutationIndex);
                }
            } else if (this.tmbSelected ===3) {
                if (currentTmb > 20) {
                    tempMatches.push(mutationIndex);
                }
            }      
        }
        this.tmbMatches = tempMatches;

        // Update the Sankey Diagram Values
        this.matchesJson.links[0].value = this.mutationMatches.length;
        this.matchesJson.links[1].value = this.egfrMutations.length - this.mutationMatches.length;
        this.matchesJson.links[2].value = this.tmbMatches.length;
        this.matchesJson.links[3].value = this.mutationMatches.length - this.tmbMatches.length;
    }

    computeMutationMatches() {
        var tempMatches=[]
        for (var i = 0; i < this.egfrMutations.length; i++) {
            var currentMutation = this.egfrMutations[i];
            if (this.egfVariantsSelected === 0) {
                tempMatches.push(i);
            }
            if (this.egfVariantsSelected === 1 && currentMutation !== "None") {
                tempMatches.push(i);
            }
            if (this.egfVariantsSelected === 2 && currentMutation === "Tier1") {
                tempMatches.push(i);
            }
            if (this.egfVariantsSelected === 3
                && (currentMutation === "Tier1" || currentMutation === "Tier2")) {
                tempMatches.push(i);
            }
        }
        return tempMatches;
    }
}