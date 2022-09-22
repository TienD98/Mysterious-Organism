// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

let pAequorFactory = (num, arr) => {
  return {
    _specimenNum: num,
    _dna: arr,

    //randomly selecting a base in the dna  and changing the current base to a different base.
    mutate() {
      for (let i = 0; i < this._dna.length; i++) {
        let temp = returnRandBase();
        while (this._dna[i] === temp) {
          temp = returnRandBase();
        }
        this._dna[i] = temp;
      }
      return this._dna;
    },

    //compare the current dna with the passed in dna and compute how many bases are identical and in the same locations.
    compareDNA(obj) {
      let counter = 0;
      for (let i = 0; i < this._dna.length; i++) {
        if (this._dna[i] === obj._dna[i]) {
          counter++;
        }
      }
      console.log(
        `specimen #${this._specimenNum} and specimen #${
          obj._specimenNum
        } have ${(counter / 15) * 100}% DNA in common`
      );
    },

    //returns true if the dna array contains at least 60% 'C' or 'G' bases.
    willLikelySurvive() {
      let c = 0;
      let g = 0;
      for (let i = 0; i < this._dna.length; i++) {
        if (this._dna[i] === "C") {
          c++;
        } else if (this._dna[i] === "G") {
          g++;
        }
      }
      return c / 15 >= 0.6 || g / 15 >= 0.6;
    },
  };
};

//create 30 instances of pAequor that can survive in their natural environment. Store these instances in an array
const pAequor = [];
for (let counter = 1; counter <= 30; counter++) {
  let temp = pAequorFactory(counter, mockUpStrand());
  while (temp.willLikelySurvive()) {
    temp.mutate();
  }
  pAequor.push(temp);
}
