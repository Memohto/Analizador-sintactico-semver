<template>
  <div>
    <b-navbar type="dark" variant="warning">
      <b-navbar-brand href="#">Analizador Sintáctico Para Semantic Versioning 2.0.0</b-navbar-brand>
    </b-navbar>
    <b-alert
      :show="dismissCountDown"
      dismissible
      :variant="variant"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <span>{{verification? "Cadena válida": "Cadena no válida"}}</span> 
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
        <!-- <h5><b>Gramática en la FNCh:</b></h5>
        <ul>
          <li v-for="(simbol, i) in Object.keys(GLC)" :key="i"><b>{{simbol}}</b> → {{GLC[simbol].join(" | ")}}</li>
        </ul> -->
        <network
          class="wrapper"
          ref="network"
          :nodes="nodes"
          :edges="edges"
          :options="options">
        </network>
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
        Ds: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDs'],
        Ic: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 
            'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '-'],
        Is: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
            'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 
            'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
            'w', 'x', 'y', 'z', '-', 'IcIs'],
        Ni: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDs'],
        Ai: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIs', 'IsNd', 'IsB4'],
        Bi: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIs', 'IsNd', 'IsB4',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDs'],
        Bu: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIs', 'IsNd', 'IsB4',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'DgDs', 'BiA2'],
        Pi: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIs', 'IsNd', 'IsB4',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDs'],
        Pr: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S',
            'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
            'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '-', 'NdIs', 'IsNd', 'IsB4',
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'PdDs', 'PiA3'],
        Vc: ['NiA4'],
        Vs: ['NiA4', 'VcA9', 'VcB5', 'VcB1'],
        A1: ['.'],
        A2: ['A1Bu'],
        A3: ['A1Pr'],
        A4: ['A1A5'],
        A5: ['NiA6'],
        A6: ['A1Ni'],
        A7: ['-'],
        A8: ['+'],
        A9: ['A7Pr'],
        B1: ['A7B2'],
        B2: ['PrB3'],
        B3: ['A8Bu'],
        B4: ['NdIs'],
        B5: ['A8Bu']
      },
      nodes: [],
      edges: [],
      options: {
        layout: {
          hierarchical: {
            enabled:true,
            levelSeparation: 70,
            nodeSpacing: 100,
            blockShifting: false,
            edgeMinimization: false,
            parentCentralization: false,
            direction: 'UD',
            sortMethod: 'directed',  
          }
        },
        edges: {
          arrows: "to",
          color: "blue"
        }
      },
      dismissSecs: 3,
      dismissCountDown: 0,
      variant: "warning",
      verification: false
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let matrix = this.createMatrix(this.input.length);
      let productions = {};
      [this.verification, productions] = this.CYK(matrix);
      if(this.verification) {
        console.log("Sí es aceptada!!");
        this.variant = "success"
        this.showAlert();
        this.createTree(matrix, productions);
      } else {
        this.variant = "danger"
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
      let productions = {};
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
                    let id = j.toString() + "," + (j+i).toString();
                    if(productions[id]) {
                      productions[id].push(j.toString()+","+(j+i-k).toString()+"&"+(j+n).toString()+","+(j+i).toString());
                    } else {
                      productions[id] = [j.toString()+","+(j+i-k).toString()+"&"+(j+n).toString()+","+(j+i).toString()];
                    }
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
      return [matrix[0][matrix.length-1].includes("Vs"), productions];
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
    createTree(matrix, productions) {
      this.nodes = [];
      this.edges = [];
      let key = "0,"+(matrix.length-1).toString();
      this.generateConections(matrix, productions, 0, key, "Vs");
      let dic = {};
      let i = 0;
      this.nodes.forEach(n => {
        dic[n.id] = i;
        i++;
      })
      this.nodes = this.nodes.map(n => {
        return {id: dic[n.id], label: n.label}
      })
      this.edges = this.edges.map(e => {
        return {from: dic[e.from], to: dic[e.to]}
      })
    },
    generateConections(matrix, productions, i, key, val) {
      let indeces = key.split(",");
      this.nodes.push({
        id: key, 
        label: val
      });
      if(!productions[key]) {
        let uid = this.generateUID();
        this.nodes.push({
          id: uid,
          label: this.input.substring(parseInt(indeces[0]), parseInt(indeces[1])+1)
        });
        this.edges.push({from: key, to: uid});
        return;
      }
      let arr = productions[key][i].split("&");
      indeces = arr[0].split(",");
      let posibleLeftVal = matrix[parseInt(indeces[0])][parseInt(indeces[1])];
      indeces = arr[1].split(",");
      let posibleRigthVal = matrix[parseInt(indeces[0])][parseInt(indeces[1])];
      let combs = this.getCombinations(posibleLeftVal, posibleRigthVal);
      let production = "";
      for(let c of combs) {
        if(this.GLC[val].includes(c)) {
          production = c;
          break;
        }
      }
      if(production) {
        this.edges.push({from: key, to: arr[0]});
        this.generateConections(matrix, productions, 0, arr[0], production[0]+production[1]);
        this.edges.push({from: key, to: arr[1]});
        this.generateConections(matrix, productions, 0, arr[1], production[2]+production[3]);
      } else {
        this.nodes.pop()
        this.generateConections(matrix, productions, i+1, key, val);
      }
    },
    generateUID() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
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