-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 20 mars 2019 à 13:37
-- Version du serveur :  5.7.21
-- Version de PHP :  7.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `coopagri`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `ADRESSE_ID` int(11) NOT NULL,
  `ADRESSE_RUE_NUM` int(11) NOT NULL,
  `ADRESSE_RUE_LIBELLE` varchar(25) NOT NULL,
  `ADRESSE_CP` int(11) NOT NULL,
  `ADRESSE_VILLE` varchar(30) NOT NULL,
  PRIMARY KEY (`ADRESSE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `adresse`
--

INSERT INTO `adresse` (`ADRESSE_ID`, `ADRESSE_RUE_NUM`, `ADRESSE_RUE_LIBELLE`, `ADRESSE_CP`, `ADRESSE_VILLE`) VALUES
(1, 16, 'rue Des Alouettes', 87110, 'Bosmie-L\'aiguille'),
(2, 1, 'allée des mesanges', 87280, 'Limoges'),
(3, 2, 'avenue Martin Luther King', 87000, 'Limoges'),
(6, 25, 'rue du Chinchauvaud', 87100, 'Limoges');

-- --------------------------------------------------------

--
-- Structure de la table `itineraire`
--

DROP TABLE IF EXISTS `itineraire`;
CREATE TABLE IF NOT EXISTS `itineraire` (
  `ITINERAIRE_ID` int(11) NOT NULL,
  `ADRESSE_ID` int(11) NOT NULL,
  `ITINERAIRE_HEURE_PASSAGE` varchar(25) NOT NULL,
  PRIMARY KEY (`ITINERAIRE_ID`,`ADRESSE_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
