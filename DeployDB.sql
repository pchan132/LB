-- Database: `lb_letters`
-- --------------------------------------------------------
-- MySQL Script generated by MySQL Workbench
-- Version 8.0.33
-- --------------------------------------------------------
CREATE DATABASE `lb_letters` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `lb_letters`;

-- ตารางจดหมาย
-- --------------------------------------------------------
CREATE TABLE `lb_letters`.`letters` (
  `letter_id` INT NOT NULL AUTO_INCREMENT,
  `status` ENUM('RECEIVED', 'NOT') NULL,
  `received_date` DATE NULL,
  `sender_name` VARCHAR(255) NULL,
  `receiver_name` VARCHAR(255) NULL,
  `department_id` VARCHAR(255) NULL,
  PRIMARY KEY (`letter_id`));
)

-- ตารางแสดงข้อมูลของชื่อผู้รับจดหมาย
-- --------------------------------------------------------
CREATE TABLE `lb_letters`.`name` (
  `idName` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(255) NULL,
  `lastName` VARCHAR(255) NULL,
  `department` VARCHAR(255) NULL,
  PRIMARY KEY (`idName`));