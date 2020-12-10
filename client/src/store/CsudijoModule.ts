import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class CsudijoModule extends VuexModule {
  // State (temp fields, direct access from store):
  private __showEditForm: boolean = false;
  private __editedFood: any;
  private __currentPage: number = 1; // aktuálisan megjelenő oldal sorszáma
  private __perPage: number = 6; // oldalanként megjelenő rekordok száma
  private __polling: number;

  // State (classic fields)
  private _foods: any = [];
  private _topFoods: any = [];
  private _numberOfFoods: number = -1; // ételek száma a kollekcióban

  private config: AxiosRequestConfig = {
    withCredentials: false,
    // Az ip számot írd át a backend Network címére és portjára, pl.:
    // baseURL: "http://192.168.1.68:3000",
    // baseURL: "http://localhost:3000", // ha egy gépen fut minden (tesztelő böngésző, frontend, backend)
    baseURL: "https://jedlik-venom-backend.herokuapp.com/",
    timeout: 9000
  };

  // Getters
  get foods(): any[] {
    return this._foods;
  }

  get topFoods(): any[] {
    return this._topFoods;
  }

  get numberOfFoods(): number {
    return this._numberOfFoods;
  }

  @Action
  public async getFoods(): Promise<any> {
    axios
      .get(`/csudijo/page/${this.__currentPage}/perPage/${this.__perPage}`, this.config)
      .then((res: AxiosResponse) => {
        const data: any = res.data;
        if (data) {
          // Mutáció hívása (commit())
          this.context.commit("mutateFoods", data);
          // További akciók hívására van lehetőség (dispatch()):
          this.context.dispatch("getTopFoodsList");
          this.context.dispatch("getNumberOfFoods");
        }
      })
      .catch((ex: AxiosError) => alert(ex.message));
  }

  @Action
  public async getTopFoodsList(): Promise<any> {
    axios
      .get("/csudijobest", this.config)
      .then((res: AxiosResponse) => {
        const data: any = res.data;
        this.context.commit("mutateTopFoods", data);
      })
      .catch((ex: AxiosError) => alert(ex.message));
  }

  @Action
  public async addNewFood(newFood: any): Promise<any> {
    axios
      .post("/csudijo", newFood, this.config)
      .then((res: AxiosResponse) => {
        if (res.data.errmsg || res.data.message) {
          alert(res.data.errmsg ? res.data.errmsg : res.data.message);
        } else {
          this.context.dispatch("getFoods");
        }
      })
      .catch((ex: AxiosError) => alert(ex.message));
  }

  @Action
  public async updateFood(food: any): Promise<any> {
    axios
      .put(`/csudijo/${food._id}`, food, this.config) // update kezdeményezése
      .then((res: AxiosResponse) => {
        if (res.data.errmsg || res.data.message) {
          alert(res.data.errmsg ? res.data.errmsg : res.data.message);
        } else {
          this.context.dispatch("getFoods");
        }
      })
      .catch((ex: AxiosError) => alert(ex.message));
  }

  @Action
  public async deleteFood(food: any): Promise<any> {
    if (confirm("Are you sure you want to delete this food?")) {
      axios
        .delete(`/csudijo/${food._id}`, this.config)
        .then((res: AxiosResponse) => {
          if (res.data.errmsg) {
            alert(res.data.errmsg);
          }
          this.context.dispatch("getFoods");
          alert(res.data.message);
        })
        .catch((ex: AxiosError) => alert(ex.message));
    }
  }

  @Action
  public async getNumberOfFoods(): Promise<any> {
    axios
      .get("/csudijo/count", this.config)
      .then((res: AxiosResponse) => {
        const data: any = res.data;
        if (data) {
          this.context.commit("mutateNumberOfFoods", data);
        }
      })
      .catch((ex: AxiosError) => alert(ex.message));
  }

  @Mutation
  private mutateFoods(data: any): void {
    this._foods = data;
  }

  @Mutation
  private mutateNumberOfFoods(data: any): void {
    this._numberOfFoods = data;
  }

  @Mutation
  private mutateTopFoods(data: any): void {
    this._topFoods = [];
    if (!data.error) {
      // 9. feladat?
      // It már nem kell a map(), mert a backend oldalon elvégeztük
      this._topFoods = data;
    }
  }
}
