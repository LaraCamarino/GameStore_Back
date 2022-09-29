import prisma from "../src/dbStrategy/database.js";

async function main() {
  await prisma.products.createMany({
    data: [
      {
        name: "FIFA 23",
        price: 59.99,
        category: "sports",
        imageUrl:
          "https://image.api.playstation.com/vulcan/ap/rnd/202207/0515/HrC1Prgq2P70WXZn1X36P9vu.png",
        description: "FIFA 23 Description",
        inStock: 10,
      },
      {
        name: "The Elder Scrolls V: Skyrim - PlayStation 4",
        price: 19.99,
        category: "rpg",
        imageUrl:
          "https://media.gamestop.com/i/gamestop/10131513/The-Elder-Scrolls-V-Skyrim-Special-Edition---PlayStation-4",
        description: "The Elder Scrolls V: Skyrim Description",
        inStock: 7,
      },
      {
        name: "The Sims 4",
        price: 24.99,
        category: "simulation",
        imageUrl:
          "https://originassets.akamaized.net/origin-com-store-final-assets-prod/55482/231.0x326.0/1011164_LB_231x326_en_WW_%5E_2019-06-26-09-34-45_7105a6cedde2619568d0d477bcf460506034f67d.jpg",
        description: "The Sims 4 Description",
        inStock: 3,
      },
      {
        name: "NBA 2K17 Standard Edition - Xbox One",
        price: 49.99,
        category: "sports",
        imageUrl:
          "https://m.media-amazon.com/images/I/81nM6qviVcL._AC_SX425_.jpg",
        description: "NBA 2K17 Description",
        inStock: 10,
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
