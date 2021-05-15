import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity()
export class Series {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({default:null})
  Nome: string;

  @Column({ type: 'date' })
  Lancamento: Date;

  @Column({default:null})
  Temporadas: number;
  
  @Column({default:null})
  File:string

  @Column({default:null})
  Sinopse: string;

  @Column({default:null})
  Categoria: string;

  @Column({default:null})
  Visto: number;
  
}