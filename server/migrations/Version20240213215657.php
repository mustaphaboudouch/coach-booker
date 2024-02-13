<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240213215657 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE period (id INT AUTO_INCREMENT NOT NULL, schedule_id INT NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL, INDEX IDX_C5B81ECEA40BC2D5 (schedule_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE period ADD CONSTRAINT FK_C5B81ECEA40BC2D5 FOREIGN KEY (schedule_id) REFERENCES schedule (id)');
        $this->addSql('ALTER TABLE day_off ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D229445819EB6921');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D22944583C105691');
        $this->addSql('DROP INDEX IDX_D22944583C105691 ON feedback');
        $this->addSql('DROP INDEX IDX_D229445819EB6921 ON feedback');
        $this->addSql('ALTER TABLE feedback ADD status VARCHAR(255) NOT NULL, DROP coach_id, DROP client_id');
        $this->addSql('ALTER TABLE organisation DROP description');
        $this->addSql('ALTER TABLE schedule DROP INDEX UNIQ_5A3811FBA76ED395, ADD INDEX IDX_5A3811FBA76ED395 (user_id)');
        $this->addSql('ALTER TABLE schedule ADD day VARCHAR(255) NOT NULL, DROP planning');
        $this->addSql('ALTER TABLE service ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE user ADD status VARCHAR(255) NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE period DROP FOREIGN KEY FK_C5B81ECEA40BC2D5');
        $this->addSql('DROP TABLE period');
        $this->addSql('ALTER TABLE schedule DROP INDEX IDX_5A3811FBA76ED395, ADD UNIQUE INDEX UNIQ_5A3811FBA76ED395 (user_id)');
        $this->addSql('ALTER TABLE schedule ADD planning JSON NOT NULL, DROP day');
        $this->addSql('ALTER TABLE service DROP status');
        $this->addSql('ALTER TABLE organisation ADD description LONGTEXT DEFAULT NULL');
        $this->addSql('ALTER TABLE feedback ADD coach_id INT NOT NULL, ADD client_id INT NOT NULL, DROP status');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D229445819EB6921 FOREIGN KEY (client_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D22944583C105691 FOREIGN KEY (coach_id) REFERENCES user (id) ON UPDATE NO ACTION ON DELETE NO ACTION');
        $this->addSql('CREATE INDEX IDX_D22944583C105691 ON feedback (coach_id)');
        $this->addSql('CREATE INDEX IDX_D229445819EB6921 ON feedback (client_id)');
        $this->addSql('ALTER TABLE user DROP status');
        $this->addSql('ALTER TABLE day_off DROP status');
    }
}
