declare module "remark";
declare module "remark-*";
declare module "hast-util-sanitize";

declare interface PromiseConstructor {
  allSettled(
    promises: Array<Promise<any>> // eslint-disable-line @typescript-eslint/no-explicit-any
  ): Promise<
    Array<{ status: "fulfilled" | "rejected"; value?: any; reason?: any }> // eslint-disable-line @typescript-eslint/no-explicit-any
  >;
}
