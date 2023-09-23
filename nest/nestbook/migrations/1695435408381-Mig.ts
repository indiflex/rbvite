import { MigrationInterface, QueryRunner } from "typeorm";

export class Mig1695435408381 implements MigrationInterface {
    name = 'Mig1695435408381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tag\` ADD \`ttt\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`Tag\` DROP COLUMN \`ttt\``);
    }

}
