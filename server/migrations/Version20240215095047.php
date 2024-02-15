<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240215095047 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP SEQUENCE client_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE coach_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE organization_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_location_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE user_service_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE organisation_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE period_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE users_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE address (id INT NOT NULL, country VARCHAR(255) NOT NULL, city VARCHAR(255) NOT NULL, zip_code VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE appointment (id INT NOT NULL, coach_id INT NOT NULL, client_id INT NOT NULL, service_id INT NOT NULL, location_id INT NOT NULL, date DATE NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, reject_reason TEXT DEFAULT NULL, cancel_reason TEXT DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_FE38F8443C105691 ON appointment (coach_id)');
        $this->addSql('CREATE INDEX IDX_FE38F84419EB6921 ON appointment (client_id)');
        $this->addSql('CREATE INDEX IDX_FE38F844ED5CA9E6 ON appointment (service_id)');
        $this->addSql('CREATE INDEX IDX_FE38F84464D218E ON appointment (location_id)');
        $this->addSql('CREATE TABLE day_off (id INT NOT NULL, user_id INT NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, reason TEXT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_926C726CA76ED395 ON day_off (user_id)');
        $this->addSql('CREATE TABLE feedback (id INT NOT NULL, appointment_id INT NOT NULL, comment TEXT NOT NULL, rating_expertise INT NOT NULL, rating_availability INT NOT NULL, rating_communication INT NOT NULL, rating_experience INT NOT NULL, rating_motivation INT NOT NULL, status VARCHAR(255) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_D2294458E5B533F9 ON feedback (appointment_id)');
        $this->addSql('CREATE TABLE location (id INT NOT NULL, organisation_id INT NOT NULL, address_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, status VARCHAR(255) NOT NULL, image_path VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5E9E89CB9E6B1585 ON location (organisation_id)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_5E9E89CBF5B7AF75 ON location (address_id)');
        $this->addSql('CREATE TABLE organisation (id INT NOT NULL, name VARCHAR(255) NOT NULL, kbis VARCHAR(255) NOT NULL, status VARCHAR(255) NOT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE period (id INT NOT NULL, schedule_id INT NOT NULL, start_time VARCHAR(255) NOT NULL, end_time VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_C5B81ECEA40BC2D5 ON period (schedule_id)');
        $this->addSql('CREATE TABLE schedule (id INT NOT NULL, user_id INT NOT NULL, day VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_5A3811FBA76ED395 ON schedule (user_id)');
        $this->addSql('CREATE TABLE service (id INT NOT NULL, organisation_id INT NOT NULL, name VARCHAR(255) NOT NULL, description TEXT NOT NULL, duration INT NOT NULL, price INT NOT NULL, status VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_E19D9AD29E6B1585 ON service (organisation_id)');
        $this->addSql('CREATE TABLE users (id INT NOT NULL, address_id INT DEFAULT NULL, organisation_id INT DEFAULT NULL, firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, email VARCHAR(180) NOT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, phone_number VARCHAR(255) DEFAULT NULL, status VARCHAR(255) NOT NULL, image_path VARCHAR(255) DEFAULT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, updated_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9E7927C74 ON users (email)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_1483A5E9F5B7AF75 ON users (address_id)');
        $this->addSql('CREATE INDEX IDX_1483A5E99E6B1585 ON users (organisation_id)');
        $this->addSql('CREATE TABLE user_location (user_id INT NOT NULL, location_id INT NOT NULL, PRIMARY KEY(user_id, location_id))');
        $this->addSql('CREATE INDEX IDX_BE136DCBA76ED395 ON user_location (user_id)');
        $this->addSql('CREATE INDEX IDX_BE136DCB64D218E ON user_location (location_id)');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F8443C105691 FOREIGN KEY (coach_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84419EB6921 FOREIGN KEY (client_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F844ED5CA9E6 FOREIGN KEY (service_id) REFERENCES service (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE appointment ADD CONSTRAINT FK_FE38F84464D218E FOREIGN KEY (location_id) REFERENCES location (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE day_off ADD CONSTRAINT FK_926C726CA76ED395 FOREIGN KEY (user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE feedback ADD CONSTRAINT FK_D2294458E5B533F9 FOREIGN KEY (appointment_id) REFERENCES appointment (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CB9E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CBF5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE period ADD CONSTRAINT FK_C5B81ECEA40BC2D5 FOREIGN KEY (schedule_id) REFERENCES schedule (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE schedule ADD CONSTRAINT FK_5A3811FBA76ED395 FOREIGN KEY (user_id) REFERENCES users (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE service ADD CONSTRAINT FK_E19D9AD29E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E9F5B7AF75 FOREIGN KEY (address_id) REFERENCES address (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE users ADD CONSTRAINT FK_1483A5E99E6B1585 FOREIGN KEY (organisation_id) REFERENCES organisation (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_location ADD CONSTRAINT FK_BE136DCBA76ED395 FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE user_location ADD CONSTRAINT FK_BE136DCB64D218E FOREIGN KEY (location_id) REFERENCES location (id) ON DELETE CASCADE NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE organisation_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE period_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE users_id_seq CASCADE');
        $this->addSql('CREATE SEQUENCE client_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE coach_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE organization_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_location_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE user_service_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F8443C105691');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F84419EB6921');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F844ED5CA9E6');
        $this->addSql('ALTER TABLE appointment DROP CONSTRAINT FK_FE38F84464D218E');
        $this->addSql('ALTER TABLE day_off DROP CONSTRAINT FK_926C726CA76ED395');
        $this->addSql('ALTER TABLE feedback DROP CONSTRAINT FK_D2294458E5B533F9');
        $this->addSql('ALTER TABLE location DROP CONSTRAINT FK_5E9E89CB9E6B1585');
        $this->addSql('ALTER TABLE location DROP CONSTRAINT FK_5E9E89CBF5B7AF75');
        $this->addSql('ALTER TABLE period DROP CONSTRAINT FK_C5B81ECEA40BC2D5');
        $this->addSql('ALTER TABLE schedule DROP CONSTRAINT FK_5A3811FBA76ED395');
        $this->addSql('ALTER TABLE service DROP CONSTRAINT FK_E19D9AD29E6B1585');
        $this->addSql('ALTER TABLE users DROP CONSTRAINT FK_1483A5E9F5B7AF75');
        $this->addSql('ALTER TABLE users DROP CONSTRAINT FK_1483A5E99E6B1585');
        $this->addSql('ALTER TABLE user_location DROP CONSTRAINT FK_BE136DCBA76ED395');
        $this->addSql('ALTER TABLE user_location DROP CONSTRAINT FK_BE136DCB64D218E');
        $this->addSql('DROP TABLE address');
        $this->addSql('DROP TABLE appointment');
        $this->addSql('DROP TABLE day_off');
        $this->addSql('DROP TABLE feedback');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE organisation');
        $this->addSql('DROP TABLE period');
        $this->addSql('DROP TABLE schedule');
        $this->addSql('DROP TABLE service');
        $this->addSql('DROP TABLE users');
        $this->addSql('DROP TABLE user_location');
    }
}
