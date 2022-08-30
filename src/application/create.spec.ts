const url: string = "https://www.google.com";

const repository = new ShortenerInMemoryRepository();

describe("CreateShortURLUseCase Tests", () => {
  it("should create a new shortURL", async () => {
    const urlFound = await repository.findURL(shortener.shortURL);
    expect(urlFound).toBe(url);
  });
});
