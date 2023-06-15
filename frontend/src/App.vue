<template>
  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - ${{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          price: 10,
        },
        {
          id: 2,
          name: "Product 2",
          price: 20,
        },
        {
          id: 3,
          name: "Product 3",
          price: 30,
        },
      ],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    fetchProducts() {
      axios
        .get("http://localhost:3000/products")
        .then((response) => {
          this.products = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>
