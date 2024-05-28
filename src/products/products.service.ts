import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  //* CREAR
  async create(createProductDto: CreateProductDto) {
    try {
      const product = this.productRepository.create(createProductDto);

      const productSaved = await this.productRepository.save(product);

      return productSaved;
    } catch (error) {
      throw new InternalServerErrorException('Ayuda');
    }
  }
  //* TRAER TODOS LOS REGISTROS Y PAGINAR
  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;
    try {
      // ! La paginacion funciona en el metodo de obtener todos los items y usamos un dto personalizado con las atributos de limit y skip
      const products = await this.productRepository.find({
        take: limit,
        skip: offset,
        //TODO: Falta implementar relaciones entre las tablas
      });
      return products;
    } catch (error) {
      throw new InternalServerErrorException('Algo fallo en el servidor');
    }
  }
  //* TRAER UN REGISTRO
  async findOne(id: string) {
    try {
      const product = await this.productRepository.findOneBy({ id });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }
      return product;
    } catch (error) {
      throw new InternalServerErrorException(
        'Desde server no se pudo encontrar el producto que solicita',
      );
    }
  }
  //* ACTUALIZAR
  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      // const product = await this.productRepository(id);
    } catch (error) {}
  }
  //* ELIMINAR
  async remove(id: string) {
    try {
      const product = await this.findOne(id);

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not`);
      }

      await this.productRepository.remove(product);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error del servidor a intentar eliminar el producto',
      );
    }
  }
}
