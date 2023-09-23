import { MigrationInterface, QueryRunner } from 'typeorm';

export class TTT1695434168838 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("insert into Auth(authname) values('Admin')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from Auth where authname ='Admin'");
  }
}
