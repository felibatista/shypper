import { prisma } from "../orm";

export function createRandomUrl() {
  const random = Math.random().toString(36).substring(2, 7);

  return random;
}

export function checkUrlExists(url: string) {
  return prisma.url.findUnique({
    where: {
      customUrl: url,
    },
  });
}

export function checkUrlValid(url: string) {
  const urlRegex = new RegExp(
    "^(https?:\\/\\/)?" +
      // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return urlRegex.test(url);
}

export function create(
  name: string,
  url: string,
  customUrl: string,
  userId: number,
  categories: []
) {
  return prisma.url.create({
    data: {
      url: url,
      customUrl: customUrl,
      name: name,
      userId: userId,
      categories: {
        create: categories,
      },
    },
  });
}
