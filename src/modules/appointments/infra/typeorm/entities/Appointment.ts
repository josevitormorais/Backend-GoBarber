import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import '@modules/users/infra/typeorm/entities/User';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments') //nome da tabela que vai ser criada
class Appointment {
  @PrimaryGeneratedColumn('uuid') //gera a chave primaria da coluna do tipo uuid
  id: string;

  @Column() //informando que é uma coluna do banco essa em especifico é o relacionamento com a tabela users
  provider_id: string;

  @ManyToOne(() => User) //cria um relacionamento de muitos para um com a entidade User
  @JoinColumn({ name: 'provider_id' }) //faz foreign key com a coluna provider_id na tablea users
  provider: User; //instancia do model de User

  @Column('timestamp with time zone') //cria a coluna passando parametrode timestamp formatado
  date: Date;

  @CreateDateColumn() //cria coluna padrao de criação no banco
  created_at: Date;

  @UpdateDateColumn() //cria coluna padrao da data de mudança do registro na tabela
  updated_at: Date;
}

export default Appointment;

/*provider_id vai ser enviado na criação do appointment para informar qual usuario esta criando aqele id */
