<template>
  <div>
    <b-navbar type="dark" variant="info">
      <b-navbar-brand href="#">Analizador sintáctico de aritmética simple</b-navbar-brand>
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
        <p>Dada una cadena, este programa te verifica si ésta es válida como una expresión aritmética
          simple. La gramática que se utiliza es la siguiente:
        </p>
        <b-button v-b-toggle.sidebar size="sm">Aquí</b-button>
        <b-sidebar id="sidebar" title="Gramática" shadow>
          <div>
            <ul>
              <li>S -> AG | SH | SI | SK | LL | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9</li>
              <li>A -> (</li>
              <li>B -> )</li>
              <li>C -> +</li>
              <li>D -> -</li>
              <li>E -> *</li>
              <li>F -> /</li>
              <li>G -> SB</li>
              <li>H -> CS</li>
              <li>I -> DS</li>
              <li>J -> ES</li>
              <li>K -> FS</li>
              <li>L -> LL | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9</li>
            </ul>
          </div>
        </b-sidebar>
        <br><br>
        <p>Por lo tanto los únicos caracteres válidos para este programa son: 
          dígitos, "+", "-", "*", "/", "(", ")"
        </p>
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
        S: ['UB', 'VC', 'WC', 'XF'],
        U: ['A"'],
        B: ['YH', 'NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'PM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        V: ['A#'], 
        C: ['!J', 'NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'TM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        W: ['$#'],
        X: ['&%'],
        F: ['0', 'PM', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        A: ['XF'],
        Y: ['I%'],
        H: ['YH', 'NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'PM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        N: ['-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        O: ['QO', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'a', 'b', 'c', 'd', 'e', 'f', 
        'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 
        'x', 'y', 'z'],
        Z: ['ON'],
        P: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
        M: ['TM', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        '!': ['K%'],
        J: ['!J', 'NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'TM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        T: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        D: ['0', 'PM', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        E: ['0', 'PM', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        I: ['NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'PM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        K: ['NO', 'ON', 'ZO', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 
        'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', 'TM', '1', '2', '3', 
        '4', '5', '6', '7', '8', '9'],
        Q: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '-', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 
        'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        '"': ['-'],
        '#': ['+'],
        '$': ['UB'],
        '&': ['/E'],
        '%': ['.'],
        '/': ['D%']
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
      dismissCountDown: 0
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let matrix = this.createMatrix(this.input.length);
      let [verification, productions] = this.CYK(matrix);
      if(verification) {
        console.log("Sí es aceptada!!");
        this.createTree(matrix, productions);
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
      return [matrix[0][matrix.length-1].includes("S"), productions];
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
      this.generateConections(matrix, productions, key);
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
    generateConections(matrix, productions, key) {
      let indeces = key.split(",");
      this.nodes.push({
        id: key, 
        label: matrix[parseInt(indeces[0])][parseInt(indeces[1])]
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
      let arr = productions[key][0].split("&");
      this.edges.push({from: key, to: arr[0]});
      this.generateConections(matrix, productions, arr[0]);
      this.edges.push({from: key, to: arr[1]});
      this.generateConections(matrix, productions, arr[1]);
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