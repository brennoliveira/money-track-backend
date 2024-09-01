
export interface Mapper<D, P> {
  toDTO(persistence: P): D;
  toPersistence?(DTO: D): P;
}