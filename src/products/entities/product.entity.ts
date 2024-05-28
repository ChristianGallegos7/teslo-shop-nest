import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //TODO: Obligatorio mandar
  @Column('text', {
    unique: true,
  })
  title: string;

  //TODO: Si no lo envia por defecto el precio sera cero
  @Column('float', {
    default: 0,
  })
  price: number;
  //TODO: La descripcion puede ser null

  @Column('text', {
    nullable: true,
  })
  description?: string;
  
  //TODO: El slug no es necesario que lo envie, ya que se genera desde el nombre del producto

  @Column('text', {
    unique: true,
  })
  slug?: string;

  @Column('int', {
    default: 0,
  })
  stock: number;

  @Column('text', {
    array: true,
  })
  sizes: string[];

  @Column('text')
  gender: string;

  //Antes de insertar quiero crear el slug en base al nombre del producto
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug === this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
