<template>
  <div>
    <h1><p style="text-align: center">Conversor de unidades</p></h1>
    <h3>
      <p style="text-align: center">
        Introduce cualquier número {{ decimal }}, {{ hexadecimal }} o
        {{ binario }} y se calculará automáticamente al resto de unidades. (ej:
        de {{ binario }} a {{ decimal }})
      </p>
    </h3>
    <div style="text-align: center">
      <div v-show="calcula">
        <div v-show="result.includes(1)">
          <h2>
            <p>Origen {{ binario }}:</p>
          </h2>
          <p>
            El número {{ number }} en {{ decimal }} es
            {{ all ? number : parseInt(number, 2) }}
          </p>
          <p>
            El número {{ number }} en {{ hexadecimal }} es
            {{ all ? number : changeBase(parseInt(number, 2), 3) }}
          </p>
        </div>
        <div v-show="result.includes(2)">
          <h2>
            <p>Origen {{ decimal }}:</p>
          </h2>
          <p>
            El número {{ number }} en {{ binario }} es
            {{ all ? number : changeBase(parseInt(number, 10), 1) }}
          </p>
          <p>
            El número {{ number }} en {{ hexadecimal }} es
            {{ all ? number : changeBase(parseInt(number, 10), 3) }}
          </p>
        </div>
        <div v-show="result.includes(3)">
          <h2><p>Origen hexadecimal:</p></h2>
          <p>
            El número {{ number }} en {{ binario }} es
            {{ all ? number : changeBase(parseInt(number, 16), 1) }}
          </p>
          <p>
            El número {{ number }} en {{ decimal }} es
            {{ all ? number : parseInt(number, 16) }}
          </p>
        </div>
        <div v-show="result.length === 0">
          <p v-if="number !== ''">
            Carácter incorrecto {{ error.toLowerCase() }}
          </p>
          <p v-else>Campo vacío</p>
        </div>
      </div>
      <input @input="reset()" type="text" v-model="number" />
      <button @click="reset(), (calcula = true), checkNumber(number)">
        calcula
      </button>
    </div>
  </div>
</template>

<script lang="ts">
const hexadecimal = "hexadecimal";
const decimal = "decimal";
const binario = "binario";

import { defineComponent } from "vue";
import { Numbertype, Values } from "./Types";

export default defineComponent({
  name: "App",
  data() {
    return {
      number: "",
      calcula: false,
      result: new Array<Numbertype>(),
      error: "",
      all: false,
      values: {} as Values,
      hexadecimal: hexadecimal,
      decimal: decimal,
      binario: binario,
    };
  },
  methods: {
    reset(): void {
      this.calcula = false;
      this.result = new Array<Numbertype>();
      this.error = "";
      this.all = false;
    },
    checkNumber(number: string): void {
      //2 - Comprobaciones
      if (this.values.binario.includes(parseInt(number))) {
        this.result.push(
          Numbertype.Binario,
          Numbertype.Decimal,
          Numbertype.Hexadecimal
        );
        this.all = true;
      } else if (number != "0") {
        //Binario
        this.checkNumberTypes(number, Numbertype.Binario);
        //Decimal
        this.checkNumberTypes(number, Numbertype.Decimal);
        //Hexadecimal
        this.checkNumberTypes(number.toUpperCase(), Numbertype.Hexadecimal);
      } else this.error += number;
    },
    checkNumberTypes(number: string, type: Numbertype): void {
      let result = false;
      switch (type) {
        case Numbertype.Binario:
          result = this.isBindec(number, this.values.binario);
          break;

        case Numbertype.Decimal:
          result = this.isBindec(number, this.values.decimal);
          break;

        case Numbertype.Hexadecimal:
          result = this.isHex(number, this.values.hexadecimal);
          break;

        default:
          break;
      }

      if (result) this.result.push(type);
    },
    isBindec(number: string, elements: Array<number>): boolean {
      let length = 0;
      for (let i = 0; i <= number.toString().length - 1; i++) {
        elements.includes(parseInt(number[i])) ? length++ : (this.error = "");
      }

      return length == number.toString().length;
    },
    isHex(number: string, elements: Array<string>): boolean {
      let length = 0;
      for (let i = 0; i <= number.toString().length - 1; i++) {
        elements.includes(number[i]) ? length++ : (this.error += number[i]);
      }

      return length == number.toString().length;
    },
    //changeBase dec to hexa/bin
    changeBase(input: number, type: Numbertype): string {
      switch (type) {
        case Numbertype.Binario:
          return this.getNumber<number>(input, 2, this.values.binario);
        case Numbertype.Hexadecimal:
          return this.getNumber<string>(input, 16, this.values.hexadecimal);
        default:
          return "";
      }
    },
    getNumber<T>(number: number, divider: number, numbers: Array<T>): string {
      let resultado = "";
      while (number > 0) {
        let resto = number % divider;
        number = Math.trunc(number / divider);
        resultado = numbers[resto] + resultado;
      }

      return resultado;
    },
  },
  mounted(): void {
    this.values = new Values();
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
