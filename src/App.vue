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
      <div class="cake col">
        <div class="cake-layer cake-layer-biscuit"
             v-for="layer in layers"
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
            v-for="layer in layers"
          >
            <td>{{layer.type}}</td>
            <td>{{layer.height}}</td>
            <td>3</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
    <hr>
    <div class="alert alert-success">Цена {{totalPrice}}</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      totalPrice: 0,
      layers: [],
      defaultType: 'biscuit',
      defaultHeight: 4,
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
  computed: {},
  methods: {
    addLayer() {
      this.layers.push({
        type: this.defaultType,
        height: this.defaultHeight
      })
    }
  }

}
</script>

<style scoped>
.cake-layer {
  margin: 0 0px;
  background-color: rgb(0, 192, 226);
  position: relative;
  border: 1px solid transparent;
  padding: 1rem;
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

</style>
