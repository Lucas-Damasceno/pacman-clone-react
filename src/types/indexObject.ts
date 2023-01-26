export type IndexObject<T extends string | number | symbol, K> = { [Key in T]: K }
