import prisma from "../src/dbStrategy/database.js";

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: "FIFA 23",
        price: 5999,
        category: "sports",
        imageUrl:
          "https://image.api.playstation.com/vulcan/ap/rnd/202207/0515/HrC1Prgq2P70WXZn1X36P9vu.png",
        company: "EA Games",
        description: "FIFA 23 Description",
        inStock: 10,
      },
      {
        name: "The Elder Scrolls V: Skyrim - PlayStation 4",
        price: 1999,
        category: "rpg",
        imageUrl:
          "https://media.gamestop.com/i/gamestop/10131513/The-Elder-Scrolls-V-Skyrim-Special-Edition---PlayStation-4",
        company: "Bethesda Game Studios ",
        description: "The Elder Scrolls V: Skyrim Description",
        inStock: 7,
      },
      {
        name: "The Sims 4",
        price: 2499,
        category: "simulation",
        imageUrl:
          "https://originassets.akamaized.net/origin-com-store-final-assets-prod/55482/231.0x326.0/1011164_LB_231x326_en_WW_%5E_2019-06-26-09-34-45_7105a6cedde2619568d0d477bcf460506034f67d.jpg",
        company: "EA Games",
        description: "The Sims 4 Description",
        inStock: 3,
      },
      {
        name: "NBA 2K17 Standard Edition - Xbox One",
        price: 4999,
        category: "sports",
        imageUrl:
          "https://m.media-amazon.com/images/I/81nM6qviVcL._AC_SX425_.jpg",
        company: "Visual Concepts",
        description: "NBA 2K17 Description",
        inStock: 10,
      },
      {
        name: "The Witcher",
        price: 2999,
        category: "rpg",
        imageUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co4krq.png",
        company: "CD Projekt RED",
        description: "The Witcher Description",
        inStock: 15,
      },
      {
        name: "Stray",
        price: 2599,
        category: "adventure",
        imageUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co4tt2.png",
        company: "BlueTwelve Studio",
        description: "Stray Description",
        inStock: 5,
      },
      {
        name: "Halo Infinite",
        price: 4999,
        category: "shooter",
        imageUrl:
          "https://images.igdb.com/igdb/image/upload/t_cover_big/co2dto.png",
        company: "343 Industries ",
        description: "Halo Infinite Description",
        inStock: 5,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
