<template>
  <v-app>
    <v-main>
      <v-toolbar>
        <v-toolbar-title>
          <div class="pt-2">
            <img style="width:114px" src="https://www.ogl.co.uk/nav/nav_logos/software-logo-sm.svg?v=4" alt="OGL Group"/>
          </div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn to="/products">
            Products
          </v-btn>
          <v-btn to="/customers">
            Customers
          </v-btn>
          <v-btn to="/map">
            Customer Map
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
//
</script>
