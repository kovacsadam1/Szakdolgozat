SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE DATABASE IF NOT EXISTS `hazikedvenc` DEFAULT CHARACTER SET utf8 COLLATE utf8_hungarian_ci;
USE `hazikedvenc`;

CREATE TABLE `allat` (
  `allat_id` int(11) NOT NULL,
  `allat_nev` varchar(64) COLLATE utf8_hungarian_ci NOT NULL,
  `allat_fajta` int(11) NOT NULL,
  `ar` int(11) NOT NULL,
  `suly` float NOT NULL,
  `eletkor` int(11) NOT NULL,
  `neme` tinyint(1) NOT NULL,
  `oltottsag` tinyint(1) NOT NULL,
  `torzskonyv` tinyint(1) NOT NULL,
  `ivartalanitott` tinyint(1) NOT NULL,
  `fajtatiszta` tinyint(1) NOT NULL,
  `kep` varchar(255) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `allat` (`allat_id`, `allat_nev`, `allat_fajta`, `ar`, `suly`, `eletkor`, `neme`, `oltottsag`, `torzskonyv`, `ivartalanitott`, `fajtatiszta`, `kep`) VALUES
(1, 'Katze', 1, 29999, 1.8, 1, 1, 1, 1, 1, 0, 'katze.png'),
(2, 'Hund', 2, 32999, 9.6, 3, 0, 1, 1, 1, 1, 'hund.png'),
(3, 'Mazsi', 2, 12000, 50, 4, 0, 1, 1, 1, 0, 'mazsi.jpg'),
(4, 'Hagyma', 2, 20000, 30, 3, 0, 0, 1, 1, 0, 'hagyma.jpg'),
(5, 'Tukán', 3, 3000, 1, 12, 0, 0, 0, 0, 0, 'tukan.jpg'),
(6, 'Sziami', 1, 239999, 1.5, 5, 1, 1, 1, 1, 1, 'sziami.jpg'),
(7, 'Kandur', 1, 30000, 1.5, 5, 1, 1, 0, 0, 0, 'macska.jfif'),
(8, 'Gyík', 5, 500, 0.23, 12, 1, 1, 0, 0, 0, 'cameleon.jpg'),
(9, 'Piton professzor', 5, 60000, 6, 3, 0, 0, 0, 0, 0, 'piton.jpg'),
(10, 'Némó', 4, 500, 0.003, 1, 1, 0, 0, 0, 0, 'nemo.jpg'),
(11, 'Szenilla', 4, 900, 0.002, 1, 0, 0, 0, 0, 0, 'doki.jfif'),
(12, 'Fogas', 4, 7000, 0.23, 12, 1, 0, 1, 0, 1, 'piranha.jpg'),
(13, 'Lóri', 3, 300, 1, 2, 1, 1, 1, 0, 1, '1649191102214-papgaj.jpg'),
(14, 'Vitya', 6, 29000, 3, 1, 1, 1, 0, 0, 0, '1649191421988-rofi.jpg');

CREATE TABLE `fajta` (
  `fajta_id` int(11) NOT NULL,
  `fajta_nev` varchar(64) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `fajta` (`fajta_id`, `fajta_nev`) VALUES
(1, 'macska'),
(2, 'kutya'),
(3, 'madár'),
(4, 'hal'),
(5, 'hüllő'),
(6, 'mini malac');

CREATE TABLE `rendeles` (
  `rendeles_id` int(11) NOT NULL,
  `allat_id` int(11) NOT NULL,
  `email` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `telefonszam` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `zip` int(11) NOT NULL,
  `telepules` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `utca` varchar(255) COLLATE utf8_hungarian_ci NOT NULL,
  `hazszam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

INSERT INTO `rendeles` (`rendeles_id`, `allat_id`, `email`, `telefonszam`, `zip`, `telepules`, `utca`, `hazszam`) VALUES
(1, 9, 'minta@ema.il', '06102030405', 1234, 'Valahol', 'Valamerre', 8);


ALTER TABLE `allat`
  ADD PRIMARY KEY (`allat_id`),
  ADD KEY `allat_tipus` (`allat_fajta`);

ALTER TABLE `fajta`
  ADD PRIMARY KEY (`fajta_id`);

ALTER TABLE `rendeles`
  ADD PRIMARY KEY (`rendeles_id`),
  ADD KEY `allat` (`allat_id`);


ALTER TABLE `allat`
  MODIFY `allat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

ALTER TABLE `fajta`
  MODIFY `fajta_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

ALTER TABLE `rendeles`
  MODIFY `rendeles_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `allat`
  ADD CONSTRAINT `fajta` FOREIGN KEY (`allat_fajta`) REFERENCES `fajta` (`fajta_id`);

ALTER TABLE `rendeles`
  ADD CONSTRAINT `allat` FOREIGN KEY (`allat_id`) REFERENCES `allat` (`allat_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
