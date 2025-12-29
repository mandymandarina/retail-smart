export class OptimizeItemDto {
  id: string;
  name: string;
  price: number;
  sustainabilityScore: number;
}

export class OptimizeDto {
  items: OptimizeItemDto[];
  budget: number;
}
