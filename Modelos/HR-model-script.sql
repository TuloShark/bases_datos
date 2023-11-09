-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema BD_RecursosHumanos
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `BD_RecursosHumanos` ;

-- -----------------------------------------------------
-- Schema BD_RecursosHumanos
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `BD_RecursosHumanos` DEFAULT CHARACTER SET utf8 ;
USE `BD_RecursosHumanos` ;

-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Departments`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Departments` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Departments` (
  `idDepartments` INT NOT NULL,
  `name` NVARCHAR(45) NOT NULL,
  `description` NVARCHAR(100) NOT NULL,
  `enabled` TINYINT NOT NULL,
  PRIMARY KEY (`idDepartments`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Role` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Role` (
  `idRole` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(45) NOT NULL,
  `description` NVARCHAR(100) NOT NULL,
  `idDepartments` INT NOT NULL,
  `enabled` TINYINT NOT NULL,
  PRIMARY KEY (`idRole`),
  INDEX `fk_Role_Departments1_idx` (`idDepartments` ASC) VISIBLE,
  CONSTRAINT `fk_Role_Departments1`
    FOREIGN KEY (`idDepartments`)
    REFERENCES `BD_RecursosHumanos`.`Departments` (`idDepartments`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Country`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Country` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Country` (
  `idCountry` INT NOT NULL,
  `name` NVARCHAR(45) NOT NULL,
  PRIMARY KEY (`idCountry`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`ContactInfo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`ContactInfo` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`ContactInfo` (
  `idContactInfo` INT NOT NULL AUTO_INCREMENT,
  `phone` NVARCHAR(45) NOT NULL,
  `email` NVARCHAR(80) NOT NULL,
  PRIMARY KEY (`idContactInfo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`PayHourPerEmployee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`PayHourPerEmployee` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`PayHourPerEmployee` (
  `idPayHourPerEmployee` INT NOT NULL,
  `amount` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`idPayHourPerEmployee`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Employee` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Employee` (
  `idEmployee` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(45) NOT NULL,
  `lastName` NVARCHAR(45) NOT NULL,
  `lastName2` NVARCHAR(45) NOT NULL,
  `idRole` INT NOT NULL,
  `idCountry` INT NOT NULL,
  `idContactInfo` INT NOT NULL,
  `idPayHourPerEmployee` INT NOT NULL,
  `enabled` TINYINT NOT NULL,
  PRIMARY KEY (`idEmployee`),
  INDEX `fk_Employee_Role_idx` (`idRole` ASC) VISIBLE,
  INDEX `fk_Employee_Country1_idx` (`idCountry` ASC) VISIBLE,
  INDEX `fk_Employee_ContactInfo1_idx` (`idContactInfo` ASC) VISIBLE,
  INDEX `fk_Employee_PayHourPerEmployee1_idx` (`idPayHourPerEmployee` ASC) VISIBLE,
  CONSTRAINT `fk_Employee_Role`
    FOREIGN KEY (`idRole`)
    REFERENCES `BD_RecursosHumanos`.`Role` (`idRole`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_Country1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `BD_RecursosHumanos`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_ContactInfo1`
    FOREIGN KEY (`idContactInfo`)
    REFERENCES `BD_RecursosHumanos`.`ContactInfo` (`idContactInfo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employee_PayHourPerEmployee1`
    FOREIGN KEY (`idPayHourPerEmployee`)
    REFERENCES `BD_RecursosHumanos`.`PayHourPerEmployee` (`idPayHourPerEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Payroll`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Payroll` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Payroll` (
  `idPayroll` INT NOT NULL AUTO_INCREMENT,
  `hours` TINYINT NOT NULL,
  `date` DATE NOT NULL,
  `idEmployee` INT NOT NULL,
  PRIMARY KEY (`idPayroll`),
  INDEX `fk_Payroll_Employee1_idx` (`idEmployee` ASC) VISIBLE,
  CONSTRAINT `fk_Payroll_Employee1`
    FOREIGN KEY (`idEmployee`)
    REFERENCES `BD_RecursosHumanos`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Reduction`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Reduction` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Reduction` (
  `idReduction` INT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(45) NOT NULL,
  `description` NVARCHAR(100) NOT NULL,
  PRIMARY KEY (`idReduction`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`ReductionbyCountry`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`ReductionbyCountry` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`ReductionbyCountry` (
  `idReductionbyCountry` INT NOT NULL,
  `percentage` DECIMAL(3,2) NOT NULL,
  `idReduction` INT NOT NULL,
  `idCountry` INT NOT NULL,
  PRIMARY KEY (`idReductionbyCountry`),
  INDEX `fk_ReductionbyCountry_Reduction1_idx` (`idReduction` ASC) VISIBLE,
  INDEX `fk_ReductionbyCountry_Country1_idx` (`idCountry` ASC) VISIBLE,
  CONSTRAINT `fk_ReductionbyCountry_Reduction1`
    FOREIGN KEY (`idReduction`)
    REFERENCES `BD_RecursosHumanos`.`Reduction` (`idReduction`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ReductionbyCountry_Country1`
    FOREIGN KEY (`idCountry`)
    REFERENCES `BD_RecursosHumanos`.`Country` (`idCountry`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`PayByEmployee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`PayByEmployee` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`PayByEmployee` (
  `payid` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `grossSalary` DECIMAL(12,2) NOT NULL,
  `netSalary` DECIMAL(12,2) NOT NULL,
  `idEmployee` INT NOT NULL,
  PRIMARY KEY (`payid`),
  INDEX `fk_table1_Employee1_idx` (`idEmployee` ASC) VISIBLE,
  CONSTRAINT `fk_table1_Employee1`
    FOREIGN KEY (`idEmployee`)
    REFERENCES `BD_RecursosHumanos`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`PerformanceMetrics`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`PerformanceMetrics` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`PerformanceMetrics` (
  `idPerformanceMetrics` INT NOT NULL,
  `name` NVARCHAR(45) NOT NULL,
  `description` NVARCHAR(100) NOT NULL,
  PRIMARY KEY (`idPerformanceMetrics`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`PerfomanceByEmployee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`PerfomanceByEmployee` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`PerfomanceByEmployee` (
  `idPerfomanceByEmployee` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `rating` DECIMAL(3,2) NOT NULL,
  `idEmpleado` INT NOT NULL,
  `idPerformanceMetrics` INT NOT NULL,
  PRIMARY KEY (`idPerfomanceByEmployee`),
  INDEX `fk_PerfomanceByEmployee_Employee1_idx` (`idEmpleado` ASC) VISIBLE,
  INDEX `fk_PerfomanceByEmployee_PerformanceMetrics1_idx` (`idPerformanceMetrics` ASC) VISIBLE,
  CONSTRAINT `fk_PerfomanceByEmployee_Employee1`
    FOREIGN KEY (`idEmpleado`)
    REFERENCES `BD_RecursosHumanos`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PerfomanceByEmployee_PerformanceMetrics1`
    FOREIGN KEY (`idPerformanceMetrics`)
    REFERENCES `BD_RecursosHumanos`.`PerformanceMetrics` (`idPerformanceMetrics`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `BD_RecursosHumanos`.`Training`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `BD_RecursosHumanos`.`Training` ;

CREATE TABLE IF NOT EXISTS `BD_RecursosHumanos`.`Training` (
  `idTraining` INT NOT NULL,
  `startDate` DATE NOT NULL,
  `endDate` DATE NOT NULL,
  `trainer` INT NOT NULL,
  `trainee` INT NOT NULL,
  `observations` NVARCHAR(100) NOT NULL,
  PRIMARY KEY (`idTraining`),
  INDEX `fk_Training_Employee1_idx` (`trainer` ASC) VISIBLE,
  INDEX `fk_Training_Employee2_idx` (`trainee` ASC) VISIBLE,
  CONSTRAINT `fk_Training_Employee1`
    FOREIGN KEY (`trainer`)
    REFERENCES `BD_RecursosHumanos`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Training_Employee2`
    FOREIGN KEY (`trainee`)
    REFERENCES `BD_RecursosHumanos`.`Employee` (`idEmployee`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
