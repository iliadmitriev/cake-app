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
             v-on:drag="drag"
             draggable
        >
        </div>
      </div>
      <div class="cake-table-div col">
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
    <div class="price alert alert-success">Цена <strong>{{ calcPrice | moneyRub }}</strong> руб</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
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
      return this.layers.reduce((s, i) => s + (i.height * this.layerTypes[i.type].price), 0)
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
    drag(ev) {
      ev.target.classList.add('dragging')
    },
    dragStart(event) {
      this.draggingElement = event.target
    },
    drop(event) {
      this.draggingElement.classList.remove('dragging')
      const from = this.draggingElement.dataset.id
      const to = event.target.dataset.id
      const arr = this.layers

      //arr.splice(from, 1, arr.splice(to, 1, arr[from])[0]);
      arr.splice(to, 0, arr.splice(from, 1)[0]);

    },
    allowDrop(ev) {
      ev.preventDefault()
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

</style>
