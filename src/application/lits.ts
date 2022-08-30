export class ListAll {
  constructor(private shortenerRepo: RepoInterface) {}

  async execute(): Promise<Interface[]> {
    const shorts = await this.repo.findAll();
    return shorts.map((shorts) => shorts.toJSON());
  }
}
