const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");
const { zookeepers } = require("../data/zookeepers.json");

jest.mock("fs");

test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper(
    { id: "666", name: "Monk", age: 666, favoriteAnimal: "rat" },
    zookeepers
  );
  expect(zookeeper.id).toBe("666");
  expect(zookeeper.name).toBe("Monk");
  expect(zookeeper.age).toBe(666);
  expect(zookeeper.favoriteAnimal).toBe("rat");
});

test("filters by query", () => {
  const startingZookeepers = [
    {
      id: "0",
      name: "Kim",
      age: 28,
      favoriteAnimal: "dolphin",
    },
    {
      id: "1",
      name: "Mik",
      age: 82,
      favoriteAnimal: "sharks",
    },
  ];
  const updatedZookeeprs = filterByQuery({ favoriteAnimal: "dolphin" }, startingZookeepers);
  expect(updatedZookeeprs.length).toEqual(1);
});

test("finds by id", () => {
    const startingZookeepers = [
      {
        id: "2",
        name: "Raksha",
        age: 31,
        favoriteAnimal: "penguin",
      },
      {
        id: "3",
        name: "Isabella",
        age: 67,
        favoriteAnimal: "bear",
      },
    ];
  
    const result = findById("3", startingZookeepers);
  
    expect(result.name).toBe("Isabella");
  });

  test("validates age", () => {
    const zookeeper = {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin",
    };
  
    const invalidZookeeper = {
      id: "3",
      name: "Isabella",
      age: "67",
      favoriteAnimal: "bear",
    };
  
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);
  
    expect(result).toBe(true);
    expect(result2).toBe(false);
  });