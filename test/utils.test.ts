import { expect } from "chai";
import { objectToFlatMapDeep } from "../src/utils";

describe("utils", () => {
  it("objectToFlatMapDeep", () => {
    const obj = {
      name: "test1",
      job: "test2",
      address: {
        street: "test3",
        geo: {
          lat: 55.1,
          lng: -45.1
        }
      },
      contacts: [
        {
          name: "test4"
        },
        {
          name: "test5"
        }
      ]
    };

    const expected = [
      { path: "name", value: "test1" },
      { path: "job", value: "test2" },
      { path: "address.street", value: "test3" },
      { path: "address.geo.lat", value: 55.1 },
      { path: "address.geo.lng", value: -45.1 },
      { path: "contacts.0.name", value: "test4" },
      { path: "contacts.1.name", value: "test5" }
    ];

    const result = objectToFlatMapDeep(obj);

    expect(result).to.deep.eq(expected);
  });
});
