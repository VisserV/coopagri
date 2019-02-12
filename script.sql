-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 13 fév. 2019 à 00:15
-- Version du serveur :  5.7.21
-- Version de PHP :  5.6.35

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `clientriche_coopagri`
--

-- --------------------------------------------------------

--
-- Structure de la table `adresse`
--

DROP TABLE IF EXISTS `adresse`;
CREATE TABLE IF NOT EXISTS `adresse` (
  `idAdresse` int(11) NOT NULL,
  `adresse` varchar(100) CHARACTER SET utf8 NOT NULL,
  `codePostal` char(5) CHARACTER SET utf8 NOT NULL,
  `ville` varchar(100) CHARACTER SET utf8 NOT NULL,
  `idOrganisme` int(11) NOT NULL,
  PRIMARY KEY (`idAdresse`),
  KEY `idOrganisme` (`idOrganisme`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `collecte`
--

DROP TABLE IF EXISTS `collecte`;
CREATE TABLE IF NOT EXISTS `collecte` (
  `idCollecte` int(11) NOT NULL,
  `idReappro` int(11) NOT NULL,
  `idLivreur` int(11) NOT NULL,
  `idRetrib` int(11) NOT NULL,
  PRIMARY KEY (`idCollecte`),
  KEY `idReappro` (`idReappro`),
  KEY `idLivreur` (`idLivreur`),
  KEY `idRetrib` (`idRetrib`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `detail_reappro`
--

DROP TABLE IF EXISTS `detail_reappro`;
CREATE TABLE IF NOT EXISTS `detail_reappro` (
  `idReappro` int(11) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idReappro`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `detail_ventes`
--

DROP TABLE IF EXISTS `detail_ventes`;
CREATE TABLE IF NOT EXISTS `detail_ventes` (
  `idVentes` int(11) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `remise` int(11) NOT NULL,
  PRIMARY KEY (`idVentes`),
  KEY `idProduit` (`idProduit`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `facture`
--

DROP TABLE IF EXISTS `facture`;
CREATE TABLE IF NOT EXISTS `facture` (
  `idFacture` int(11) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idFacture`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `indisponibilite`
--

DROP TABLE IF EXISTS `indisponibilite`;
CREATE TABLE IF NOT EXISTS `indisponibilite` (
  `idIndisponibilite` int(11) NOT NULL,
  `idOrganisme` int(11) NOT NULL,
  `idLivreur` int(11) NOT NULL,
  PRIMARY KEY (`idIndisponibilite`),
  KEY `idOrganisme` (`idOrganisme`),
  KEY `idLivreur` (`idLivreur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `livraison`
--

DROP TABLE IF EXISTS `livraison`;
CREATE TABLE IF NOT EXISTS `livraison` (
  `idLivraison` int(11) NOT NULL,
  `idVentes` int(11) NOT NULL,
  `idLivreur` int(11) NOT NULL,
  `idFacture` int(11) NOT NULL,
  PRIMARY KEY (`idLivraison`),
  KEY `idVentes` (`idVentes`),
  KEY `idLivreur` (`idLivreur`),
  KEY `idFacture` (`idFacture`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `livreur`
--

DROP TABLE IF EXISTS `livreur`;
CREATE TABLE IF NOT EXISTS `livreur` (
  `idLivreur` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `prenom` varchar(30) NOT NULL,
  `telephone` char(10) NOT NULL,
  PRIMARY KEY (`idLivreur`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `organisme`
--

DROP TABLE IF EXISTS `organisme`;
CREATE TABLE IF NOT EXISTS `organisme` (
  `idOrganisme` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `mail` varchar(50) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`idOrganisme`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

DROP TABLE IF EXISTS `produit`;
CREATE TABLE IF NOT EXISTS `produit` (
  `idProduit` int(11) NOT NULL,
  `libelle` varchar(50) NOT NULL,
  `prix` decimal(10,2) NOT NULL,
  `quantite` int(11) NOT NULL,
  `img` varchar(50) NOT NULL,
  PRIMARY KEY (`idProduit`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `reaprovisionnement`
--

DROP TABLE IF EXISTS `reaprovisionnement`;
CREATE TABLE IF NOT EXISTS `reaprovisionnement` (
  `idReappro` int(11) NOT NULL,
  `idOrganisme` int(11) NOT NULL,
  PRIMARY KEY (`idReappro`),
  KEY `idOrganisme` (`idOrganisme`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `retribution`
--

DROP TABLE IF EXISTS `retribution`;
CREATE TABLE IF NOT EXISTS `retribution` (
  `idRetrib` int(11) NOT NULL,
  PRIMARY KEY (`idRetrib`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `stock_fournisseur`
--

DROP TABLE IF EXISTS `stock_fournisseur`;
CREATE TABLE IF NOT EXISTS `stock_fournisseur` (
  `idOrganisme` int(11) NOT NULL,
  `idProduit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  PRIMARY KEY (`idOrganisme`,`idProduit`),
  KEY `idProduit` (`idProduit`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `ventes`
--

DROP TABLE IF EXISTS `ventes`;
CREATE TABLE IF NOT EXISTS `ventes` (
  `idVentes` int(11) NOT NULL,
  `idOrganisme` int(11) NOT NULL,
  `dateEstimee` date NOT NULL,
  `remise` int(11) NOT NULL,
  PRIMARY KEY (`idVentes`),
  KEY `idOrganisme` (`idOrganisme`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
