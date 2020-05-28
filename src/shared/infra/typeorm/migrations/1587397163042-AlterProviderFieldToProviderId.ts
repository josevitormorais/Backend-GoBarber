import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { query } from 'express';

export default class AlterProviderFieldToProviderId1587397163042
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //drop coloumn recebe qual a tabela que queremos deletar e segundo qual a coluna
    await queryRunner.dropColumn('appointments', 'provider');

    //cria uma column
    await queryRunner.addColumn(
      'appointments', //nome da tabela que vai ser criado a coluna
      new TableColumn({
        // cria uma nova tabela
        name: 'provider_id', //nome da coluna
        type: 'uuid', // o tipo que a coluna vai ser
        isNullable: true, //faz com que essa coluna mantenha os dados caso seus relacionamentos sejam desfeitos
      }),
    );

    await queryRunner.createForeignKey(
      //cria chave estrageira
      'appointments', //nome da tabela que vai criar a foreign key
      new TableForeignKey({
        name: 'AppointmentProvider', //nome da foreign key
        columnNames: ['provider_id'], //qual a coluna que vai ser a foreign key
        referencedColumnNames: ['id'], //qual a coluna na tabela de users que vai fazer referencia
        referencedTableName: 'users', //qual a tabela que vai ter o relacionamento
        onDelete: 'SET NULL', //CASCADE: se o usuario for deletado oque vai acontecer com seus agendamentos? seta o id como null
        onUpdate: 'CASCADE', //caso mude o id do usuario, desfaz todos seus relacionamentos
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //primeiro desfaz a foreign key passa a tabela no primeiro parametro e o segundo nome da foreign Key
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');
    //segundo desfaz a coluna provider_id
    await queryRunner.dropColumn('appointments', 'provider_id');
    // e criamos novamente a coluna provider.
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
