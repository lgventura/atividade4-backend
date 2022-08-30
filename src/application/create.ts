export class ShortCase {
  constructor(private repo: RepositoryInterface) {}
  async execute(url: string): Promise<Interface> {
    const shortURL = Shortener.create(url);
    await this.repo.insert(shortURL);
    return shortURL.toJSON();
  }
}
