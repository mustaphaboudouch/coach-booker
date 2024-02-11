<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240211155817 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE address (id INT AUTO_INCREMENT NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, street VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE appointment (id INT AUTO_INCREMENT NOT NULL, coach_id INT NOT NULL, client_id INT NOT NULL, service_id INT NOT NULL, date DATE NOT NULL, start_time TIME NOT NULL, end_time TIME NOT NULL, status VARCHAR(255) NOT NULL, reject_reason LONGTEXT DEFAULT NULL, cancel_reason LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_FE38F8443C105691 (coach_id), INDEX IDX_FE38F84419EB6921 (client_id), INDEX IDX_FE38F844ED5CA9E6 (service_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE day_off (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, INDEX IDX_926C726CA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE feedback (id INT AUTO_INCREMENT NOT NULL, appointment_id INT NOT NULL, coach_id INT NOT NULL, client_id INT NOT NULL, rating_expertise INT NOT NULL, rating_availability INT NOT NULL, rating_communication INT NOT NULL, rating_experience INT NOT NULL, rating_motivation INT NOT NULL, comment LONGTEXT NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, INDEX IDX_D2294458E5B533F9 (appointment_id), INDEX IDX_D22944583C105691 (coach_id), INDEX IDX_D229445819EB6921 (client_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE organisation (id INT AUTO_INCREMENT NOT NULL, address_id INT DEFAULT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, kbis VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, created_at DATETIME NOT NULL, updated_at DATETIME NOT NULL, UNIQUE INDEX UNIQ_E6E132B4F5B7AF75 (address_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE schedule (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, planning JSON NOT NULL, UNIQUE INDEX UNIQ_5A3811FBA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE service (id INT AUTO_INCREMENT NOT NULL, organisation_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, duration INT NOT NULL, price INT NOT NULL, INDEX IDX_E19D9AD29E6B1585 (organisation_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8443C105691 FOREIGN KEY (coach_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84419EB6921 FOREIGN KEY (client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id)');
        $this->addSql('ALTER TABLE day_off ADD CONSTRAINT FK_926C726CA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D22944583C105691 FOREIGN KEY (coach_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D229445819EB6921 FOREIGN KEY (client_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE organisation ADD CONSTRAINT FK_E6E132B4F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        $this->addSql('ALTER TABLE schedule ADD CONSTRAINT FK_5A3811FBA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD29E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id)');
        $this->addSql('ALTER TABLE user ADD address_id INT DEFAULT NULL, ADD organisation_id INT DEFAULT NULL, ADD phone_number VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D649F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id)');
        $this->addSql('ALTER TABLE user ADD CONSTRAINT FK_8D93D6499E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_8D93D649F5B7AF75 ON user (address_id)');
        $this->addSql('CREATE INDEX IDX_8D93D6499E6B1585 ON user (organisation_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D649F5B7AF75');
        $this->addSql('ALTER TABLE user DROP FOREIGN KEY FK_8D93D6499E6B1585');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F8443C105691');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F84419EB6921');
        $this->addSql('ALTER TABLE appointment DROP FOREIGN KEY FK_FE38F844ED5CA9E6');
        $this->addSql('ALTER TABLE day_off DROP FOREIGN KEY FK_926C726CA76ED395');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D2294458E5B533F9');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D22944583C105691');
        $this->addSql('ALTER TABLE feedback DROP FOREIGN KEY FK_D229445819EB6921');
        $this->addSql('ALTER TABLE organisation DROP FOREIGN KEY FK_E6E132B4F5B7AF75');
        $this->addSql('ALTER TABLE schedule DROP FOREIGN KEY FK_5A3811FBA76ED395');
        $this->addSql('ALTER TABLE service DROP FOREIGN KEY FK_E19D9AD29E6B1585');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE day_off');
        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE organisation');
        $this->addSql('DROP TABLE schedule');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP INDEX UNIQ_8D93D649F5B7AF75 ON user');
        $this->addSql('DROP INDEX IDX_8D93D6499E6B1585 ON user');
        $this->addSql('ALTER TABLE user DROP address_id, DROP organisation_id, DROP phone_number');
    }
}
