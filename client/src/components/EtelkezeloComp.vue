<template>
  <div class="etelkezelo">
    <section id="szavazas" class="szurke-hatter">
      <h2>Szavazzon a legnepszerűbb ételünkre</h2>
      <b-container fluid>
        <b-row>
          <b-col sm="3">
            <label for="foodInput">Új étel felvétele szavazással:</label>
          </b-col>
          <b-col sm="6">
            <b-form-input id="foodInput" v-model="newFoodName"></b-form-input>
          </b-col>
          <b-col sm="3">
            <b-button @click="addNewFood()">Felvesz + szavaz</b-button>
          </b-col>
        </b-row>
      </b-container>
      <EtelSzerkComp v-if="modalShow" />
      <b-table
        id="foodsTable"
        striped
        bordered
        :items="this.$store.getters.foods"
        :fields="foodFields"
        :per-page="this.$store.state.csudijoModule.__perPage"
        current-page="1"
      >
        <template #cell(action)="row">
          <b-button size="sm" variant="primary" @click="row.toggleDetails">{{ row.detailsShowing ? "Rejt" : "Mutat" }}</b-button>
        </template>
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2" align-h="center">
              <b-button-group>
                <b-button size="sm" variant="success" @click="newVote(row.item)">Szavaz</b-button>
                <b-button size="sm" variant="warning" @click="beforeEditFood(row.item)">Szerkeszt</b-button>
                <b-button size="sm" variant="danger" @click="deleteFood(row.item)">Töröl</b-button>
              </b-button-group>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Étel neve:</b>
              </b-col>
              <b-col sm="9">{{ row.item.foodName }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Szavazatok:</b>
              </b-col>
              <b-col sm="9">{{ row.item.numberOfVote }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Leirás:</b>
              </b-col>
              <b-col sm="9">{{ row.item.description }}</b-col>
            </b-row>
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Kép URL:</b>
              </b-col>
              <b-col sm="9">{{ row.item.pictureUrl }}</b-col>
            </b-row>
          </b-card>
        </template>
      </b-table>
      <b-pagination
        v-model="currentPage"
        :total-rows="this.$store.getters.numberOfFoods"
        :per-page="this.$store.state.csudijoModule.__perPage"
        aria-controls="foodsTable"
        hide-goto-end-buttons
        @input="pageChanged()"
      ></b-pagination>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EtelSzerkComp from "@/components/EtelSzerkComp.vue";
@Component({
  components: {
    EtelSzerkComp
  }
})
export default class EtelkezeloComp extends Vue {
  private newFoodName: string = "";

  private foodFields = [
    { key: "foodName", label: "Étel neve", sortable: false },
    { key: "numberOfVote", label: "Szavazatok", sortable: false },
    { key: "action", label: "Egyéb", sortable: false }
  ];

  public mounted() {
    this.$store.dispatch("getFoods");
    // Adatok frissitése 30mp időközönként:
    // ====================================
    // if (!this.$store.state.csudijoModule.__polling) {
    //   this.$store.state.csudijoModule.__polling = setInterval(() => {
    //     this.$store.dispatch("getFoods");
    //   }, 30000);
    // }
  }

  public beforeDestroy() {
    // clearInterval(this.$store.state.csudijoModule.__polling); // adatok 5mp-enkénti frissítését törli
  }

  private pageChanged(): void {
    this.$store.dispatch("getFoods");
  }

  private newVote(item: any): void {
    const numberOfVotes: number = parseInt(item.numberOfVote, 10) + 1; // régi szavazatszám + 1
    item.numberOfVote = numberOfVotes; // tárolás az objektumban
    this.$store.dispatch("updateFood", item);
  }

  private deleteFood(item: any): void {
    this.$store.dispatch("deleteFood", item);
  }

  private beforeEditFood(item: any): void {
    this.$store.state.csudijoModule.__editedFood = { ...item };
    this.modalShow = true;
  }

  private addNewFood(): void {
    this.$store.dispatch("addNewFood", {
      foodName: this.newFoodName,
      numberOfVote: 1
    });
  }

  private get modalShow(): boolean {
    return this.$store.state.csudijoModule.__showEditForm;
  }

  private set modalShow(value: boolean) {
    this.$store.state.csudijoModule.__showEditForm = value;
  }

  private get currentPage(): number {
    return this.$store.state.csudijoModule.__currentPage;
  }

  private set currentPage(value: number) {
    this.$store.state.csudijoModule.__currentPage = value;
  }
}
</script>

<style scoped>
h2 {
  font-weight: 300;
  margin-bottom: 20px;
}

section {
  padding: 15px 15px 15px 15px;
  margin-bottom: 15px;
}

.szurke-hatter {
  background-color: rgb(236, 236, 236);
}

html,
body {
  line-height: 1.8;
}
</style>
