import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

@Module
export default class VuexDemoModule extends VuexModule {
  // State:
  private totalTvCount: number = 10;

  // Getters
  get getTotalTvCount(): number {
    return this.totalTvCount;
  }

  @Action
  public async removeTv(amount: number) {
    if (this.totalTvCount >= amount) {
      // If we enough TVs, ask Jenny to remove it
      this.context.commit("removeTvMut", amount);
    }
  }

  @Mutation
  private removeTvMut(amount: number): void {
    this.totalTvCount -= amount;
  }
}
