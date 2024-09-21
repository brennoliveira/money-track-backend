
export interface Mapper<D, P> {
  toDTO(persistence: P): D;
  toDTOList(persistence: P[]): D[];
  toPersistence?(DTO: D): P;
}