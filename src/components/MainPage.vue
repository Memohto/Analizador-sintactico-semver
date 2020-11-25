<template>
  <div>
    <b-navbar type="dark" variant="warning">
      <b-navbar-brand href="#">Analizador Sintáctico Para Semantic Versioning 2.0.0</b-navbar-brand>
    </b-navbar>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <span>Cadena no válida</span> 
    </b-alert>
    <b-row style="margin:30px;">
      <b-col cols="4">
        <h5><b>Instrucciones:</b></h5>
        <br>
        <p>Dada una cadena, este programa te verifica si ésta es válida como una expresión para semantic 
          versioning 2.0.0 o no. La documentación para este sistema de versionamiento puede ser revisada 
          <a href="https://semver.org/" target="_blank">aquí</a>.
        </p>
        <p>Por ende, este programa sólo acepta caracteres alfanuméricos</p>
        <b-form @submit="onSubmit">
          <b-form-group
            id="input-group"
            label="Input:"
            label-for="input"
          >
            <b-form-input
              id="input"
              v-model="input"
              required
              placeholder="Expresión aritmética"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Calcular</b-button>
        </b-form>
      </b-col>
      <b-col>
        <h5><b>Gramática en la FNCh:</b></h5>
        <ul>
          <li v-for="(simbol, i) in Object.keys(GLC)" :key="i">{{simbol}} → {{GLC[simbol].join(" | ")}}</li>
        </ul>
      </b-col>
    </b-row>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data: () => {
    return {
      input: "",
      GLC: {
        Nd: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-'],
        Pd: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        Dg: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        Dgs: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDgs'],
        Ic: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 
            'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '-'],
        Ics: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 
            'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '-', 'IcIcs'],
        Ni: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDgs'],
        Ai: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIcs', 'IcsNd', 'IcsA0'],
        Bi: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIcs', 'IcsNd', 'IcsA0',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDgs'],
        Bu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIcs', 'IcsNd', 'IcsA0',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDgs', 'BiA2'],
        Pi: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIcs', 'IcsNd', 'IcsA0',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDgs'],
        Pr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIcs', 'IcsNd', 'IcsA0',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDgs', 'PiA3'],
        Vc: ['NiA4'],
        Vs: ['NiA4', 'VcA9', 'VcA10', 'VcA11'],
        A0: ['NdIcs'],
        A1: ['.'],
        A2: ['A1Bu'],
        A3: ['A1Pr'],
        A4: ['A1A5'],
        A5: ['NiA6'],
        A6: ['A1Ni'],
        A7: ['-'],
        A8: ['+'],
        A9: ['A7Pr'],
        A10: ['A8Bu'],
        A11: ['A7A12'],
        A12: ['PrA13'],
        A13: ['A8Bu']
      },
      dismissSecs: 3,
      dismissCountDown: 0
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let matrix = this.createMatrix(this.input.length);
      let verification = this.CYK(matrix);
      if(verification) {
        console.log("Sí es aceptada!!");
      } else {
        this.showAlert();
        this.nodes = [];
        this.edges = [];
        console.log("No es aceptada :(");
      }
    },
    createMatrix(n) {
      let m = [];
      for(let i = 0; i < n; i++) {
        m.push([])
        for(let j = 0; j < n; j++) {
          m[i].push("0");
        }
      }
      return m;
    },
    CYK(matrix) {
      for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix.length-i; j++) {
          if(i == 0) {
            matrix[j][j+i] = this.inGrammar(this.input.substring(j, j+1));
          } else {
            let n = 1;
            let newVal = "";
            for(let k = i; k > 0; k--) {
              let comb = this.getCombinations(matrix[j][j+i-k], matrix[j+n][j+i]);
              if(comb.length) {
                comb.forEach(e => {
                  let r = this.inGrammar(e);
                  if(r != "0") {
                    newVal += r+"|";
                  }
                });
              }
              if(newVal) matrix[j][j+i] = this.removeDuplicates(newVal.substring(0, newVal.length-1));
              else matrix[j][j+i] = "0";
              n++;
            }
          }
        }
      }
      // console.log(matrix);
      return matrix[0][matrix.length-1].includes("Vs");
    },
    inGrammar(s) {
      let res = ""
      Object.keys(this.GLC).forEach(k => {
        if(this.GLC[k].includes(s)){
          res += k+"|";
        }
      });
      if(res) return res.substring(0, res.length-1);
      else return "0";
    },
    getCombinations(s1, s2) {
      let res = [];
      let arr1 = s1.split("|");
      let arr2 = s2.split("|");
      arr1.forEach(e1 => {
        arr2.forEach(e2 => {
          if(!(e1+e2).includes("0"))
            res.push(e1+e2);
        })
      })
      return res;
    },
    removeDuplicates(s) {
      let arr = s.split("|");
      let uniqueArr = arr.filter((item, pos) => {
        return arr.indexOf(item) == pos;
      })
      return uniqueArr.join("|");
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }

}
</script>

<style scoped>
.wrapper{
  border: 1px solid black;
  border-radius: 2%;
  background-color: #ccc;
  padding: 10px;
  height: 70vh;
}
</style>