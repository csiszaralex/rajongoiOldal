import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class MyModule extends VuexModule {
  // State:
  public wheels: number = 2;

  // Getters
  get getAxes(): number {
    return this.wheels / 2;
  }

  @Mutation
  public addWheel(n: number): void {
    this.wheels += n;
  }

  @Action
  public async fetchNewWheels(n: number) {
    this.context.commit("addWheel", n);
  }
}
