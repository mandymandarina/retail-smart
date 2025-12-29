import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService, NormalizedProduct } from './products.service';
import { OptimizeDto } from './dto/optimize.dto';
import type { OptimizeResult } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('barcode/:barcode')
  getByBarcode(@Param('barcode') barcode: string): Promise<NormalizedProduct> {
    return this.productsService.getByBarcode(barcode);
  }

  @Post('optimize')
  optimize(@Body() dto: OptimizeDto): OptimizeResult {
    return this.productsService.optimize(dto);
  }
}
