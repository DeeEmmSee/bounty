-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jan 27, 2020 at 07:01 PM
-- Server version: 8.0.18
-- PHP Version: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bounty`
--

-- --------------------------------------------------------

--
-- Table structure for table `bounties`
--

CREATE TABLE `bounties` (
  `ID` int(11) NOT NULL,
  `GameID` int(11) NOT NULL,
  `Title` varchar(128) NOT NULL,
  `BountyCondition` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Description` varchar(1028) NOT NULL,
  `Image` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Status` int(11) NOT NULL,
  `AllowContributors` bit(1) NOT NULL,
  `Featured` bit(1) DEFAULT b'0',
  `CreatedBy` int(11) NOT NULL,
  `CreatedDate` timestamp NOT NULL,
  `ClaimedBy` int(11) DEFAULT NULL,
  `ClaimedDate` timestamp NULL DEFAULT NULL,
  `UpdatedDateTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bounties`
--

INSERT INTO `bounties` (`ID`, `GameID`, `Title`, `BountyCondition`, `Description`, `Image`, `Status`, `AllowContributors`, `Featured`, `CreatedBy`, `CreatedDate`, `ClaimedBy`, `ClaimedDate`, `UpdatedDateTime`) VALUES
(39, 4, 'test', 'test', 'test', 'https://www.w3schools.com/bootstrap4/la.jpg', 1, b'1', b'1', 1, '2020-01-13 21:29:59', NULL, '2020-01-01 11:00:00', '2020-01-13 21:29:59'),
(40, 1, 'b2', 'test', 'test', 'https://www.w3schools.com/bootstrap4/la.jpg', 1, b'1', b'1', 1, '2020-01-13 21:47:52', NULL, '2020-01-02 12:00:00', '2020-01-13 21:47:52'),
(41, 7, 'b3', 'test', 'reee', 'https://www.w3schools.com/bootstrap4/la.jpg', 1, b'1', b'0', 1, '2020-01-13 21:48:05', NULL, NULL, '2020-01-13 21:48:05');

-- --------------------------------------------------------

--
-- Table structure for table `bountycontributions`
--

CREATE TABLE `bountycontributions` (
  `ID` int(11) NOT NULL,
  `BountyID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `Amount` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bountycontributions`
--

INSERT INTO `bountycontributions` (`ID`, `BountyID`, `UserID`, `Amount`) VALUES
(9, 40, 1, '100.00'),
(10, 41, 1, '50.00'),
(11, 40, 1, '25.00');

-- --------------------------------------------------------

--
-- Table structure for table `bountystatus`
--

CREATE TABLE `bountystatus` (
  `ID` int(11) NOT NULL,
  `Description` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bountystatus`
--

INSERT INTO `bountystatus` (`ID`, `Description`) VALUES
(1, 'Open'),
(2, 'Claimed'),
(3, 'Closed');

-- --------------------------------------------------------

--
-- Table structure for table `games`
--

CREATE TABLE `games` (
  `ID` int(11) NOT NULL,
  `Name` varchar(256) NOT NULL,
  `Year` int(11) NOT NULL,
  `Console` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `games`
--

INSERT INTO `games` (`ID`, `Name`, `Year`, `Console`) VALUES
(1, 'Tetris', 1989, 'NES'),
(2, 'Tetris99', 2018, 'Switch'),
(3, 'Overwatch', 2016, 'PC'),
(4, 'Destiny 2', 2015, 'PC'),
(5, 'Spyro: Reignited Trilogy', 2018, 'PS4'),
(6, 'Halo: Master Chief Collection', 2014, 'Xbox One'),
(7, 'Counter Strike: Global Offensive', 2012, 'PC');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `Username` varchar(64) NOT NULL,
  `Password` varchar(256) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Email` varchar(128) NOT NULL,
  `DateRegistered` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `LastLoggedInDate` timestamp NULL DEFAULT NULL,
  `Avatar` varchar(512) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `Username`, `Password`, `Email`, `DateRegistered`, `LastLoggedInDate`, `Avatar`) VALUES
(16, 'DMC', 'XKribCLR9oMYvOWH1JMbOw==$NEBE4ei4iV0uY34A84pNN3x1SyDvR6DMhYg6NiBVc997kuAWf3uT6J3uuwicOLaYJnd6gjiAuQd5HrSTLtBOsA==', 'test@test.com', '2020-01-04 18:33:54', NULL, NULL),
(17, 'dmc', 'zdfrSahJZXY/+hqCMXbCgg==$5yJheNzKyumoWvHvBlj5f1Durq/PGjO5J3sP9c240R2lRfBDeogRebhBYZ6c4b3Sfxw0K73OYbg9JIqC6WpcrA==', 'test2@test.com', '2020-01-04 18:34:09', NULL, NULL),
(18, 'dmc2', 'RlScRIAfYzefKv+4q8gVZA==$ugPTkaY5ZFyaGAPLh7e0MTy67pIhLK5twYaZHBi6iHisuZg3eVU+1AF0HqDkt6CbxCdwB5+G6zuWmfpflZPRmw==', 'testr3@test.com', '2020-01-04 18:50:50', NULL, NULL),
(19, 'test', 'YJIHKh5f9JrkXnY6EZlJNA==$yvQ5JmicZKb5p4TZceCJb6y+16Sv46Xnlm7spYFuG0P/yt+telsWrFGVsuP5ecQnIhBFYrdPMDbaOmFpIINvUw==', 'test5@myemail.com', '2020-01-08 22:38:43', NULL, NULL),
(21, 'DMC', 'qhyMCa/gH+IN2Y+Z/Y0vXw==$re1/Jyc/x9PMnQrMv6d+xclVsNInx/Qz70d36p+UA5TlzEr6RbLTU61XYxQi0aOIiw9IiETaMKnDk3tDyuWfMg==', 'dmc@test.com', '2020-01-14 21:44:57', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bounties`
--
ALTER TABLE `bounties`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `bountycontributions`
--
ALTER TABLE `bountycontributions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `bountystatus`
--
ALTER TABLE `bountystatus`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `games`
--
ALTER TABLE `games`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bounties`
--
ALTER TABLE `bounties`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `bountycontributions`
--
ALTER TABLE `bountycontributions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `bountystatus`
--
ALTER TABLE `bountystatus`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `games`
--
ALTER TABLE `games`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
