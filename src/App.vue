<template>
  <div class="container">
    <h1>Сборка торта</h1>
    <hr>
    <button class="btn btn-primary"
            @click="addLayer"
    >
      Добавить слой
    </button>
    <hr>

    <div class="row align-items-start">
      <div class="cake col"
           v-on:drop="drop"
           v-on:dragover="allowDrop"
      >
        <div class="cake-layer"
             v-for="(layer, i) in layers"
             v-bind:class="'cake-layer-' + layer.type"
             v-bind:style="{height: layer.height * 10 + 'px'}"
             v-bind:data-id="i"
             v-on:click="mouseClick(layer, 'inc')"
             v-on:click.right="mouseClick(layer, 'dec')"
             v-on:contextmenu.prevent
             v-on:dragstart="dragStart"
             v-on:dragleave="dragLeave"
             draggable
        >
        </div>
        <div class="form-text" v-show="hasLayers">
          Левая кнопка мыши - увеличить слой <br>
          Правая уменьшить <br>
          Слои можно менять местами, перетаскивая <br>
        </div>
      </div>
      <div class="cake-table-div col" v-show="hasLayers">
        <table class="table table-bordered">
          <thead>
          <tr>
            <th scope="col">Тип</th>
            <th scope="col">Высота</th>
            <th scope="col">Действия</th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="(layer, i) in layers"
          >
            <td>
              <select class="form-select" v-model="layer.type">
                <option v-bind:value="key"
                        v-for="(lt, key) in layerTypes"
                >
                  {{ lt.label }}
                </option>
              </select>
            </td>
            <td><input
              type="text"
              class="form-control"
              v-model.number="layer.height"
            >
            </td>
            <td>
              <button class="btn btn-danger"
                      v-on:click="deleteLayer(layer, i)">
                <span class="close-button"
                      v-on:click="deleteLayer(layer, i)"
                >
                  &times;</span>
              </button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="price alert alert-success" v-show="hasLayers">
      Цена <strong>{{ calcPrice | moneyRub }}</strong> руб
      <button class="btn btn-warning" v-on:click="showOrderWindow">
        Заказать
      </button>
    </div>
    <b-modal
      id="orderWindow"
      title="Заказать"
      v-model="confirmForm"
      ok-title="Заказать"
      ok-variant="btn btn-primary"
      cancel-title="Отмена"
      cancel-variant="btn btn-danger"
    >
      Оформить заказ?
    </b-modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmForm: false,
      layers: [],
      defaultType: 'biscuit',
      defaultHeight: 4,
      draggingElement: null,
      layerTypes: {
        biscuit: {
          price: 50,
          label: 'Бисквит'
        },
        meringue: {
          price: 100,
          label: 'Бизе'
        },
        cheese: {
          price: 60,
          label: 'Творожный'
        }
      }
    }
  },
  computed: {
    calcPrice() {
      return this.layers.reduce((s, i) => {
          return s + (i.height * this.layerTypes[i.type].price)
        }, 0)
    },
    hasLayers() {
      return this.layers.length > 0
    }
  },
  methods: {
    addLayer() {
      this.layers.push({
        type: this.defaultType,
        height: this.defaultHeight
      })
    },
    deleteLayer(layer, i) {
      //equivalent of this.layers.splice(i, 1)
      this.$delete(this.layers, i)
    },
    mouseClick(layer, act) {
      if (act === 'inc') {
        layer.height += 1
      } else if (act === 'dec') {
        layer.height -= 1
      }
    },
    dragStart(event) {
      this.draggingElement = event.target
    },
    drop(event) {
      this.draggingElement.classList.remove('dragging')
      event.target.classList.remove('drag-over')
      const from = this.draggingElement.dataset.id
      const to = event.target.dataset.id
      const arr = this.layers

      //arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      arr.splice(to, 0, arr.splice(from, 1)[0]);

    },
    allowDrop(ev) {
      ev.preventDefault()
      ev.target.classList.add('drag-over')
    },
    dragLeave(ev) {
      ev.target.classList.remove('drag-over')
    },
    showOrderWindow() {
      this.confirmForm = true
    }
  },
  filters: {
    moneyRub(value) {
      if (typeof value !== 'number') return value
      return value.toFixed(2)
    }
  }

}
</script>

<style lang="scss">
/*@import "~bootstrap/scss/bootstrap.scss";*/
/* above line includes whole bootstrap library */

/* these following lines includes only needed
   modules for modal window
   order is important */

@import "~bootstrap/scss/_functions.scss";
@import "~bootstrap/scss/_variables.scss";
@import "~bootstrap/scss/_mixins.scss";
@import "~bootstrap/scss/_close.scss";
@import "~bootstrap/scss/_modal.scss";

/* killer feature, include whole bootstrap-vue */
/*@import '~bootstrap-vue/dist/bootstrap-vue.css';*/

/* includes only modal window styles */
@import "~bootstrap-vue/src/components/modal/index.scss";

</style>

<style scoped>

.cake-layer {
  margin: 0 0px;
  border: 1px solid transparent;
  transition: height 0.5s;
}

.cake-layer-biscuit {
  background-image: url("assets/biscuit.png");
}

.cake-layer-meringue {
  background-image: url("assets/meringue.png");
}

.cake-layer-cheese {
  background-image: url("assets/cheese.png");
}

.close-button {
  cursor: pointer;
}

.price {
  font-size: 26px;
  margin-right: 40px;
}

.dragging {
  opacity: 0.5;
}

.drag-over {
  border: 1px solid;
  border-color: #000;
  opacity: 0.5;
}

</style>
