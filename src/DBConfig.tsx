export const DBConfig = {
  name: "SvettisDB",
  version: 1,
  objectStoresMeta: [
    {
      store: "practices",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "duration", keypath: "duration", options: { unique: false } },
        {
          name: "repetition",
          keypath: "repetition",
          options: { unique: false },
        },
        { name: "break", keypath: "break", options: { unique: false } },
        { name: "image", keypath: "image", options: { unique: false } },
        {
          name: "description",
          keypath: "description",
          options: { unique: false },
        },
        {
          name: "undeletable",
          keypath: "undeletable",
          options: { unique: false },
        },
      ],
    },
    {
      store: "exercises",
      storeConfig: { keyPath: "id", autoIncrement: true },
      storeSchema: [
        { name: "name", keypath: "name", options: { unique: true } },
        { name: "break", keypath: "break", options: { unique: false } },
        { name: "duration", keypath: "duration", options: { unique: false } },
        {
          name: "repetition",
          keypath: "repetition",
          options: { unique: false },
        },
        { name: "image", keypath: "image", options: { unique: false } },
        {
          name: "description",
          keypath: "description",
          options: { unique: false },
        },
        {
          name: "undeletable",
          keypath: "undeletable",
          options: { unique: false },
        },
      ],
    },
  ],
};
