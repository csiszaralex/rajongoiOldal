<template>
  <div>
    <b-modal v-model="modalShow" title="Rekord szerkesztése" size="lg">
      <b-container>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="iFoodName">Étel neve:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="iFoodName" v-model="foodName" placeholder="Kérem az étel nevét!" type="text"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="iVotes">Szavazatok:</label>
          </b-col>
          <b-col sm="3">
            <b-form-input id="iVotes" v-model="numberOfVote" placeholder="Szavazatok" type="number"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="iDescription">Leírás:</label>
          </b-col>
          <b-col sm="9">
            <b-form-textarea
              id="iDescription"
              v-model="description"
              placeholder="Kérem az étel leírását!"
              type="text"
              rows="8"
              max-rows="16"
            ></b-form-textarea>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
            <label for="iPictureUrl">Kép URL:</label>
          </b-col>
          <b-col sm="9">
            <b-form-input id="iPictureUrl" v-model="pictureUrl" placeholder="Kép URL címe" type="text"></b-form-input>
          </b-col>
        </b-row>
      </b-container>
      <template #modal-footer>
        <div class="w-100">
          <b-button variant="success" size="sm" class="float-right m-1" @click="afterEditFood">Mentés</b-button>
          <b-button variant="primary" size="sm" class="float-right m-1" @click="modalShow = false">Mégsem</b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class EtelSzerkComp extends Vue {
  private get foodName(): string {
    return this.$store.state.csudijoModule.__editedFood.foodName;
  }

  private set foodName(value: string) {
    this.$store.state.csudijoModule.__editedFood.foodName = value;
  }

  private get numberOfVote(): number {
    return this.$store.state.csudijoModule.__editedFood.numberOfVote;
  }

  private set numberOfVote(value: number) {
    this.$store.state.csudijoModule.__editedFood.numberOfVote = value;
  }

  private get description(): number {
    return this.$store.state.csudijoModule.__editedFood.description;
  }

  private set description(value: number) {
    this.$store.state.csudijoModule.__editedFood.description = value;
  }

  private get pictureUrl(): number {
    return this.$store.state.csudijoModule.__editedFood.pictureUrl;
  }

  private set pictureUrl(value: number) {
    this.$store.state.csudijoModule.__editedFood.pictureUrl = value;
  }

  private get modalShow(): boolean {
    return this.$store.state.csudijoModule.__showEditForm;
  }

  private set modalShow(value: boolean) {
    this.$store.state.csudijoModule.__showEditForm = value;
  }

  private afterEditFood(): void {
    this.$store.dispatch("updateFood", this.$store.state.csudijoModule.__editedFood);
    this.modalShow = false;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  color: #42b983;
}
</style>
