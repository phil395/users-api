export interface IPassEncoder {
  hash(password: string, saltRounds: number): Promise<string>
  compare(password: string, hash: string): Promise<boolean>
}